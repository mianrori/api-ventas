export const getUser = (db, userName, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT *
            FROM iv_usuario_local a
            WHERE a.user_name=:userName
              AND a.password=:password`,
        [userName, password]
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows[0]);
      }
    } catch (error) {
      reject(
        `Error buscando en la tabla iv_usuario_local: ${error.message.replace(
          /['"]+/g,
          ""
        )}`
      );
    }
  });
};

export default {
  getUser,
};
