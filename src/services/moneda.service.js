import { getMonedas } from "../database/moneda.database.js";

export const getMonedasService = async (db) => {
  let result = [];
  try {
    const monedas = await getMonedas(db);
    for (let i = 0; i < monedas.length; i++) {
      result.push(`${monedas[i]["COD_MONEDA"]}`);
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};

export default { getMonedasService };
