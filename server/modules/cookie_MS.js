const { md5 } = require("./utils");
require("dotenv").config();
const {
  sql,
  poolPromise,
  getConnected,
  connectWithLogin,
  connectWithCookie,
} = require("./DB_MS");

const COOKIE_NAME = process.env.COOKIE_NAME;
const COOKIE_MOBILE = process.env.COOKIE_MOBILE;
const ID_PROG_ID = process.env.ID_PROG_ID;
const MAX_AGE = process.env.MAX_AGE;

//id
async function Generate(res) {
  const { v4: uuidv4 } = require("uuid");
  const cookieId = uuidv4();
  // const cookieId = require("uuid/v4")();
  res.cookie(COOKIE_NAME, cookieId, { maxAge: MAX_AGE, httpOnly: true });
  return cookieId;
}

//{offline} false
async function Delete(req, res) {
  const cookieId = String(req.cookies[COOKIE_NAME]);
  res.clearCookie(COOKIE_NAME);
  const pool = getConnected()
    ? await poolPromise()
    : await connectWithCookie(cookieId);
  const { recordset } = await pool
    .input("Cookie", sql.VarChar(50), cookieId)
    // .input("Cookie", sql.VarChar(50), md5(cookieId))
    .input("AVN_Prog", sql.VarChar(32), ID_PROG_ID)
    .execute("SP_AVN_Cookie_Delete");
  return !!recordset[0].offline;
}

//{ online: 1, id_avn_user: 1886, id_user: 620, id_role: 1} false
async function GetUser(req) {
  if (
    process.env.NODE_ENV === "development" &&
    process.env.FAKE_MODE === "true"
  ) {
    const connection = getConnected();
    if (!connection)
      await connectWithLogin(
        process.env.FAKE_LOGIN,
        md5(process.env.FAKE_PASSWORD)
      );

    return {
      online: 1,
      id_avn_user: process.env.FAKE_ID_AVN_USER,
      id_user: process.env.FAKE_ID_USER,
      id_role: process.env.FAKE_ID_ROLE,
    };
  }

  const cookieRaw = String(req.cookies[COOKIE_NAME]);
  if (cookieRaw == "undefined") {
    return false;
  }
  const cookieId = md5(cookieRaw);
  const pool = getConnected()
    ? await poolPromise()
    : await connectWithCookie(cookieId);

  if (pool && pool.parent.connected) {
    const { recordset } = await pool
      .input("Cookie", sql.VarChar(50), cookieId)
      .input("AVN_Prog", sql.VarChar(32), ID_PROG_ID)
      .execute("SP_AVN_Cookie_Check");
    if (recordset && recordset.length) {
      return { ...recordset[0] };
    }
  }
  return false;
}

//true false
async function Check(req, res) {
  const user = await GetUser(req);
  if (user && user.online) {
    return true;
  }
  res.clearCookie(COOKIE_NAME);
  return false;
}

//true false
async function Login(req, res, role, avn_user, user) {
  const isMobile = String(req.cookies[COOKIE_MOBILE]) == "true" ? 1 : 0;
  const cookieId = md5(await Generate(res));
  // const ip = req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"].split(",").shift() : req.ip;

  const pool = await poolPromise();

  const { recordset } = await pool
    .input("id_avn_user", sql.Int, avn_user)
    .input("id_user", sql.Int, user)
    .input("id_role", sql.Int, role)
    .input("is_mobile", sql.Bit, isMobile)
    .input("Cookie", sql.VarChar(50), cookieId)
    .input("AVN_Prog", sql.VarChar(32), ID_PROG_ID)
    .execute("SP_AVN_Cookie_Generate");

  if (recordset && recordset.length) {
    return !!recordset[0].id_role;
  }

  return false;
}

module.exports.LOGIN = Login;
module.exports.LOGOUT = Delete;
module.exports.CHECK_PERM = Check;
module.exports.GET_USER = GetUser;
module.exports.COOKIE_NAME = COOKIE_NAME;
