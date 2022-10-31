exports.basicInputCheck = (res, param) => {
  const onlyLettersPattern = /^[A-Za-z0-9]+$/;

  if (typeof(param) === "undefined" ){
      return param
  } else if (typeof(param) === "function" || typeof(param) === "object"){
      return res.status(400).send({
          message: "No special characters please!",
      });
  } else if(!param.match(onlyLettersPattern)){
      return res.status(400).send({
          message: "No special characters please!",
      });
  }
  return param
}
