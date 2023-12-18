const sendToken = (user, statuscode, res) => {
  // creating jwt token
  const token = user.getJwtToken();

  //setting cokies
  const option = {
    expires: new Date(
      Date.now() + process.env.COKIEES_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statuscode).cookie("token", token, option).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
