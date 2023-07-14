export const getMonedas = (db) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT *
              FROM monedas a`
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows);
      }
    } catch (error) {
      reject(
        `Error buscando en la tabla monedas: ${error.message.replace(
          /['"]+/g,
          ""
        )}`
      );
    }
  });
};

export default {
  getMonedas,
};
