// src/middleware/permissionMiddleware.js
// Example permission-check middleware for Express

module.exports = function(requiredPermission) {
  return (req, res, next) => {
    // Example: req.user.permissions should be set by your auth middleware
    if (!req.user || !req.user.permissions) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    if (!req.user.permissions.includes(requiredPermission)) {
      return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
    }
    next();
  };
};
