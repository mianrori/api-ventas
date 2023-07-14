import { getTiposFormasCobros } from "../database/tipo-forma-cobro.database.js";

export const getTiposFormasCobrosService = async (db) => {
  let result = [];
  try {
    const tiposFormasCobros = await getTiposFormasCobros(db);
    if (tiposFormasCobros) {
      for (let i = 0; i < tiposFormasCobros.length; i++) {
        result.push(`${tiposFormasCobros[i]["ID"]}`);
      }
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};

export default { getTiposFormasCobrosService };
