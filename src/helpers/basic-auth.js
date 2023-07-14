import { authenticate } from "../services/user.service.js";

export const basicAuth = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf("Basic ") === -1
  ) {
    return res.status(401).json({
      status: false,
      message: "Falta el encabezado Authorization",
    });
  }
  const base64Credentials = req.headers.authorization.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [userName, password] = credentials.split(":");
  try {
    const user = await authenticate(req.db, userName, password);
    if (!user) {
      return res.status(401).json({
        success: false,
        messages: ["Credenciales de autenticación no válidas"],
      });
    }
    req.user = user;
  } catch (error) {
    console.log(error);
    next(error);
  }

  return next();
};

export default { basicAuth };
