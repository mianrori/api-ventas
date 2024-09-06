import { getUser } from "../database/user.database.js";

export const authenticate = async (db, userName, password) => {
  const user = await getUser(db, userName, password);
  if (user) {
    return {
      id: user["ID"],
      userName: user["USER_NAME"],
      idCliente: user["COD_CLIENTE"],
      idLocal: user["COD_GRUPO_LOCAL"],
      modoTest: user["MODO_TEST"],
      modoProduccion: user["MODO_PRODUCCION"],
    };
  }
};

export default {
  authenticate,
};
