const { Sequelize, sequelize, User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUsers = function (req, res) {
  User.findAll({
    attributes: ["id", "name", "email"],
  })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    });
};

exports.Register = function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var confPassword = req.body.confPassword;

  if (password !== confPassword)
    return res.status(400).json({ msg: "Password tidak cocok" });

  bcrypt.genSalt().then(function (salt) {
    bcrypt.hash(password, salt).then(function (hashPassword) {
      User.create({
        name: name,
        email: email,
        password: hashPassword,
      })
        .then(function () {
          res.json({ msg: "Register Berhasil" });
        })
        .catch(function (error) {
          console.log(error);
          res.status(500).json({ msg: "Register Gagal" });
        });
    });
  });
};

exports.Login = function (req, res) {
  User.findAll({
    where: {
      email: req.body.email,
    },
  })
    .then(function (user) {
      if (user.length === 0)
        return res
          .status(400)
          .json({ emailError: "email/username tidak ditemukan" });

      bcrypt
        .compare(req.body.password, user[0].password)
        .then(function (match) {
          if (!match)
            return res.status(400).json({ passwordError: "Password salah" });

          var userId = user[0].id;
          var name = user[0].name;
          var email = user[0].email;

          var accessToken = jwt.sign(
            { userId: userId, name: name, email: email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1m" }
          );
          var refreshToken = jwt.sign(
            { userId: userId, name: name, email: email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
          );

          User.update(
            { refresh_token: refreshToken },
            {
              where: {
                id: userId,
              },
            }
          )
            .then(function () {
              res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
              });
              res.json({ accessToken: accessToken });
            })
            .catch(function (error) {
              console.log(error);
              res.status(500).json({ msg: "Internal Server Error" });
            });
        });
    })
    .catch(function (error) {
      console.log(error);
      res.status(404).json({ emailError: "email/username tidak ditemukan" });
    });
};

exports.Logout = function (req, res) {
  var refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  User.findAll({
    where: {
      refresh_token: refreshToken,
    },
  })
    .then(function (user) {
      if (!user[0]) return res.sendStatus(204);

      var userId = user[0].id;

      User.update(
        { refresh_token: null },
        {
          where: {
            id: userId,
          },
        }
      )
        .then(function () {
          res.clearCookie("refreshToken");
          return res.sendStatus(200);
        })
        .catch(function (error) {
          console.error(error);
          return res.status(500).json({ msg: "Server Error" });
        });
    })
    .catch(function (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server Error" });
    });
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ msg: "No refreshToken found" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          console.error(err);
          return res.status(403).json({ msg: "Token verification failed" });
        }

        const user = await User.findOne({ where: { id: decoded.userId } });
        if (!user) {
          return res.status(403).json({ msg: "User not found" });
        }

        const accessToken = jwt.sign(
          { userId: user.id, name: user.name, email: user.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1m" }
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};
