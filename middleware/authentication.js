function authMiddleware(req, res, next) {
   
    if (!req.session.phone) {
      return res.redirect(303, '/');
    }
  
    
    next();
  }

  module.exports = authMiddleware