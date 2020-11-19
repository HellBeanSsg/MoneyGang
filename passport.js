const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done){
    done(null, user);
});
passport.deserializeUser(function (user,done){
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: "206397666261-1imo82taq51ro9vg8mhv3mbnlua4turo.apps.googleusercontent.com",
        clientSecret: "NbFNWV-rBa0jH1G8RYXDMkJ4",
        callbackURL: "http://localhost:8080/login/google/callback"
    },
    function (accessToken, refreshToken, profile, done){
        // use the profile info to check
        // if the user is registered in my DB.
        /*
        User.findorCreat({googleId: profile.id},
        function (err, user){
            return done(err, user);
        });
        */
        return done(null, profile);
    }
));