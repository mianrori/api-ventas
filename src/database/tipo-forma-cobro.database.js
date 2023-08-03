export const getTiposFormasCobros = (db) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT *
                FROM iv_tipo_forma_cobro a`
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows);
      }
    } catch (error) {
      reject(
        `Error buscando en la tabla iv_tipo_forma_cobro: ${error.message.replace(
          /['"]+/g,
          ""
        )}`
      );
    }
  });
};

export const getTipoFormaCobroById = (db, id) => {
  return new Promise(async (resolve, reject) => {
    console.log(`Consultando ${id}`);
    try {
      const result = await db.execute(
        `SELECT *
                FROM iv_tipo_forma_cobro a
                WHERE a.id=:id`,
        [id]
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows[0]);
      }
    } catch (error) {
      reject(
        `Error buscando en la tabla iv_tipo_forma_cobro: ${error.message.replace(
          /['"]+/g,
          ""
        )}`
      );
    }
  });
};

export default {
  getTiposFormasCobros,
  getTipoFormaCobroById,
};
