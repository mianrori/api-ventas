import { getEntidades } from "../database/entidad.database.js";

export const getEntidadesService = async (db) => {
  let result = [{ id: 0, descripcion: "" }];
  try {
    const entidades = await getEntidades(db);
    if (entidades) {
      for (let i = 0; i < entidades.length; i++) {
        result.push({
          id: entidades[i]["ID"],
          descripcion: entidades[i]["DESCRIPCION"],
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};

export default { getEntidadesService };
