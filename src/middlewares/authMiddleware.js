import passport from "passport";

export const authenticateMiddleware = passport.authenticate("jwt", {
  session: false,
});
