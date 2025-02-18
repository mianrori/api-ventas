import { validateData } from "../helpers/validate-data.js";
import {
  getTransaccionByiD,
  insertTransaccion,
  updateEstadoTransaccion,
} from "../database/transaccion.database.js";
import { solCuponService } from "./sol-cupon.service.js";
import { generaDocumentoAlternativoService } from "./genera-documento-alternativo.service.js";

export const insertTransaccionService = (
  req,
  idUser,
  idCliente,
  idLocal,
  data
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const errors = await validateData(
        req.db,
        req.monedas,
        req.tiposFormasCobros,
        req.marcasTarjetas,
        req.entidades,
        data
      );
      if (errors.length > 0) {
        reject(errors);
      } else {
        const idTransaccion = await insertTransaccion(req.db, idUser, data);
        if (
          idTransaccion &&
          data.idTipoComprobante === "FAC" &&
          data.idCondicionVenta === "CON"
        ) {
          generaDocumentoAlternativoService(req.db, data.rucCi);
          solCuponService(req.db, idTransaccion, idCliente, idLocal, data);
        }
        resolve(idTransaccion);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const updateEstadoTransaccionService = (
  req,
  id,
  idUsuario,
  idCliente,
  idLocal,
  data
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transaccion = await getTransaccionByiD(req.db, id);
      if (
        transaccion &&
        transaccion["ID_TIPO_COMPROBANTE"] === "NOC" &&
        data.estado === "PAG"
      ) {
        reject(`Las Notas de Créditos solo pueden recibir el estado ANU.`);
        return;
      }
      if (
        transaccion &&
        transaccion["ID_TIPO_COMPROBANTE"] === "FAC" &&
        transaccion["ID_CONDICION_VENTA"] === "CON" &&
        data.estado === "PAG"
      ) {
        reject(`Solo las Facturas a Crédito admiten el estado PAG.`);
        return;
      }
      if (!["PAG", "ANU"].includes(data.estado)) {
        reject(
          `Los valores admitidos por el atributo estado son: Para Facturas a Crédito PAG o ANU, Facturas al Contado ANU, Notas de Créditos ANU.`
        );
        return;
      }
      const idTransaccion = await updateEstadoTransaccion(
        req.db,
        id,
        data.estado,
        data.fechaEstado,
        idUsuario,
        idCliente,
        idLocal
      );
      resolve(idTransaccion);
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  insertTransaccionService,
  updateEstadoTransaccionService,
};
