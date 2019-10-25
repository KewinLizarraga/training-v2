const passport = require('passport');
const authJWT = require('passport-jwt');

const jwtOptions = {
    secretOrKey: 'SECRET_KEY',
    jwtFromRequest: authJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
}

let jwtStrategy = new authJWT.Strategy({ ...jwtOptions }, (jwtPayload, next) => {
    console.log(jwtPayload);
    next(null, {
        id: jwtPayload.id
    });
});

passport.use(jwtStrategy);

const auth = passport.authenticate('jwt', { session: false });

module.exports = auth;