// adminAuthorization.js
export const adminAuthorization = (req, res, next) => {
  const user = req.user; // Assuming you're using Passport.js for authentication

  if (!user || user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Unauthorized - Admin access required" });
  }

  next();
};
