const authorizeRole = (allowedRoles) => (req, res, next) => {
    const { user_type } = req.user; // Assumes authenticateToken adds `req.user`
    if (!allowedRoles.includes(user_type)) {
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
  
  module.exports = authorizeRole;
  