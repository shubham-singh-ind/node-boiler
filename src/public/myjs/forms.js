// * =====================================FORMS=======================================
// * =====================================FORMS=======================================
const formDataToJson = (formData) => {
  let data = {};
  formData.forEach((d) => {
    data[d.name] = d.value;
  });
  return data;
};

// DOB FORM ON LANDING PAGE
$("#dob-form").submit(function (event) {
  event.preventDefault();
  let dob = this.dob.value;
  if (dob) {
    dob = dob.split("-").reverse().join("-");

    localStorage.setItem("dob", dob);
    getLatLon((err, result) => {
      if (err) {
        // Unable to get location
        alert("You must allow location to proceed.");
      } else {
        const lat = result[0];
        const long = result[1];
        localStorage.setItem("lat", lat);
        localStorage.setItem("long", long);
        redirectTo("dashboard");
      }
    });
  } else {
    this.dob.style.border = "1px solid red";
  }
});
// \DOB FORM ON LANDING PAGE

// CREATE YOUR PROFILE
$("#register-form").validate({
  // VALIDATION RULES
  rules: {
    register_dob: "required",
    register_email: {
      required: true,
      email: true,
    },
    register_name: "required",
    register_password: {
      required: true,
      minlength: 5,
    },
    register_password_repeat: {
      required: true,
      minlength: 5,
    },
  },
  // VALIDATION MESSAGES
  messages: {
    register_dob: "Please enter valid Date of Birth",
    register_email: "Please enter valid email",
    register_name: "Please enter your name",
    register_password: {
      required: "Please provide a password",
      minlength: jQuery.validator.format(
        "Password must be at least {0} characters long"
      ),
    },
    register_password_repeat: {
      required: "Password did not match",
      minlength: jQuery.validator.format(
        "Password must be at least {0} characters long"
      ),
    },
  },
});
$("#register-form").on("submit", function (e) {
  e.preventDefault();
  window.scrollTo(0,0);
  const dob = parseDateToSQL($("[name='register_dob']").val());
  const email = $("[name='register_email']").val();
  const gender = $("[name=gender]").val();
  const name = $("[name='register_name']").val();
  const password = $("[name='register_password']").val();
  const repeat = $("[name='register_password_repeat']").val();

  if (password !== repeat) {
    $("[name='register_password']").css({ border: "1px solid red" });
    $("[name='register_password_repeat']").css({ border: "1px solid red" });
  } else {
    $("[name='register_password']").css({ border: "1px solid gray" });
    $("[name='register_password_repeat']").css({ border: "1px solid gray" });
    getLatLon((err, result) => {
      if (err) {
        // Unable to get location
      } else {
        const lat = result[0];
        const lon = result[1];
        $("#register-btn").prop("disabled", true);
        // Get address
        getAddressDetails(lat, lon, (err, result) => {
          let country = "",
            city = "",
            state = "";
          if (result) {
            country = result.country;
            city = result.city;
            state = result.state;
          }
          // AJAX REQUEST
          $.ajax({
            url: END_POINTS.createUserUrl,
            method: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
              dob,
              email,
              name,
              password,
              gender,
              lat,
              lon,
              country,
              city,
              state,
            }),
            success: function (response) {
              $("#success-signup").html(`Profile Created, Logging in...`);
                    $("#success-signup").css({display: 'block'});
              // *success
              if (response) {
                // Login
                $.ajax({
                  url: END_POINTS.loginUrl,
                  method: 'POST',
                  dataType: "json",
                  contentType: "application/json; charset=utf-8",
                  data: JSON.stringify({
                    username: email,
                    password: password
                  }),
                  success: function(response) {
                    // *success
                    console.log('Success');
                    const { token } = response;
                    storeJwt(token);
                    if (response) {
                    $("#success-signup").html(`Logged in, Redirecting to Dashboard...`);
                      storeDOB(response.data.dob);
                      storeLatLong();
                      storeId(response.data.id);
                     redirectTo("dashboard");
                    }
                  },
                  error: function(err) {
                    console.log('Failure');
                   redirectTo("login");
                  }
                },
                )
              }
            },
            error: function (error) {
              // !request fails
              const responseJSON = error.responseJSON;
              const status = error.status;
              switch (status) {
                case 400:
                  if (responseJSON.error)
                    $("#problem-signup").html(`Please provide valid input fields`);
                    $("#problem-signup").css({display: 'block'});
                  break;
                case 409:
                  $("#problem-signup").html(`Sorry! Email already exists at Ahgosham.`);
                  $("#problem-signup").css({display: 'block'});
                  break;
                default:
                  $("#problem-signup").html(`Internal Server Error, Please Try Again`);
                  $("#problem-signup").css({display: 'block'});
              }
            },
            complete: function () {
              // enable button
              $("#register-btn").prop("disabled", false);
            },
          });
        });
      }
    });
  }
});
// \ CREATE YOUR PROFILE

// LOGIN FORM
$("#login-form").on("submit", function (e) {
  e.preventDefault();
  const { login_username, login_password } = this;
  $("#login-btn").prop("disabled", true);
  $.ajax({
    url: END_POINTS.loginUrl,
    method: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      username: login_username.value,
      password: login_password.value,
    }),
    success: function (response) {
      // *success
      const { token } = response;
      storeJwt(token);
      if (response) {
        storeDOB(response.data.dob);
        storeLatLong();
        storeId(response.data.id);
        
        redirectTo("dashboard");
      }
    },
    error: function (error) {
      // !request fails
      const responseJSON = error.responseJSON;
      const status = error.status;

      switch (status) {
        case 401:
          console.log('Problem');
          $("#problem").html(
          `${responseJSON.message || "Internal server error"}`);
          break;
        default:
          console.log('Problem');

          $("#problem").html(
          `Internal server error, Please try again`);
      }
    },
    complete: function () {
      // enable button
      $("#login-btn").prop("disabled", false);
    },
  });
});
// \LOGIN FORM

// PROFILE FORM
$("#profile-form").on("submit", function (e) {
  e.preventDefault();
  var formData = JSON.parse(
    JSON.stringify($("#profile-form").serializeArray())
  );
  const data = formDataToJson(formData);

  const jwt = fetchJwt();
  if (!jwt) {
    return redirectTo("login");
  }
  $.ajax({
    url: END_POINTS.profileUpdateUrl,
    method: "PUT",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    headers: {
      token: jwt,
    },
    data: JSON.stringify(data),
    success: function (response) {
      // *success
      if (response) {
        toast($("#alert-success"), "Changes saved!");
      }
    },
    error: function (error) {
      // !request fails
      const responseJSON = error.responseJSON;
      const status = error.status;

      // If not authorized then login else fetch
      if (responseJSON && responseJSON.status === ERRORS.AUTH_ERROR) {
        return redirectTo("login");
      }
      if (status) {
        toast(
          $("#alert-danger"),
          responseJSON.message || "Internal server error!"
        );
      }
    },
    complete: function () {
      // enable button
    },
  });
});
// \PROFILE FORM

// SOCIAL FORM
$("#social-form").on("submit", function (e) {
  e.preventDefault();
  var formData = JSON.parse(JSON.stringify($("#social-form").serializeArray()));
  const data = formDataToJson(formData);

  const jwt = fetchJwt();
  if (!jwt) {
    return redirectTo("login");
  }
  $.ajax({
    url: END_POINTS.socialAccountsUpdateUrl,
    method: "PUT",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    headers: {
      token: jwt,
    },
    data: JSON.stringify(data),
    success: function (response) {
      // *success
      if (response) {
        toast($("#alert-success"), "Changes saved!");
      }
    },
    error: function (error) {
      // !request fails
      const responseJSON = error.responseJSON;
      const status = error.status;

      // If not authorized then login else fetch
      if (responseJSON && responseJSON.status === ERRORS.AUTH_ERROR) {
        return redirectTo("login");
      }
      if (status) {
        toast(
          $("#alert-danger"),
          responseJSON.message || "Internal server error!"
        );
      }
    },
    complete: function () {
      // enable button
    },
  });
});
// \SOCIAL FORM

// INTEREST FORM
$("#interest-form").on("submit", function (e) {
  e.preventDefault();
  var formData = JSON.parse(JSON.stringify($(this).serializeArray()));
  const data = formDataToJson(formData);

  const jwt = fetchJwt();
  if (!jwt) {
    return redirectTo("login");
  }
  const id = $("input[name=interest_id]").val();
  $.ajax({
    url: `${END_POINTS.interestsUpdateUrl}/${id}`,
    method: "PUT",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    headers: {
      token: jwt,
    },
    data: JSON.stringify(data),
    success: function (response) {
      // *success
      if (response) {
        toast($("#alert-success"), "Changes saved!");
      }
    },
    error: function (error) {
      // !request fails
      const responseJSON = error.responseJSON;
      const status = error.status;

      // If not authorized then login else fetch
      if (responseJSON && responseJSON.status === ERRORS.AUTH_ERROR) {
        return redirectTo("login");
      }
      if (status) {
        toast(
          $("#alert-danger"),
          responseJSON.message || "Internal server error!"
        );
      }
    },
    complete: function () {
      // enable button
    },
  });
});
// \INTEREST FORM

// EDUCATION FORM
$(".education-submit").on("click", function () {
  $(".education-form").each(function (index, form) {
    const data = formDataToJson($(form).serializeArray());
    const jwt = fetchJwt();
    if (!jwt) {
      return redirectTo("login");
    }
    $.ajax({
      url: `${END_POINTS.educationsUpdateOrCreateUrl}`,
      method: "POST",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      headers: {
        token: jwt,
      },
      data: JSON.stringify(data),
      success: function (response) {
        // *success
        if (response) {
          toast($("#alert-success"), "Changes saved!");
        }
      },
      error: function (error) {
        // !request fails
        const responseJSON = error.responseJSON;
        const status = error.status;

        // If not authorized then login else fetch
        if (responseJSON && responseJSON.status === ERRORS.AUTH_ERROR) {
          return redirectTo("login");
        }
        if (status) {
          toast(
            $("#alert-danger"),
            responseJSON.message || "Internal server error!"
          );
        }
      },
      complete: function () {
        // enable button
      },
    });
  });
});
// \EDUCATION FORM

// PROFILE PIC FORM
$("#profile-pic-form").on("submit", function (e) {
  e.preventDefault();
  const picData = $("input[name=profilePicture]").prop("files")[0];
  const formData = new FormData();
  formData.append("profilePicture", picData);

  const jwt = fetchJwt();

  if (!jwt) {
    return redirectTo("login");
  }
  $.ajax({
    url: `${END_POINTS.uploadPicUrl}`,
    method: "POST",
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    headers: {
      token: jwt,
    },
    data: formData,
    success: function (response) {
      // *success
      if (response) {
        toast($("#alert-success"), "Changes saved!");
      }
    },
    error: function (error) {
      // !request fails
      const responseJSON = error.responseJSON;
      const status = error.status;

      // If not authorized then login else fetch
      if (responseJSON && responseJSON.status === ERRORS.AUTH_ERROR) {
        return redirectTo("login");
      }
      if (status) {
        toast(
          $("#alert-danger"),
          responseJSON.message || "Internal server error!"
        );
      }
    },
    complete: function () {
      // enable button
    },
  });
});
// \PROFILE PIC FORM

// COVER PIC FORM
$("#cover-pic-form").on("submit", function (e) {
  e.preventDefault();
  const picData = $("input[name=coverPicture]").prop("files")[0];
  const formData = new FormData();
  formData.append("coverPicture", picData);

  const jwt = fetchJwt();

  if (!jwt) {
    return redirectTo("login");
  }
  $.ajax({
    url: `${END_POINTS.uploadCoverUrl}`,
    method: "POST",
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    headers: {
      token: jwt,
    },
    data: formData,
    success: function (response) {
      // *success
      if (response) {
        toast($("#alert-success"), "Changes saved!");
      }
    },
    error: function (error) {
      // !request fails
      const responseJSON = error.responseJSON;
      const status = error.status;

      // If not authorized then login else fetch
      if (responseJSON && responseJSON.status === ERRORS.AUTH_ERROR) {
        return redirectTo("login");
      }
      if (status) {
        toast(
          $("#alert-danger"),
          responseJSON.message || "Internal server error!"
        );
      }
    },
    complete: function () {
      // enable button
    },
  });
});
// \COVER PIC FORM

// UPDATE PRIVACY FORM
$("#privacy-form").on("submit", function (e) {
  e.preventDefault();
  const jwt = fetchJwt();
  if (!jwt) {
    return redirectTo("login");
  } else {
    var formData = JSON.parse(JSON.stringify($(this).serializeArray()));
    const data = formDataToJson(formData);

    $.ajax({
      url: `${END_POINTS.updatePrivacyUrl}`,
      method: "PUT",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      headers: {
        token: jwt,
      },
      data: JSON.stringify({
        privacies: data,
      }),
      success: function (response) {
        // *success
        if (response) {
          toast($("#alert-success"), "Changes saved!");
        }
      },
      error: function (error) {
        // !request fails
        const responseJSON = error.responseJSON;
        const status = error.status;

        // If not authorized then login else fetch
        if (responseJSON && responseJSON.status === ERRORS.AUTH_ERROR) {
          return redirectTo("login");
        }
        if (status) {
          toast(
            $("#alert-danger"),
            responseJSON.message || "Internal server error!"
          );
        }
      },
    });
  }
});
// \UPDATE PRIVACY FORM

// * =====================================\ FORMS=====================================
// * =====================================\ FORMS=====================================
