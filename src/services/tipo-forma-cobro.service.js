import { getTiposFormasCobros } from "../database/tipo-forma-cobro.database.js";

export const getTiposFormasCobrosService = async (db) => {
  let result = [];
  try {
    const tiposFormasCobros = await getTiposFormasCobros(db);
    if (tiposFormasCobros) {
      for (let i = 0; i < tiposFormasCobros.length; i++) {
        //result.push(`${tiposFormasCobros[i]["ID"]}`);
        result.push({
          id: tiposFormasCobros[i]["ID"],
          descripcion: tiposFormasCobros[i]["DESCRIPCION"],
          requiereEntidad: tiposFormasCobros[i]["REQUIERE_ENTIDAD"],
          requiereMarca: tiposFormasCobros[i]["REQUIERE_MARCA"],
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};

export default { getTiposFormasCobrosService };
