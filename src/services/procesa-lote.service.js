import { validateData } from "../helpers/validate-data.js";
import { insertTransaccion } from "../database/transaccion.database.js";
import { solCuponService } from "./sol-cupon.service.js";
import { generaDocumentoAlternativoService } from "./genera-documento-alternativo.service.js";
import { getTransaccionByTipoComprobanteNumeroComprobanteAndTimbrado } from "../database/transaccion.database.js";

export const procesaLoteService = (req, idUser, idCliente, idLocal, data) => {
  return new Promise(async (resolve, reject) => {
    if (data.length > 50) {
      reject(`Solo se admiten hasta 50 comprobantes para su procesamiento.`);
    }
    let inserts = [];
    let errors = [];
    for (let i = 0; i < data.length; i++) {
      try {
        const error = await validateData(
          req.db,
          req.monedas,
          req.tiposFormasCobros,
          req.marcasTarjetas,
          req.entidades,
          data[i]
        );
        if (error.length > 0) {
          let idTransaccion;
          let existsComprobante =
            await getTransaccionByTipoComprobanteNumeroComprobanteAndTimbrado(
              req.db,
              data[i].idTipoComprobante,
              data[i].nroComprobante,
              data[i].timbrado
            );
          if (existsComprobante) {
            idTransaccion = existsComprobante[0]["ID"];
          }
          errors.push({
            idTransaccion,
            idTipoComprobante: data[i].idTipoComprobante,
            nroComprobante: data[i].nroComprobante,
            timbrado: data[i].timbrado,
            error,
          });
        } else {
          const idTransaccion = await insertTransaccion(
            req.db,
            idUser,
            data[i]
          );
          if (
            idTransaccion &&
            data[i].idTipoComprobante === "FAC" &&
            data[i].idCondicionVenta === "CON"
          ) {
            generaDocumentoAlternativoService(req.db, data[i].rucCi);
            solCuponService(req.db, idTransaccion, idCliente, idLocal, data[i]);
          }
          inserts.push({
            idTransaccion,
            idTipoComprobante: data[i].idTipoComprobante,
            nroComprobante: data[i].nroComprobante,
            timbrado: data[i].timbrado,
          });
        }
      } catch (error) {
        reject(error);
      }
    }
    resolve({ inserts, errors });
  });
};

export default procesaLoteService;
