const helpers=require('../lib/helpers'),
User = require('../models/user');

exports.validateExp = async (req, res, next) => {
  var data=helpers.isValid(req.body.expr)
  const userId = req.userData.userId;
  console.log(userId,"44444444");
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }
    user.balanced = user.balanced+1;
    const save = await user.save();
    if (save) {
      console.log(save,"0000");
      if (data) {
        res.send({'Message':"Success",'attempts':save.balanced})
      }else {
        res.send({'Message':"Not Balanced",'Give Data':req.body.expr,'attempts':save.balanced})
      }
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  // res.status(200).json({ message: "Update successful!" });
}

exports.validateExp2 =function(req,res){
  var data=helpers.isValidUsingStack(req.body.expr)
  if (data.top==0){
    res.send({'Message':"Success"})
  } else{
    res.send({'Message':"Not Balanced",'Give Data':req.body.expr,"Missing":data.dataStore})
  }
}
