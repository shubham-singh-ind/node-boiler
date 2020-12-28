const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/connections", (req, res) => {
  res.render("connections");
});
router.get("/myprofile", (req, res) => {
  res.render("myprofile");
});
router.get("/requests", (req, res) => {
  res.render("requests");
});
router.get("/sentrequests", (req, res) => {
  res.render("sentrequests");
});
router.get("/othersprofile", (req, res) => {
  res.render("othersprofile");
});
router.get("/profile-edit", (req, res) => {
  res.render("profile-edit");
});
router.get("/account-setting", (req, res) => {
  res.render("account-setting");
});
router.get("/profile-friends", (req, res) => {
  res.render("profile-friends");
});

module.exports = router;
