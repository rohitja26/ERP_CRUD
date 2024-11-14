const jwt = require('jsonwebtoken');

function auth(role) {
     return (req, res, next) => {
          const token = req.header('x-auth-token');
          if (!token) return res.status(401).send('Access Denied. No token provided.');

          try {
               const decoded = jwt.verify(token, process.env.JWT_SECRET);
               req.user = decoded;

               if (role && req.user.role !== role) return res.status(403).send('Forbidden.');
               next();
          } catch (ex) {
               res.status(400).send('Invalid token.');
          }
     };
}

module.exports = auth;
