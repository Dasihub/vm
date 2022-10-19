const send = (
  res,
  data = false,
  message = "OK",
  error = false,
  statusCode = 200,
  token,
  type
) => {
  return res.status(statusCode).json({ data, message, error, token, type });
};

module.exports = send;
