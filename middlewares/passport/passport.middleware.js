const passport = require("passport");
const Users = require("../../users");
const LocalStrategy = require("passport-local").Strategy;
const { createHash, isValidePassword } = require("../../utils/utils");

//** Mongo usuarios */
const { connectDB } = require("../../DB/mongoDB/connection");
const mongoose = require('mongoose');

connectDB()

const schema = {
  username: {
    type: String,
    required: true,
    trim: true,
    max: 50
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true
  }
}

let modelSchema = new mongoose.Schema(schema,
  { timestamps: true }
)

usersCollection = mongoose.model("users", modelSchema)


passport.use(
  "login",
  new LocalStrategy(  { passReqToCallback: true },(req, username, password, done) => {
    usersCollection.find({username: username}, async function (err, [user]) {
        if (err) {
          done(err)
        } else {
        if (!user) {
          console.log(`No existe el usuario ${username}`);
          return done(null, false, { message: "User not found", source: "/login" });
          }

          if (!isValidePassword(user, password)) {
            console.log("Password Incorrecto");
            return done(null, false, { message: "Password Incorrecto", source: "/login" });
          }

        return done(null, user);
                }})        })
);

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {

      usersCollection.exists({ username: username }, async function (err, result) {
        if (err) {
          console.log(err);
          done(err)
        } else {
          if (result) {
            console.log(`El usuario ${username} ya existe`);
            return done(null, false, { message: "User already exists" });
          } else {
            const { email } = req.body
            let newUser = {
              username,
              email,
              password: createHash(password)
            };
            const userMongo = await usersCollection.create(newUser)

            return done(null, userMongo)
          }
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   let user = Users.find((user) => user.id === id);

//   done(null, user);
// });

passport.deserializeUser((id, done) => {
  usersCollection.findById(id, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        done(null, docs);
    }
})
});


module.exports = passport;