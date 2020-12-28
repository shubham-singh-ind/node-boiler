// LOGOUT
$(".logoutaction").on("click", function () {
  console.log("Logging out");
  logout().then((data) => {
    redirectTo("login");
  });
});

// \LOGOUT
