const crypto = require("crypto");

function generatePassword() {
  var length = 5,
    charset = "abcdefghijkmnpqrstuvxyzABCDEFGHJKLMNPQRSTUVXYZ23456789",
    value = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    value += charset.charAt(Math.floor(Math.random() * n));
  }
  return { crypto: md5(value), password: value };
}

 

function md5(value) {
  return crypto.createHash("md5").update(value).digest("hex");
}

 function format() {
  var num = arguments[1].length;
  var oStr = arguments[0];
  for (var i = 0; i < num; i++) {
    var pattern = "\\{" + i + "\\}";
    var re = new RegExp(pattern, "g");
    oStr = oStr.replace(re, arguments[1][i]);
  }
  return oStr;
};

module.exports = {
  format,
  md5: (value) => md5(value),
  generatePassword: () => generatePassword(),
 };
