export const getMarcasTarjetas = (db) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT *
                FROM iv_marca_tarjeta a`
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows);
      }
    } catch (error) {
      reject(
        `Error buscando en la tabla iv_marca_tarjeta: ${error.message.replace(
          /['"]+/g,
          ""
        )}`
      );
    }
  });
};

export default {
  getMarcasTarjetas,
};
