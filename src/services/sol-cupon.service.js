import oracledb from "oracledb";
import { formatNumeroComprobante } from "../helpers/format-numero-comprobante.js";
import { formatFechaComprobante } from "../helpers/format-fecha-comprobante.js";
import { changeProcesadoSsTransaccion } from "../database/transaccion.database.js";

export const solCuponService = (
  db,
  idTransaccion,
  idCliente,
  idLocal,
  data
) => {
  return new Promise(async (resolve) => {
    try {
      const payload = {
        codComprador: data.rucCi,
        codCompradorAlt: data.rucCi,
        idTransaccion,
        facturas: [
          {
            codCliente: idCliente,
            codLocal: idLocal,
            fechaFactura: formatFechaComprobante(data.fechaHora),
            codMoneda: data.idMoneda,
            nroFactura: formatNumeroComprobante(data.nroComprobante),
            montoFactura:
              Math.abs(data.exenta) +
              Math.abs(data.gravada5) +
              Math.abs(data.gravada10),
            generaCupon: true,
            bbva: false,
          },
        ],
      };
      const result = await db.execute(
        `BEGIN
            pro_crud_cupon(:payload,:response);
         END;`,
        {
          payload: {
            dir: oracledb.BIND_IN,
            val: JSON.stringify(payload),
            type: oracledb.STRING,
          },
          response: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        }
      );
      let response = JSON.parse(result.outBinds.response);
      if (response.hasOwnProperty("factura") && response.factura.length === 0) {
        await changeProcesadoSsTransaccion(db, idTransaccion, "S");
      }
      console.log(JSON.stringify(JSON.parse(result.outBinds.response)));
      resolve();
    } catch (error) {
      console.log(`Error ejecutando pro_crud_cupon: ${error}`);
    }
  });
};

export default { solCuponService };
