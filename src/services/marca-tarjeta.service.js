import { getMarcasTarjetas } from "../database/marca-tarjeta.database.js";

export const getMarcasTarjetasService = async (db) => {
  let result = [{ id: 0, descripcion: "" }];
  try {
    const marcasTarjetas = await getMarcasTarjetas(db);
    if (marcasTarjetas) {
      for (let i = 0; i < marcasTarjetas.length; i++) {
        result.push({
          id: marcasTarjetas[i]["ID"],
          descripcion: marcasTarjetas[i]["DESCRIPCION"],
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};

export default { getMarcasTarjetasService };
