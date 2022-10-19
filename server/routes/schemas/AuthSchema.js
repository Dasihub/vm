const loginSchema = {
  type: "object",
  properties: {
    login: { type: "string", required: true },
    password: { type: "string", required: true },
  },
};

module.exports = { loginSchema };
