// * CONFIGS
const IS_PRODUCTION = true;
const API_KEY = "AIzaSyB1TLe_5fP2B85oU9mvzNnJbN6QuHjdjHE";

const BASE_URL = IS_PRODUCTION
  ? "https://www.ahgosham.in/api/v1"
  : "http://localhost:9000/api/v1";

const IMAGE_BASE_URL = "uploads";
const ERRORS = {
  AUTH_ERROR: "AUTH_ERR",
};

const END_POINTS = {
  fetchUsersURL: `${BASE_URL}/user`,
  createUserUrl: `${BASE_URL}/user`,
  loginUrl: `${BASE_URL}/user/login`,
  logoutUrl: `${BASE_URL}/user/logout`,
  fetchMyConnectionsUrl: `${BASE_URL}/connection`,
  fetchSuggestionsUrl: `${BASE_URL}/user/suggestions`,
  checkLoginStatusUrl: `${BASE_URL}/user/isLogin`,
  sendRequestUrl: `${BASE_URL}/user/request`,
  cancelRequestUrl: `${BASE_URL}/user/cancel`,
  fetchRequestsUrl: `${BASE_URL}/connection/request`,
  acceptRequestUrl: `${BASE_URL}/user/accept`,
  declineRequestUrl: `${BASE_URL}/connection/decline`,
  unfollowUserUrl: `${BASE_URL}/user/unfollow`,
  fetchSelfProfileUrl: `${BASE_URL}/profile/myprofile`,
  fetchOthersProfileUrl: `${BASE_URL}/profile`,
  profileUpdateUrl: `${BASE_URL}/profile`,
  socialAccountsUpdateUrl: `${BASE_URL}/socialaccount`,
  interestsUpdateUrl: `${BASE_URL}/interest`,
  educationsUpdateOrCreateUrl: `${BASE_URL}/education`,
  uploadPicUrl: `${BASE_URL}/profile/uploadpic`,
  uploadCoverUrl: `${BASE_URL}/profile/uploadcover`,
  commonDataUrl: `${BASE_URL}/user/common`,
  fetchConnectionCountUrl: `${BASE_URL}/connection/count`,
  fetchPrivaciesUrl: `${BASE_URL}/privacy`,
  updatePrivacyUrl: `${BASE_URL}/privacy`,
  fetchLocationCountsUrl: `${BASE_URL}/user/locationCount`,
  fetchSocialAccountsUrl: `${BASE_URL}/socialaccount`,
  fetchLeaderboardUrl: `${BASE_URL}/user/leaderboard`,
  fetchSentRequestsUrl: `${BASE_URL}/connection/sentRequests`,
};
// * \CONFIGS

// * =====================================STORAGE=====================================
// * =====================================STORAGE=====================================
// STORE DOB
const storeDOB = (dob) => {
  localStorage.setItem("dob", parseDateToSQL(UTCtoNormalDate(dob)));
};
// \STORE DOB

// STORE ID
const storeId = (id) => {
  localStorage.setItem("id", id);
};
// \STORE ID

// FETCH ID
const fetchId = () => {
  id = localStorage.getItem("id", id);
  return id ? id : undefined;
};
// \FETCH ID

// FETCH DOB
const fetchDob = () => {
  const dob = localStorage.getItem("dob");
  return dob ? dob : "Dashboard";
};
$('[data-dob="dob"]').text(fetchDob());
// \ FETCH DOB

// FETCH LAT LONG
const fetchLatLong = () => {
  const maplat = localStorage.getItem("lat");
  const maplong = localStorage.getItem("long");
  return { maplat, maplong };
};
// \ FETCH LAT LONG

// STORE LAT LONG
const storeLatLong = () => {
  getLatLon((err, res) => {
    if (!err) {
      localStorage.setItem("lat", res[0]);
      localStorage.setItem("long", res[0]);
    }
  });
};
// \ STORE LAT LONG

// ! DEPRECATED FETCH LOGIN HELPER
const fetchLoginHelper = () => {
  const helper = localStorage.getItem("loginHelper");
  if (helper) return JSON.parse(helper);
  return undefined;
};
// !DEPRECATED\FETCH LOGIN HELPER

// FETCH JWT TOKEN
const fetchJwt = () => {
  const jwt = localStorage.getItem("jwtAuth");
  if (jwt) return jwt;
  return undefined;
};
// \ FETCH JWT TOKEN

// STORE JWT TOKEN
const storeJwt = (token) => {
  localStorage.setItem("jwtAuth", token);
};
// \ STORE JWT TOKEN

// DELETE JWT TOKEN
const deleteJwt = () => {
  localStorage.removeItem("jwtAuth");
};
// \ DELETE JWT TOKEN

// STORE OTHER ABOUT DATA
const storeOtherId = (data) => {
  localStorage.setItem("otherId", data);
};
// \STORE OTHER ABOUT DATA

// FETCH OTHER ABOUT DATA
const fetchOtherId = () => {
  const data = localStorage.getItem("otherId");
  return data ? data : null;
};
// \FETCH OTHER ABOUT DATA

// STORE PROFILE URL
const storeProfileUrl = (url) => {
  localStorage.setItem("profileUrl", url);
};
// \STORE PROFILE URL

// FETCH PROFILE URL
const fetchProfileUrl = () => {
  const profileUrl = localStorage.getItem("profileUrl");
  return profileUrl ? profileUrl : undefined;
};
// \FETCH PROFILE URL

// CALCULATE AGE
const calculateAge = (dob) => {
  const val = moment(dob).fromNow().split(" ");
  return val[0] + " " + val[1];
};
// \CALCULATE AGE
// * =====================================\ STORAGE===================================
// * =====================================\ STORAGE===================================

// * =====================================UTILS=======================================
// * =====================================UTILS=======================================

const redirectTo = (url) => {
  document.location.href = url;
};

window.addEventListener("online", () => {});
window.addEventListener("offline", () => {});

const checkIfAtBottom = () => {
  return $(document).scrollTop() + $(window).height() >= $(document).height();
};

const parseDateToSQL = (dob) => {
  const res = dob.split("-");
  return `${res[2]}-${res[1]}-${res[0]}`;
};

const UTCtoNormalDate = (dob) => {
  const date = new Date(dob);
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const d = `${yyyy}-${mm < 10 ? "0" + mm : mm}-${dd < 10 ? "0" + dd : dd}`;

  return d;
};

// const getSimilarUsers = (users) => {
//   const dob = parseDateToSQL(fetchDob());
//   const result = users.filter((user) => UTCtoNormalDate(user.dob) === dob);
//   return result;
// };

const getUsersCount = (users) => {
  const similarUsers = users;
  return similarUsers.length ? similarUsers.length : 0;
};

const getMaleCount = (users) => {
  const result = users.filter((user) => user.gender == 1);
  return result.length ? result.length : 0;
};

const getFemaleCount = (users) => {
  const result = users.filter((user) => user.gender == 2);
  return result.length ? result.length : 0;
};

const getDDMMYYYY = () => {
  const current = new Date();
  return [current.getDate(), current.getMonth() + 1, current.getFullYear()];
};

// Get latitude and longitude of current user
const getLatLon = (result) => {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      result(null, [position.coords.latitude, position.coords.longitude]);
    },
    function (error) {
      result(error, null);
    }
  );
};
// \Get latitude and longitude of current user

// Get user address by lat and lon
const getUserAddressBy = (lat, lon, result) => {
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      result(null, data.results[0].formatted_address);
    })
    .catch((err) => result(err, null));
};
// \Get user address by lat and lon

// Get user country
const getAddressDetails = (lat, lon, result) => {
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      data = data.results[0].address_components;
      country = data.filter((d) => d.types.includes("country"));
      state = data.filter((d) =>
        d.types.includes("administrative_area_level_1")
      );
      city = data.filter((d) =>
        d.types.includes("administrative_area_level_2")
      );
      city = city[0];
      state = state[0];
      country = country[0];
      result(null, {
        country: country.long_name,
        state: state.long_name,
        city: city.long_name,
      });
    })
    .catch((err) => result(err, null));
};
// \ Get user country

// Get lat and lon by user address
const getLatLonBy = (address, result) => {
  const google = window.google;
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address }, function (results, status) {
    if (status === "OK" && results) {
      const lat = results[0].geometry.location.lat();
      const lon = results[0].geometry.location.lng();
      result(null, [lat, lon]);
    } else {
      result(status, null);
    }
  });
};
// \Get lat and lon by user address

// Address autocomplete by google
const addressAutocomplete = (google, ref) => {
  const defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(45.4215296, -75.6971931)
  );

  const options = {
    bounds: defaultBounds,
  };

  let autocomplete = new google.maps.places.Autocomplete(ref, options);
};
// \Address autocomplete by google

// Gives presentable image url
const getFullUrl = (url) => {
  return `${IMAGE_BASE_URL}/${url}`;
};
// \Gives presentable image url

// * =====================================\ UTILS=====================================
// * =====================================\ UTILS=====================================

// * =====================================BACKEND CALLS===============================
// * =====================================BACKEND CALLS===============================

async function postData(url = "", data) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      token: jwt,
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
}

const fetchUsers = async (page = 1, perPage = 10) => {
  const dob = parseDateToSQL(fetchDob());
  const response = await fetch(
    `${END_POINTS.fetchUsersURL}?dob=${dob}&page=${page}&perPage=${perPage}`
  );
  return response.json();
};

const fetchSuggestions = async (page = 1, perPage = 10) => {
  const jwt = fetchJwt();
  if (!jwt) {
    return redirectTo("login");
  }
  const response = await fetch(
    `${END_POINTS.fetchSuggestionsUrl}?page=${page}&perPage=${perPage}`,
    {
      headers: {
        token: jwt,
      },
    }
  );
  return response.json();
};

const fetchLocationCounts = async (
  country = "",
  state = "",
  city = "",
  dob
) => {
  const jwt = fetchJwt();
  const response = await fetch(
    `${END_POINTS.fetchLocationCountsUrl}?country=${country}&city=${city}&state=${state}&dob=${dob}`,
    {
      headers: {
        token: jwt,
      },
    }
  );
  return response.json();
};

const checkLoginStatus = async () => {
  const jwt = fetchJwt();
  if (jwt) {
    const response = await fetch(`${END_POINTS.checkLoginStatusUrl}`, {
      headers: {
        token: jwt,
      },
    });
    const data = await response.json();
    if (data.code && data.code === 200) return true;
    return false;
  } else {
    return false;
  }
};

const sendRequest = async (friendId) => {
  const jwt = fetchJwt();
  const data = { to: friendId };
  if (jwt) {
    const response = await fetch(`${END_POINTS.sendRequestUrl}`, {
      headers: {
        "Content-Type": "application/json",
        token: jwt,
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  } else {
    redirectTo("login");
  }
};

const cancelRequest = async (friendId) => {
  const jwt = fetchJwt();
  if (jwt) {
    const response = await fetch(`${END_POINTS.cancelRequestUrl}/${friendId}`, {
      headers: {
        token: jwt,
      },
      method: "DELETE",
    });
    return response.json();
  } else {
    redirectTo("login");
  }
};

const unfollowUser = async (friendId) => {
  const jwt = fetchJwt();
  if (jwt) {
    const response = await fetch(`${END_POINTS.unfollowUserUrl}/${friendId}`, {
      headers: {
        token: jwt,
      },
      method: "DELETE",
    });
    return response.json();
  } else {
    redirectTo("login");
  }
};

const declineRequest = async (friendId) => {
  const jwt = fetchJwt();
  if (jwt) {
    const response = await fetch(
      `${END_POINTS.declineRequestUrl}/${friendId}`,
      {
        headers: {
          token: jwt,
        },
        method: "DELETE",
      }
    );
    return response.json();
  } else {
    redirectTo("login");
  }
};

const fetchMyConnections = async (pageNumber = 1, itemsPerPage = 10) => {
  if (pageNumber <= 0) pageNumber = 1;
  const jwt = fetchJwt();
  if (jwt) {
    const response = await fetch(
      `${END_POINTS.fetchMyConnectionsUrl}?page=${pageNumber}&perPage=${itemsPerPage}`,
      {
        headers: {
          token: jwt,
        },
        method: "GET",
      }
    );
    return response.json();
  } else {
    redirectTo("login");
  }
};

const fetchOtherConnections = async (id, pageNumber = 1, itemsPerPage = 10) => {
  const jwt = fetchJwt();
  if (jwt && id) {
    const response = await fetch(
      `${END_POINTS.fetchMyConnectionsUrl}?otherId=${id}&page=${pageNumber}&perPage=${itemsPerPage}`,
      {
        headers: {
          token: jwt,
        },
        method: "GET",
      }
    );
    return response.json();
  } else {
    redirectTo("login");
  }
};

const fetchRequests = async () => {
  const jwt = fetchJwt();
  if (jwt) {
    const response = await fetch(`${END_POINTS.fetchRequestsUrl}`, {
      headers: {
        token: jwt,
      },
      method: "GET",
    });
    return response.json();
  } else {
    redirectTo("login");
  }
};

const acceptRequest = async (friendId) => {
  const jwt = fetchJwt();
  if (jwt) {
    const data = { friendId };
    const response = await fetch(`${END_POINTS.acceptRequestUrl}`, {
      headers: {
        token: jwt,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
    return response.json();
  } else {
    redirectTo("login");
  }
};

const logout = async () => {
  // const jwt = fetchJwt();
  // if (jwt) {
  //   const response = await fetch(`${END_POINTS.logoutUrl}`, {
  //     headers: {
  //       token: jwt,
  //     },
  //     method: "POST",
  //   });
  //   return response.json();
  // } else {
  //   redirectTo("login");
  // }
  return new Promise((resolve, reject) => {
    deleteJwt();
    resolve("deleted");
  });
};

const fetchSelfProfile = async () => {
  const jwt = fetchJwt();
  if (jwt) {
    const response = await fetch(END_POINTS.fetchSelfProfileUrl, {
      headers: {
        token: jwt,
      },
    });
    return response.json();
  } else {
    redirectTo("login");
  }
};

const fetchCommonData = async () => {
  const jwt = fetchJwt();
  if (jwt) {
    const response = await fetch(END_POINTS.commonDataUrl, {
      headers: {
        token: jwt,
      },
    });
    return response.json();
  } else {
    redirectTo("login");
  }
};

const fetchOthersProfile = async (userId) => {
  const jwt = fetchJwt();
  if (jwt) {
    const response = await fetch(
      `${END_POINTS.fetchOthersProfileUrl}/${userId}`,
      {
        headers: {
          token: jwt,
        },
      }
    );
    return response.json();
  } else {
    redirectTo("login");
  }
};

const fetchConnectionCount = async (userId = null) => {
  const jwt = fetchJwt();
  if (userId) {
    if (jwt) {
      const response = await fetch(
        `${END_POINTS.fetchConnectionCountUrl}?otherId=${userId}`,
        {
          headers: {
            token: jwt,
          },
        }
      );
      return response.json();
    } else {
      redirectTo("login");
    }
  } else {
    if (jwt) {
      const response = await fetch(`${END_POINTS.fetchConnectionCountUrl}`, {
        headers: {
          token: jwt,
        },
      });
      return response.json();
    } else {
      redirectTo("login");
    }
  }
};

const fetchPrivacyDetails = async () => {
  const jwt = fetchJwt();
  if (jwt) {
    const response = await fetch(`${END_POINTS.fetchPrivaciesUrl}`, {
      headers: {
        token: jwt,
      },
    });
    return response.json();
  } else {
    redirectTo("login");
  }
};

const fetchSocialAccounts = async (id) => {
  const jwt = fetchJwt();
  const response = await fetch(
    `${END_POINTS.fetchSocialAccountsUrl}?userId=${id}`,
    {
      headers: {
        token: jwt,
      },
    }
  );
  return response.json();
};

const fetchLeaderboard = async () => {
  const response = await fetch(`${END_POINTS.fetchLeaderboardUrl}`);
  return response.json();
};

const fetchSentRequests = async () => {
  const jwt = fetchJwt();
  const response = await fetch(`${END_POINTS.fetchSentRequestsUrl}`, {
    headers: {
      token: jwt,
    },
  });
  return response.json();
};

// * =====================================\ BACKEND CALLS=============================
// * =====================================\ BACKEND CALLS=============================

// * =====================================DOM MANIPULATION============================
// * =====================================DOM MANIPULATION============================
// User card UI
const userCard = (user, buttonText = "Connect", cancelText = "") => {
  const {
    id,
    name,
    username,
    avatar,
    country,
    description = "Ahgosham User",
  } = user;
  let pic = avatar ? getFullUrl(avatar) : "img/custom/nouser.png";

  fetchSocialAccounts(id).then((data) => {
    data.forEach((d) => {
      if (d.value) {
        const social = socialLink(d);
        $(`#social-links-${id}`).append(social);
      }
    });
  });

  return $(
    `        
      <!-- USER PREVIEW -->
      <div class="user-preview wow fadeInUp" id="${id}">
        <!-- USER PREVIEW COVER -->
        <figure class="user-preview-cover liquid">
          <img src="img/cover/04.jpg" alt="cover-04" />
        </figure>
        <!-- /USER PREVIEW COVER -->

        <!-- USER PREVIEW INFO -->
        <div class="user-preview-info">
          <!-- USER SHORT DESCRIPTION -->
          <div class="user-short-description">
            <!-- USER SHORT DESCRIPTION AVATAR -->
            <a
              class="user-short-description-avatar user-avatar medium"
              href="othersprofile?id=${id}"
            >
              <!-- USER AVATAR BORDER -->
              <div class="user-avatar-border">
                <!-- HEXAGON -->
                <div class="hexagon-120-132"></div>
                <!-- /HEXAGON -->
              </div>
              <!-- /USER AVATAR BORDER -->

              <!-- USER AVATAR CONTENT -->
              <div class="user-avatar-content">
                <!-- HEXAGON -->
                <img
                  class="hexagon-image-82-90 custom-image"
                  src="${pic}"
                ></img>
                <!-- /HEXAGON -->
              </div>
              <!-- /USER AVATAR CONTENT -->

              <!-- USER AVATAR PROGRESS -->
              <div class="user-avatar-progress">
                <!-- HEXAGON -->
                <div class="hexagon-progress-100-110"></div>
                <!-- /HEXAGON -->
              </div>
              <!-- /USER AVATAR PROGRESS -->

              <!-- USER AVATAR PROGRESS BORDER -->
              <div class="user-avatar-progress-border">
                <!-- HEXAGON -->
                <div class="hexagon-border-100-110"></div>
                <!-- /HEXAGON -->
              </div>
              <!-- /USER AVATAR PROGRESS BORDER -->

              <!-- USER AVATAR BADGE -->
              <div class="user-avatar-badge">
                <!-- USER AVATAR BADGE BORDER -->
                <div class="user-avatar-badge-border">
                  <!-- HEXAGON -->
                  <div class="hexagon-32-36"></div>
                  <!-- /HEXAGON -->
                </div>
                <!-- /USER AVATAR BADGE BORDER -->

                <!-- USER AVATAR BADGE CONTENT -->
                <div class="user-avatar-badge-content">
                  <!-- HEXAGON -->
                  <div class="hexagon-dark-26-28"></div>
                  <!-- /HEXAGON -->
                </div>
                <!-- /USER AVATAR BADGE CONTENT -->

              </div>
              <!-- /USER AVATAR BADGE -->
            </a>
            <!-- /USER SHORT DESCRIPTION AVATAR -->

            <!-- USER SHORT DESCRIPTION TITLE -->
            <p class="user-short-description-title">
              <a href="othersprofile?id=${id}">${name}</a>
            </p>
            <!-- /USER SHORT DESCRIPTION TITLE -->

            <!-- USER SHORT DESCRIPTION TEXT -->
            <p class="user-short-description-text">
              ${description || "Ahgosham User"}
            </p>
            <!-- /USER SHORT DESCRIPTION TEXT -->
            <!-- USER SHORT DESCRIPTION TEXT -->
            <p class="user-short-description-text">
              ${country}
            </p>
            <!-- /USER SHORT DESCRIPTION TEXT -->
          </div>
          <!-- /USER SHORT DESCRIPTION -->

          <!-- USER PREVIEW STATS ROSTER -->
          <div
            id="user-preview-stats-roster-01"
            class="user-preview-stats-roster slider-roster"
          >
            <!-- SLIDER ROSTER ITEM -->
            <div class="slider-roster-item"></div>
            <!-- /SLIDER ROSTER ITEM -->

            <!-- SLIDER ROSTER ITEM -->
            <div class="slider-roster-item"></div>
            <!-- /SLIDER ROSTER ITEM -->
          </div>
          <!-- /USER PREVIEW STATS ROSTER -->

          <!-- SOCIAL LINKS -->
          <div class="social-links small" id="social-links-${id}">
            <!-- SOCIAL LINKS WILL GO HERE -->
          </div>
          <!-- /SOCIAL LINKS -->

          <!-- USER PREVIEW ACTIONS -->
          <div class="user-preview-actions">
            <!-- BUTTON -->
            <!-- BUTTON STATUS CAN BE send/cancel -->
            <button class="button secondary card-btn" data-id="${id}" 
            data-button-status="send" >${buttonText}</button>
            <!-- /BUTTON -->
          ${
            cancelText &&
            `
        <!-- CANCEL/DECLINE ACTION -->
          <!-- BUTTON -->
          <!-- BUTTON STATUS CAN BE send/cancel -->
          <button class="button primary cancel-btn" data-id="${id}"
          data-button-status="send" >${cancelText}</button>
          <!-- /BUTTON -->
        <!-- /CANCEL/DECLINE ACTION -->
        `
          }
          </div>
          <!-- /USER PREVIEW ACTIONS -->
        </div>
        <!-- /USER PREVIEW INFO -->
      </div>
      <!-- /USER PREVIEW -->
      `
  );
};

// User card small UI
const userCardSmall = (user, buttonText = "Connect", cancelText = "") => {
  const {
    id,
    name,
    username,
    avatar,
    country,
    description = "Ahgosham User",
  } = user;
  let pic = avatar ? getFullUrl(avatar) : "img/custom/nouser.png";
  return $(
    `        
      <!-- USER PREVIEW -->
      <div class="user-preview small" id="${id}">
        <!-- USER PREVIEW COVER -->
        <figure class="user-preview-cover liquid">
          <img src="img/cover/04.jpg" alt="cover-04" />
        </figure>
        <!-- /USER PREVIEW COVER -->

        <!-- USER PREVIEW INFO -->
        <div class="user-preview-info">
          <!-- USER SHORT DESCRIPTION -->
          <div class="user-short-description small">
            <!-- USER SHORT DESCRIPTION AVATAR -->
            <a
              class="user-short-description-avatar user-avatar medium"
              href="othersprofile?id=${id}"
            >
              <!-- USER AVATAR BORDER -->
              <div class="user-avatar-border">
                <!-- HEXAGON -->
                <div class="hexagon-120-132"></div>
                <!-- /HEXAGON -->
              </div>
              <!-- /USER AVATAR BORDER -->

              <!-- USER AVATAR CONTENT -->
              <div class="user-avatar-content">
                <!-- HEXAGON -->
                <img
                  class="hexagon-image-68-74 custom-image-small"
                  src="${pic}"
                ></img>
                <!-- /HEXAGON -->
              </div>
              <!-- /USER AVATAR CONTENT -->

              <!-- USER AVATAR PROGRESS -->
              <div class="user-avatar-progress">
                <!-- HEXAGON -->
                <div class="hexagon-progress-84-92"></div>
                <!-- /HEXAGON -->
              </div>
              <!-- /USER AVATAR PROGRESS -->

              <!-- USER AVATAR PROGRESS BORDER -->
              <div class="user-avatar-progress-border">
                <!-- HEXAGON -->
                <div class="hexagon-border-84-92"></div>
                <!-- /HEXAGON -->
              </div>
              <!-- /USER AVATAR PROGRESS BORDER -->

              <!-- USER AVATAR BADGE -->
              <div class="user-avatar-badge">
                <!-- USER AVATAR BADGE BORDER -->
                <div class="user-avatar-badge-border">
                  <!-- HEXAGON -->
                  <div class="hexagon-28-32"></div>
                  <!-- /HEXAGON -->
                </div>
                <!-- /USER AVATAR BADGE BORDER -->

                <!-- USER AVATAR BADGE CONTENT -->
                <div class="user-avatar-badge-content">
                  <!-- HEXAGON -->
                  <div class="hexagon-dark-22-24"></div>
                  <!-- /HEXAGON -->
                </div>
                <!-- /USER AVATAR BADGE CONTENT -->

              </div>
              <!-- /USER AVATAR BADGE -->
            </a>
            <!-- /USER SHORT DESCRIPTION AVATAR -->

            <!-- USER SHORT DESCRIPTION TITLE -->
            <p class="user-short-description-title">
              <a href="othersprofile?id=${id}">${name}</a>
            </p>
            <!-- /USER SHORT DESCRIPTION TITLE -->

            <!-- USER SHORT DESCRIPTION TEXT -->
            <p class="user-short-description-text">
              ${description}
            </p>
            <!-- /USER SHORT DESCRIPTION TEXT -->

            <!-- USER SHORT DESCRIPTION TEXT -->
            <p class="user-short-description-text">
              ${country}
            </p>
            <!-- /USER SHORT DESCRIPTION TEXT -->
          </div>
          <!-- /USER SHORT DESCRIPTION -->

          <!-- USER PREVIEW STATS ROSTER -->
          <div
            id="user-preview-stats-roster-01"
            class="user-preview-stats-roster slider-roster"
          >
            <!-- SLIDER ROSTER ITEM -->
            <div class="slider-roster-item"></div>
            <!-- /SLIDER ROSTER ITEM -->

            <!-- SLIDER ROSTER ITEM -->
            <div class="slider-roster-item"></div>
            <!-- /SLIDER ROSTER ITEM -->
          </div>
          <!-- /USER PREVIEW STATS ROSTER -->

          <!-- SOCIAL LINKS WILL GO HERE -->

          <!-- USER PREVIEW ACTIONS -->
          <div class="user-preview-actions">
            <!-- BUTTON -->
            <!-- BUTTON STATUS CAN BE send/cancel -->
            <button class="button secondary card-btn" data-id="${id}" 
            ${username && `data-username="${username}"`}
            data-button-status="send" >${buttonText}</button>
            <!-- /BUTTON -->
          ${
            cancelText &&
            `
        <!-- CANCEL/DECLINE ACTION -->
          <!-- BUTTON -->
          <!-- BUTTON STATUS CAN BE send/cancel -->
          <button class="button primary cancel-btn" data-id="${id}"
          data-button-status="send" >${cancelText}</button>
          <!-- /BUTTON -->
        <!-- /CANCEL/DECLINE ACTION -->
        `
          }
          </div>
          <!-- /USER PREVIEW ACTIONS -->
        </div>
        <!-- /USER PREVIEW INFO -->
      </div>
      <!-- /USER PREVIEW -->
      `
  );
};

// User card list UI
const userCardList = (user, buttonText = "Connect", cancelText = "") => {
  const {
    id,
    name,
    username,
    avatar,
    description = "Ahgosham User",
    country,
  } = user;
  let pic = avatar ? getFullUrl(avatar) : "img/custom/nouser.png";

  return $(
    `        
      <!-- USER PREVIEW -->
      <div class="user-preview landscape" id="${id}">
        <!-- USER PREVIEW COVER -->
        <figure class="user-preview-cover liquid">
          <img src="img/cover/04.jpg" alt="cover-04" />
        </figure>
        <!-- /USER PREVIEW COVER -->

        <!-- USER PREVIEW INFO -->
        <div class="user-preview-info">
          <!-- USER SHORT DESCRIPTION -->
          <div class="user-short-description landscape tiny">
            <!-- USER SHORT DESCRIPTION AVATAR -->
            <a
              class="user-short-description-avatar user-avatar small"
              href="othersprofile?id=${id}"
            >
              <!-- USER AVATAR BORDER -->
              <div class="user-avatar-border">
                <!-- HEXAGON -->
                <div class="hexagon-50-56"></div>
                <!-- /HEXAGON -->
              </div>
              <!-- /USER AVATAR BORDER -->

              <!-- USER AVATAR CONTENT -->
              <div class="user-avatar-content">
                <!-- HEXAGON -->
                <img
                  class="hexagon-image-30-32 custom-image-list"
                  src="${pic}"
                ></img>
                <!-- /HEXAGON -->
              </div>
              <!-- /USER AVATAR CONTENT -->

              <!-- USER AVATAR PROGRESS -->
              <div class="user-avatar-progress">
                <!-- HEXAGON -->
                <div class="hexagon-progress-40-44"></div>
                <!-- /HEXAGON -->
              </div>
              <!-- /USER AVATAR PROGRESS -->

              <!-- USER AVATAR PROGRESS BORDER -->
              <div class="user-avatar-progress-border">
                <!-- HEXAGON -->
                <div class="hexagon-border-40-44"></div>
                <!-- /HEXAGON -->
              </div>
              <!-- /USER AVATAR PROGRESS BORDER -->

              <!-- USER AVATAR BADGE -->
              <div class="user-avatar-badge">
                <!-- USER AVATAR BADGE BORDER -->
                <div class="user-avatar-badge-border">
                  <!-- HEXAGON -->
                  <div class="hexagon-22-24"></div>
                  <!-- /HEXAGON -->
                </div>
                <!-- /USER AVATAR BADGE BORDER -->

                <!-- USER AVATAR BADGE CONTENT -->
                <div class="user-avatar-badge-content">
                  <!-- HEXAGON -->
                  <div class="hexagon-dark-16-18"></div>
                  <!-- /HEXAGON -->
                </div>
                <!-- /USER AVATAR BADGE CONTENT -->

              </div>
              <!-- /USER AVATAR BADGE -->
            </a>
            <!-- /USER SHORT DESCRIPTION AVATAR -->

            <!-- USER SHORT DESCRIPTION TITLE -->
            <p class="user-short-description-title">
              <a href="othersprofile?id=${id}">${name}</a>
            </p>
            <!-- /USER SHORT DESCRIPTION TITLE -->

            <!-- USER SHORT DESCRIPTION TEXT -->
            <p class="user-short-description-text">
              ${description}
            </p>
            <!-- /USER SHORT DESCRIPTION TEXT -->

            <!-- USER SHORT DESCRIPTION TEXT -->
            <p class="user-short-description-text">
              ${country}
            </p>
            <!-- /USER SHORT DESCRIPTION TEXT -->
          </div>
          <!-- /USER SHORT DESCRIPTION -->

          <!-- USER PREVIEW STATS ROSTER -->
          <div
            id="user-preview-stats-roster-01"
            class="user-preview-stats-roster slider-roster"
          >
            <!-- SLIDER ROSTER ITEM -->
            <div class="slider-roster-item"></div>
            <!-- /SLIDER ROSTER ITEM -->

            <!-- SLIDER ROSTER ITEM -->
            <div class="slider-roster-item"></div>
            <!-- /SLIDER ROSTER ITEM -->
          </div>
          <!-- /USER PREVIEW STATS ROSTER -->

          <!-- SOCIAL LINKS -->
          <div class="social-links small">
            <!-- SOCIAL LINK -->
            <a class="social-link small twitter" href="#">
              <!-- SOCIAL LINK ICON -->
              <svg class="social-link-icon icon-twitter">
                <use xlink:href="#svg-twitter"></use>
              </svg>
              <!-- /SOCIAL LINK ICON -->
            </a>
            <!-- /SOCIAL LINK -->

            <!-- SOCIAL LINK -->
            <a class="social-link small instagram" href="#">
              <!-- SOCIAL LINK ICON -->
              <svg class="social-link-icon icon-instagram">
                <use xlink:href="#svg-instagram"></use>
              </svg>
              <!-- /SOCIAL LINK ICON -->
            </a>
            <!-- /SOCIAL LINK -->

            <!-- SOCIAL LINK -->
            <a class="social-link small facebook" href="#">
              <!-- SOCIAL LINK ICON -->
              <svg class="social-link-icon icon-facebook">
                <use xlink:href="#svg-facebook"></use>
              </svg>
              <!-- /SOCIAL LINK ICON -->
            </a>
            <!-- /SOCIAL LINK -->
          </div>
          <!-- /SOCIAL LINKS -->

          <!-- USER PREVIEW ACTIONS -->
          <div class="user-preview-actions">
            <!-- BUTTON -->
            <!-- BUTTON STATUS CAN BE send/cancel -->
            <button class="button secondary card-btn" data-id="${id}" style="width:80px;" 
            ${username && `data-username="${username}"`}
            data-button-status="send" >${buttonText}</button>
            <!-- /BUTTON -->
          ${
            cancelText &&
            `
        <!-- CANCEL/DECLINE ACTION -->
          <!-- BUTTON -->
          <!-- BUTTON STATUS CAN BE send/cancel -->
          <button class="button primary cancel-btn" data-id="${id}"
          data-button-status="send" >${cancelText}</button>
          <!-- /BUTTON -->
        <!-- /CANCEL/DECLINE ACTION -->
        `
          }
          </div>
          <!-- /USER PREVIEW ACTIONS -->
        </div>
        <!-- /USER PREVIEW INFO -->
      </div>
      <!-- /USER PREVIEW -->
      `
  );
};

// Social link UI
const socialLink = (account) => {
  const link = account.value;
  const accountType = account.accountType;
  return `
      <div class="profile-header-social-link">
        <!-- SOCIAL LINK -->
        <a class="social-link ${accountType}" href="${link}" target="_blank" >
          <!-- ICON -->
          <svg class="icon-${accountType}">
            <use xlink:href="#svg-${accountType}" ></use>
          </svg>
          <!-- /ICON -->
        </a>
        <!-- /SOCIAL LINK -->
      </div>  
  `;
};

// Education form UI
const educationForm = (id) => {
  const year = moment().format("YYYY");
  return `
  <!-- FORM -->
  <form class="education-form" id="education-${id}" >
      <input type="hidden" name="id" value="${id}" />
      <!-- FORM ROW -->
      <div class="form-row split">
          <!-- FORM ITEM -->
          <div class="form-item">
          <!-- FORM INPUT -->
          <div class="form-input small active">
              <label for="profile-job-${id}-title">Title or Place</label>
              <input type="text" id="profile-job-${id}-title" name="educationType" value="">
          </div>
          <!-- /FORM INPUT -->
          </div>
          <!-- /FORM ITEM -->

          <!-- FORM ROW -->
          <div class="form-row split">
          <!-- FORM ITEM -->
          <div class="form-item">
              <!-- FORM SELECT -->
              <div class="form-select">
              <label for="profile-job-${id}-year-started">Year Started</label>
              <select id="profile-job-${id}-year-started" name="started">
                  ${Array(year - 1969)
                    .fill()
                    .map(
                      (_, i) =>
                        `<option value="${1969 + i}">${1970 + i}</option>`
                    )}                  
              </select>
              <!-- FORM SELECT ICON -->
              <svg class="form-select-icon icon-small-arrow">
                  <use xlink:href="#svg-small-arrow"></use>
              </svg>
              <!-- /FORM SELECT ICON -->
              </div>
              <!-- /FORM SELECT -->
          </div>
          <!-- /FORM ITEM -->

          <!-- FORM ITEM -->
          <div class="form-item">
              <!-- FORM SELECT -->
              <div class="form-select">
              <label for="profile-job-${id}-year-ended">Year Ended</label>
              <select id="profile-job-${id}-year-ended" name="ended">
              ${Array(year - 1969)
                .fill()
                .map(
                  (_, i) => `<option value="${1969 + i}">${1970 + i}</option>`
                )}
              </select>
              <!-- FORM SELECT ICON -->
              <svg class="form-select-icon icon-small-arrow">
                  <use xlink:href="#svg-small-arrow"></use>
              </svg>
              <!-- /FORM SELECT ICON -->
              </div>
              <!-- /FORM SELECT -->
          </div>
          <!-- /FORM ITEM -->
          </div>
          <!-- /FORM ROW -->
      </div>
      <!-- /FORM ROW -->
      <!-- FORM ROW -->
      <div class="form-row">
          <!-- FORM ITEM -->
          <div class="form-item">
          <!-- FORM INPUT -->
          <div class="form-input small mid-textarea active">
              <label for="profile-job-${id}-description">Description</label>
              <textarea id="profile-job-${id}-description" name="description"></textarea>
          </div>
          <!-- /FORM INPUT -->
          </div>
          <!-- /FORM ITEM -->
      </div>
      <!-- /FORM ROW -->
  </form>
  <hr />
  `;
};

// Education item UI
const educationItem = (education) => {
  const { educationType, started, ended, description } = education;
  return `
  <!-- TIMELINE INFORMATION -->
  <div class="timeline-information">
    <!-- TIMELINE INFORMATION TITLE -->
    <p class="timeline-information-title">${educationType}</p>
    <!-- /TIMELINE INFORMATION TITLE -->

    <!-- TIMELINE INFORMATION DATE -->
    <p class="timeline-information-date">${started} - ${ended}</p>
    <!-- /TIMELINE INFORMATION DATE -->

    <!-- TIMELINE INFORMATION TEXT -->
    <p class="timeline-information-text">${description}</p>
    <!-- /TIMELINE INFORMATION TEXT -->
  </div>
  <!-- /TIMELINE INFORMATION -->  
  `;
};

// Pager Item UI
const pagerUI = (pageNumber) => {
  pageNumber = pageNumber > 9 || `0${pageNumber}`;
  return `
  <!-- SECTION PAGER ITEM -->
    <div class="section-pager-item active">
      <!-- SECTION PAGER ITEM TEXT -->
      <p class="section-pager-item-text page">${pageNumber}</p>
      <!-- /SECTION PAGER ITEM TEXT -->
    </div>
  <!-- /SECTION PAGER ITEM -->
  `;
};

// Profile header (connect/remove connection) UI
const profileHeaderAction = (message, type = "connect") => {
  return `
    <!-- PROFILE HEADER INFO ACTION -->
    <a class="profile-header-info-action button secondary" id="${type}" href="#" >
    ${message}
    </a>
    <!-- /PROFILE HEADER INFO ACTION -->  `;
};

// Loader UI
const loader = () => {
  return `
  <!-- LOADER BARS -->
  <div class="loader-bars">
    <div class="loader-bar"></div>
    <div class="loader-bar"></div>
    <div class="loader-bar"></div>
    <div class="loader-bar"></div>
    <div class="loader-bar"></div>
    <div class="loader-bar"></div>
    <div class="loader-bar"></div>
    <div class="loader-bar"></div>
  </div>
  <!-- /LOADER BARS --> 
  `;
};

const showUsersToConnect = (users) => {
  const userGrid = $("#user-grid");
  for (let user of users) {
    card = userCard(user);
    userGrid.append(card);
  }
  // CONNECT TO USER
  $(".card-btn").on("click", function () {
    const friendId = $(this).attr("data-id");
    checkLoginStatus().then((isLoggedIn) => {
      if (!isLoggedIn) document.location.href = "login";
      else if ($(this).attr("data-button-status") === "send") {
        // send connection request
        $(this).text("Sending...");
        sendRequest(friendId)
          .then((data) => {
            if (data.id) {
              $(this).text("Cancel");
              $(this).attr("data-button-status", "cancel");
              $(this).removeClass("secondary");
              $(this).addClass("primary");
            } else if ("code" in data && data.code === 412) {
              window.location.href =
                "profile-edit?warning=Please complete your profile first";
            } else {
              alert("Error while sending request");
            }
          })
          .catch((err) => {
            console.log(": -----------------------------");
            console.log("showUsersToConnect -> err", err);
            console.log(": -----------------------------");
          });
      } else {
        // Cancel Request
        $(this).text("Canceling...");
        cancelRequest(friendId).then((data) => {
          if (data.affectedRows > 0) {
            $(this).text("Connect");
            $(this).attr("data-button-status", "send");
            $(this).removeClass("primary");
            $(this).addClass("secondary");
          }
        });
      }
    });
  });
  // \ CONNECT TO USER
};

// My connects
const showConnections = (users, isSmall = false, isList = false) => {
  let gridName = "connection-grid";
  if (isSmall) gridName = "connection-grid-small";
  else if (isList) gridName = "connection-grid-list";
  const connectionGrid = $(`#${gridName}`);

  // Remove all childs
  $(connectionGrid).children().remove();

  for (let user of users) {
    const modifiedUser = {
      id: user.uid,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
      country: user.country,
    };
    card = null;
    if (isSmall) card = userCardSmall(modifiedUser, "View Profile");
    else if (isList) card = userCardList(modifiedUser, "View Profile");
    else card = userCard(modifiedUser, "View Profile", "Unfollow");
    connectionGrid.append(card);
  }
  // SHOW PROFILE
  $(".card-btn").on("click", function () {
    const id = $(this).attr("data-id");
    const username = $(this).attr("data-username");
    document.location.href = `othersprofile?user=${username}&id=${id}`;
  });
  // SHOW PROFILE

  // FOLLOW OR UNFLLOW
  $(".cancel-btn").on("click", function () {
    const friendId = $(this).attr("data-id");
    if ($(this).attr("data-button-status") === "send") {
      // Unfollow this user
      unfollowUser(friendId).then((data) => {
        // If not authorized then login else fetch
        if (data && data.status === ERRORS.AUTH_ERROR) {
          redirectTo("login");
        } else if (data.userId) {
          $(this).text("Connect");
          $(this).attr("data-button-status", "cancel");
          $(this).removeClass("primary");
          $(this).addClass("secondary");
        } else {
          alert("Error while unfollowing user");
        }
      });
    }
  });
  // \FOLLOW OR UNFLLOW
};

// Other's connects
const showOthersConnections = (users, isSmall = false, isList = false) => {
  let gridName = "connection-grid";
  if (isSmall) gridName = "connection-grid-small";
  else if (isList) gridName = "connection-grid-list";
  const connectionGrid = $(`#${gridName}`);

  // Remove all childs
  $(connectionGrid).children().remove();

  for (let user of users) {
    const modifiedUser = {
      id: user.uid,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
    };
    card = null;
    if (isSmall) card = userCardSmall(modifiedUser, "View Profile");
    else if (isList) card = userCardList(modifiedUser, "View Profile");
    else card = userCard(modifiedUser, "View Profile");
    connectionGrid.append(card);
  }
  // SHOW PROFILE
  $(".card-btn").on("click", function () {
    const id = $(this).attr("data-id");
    const username = $(this).attr("data-username");
    document.location.href = `othersprofile?user=${username}&id=${id}`;
  });
  // SHOW PROFILE
};

// Show connection requests
const showRequests = (users) => {
  const requestGrid = $("#request-grid");
  for (let user of users) {
    card = userCard(user, "Accept Request", "Decline Request");
    requestGrid.append(card);
  }

  // ACCEPT REQUEST
  $("#request-grid").on("click", "button.card-btn", function () {
    const friendId = $(this).attr("data-id");

    acceptRequest(friendId).then((data) => {
      // If not authorized then login else fetch
      if (data && data.status === ERRORS.AUTH_ERROR) {
        redirectTo("login");
      } else {
        alert("Request accepted");
        $(`#${friendId}`).remove();
      }
    });
  });
  // \ACCEPT REQUEST

  // CANCEL REQUEST
  $(".cancel-btn").on("click", function () {
    const friendId = $(this).attr("data-id");

    declineRequest(friendId).then((data) => {
      // If not authorized then login else fetch
      if (data && data.status === ERRORS.AUTH_ERROR) {
        redirectTo("login");
      } else {
        alert("Request declined");
        $(`#${friendId}`).remove();
      }
    });
  });
  // \CANCEL REQUEST
};

// Show sent requests
const showSentRequests = (users) => {
  const requestGrid = $("#request-grid");

  for (let user of users) {
    card = userCard(user, "Cancel Request");
    requestGrid.append(card);
  }

  // CANCEL REQUEST
  $("#request-grid").on("click", "button.card-btn", function () {
    const friendId = $(this).attr("data-id");
    cancelRequest(friendId).then((data) => {
      if (data && data.status === ERRORS.AUTH_ERROR) {
        redirectTo("login");
      } else if (data.affectedRows > 0) {
        $(`#${friendId}`).remove();
        $(this).text("Connect");
        $(this).attr("data-button-status", "send");
        $(this).removeClass("primary");
        $(this).addClass("secondary");
      }
    });
  });
  // \CANCEL REQUEST
};

// Connection list item UI
const connectionListItem = ({ id, avatar, name, description }) => {
  avatar = avatar ? getFullUrl(avatar) : "/img/custom/nouser.png";
  return `
  <!-- DROPDOWN BOX LIST ITEM -->
  <div class="dropdown-box-list-item" id="connection__item--${id}">
    <!-- USER STATUS -->
    <div class="user-status request">
      <!-- USER STATUS AVATAR -->
      <a class="user-status-avatar" href="othersprofile?id=${id}">
        <!-- USER AVATAR -->
        <div class="user-avatar small no-outline">
          <!-- USER AVATAR CONTENT -->
          <div class="user-avatar-content">
            <!-- HEXAGON -->
            <div
              class="hexagon-image-30-32 .profile-image"
              data-src=""
            >
              <img
                class="profile-pic"
                src="${avatar}"
                alt="profile picture"
              />
            </div>
            <!-- /HEXAGON -->
          </div>
          <!-- /USER AVATAR CONTENT -->

          <!-- USER AVATAR PROGRESS -->
          <div class="user-avatar-progress">
            <!-- HEXAGON -->
            <div class="hexagon-progress-40-44"></div>
            <!-- /HEXAGON -->
          </div>
          <!-- /USER AVATAR PROGRESS -->

          <!-- USER AVATAR PROGRESS BORDER -->
          <div class="user-avatar-progress-border">
            <!-- HEXAGON -->
            <div class="hexagon-border-40-44"></div>
            <!-- /HEXAGON -->
          </div>
          <!-- /USER AVATAR PROGRESS BORDER -->

          <!-- USER AVATAR BADGE -->
          <div class="user-avatar-badge">
            <!-- USER AVATAR BADGE BORDER -->
            <div class="user-avatar-badge-border">
              <!-- HEXAGON -->
              <div class="hexagon-22-24"></div>
              <!-- /HEXAGON -->
            </div>
            <!-- /USER AVATAR BADGE BORDER -->

            <!-- USER AVATAR BADGE CONTENT -->
            <div class="user-avatar-badge-content">
              <!-- HEXAGON -->
              <div class="hexagon-dark-16-18"></div>
              <!-- /HEXAGON -->
            </div>
            <!-- /USER AVATAR BADGE CONTENT -->

            <!-- USER AVATAR BADGE TEXT -->
            <p class="user-avatar-badge-text">14</p>
            <!-- /USER AVATAR BADGE TEXT -->
          </div>
          <!-- /USER AVATAR BADGE -->
        </div>
        <!-- /USER AVATAR -->
      </a>
      <!-- /USER STATUS AVATAR -->

      <!-- USER STATUS TITLE -->
      <p class="user-status-title">
        <a class="bold" href="othersprofile?id=${id}"
          >${name}</a
        >
      </p>
      <!-- /USER STATUS TITLE -->

      <!-- USER STATUS TEXT -->
      <p class="user-status-text">${description}</p>
      <!-- /USER STATUS TEXT -->

      <!-- ACTION REQUEST LIST -->
      <div class="action-request-list">
        <!-- ACTION REQUEST -->
        <div class="action-request accept" data-id="${id}" >
          <!-- ACTION REQUEST ICON -->
          <svg class="action-request-icon icon-add-friend">
            <use xlink:href="#svg-add-friend"></use>
          </svg>
          <!-- /ACTION REQUEST ICON -->
        </div>
        <!-- /ACTION REQUEST -->

        <!-- ACTION REQUEST -->
        <div class="action-request decline" data-id="${id}">
          <!-- ACTION REQUEST ICON -->
          <svg class="action-request-icon icon-remove-friend">
            <use xlink:href="#svg-remove-friend"></use>
          </svg>
          <!-- /ACTION REQUEST ICON -->
        </div>
        <!-- /ACTION REQUEST -->
      </div>
      <!-- ACTION REQUEST LIST -->
    </div>
    <!-- /USER STATUS -->
  </div>
  <!-- /DROPDOWN BOX LIST ITEM -->
  `;
};

// Show connection requests ON HEADER
const showRequestsHeader = (users) => {
  const requestGrid = $(".simplebar-content");
  requestGrid.children().remove();
  for (let user of users) {
    card = connectionListItem({
      id: user.id,
      avatar: user.avatar,
      name: user.name,
      description: user.description,
    });
    requestGrid.append(card);
  }

  // ACCEPT REQUEST
  $(".accept").on("click", function () {
    const friendId = $(this).attr("data-id");

    acceptRequest(friendId).then((data) => {
      // If not authorized then login else fetch
      if (data && data.status === ERRORS.AUTH_ERROR) {
        redirectTo("login");
      } else {
        alert("Request accepted");
        document.getElementById(`connection__item--${friendId}`).remove();
      }
    });
  });
  // \ACCEPT REQUEST

  // CANCEL REQUEST
  $(".decline").on("click", function () {
    const friendId = $(this).attr("data-id");

    declineRequest(friendId).then((data) => {
      // If not authorized then login else fetch
      if (data && data.status === ERRORS.AUTH_ERROR) {
        redirectTo("login");
      } else {
        alert("Request declined");
        document.getElementById(`connection__item--${friendId}`).remove();
      }
    });
  });
  // \CANCEL REQUEST
};

// Connection requests on header
$("#friend-request").click(function (e) {
  if ($(this).hasClass("active")) {
    // Fetch requests here
    const contentGrid = $(".simplebar-content");
    contentGrid.append(loader());
    fetchRequests().then((users) => {
      if (users?.length) showRequestsHeader(users);
      else {
        $(".simplebar-content #norequest").remove();
        contentGrid.append("<p id='norequest'>No requests available.</p>");
      }
      $(".simplebar-content .loader-bars").remove();
    });
  } else {
    $(".simplebar-content #norequest").remove();
    $(".simplebar-content .loader-bars").remove();
  }
});

// Show social accounts
const showSocialAccounts = (socialAccounts) => {
  const grid = $("#profile-header-social-links-slider");
  for (let account of socialAccounts) {
    const link = socialLink(account);
    grid.append(link);
  }
};

const toast = (obj, message, duration = 1000) => {
  obj.text(message);
  obj.fadeIn();
  setTimeout(() => {
    obj.fadeOut();
  }, duration);
};

// * =====================================\ DOM MANIPULATION==========================
// * =====================================\ DOM MANIPULATION==========================
