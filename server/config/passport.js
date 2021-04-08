const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../database");
const fs = require("fs");
const path = require("path");

const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

module.exports = async (passport) => {
  await passport.use(
    new JwtStrategy(options, async function (jwt_payload, done) {
      const getUser = await db.query(
        "SELECT COUNT(1) FROM users WHERE username = $1;",
        [jwt_payload.sub]
      );

      const userExists = getUser.rows[0].count > 0;
      if (getUser.error) {
        return done(getUser.error, false);
      }
      if (userExists) {
        return done(null, jwt_payload);
      } else {
        return done(null, false);
      }
    })
  );
};
