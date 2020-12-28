fetchCommonData().then((data) => {
  // If not authorized then login else fetch
  let avatar = data.avatar ? getFullUrl(data.avatar) : "img/custom/nouser.png";
  let cover = data.cover ? getFullUrl(data.cover) : "img/custom/nocover.png";
  if (data && data.status === ERRORS.AUTH_ERROR) {
    redirectTo("login");
  } else {
    $("[data-profile-completed]").text(
      Math.round(data.profilePercentage) + "%"
    );
    $(".profile-image img").attr("src", avatar);
    $(".coverImage").attr("src", cover);
    $("[data-user-name]").text(data.name);
    $("[data-connects]").text(data.connectionCount);
    $("[data-username]").text("@" + data.username);
    $("[data-description]").text(data.description);
    $(".imageViewer__actualImage img")?.attr("src", avatar);
  }
});
