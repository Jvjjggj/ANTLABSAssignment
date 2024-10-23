// /middleware/role.js

const role = (allowedRoles) => (req, res, next) => {
  // Check if user is authenticated
  if (!req.user) {
      return res.status(401).json({ msg: 'User not authenticated' });
  }

  // Check if user's role is included in the allowed roles
  if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
          msg: 'Access denied',
          requiredRoles: allowedRoles // Provide details about the required roles
      });
  }

  next(); // Proceed to the next middleware or route handler
};

module.exports = role;
