import { getMarcasTarjetas } from "../database/marca-tarjeta.database.js";

export const getMarcasTarjetasService = async (db) => {
  let result = [];
  try {
    const marcasTarjetas = await getMarcasTarjetas(db);
    if (marcasTarjetas) {
      for (let i = 0; i < marcasTarjetas.length; i++) {
        result.push(`${marcasTarjetas[i]["ID"]}`);
      }
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};

export default { getMarcasTarjetasService };
