// [SECTION] DEPENDENCIES
const jwt = require("jsonwebtoken");
require("dotenv").config();

// [SECTION] JSON WEB TOKENS
// TOKEN CREATION
module.exports.createAccessToken = (user) => {
  const data = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin
  };
  return jwt.sign(data, process.env.JWT_SECRET_KEY, {});
};

// TOKEN VERIFICATION AND DECRYPTION
module.exports.verify = (req, res, next) => {
  console.log("middleWare: verify", req.body);
  let token = req.headers.authorization;
  if (typeof token === "undefined") {
    return res.status(400).send({ auth: "Failed. No Token" });
  } else {
    token = token.slice(7, token.length);

    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decodedToken) {
      if (err) {
        return res.status(403).send({
          auth: "Failed",
          message: err.message
        });
      } else {
        console.log("result from verify method:");
        console.log(decodedToken);
        req.user = decodedToken;
        console.log("middleWare: verify", req.body);
        next();
      }
    });
  }
};

module.exports.verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    console.log("middleWare: verifyAdmin", req.body);
    next();
  } else {
    return res.status(403).send({
      auth: "Failed",
      message: "Action Forbidden"
    });
  }
};

module.exports.errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.status || 500;

  const errorMessage = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: {
      message: errorMessage,

      errorCode: err.code || "SERVER ERROR",
      details: err.details || null
    }
  });
};

module.exports.isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};
