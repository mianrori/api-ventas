import { getEntidades } from "../database/entidad.database.js";

export const getEntidadesService = async (db) => {
  let result = [];
  try {
    const entidades = await getEntidades(db);
    if (entidades) {
      for (let i = 0; i < entidades.length; i++) {
        result.push(`${entidades[i]["ID"]}`);
      }
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};

export default { getEntidadesService };
