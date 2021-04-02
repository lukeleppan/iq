require("dotenv").config();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf-8");
const {
  URL,
  GMAIL_USER,
  GMAIL_PASS,
  OAUTH_CLIENTID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN,
} = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: GMAIL_USER,
    pass: GMAIL_PASS,
    clientId: OAUTH_CLIENTID,
    clientSecret: OAUTH_CLIENT_SECRET,
    refreshToken: OAUTH_REFRESH_TOKEN,
  },
});

/**
 * @param {*} token - verify token
 * @param {*} username - username
 */
function sendVerifyEmail(token, username) {
  const verifyLink = URL + "/api/users/confirm/" + token;
  const cancelLink = URL + "/api/users/cancel/" + token;
  return transporter.sendMail(
    {
      from: "tmctutors@gmail.com",
      to: `${username}@thomasmore.co.za`,
      subject: "Verify Email - iKhwezi Quiz",
      html: `<h3>Verify Email - iKhwezi Quiz</h3>\
        <p>If you didn't register please click on the cancel link.</p>\
        <p>Click to verify: <a href="${verifyLink}">Verify</a></p>\
        <p>Click to cancel: <a href="${cancelLink}">Cancel</a></p>`,
    },
    (err, info) => {
      if (err) {
        console.error("{Email Error}:", err);
        return { err, info };
      } else {
        console.log("{Email Accepted}:", info.accepted);
        return { err, info };
      }
    }
  );
}

/**
 * @param {*} password - plain text password
 * @param {*} hash - hash stored in db
 * @param {*} salt - salt stored in db
 */
function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

/**
 * @param {*} password - password string entered by user during registration
 */
function genPassword(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

/**
 * @param {*} user - user object
 */
function issueJWT(user) {
  const username = user.username;
  const displayname = user.displayname;
  const admin = user.admin;
  const house = user.house;

  const expiresIn = "7d";

  const payload = {
    sub: username,
    name: displayname,
    admin: admin,
    house: house,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

/**
 * @param {*} user - user object
 */
function issueVerifyJWT(user) {
  const username = user.username;

  const expiresIn = "1d";
  const payload = {
    sub: username,
    forVer: true,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: signedToken,
    expires: expiresIn,
  };
}

/**
 * @param {*} activeDate - problem active date
 * @param {*} diff - problem difficulty
 */
function calcScore(activeDate, diff) {
  const easyA = -(1 / 949320);
  const moderateA = -(1 / 379728);
  const hardA = -(1 / 189864);
  const extremeA = -(1 / 94932);

  const activeDateMoment = moment(activeDate);
  const minutesSince = moment
    .duration(moment().diff(activeDateMoment))
    .asMinutes();

  if (minutesSince > 4320) {
    switch (diff) {
      case 0:
        return 20;

      case 1:
        return 50;

      case 2:
        return 100;

      case 3:
        return 200;
    }
  }

  switch (diff) {
    case 0:
      return Math.round(easyA * (minutesSince + 75) * (minutesSince - 8640));

    case 1:
      return Math.round(
        moderateA * (minutesSince + 75) * (minutesSince - 8640)
      );

    case 2:
      return Math.round(hardA * (minutesSince + 75) * (minutesSince - 8640));

    case 3:
      return Math.round(extremeA * (minutesSince + 75) * (minutesSince - 8640));

    default:
      return 0;
  }
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
module.exports.issueVerifyJWT = issueVerifyJWT;
module.exports.sendVerifyEmail = sendVerifyEmail;
module.exports.calcScore = calcScore;
