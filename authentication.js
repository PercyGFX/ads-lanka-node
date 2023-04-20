function authMiddleware(req, res, next) {
   
    if (!req.session.phone) {
      return res.redirect('/login');
    }
  
    
    next();
  }

  module.exports = authMiddleware