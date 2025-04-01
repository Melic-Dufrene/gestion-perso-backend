const fs = require('fs')
const logMiddleware = (req,res,next) => {
  fs.appendFile(".requests\\logs.txt",Date().toString()+'\nbase_url: '+ req.originalUrl + '\n' + JSON.stringify(req.body, null, 2) + '\n', (err) => {
    if (err) throw err;
  });
  next();
}


module.exports = logMiddleware;