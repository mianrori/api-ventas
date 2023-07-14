import oracledb from "oracledb";
import moment from "moment";
import { solCuponService } from "../services/sol-cupon.service.js";

const insertIvTransaccionCabecera = (
  db,
  idTipoComprobante,
  idCondicionVenta,
  nroComprobante,
  rucCi,
  nombre,
  fechaHora,
  timbrado,
  vtoTimbrado,
  idMoneda,
  tipoCambio,
  exenta,
  gravada5,
  gravada10,
  idUsuario
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `INSERT INTO iv_transaccion_cabecera(id,
                                             id_tipo_comprobante,
                                             id_condicion_venta,
                                             nro_comprobante,
                                             ruc_ci,
                                             nombre,
                                             fecha_hora,
                                             timbrado,
                                             vto_timbrado,
                                             id_moneda,
                                             tipo_cambio,
                                             exenta,
                                             gravada_5,
                                             gravada_10,
                                             id_usuario,
                                             fecha_alta) 
                                      VALUES(sq_iv_transaccion_cabecera.nextval,
                                             UPPER(:idTipoComprobante),
                                             UPPER(:idCondicionVenta),
                                             :nroComprobante,
                                             :rucCi,
                                             UPPER(:nombre),
                                             TO_DATE(:fechaHora,'dd/mm/yyyy hh24:mi:ss'),
                                             :timbrado,
                                             TO_DATE(:vtoTimbrado,'dd/mm/yyyy'),
                                             :idMoneda,
                                             ABS(:tipoCambio),
                                             ABS(:exenta),
                                             ABS(:gravada5),
                                             ABS(:gravada10),
                                             :idUsuario,
                                             SYSDATE) 
                                      RETURN id INTO :id`,
        {
          id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
          idTipoComprobante: {
            type: oracledb.STRING,
            val: idTipoComprobante,
            dir: oracledb.BIND_IN,
          },
          idCondicionVenta: {
            type: oracledb.STRING,
            val: idCondicionVenta,
            dir: oracledb.BIND_IN,
          },
          nroComprobante: {
            type: oracledb.STRING,
            val: nroComprobante,
            dir: oracledb.BIND_IN,
          },
          rucCi: {
            type: oracledb.STRING,
            val: rucCi,
            dir: oracledb.BIND_IN,
          },
          nombre: {
            type: oracledb.STRING,
            val: nombre,
            dir: oracledb.BIND_IN,
          },
          fechaHora: {
            type: oracledb.STRING,
            val: fechaHora,
            dir: oracledb.BIND_IN,
          },
          timbrado: {
            type: oracledb.NUMBER,
            val: timbrado,
            dir: oracledb.BIND_IN,
          },
          vtoTimbrado: {
            type: oracledb.STRING,
            val: vtoTimbrado,
            dir: oracledb.BIND_IN,
          },
          idMoneda: {
            type: oracledb.STRING,
            val: idMoneda,
            dir: oracledb.BIND_IN,
          },
          tipoCambio: {
            type: oracledb.NUMBER,
            val: tipoCambio,
            dir: oracledb.BIND_IN,
          },
          exenta: {
            type: oracledb.NUMBER,
            val: exenta,
            dir: oracledb.BIND_IN,
          },
          gravada5: {
            type: oracledb.NUMBER,
            val: gravada5,
            dir: oracledb.BIND_IN,
          },
          gravada10: {
            type: oracledb.NUMBER,
            val: gravada10,
            dir: oracledb.BIND_IN,
          },
          idUsuario: {
            type: oracledb.NUMBER,
            val: idUsuario,
            dir: oracledb.BIND_IN,
          },
        }
      );
      db.commit();
      resolve(parseInt(result.outBinds.id));
    } catch (error) {
      db.rollback();
      reject(
        `[${moment(new Date()).format(
          "DD/MM/YYYY hh:mm:ss.SSSZ"
        )}]: Error insertando en la tabla iv_transaccion_cabecera: ${error.message.replace(
          /['"]+/g,
          ""
        )}`
      );
    }
  });
};

const insertIvTransaccionDetalle = (
  db,
  idArticulo,
  desArticulo,
  idColor,
  desColor,
  idPaisOrigen,
  desPaisOrigen,
  idFamilia,
  desFamilia,
  idSeccion,
  desSeccion,
  idMarca,
  desMarca,
  talle,
  cantidad,
  precioUnitario,
  idCabecera
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `INSERT INTO iv_transaccion_detalle(id,
                                            id_articulo,
                                            des_articulo,
                                            id_color,
                                            des_color,
                                            id_pais_origen,
                                            des_pais_origen,
                                            id_familia,
                                            des_familia,
                                            id_seccion,
                                            des_seccion,
                                            id_marca,
                                            des_marca,
                                            talle,
                                            cantidad,
                                            precio_unitario,
                                            id_cabecera) 
                                      VALUES(sq_iv_transaccion_detalle.nextval,
                                             :idArticulo,
                                             :desArticulo,
                                             :idColor,
                                             :desColor,
                                             :idPaisOrigen,
                                             :desPaisOrigen,
                                             :idFamilia,
                                             :desFamilia,
                                             :idSeccion,
                                             :desSeccion,
                                             :idMarca,
                                             :desMarca,
                                             :talle,
                                             ABS(:cantidad),
                                             ABS(:precioUnitario),
                                             :idCabecera)`,
        {
          idArticulo: {
            type: oracledb.STRING,
            val: idArticulo,
            dir: oracledb.BIND_IN,
          },
          desArticulo: {
            type: oracledb.STRING,
            val: desArticulo,
            dir: oracledb.BIND_IN,
          },
          idColor: {
            type: oracledb.STRING,
            val: idColor,
            dir: oracledb.BIND_IN,
          },
          desColor: {
            type: oracledb.STRING,
            val: desColor,
            dir: oracledb.BIND_IN,
          },
          idPaisOrigen: {
            type: oracledb.STRING,
            val: idPaisOrigen,
            dir: oracledb.BIND_IN,
          },
          desPaisOrigen: {
            type: oracledb.STRING,
            val: desPaisOrigen,
            dir: oracledb.BIND_IN,
          },
          idFamilia: {
            type: oracledb.STRING,
            val: idFamilia,
            dir: oracledb.BIND_IN,
          },
          desFamilia: {
            type: oracledb.STRING,
            val: desFamilia,
            dir: oracledb.BIND_IN,
          },
          idSeccion: {
            type: oracledb.STRING,
            val: idSeccion,
            dir: oracledb.BIND_IN,
          },
          desSeccion: {
            type: oracledb.STRING,
            val: desSeccion,
            dir: oracledb.BIND_IN,
          },
          idMarca: {
            type: oracledb.STRING,
            val: idMarca,
            dir: oracledb.BIND_IN,
          },
          desMarca: {
            type: oracledb.STRING,
            val: desMarca,
            dir: oracledb.BIND_IN,
          },
          talle: {
            type: oracledb.STRING,
            val: talle,
            dir: oracledb.BIND_IN,
          },
          cantidad: {
            type: oracledb.NUMBER,
            val: cantidad,
            dir: oracledb.BIND_IN,
          },
          precioUnitario: {
            type: oracledb.NUMBER,
            val: precioUnitario,
            dir: oracledb.BIND_IN,
          },
          idCabecera: {
            type: oracledb.NUMBER,
            val: idCabecera,
            dir: oracledb.BIND_IN,
          },
        }
      );
      db.commit();
      resolve();
    } catch (error) {
      db.rollback();
      reject(
        `[${moment(new Date()).format(
          "DD/MM/YYYY hh:mm:ss.SSSZ"
        )}]: Error insertando en la tabla iv_transaccion_detalle: ${error.message.replace(
          /['"]+/g,
          ""
        )}`
      );
    }
  });
};

const insertIvFormaCobro = (
  db,
  idTipo,
  idMarcaTarjeta,
  idEntidad,
  idMoneda,
  tipoCambio,
  monto,
  idCabecera
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `INSERT INTO iv_forma_cobro(id,
                                    id_tipo,
                                    id_marca_tarjeta,
                                    id_entidad,
                                    id_moneda,
                                    tipo_cambio,
                                    monto,
                                    id_cabecera)
                             VALUES(sq_iv_forma_cobro.nextval,
                                    :idTipo,
                                    :idMarcaTarjeta,
                                    :idEntidad,
                                    :idMoneda,
                                    ABS(:tipoCambio),
                                    ABS(:monto),
                                    :idCabecera)`,
        {
          idTipo: {
            type: oracledb.NUMBER,
            val: idTipo,
            dir: oracledb.BIND_IN,
          },
          idMarcaTarjeta: {
            type: oracledb.NUMBER,
            val: idMarcaTarjeta,
            dir: oracledb.BIND_IN,
          },
          idEntidad: {
            type: oracledb.NUMBER,
            val: idEntidad,
            dir: oracledb.BIND_IN,
          },
          idMoneda: {
            type: oracledb.STRING,
            val: idMoneda,
            dir: oracledb.BIND_IN,
          },
          tipoCambio: {
            type: oracledb.NUMBER,
            val: tipoCambio,
            dir: oracledb.BIND_IN,
          },
          monto: {
            type: oracledb.NUMBER,
            val: monto,
            dir: oracledb.BIND_IN,
          },
          idCabecera: {
            type: oracledb.NUMBER,
            val: idCabecera,
            dir: oracledb.BIND_IN,
          },
        }
      );
      db.commit();
      resolve();
    } catch (error) {
      db.rollback();
      reject(
        `[${moment(new Date()).format(
          "DD/MM/YYYY hh:mm:ss.SSSZ"
        )}]: Error insertando en la tabla iv_forma_cobro: ${error.message.replace(
          /['"]+/g,
          ""
        )}`
      );
    }
  });
};

export const insertTransaccion = (db, idUser, data) => {
  return new Promise(async (resolve, reject) => {
    const {
      idTipoComprobante,
      idCondicionVenta,
      nroComprobante,
      rucCi,
      nombre,
      fechaHora,
      timbrado,
      vtoTimbrado,
      idMoneda,
      tipoCambio,
      exenta,
      gravada5,
      gravada10,
      items,
      formasCobros,
    } = data;
    try {
      const idCabecera = await insertIvTransaccionCabecera(
        db,
        idTipoComprobante,
        idCondicionVenta,
        nroComprobante,
        rucCi,
        nombre,
        fechaHora,
        timbrado,
        vtoTimbrado,
        idMoneda,
        tipoCambio,
        exenta,
        gravada5,
        gravada10,
        idUser
      );
      if (idCabecera) {
        for (const item of items) {
          await insertIvTransaccionDetalle(
            db,
            item.idArticulo,
            item.desArticulo,
            item.idColor,
            item.desColor,
            item.idPaisOrigen,
            item.desPaisOrigen,
            item.idFamilia,
            item.desFamilia,
            item.idSeccion,
            item.desSeccion,
            item.idMarca,
            item.desMarca,
            item.talle,
            item.cantidad,
            item.precioUnitario,
            idCabecera
          );
        }
        if (formasCobros) {
          for (const item of formasCobros) {
            await insertIvFormaCobro(
              db,
              item.idTipo,
              item.idMarcaTarjeta,
              item.idEntidad,
              item.idMoneda,
              item.tipoCambio,
              item.monto,
              idCabecera
            );
          }
        }
      }
      resolve(idCabecera);
    } catch (error) {
      reject(error);
    }
  });
};

export const getTransaccionByTipoComprobanteNumeroComprobanteAndTimbrado = (
  db,
  idTipoComprobante,
  nroComprobante,
  timbrado
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT *
              FROM iv_transaccion_cabecera a
              WHERE a.id_tipo_comprobante=:idTipoComprobante
                AND a.nro_comprobante=:nroComprobante
                AND a.timbrado=:timbrado`,
        [idTipoComprobante, nroComprobante, timbrado]
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows);
      }
    } catch (error) {
      reject(
        `Error buscando en la tabla iv_transaccion_cabecera: ${error.message.replace(
          /['"]+/g,
          ""
        )}`
      );
    }
  });
};

export const changeProcesadoSsTransaccion = (
  db,
  idTransaccion,
  procesadoSs
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `UPDATE iv_transaccion_cabecera a
                               SET a.procesado_ss=:procesadoSs
                               WHERE a.id=:idTransaccion`,
        {
          idTransaccion: {
            type: oracledb.NUMBER,
            val: idTransaccion,
            dir: oracledb.BIND_IN,
          },
          procesadoSs: {
            type: oracledb.STRING,
            val: procesadoSs,
            dir: oracledb.BIND_IN,
          },
        }
      );
      db.commit();
      resolve();
    } catch (error) {
      db.rollback();
      reject(
        `Error buscando en la tabla iv_transaccion_cabecera: ${error.message.replace(
          /['"]+/g,
          ""
        )}`
      );
    }
  });
};

export const updateEstadoTransaccion = (
  db,
  idTransaccion,
  estado,
  idUsuario,
  idCliente,
  idLocal
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transaccion = await getTransaccionByiD(db, idTransaccion);
      if (transaccion && transaccion["ESTADO"] === "PAG") {
        reject(
          `El estado de la factura ${transaccion["NRO_COMPROBANTE"]} es actualmente PAG.`
        );
        return;
      }
      const result = await db.execute(
        `UPDATE iv_transaccion_cabecera a
                               SET a.estado=:estado
                               WHERE a.id=:idTransaccion
                                 AND a.id_usuario=:idUsuario
                               RETURN id,ruc_ci,fecha_hora,id_moneda,id_tipo_comprobante,id_condicion_venta,nro_comprobante,exenta,gravada_5,gravada_10
                               INTO :id,:rucCi,:fechaHora,:idMoneda,:idTipoComprobante,:idCondicionVenta,:nroComprobante,:exenta,:gravada5,:gravada10`,
        {
          id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
          rucCi: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
          fechaHora: { type: oracledb.DATE, dir: oracledb.BIND_OUT },
          idMoneda: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
          idTipoComprobante: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
          idCondicionVenta: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
          nroComprobante: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
          exenta: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
          gravada5: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
          gravada10: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
          idTransaccion: {
            type: oracledb.NUMBER,
            val: parseInt(idTransaccion),
            dir: oracledb.BIND_IN,
          },
          estado: {
            type: oracledb.STRING,
            val: estado,
            dir: oracledb.BIND_IN,
          },
          idUsuario: {
            type: oracledb.NUMBER,
            val: idUsuario,
            dir: oracledb.BIND_IN,
          },
        }
      );
      db.commit();
      if (result.outBinds.id.length > 0) {
        if (
          result.outBinds.idTipoComprobante[0] === "FAC" &&
          result.outBinds.idCondicionVenta[0] === "CRE" &&
          estado === "PAG"
        ) {
          solCuponService(db, idTransaccion, idCliente, idLocal, {
            rucCi: result.outBinds.rucCi[0],
            fechaHora: result.outBinds.fechaHora[0],
            idMoneda: result.outBinds.idMoneda[0],
            nroComprobante: result.outBinds.nroComprobante[0],
            exenta: result.outBinds.exenta[0],
            gravada5: result.outBinds.gravada5[0],
            gravada10: result.outBinds.gravada10[0],
          });
        }
        resolve(parseInt(result.outBinds.id));
      } else {
        reject(`Transacción no encontrada.`);
      }
    } catch (error) {
      db.rollback();
      reject(
        `Error actualizando estado en la tabla iv_transaccion_cabecera: ${error.message.replace(
          /['"]+/g,
          ""
        )}`
      );
    }
  });
};

export const getTransaccionByiD = (db, idTransaccion) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.execute(
        `SELECT *
              FROM iv_transaccion_cabecera a
              WHERE a.id=:idTransaccion`,
        [idTransaccion]
      );
      if (result.rows.length === 0) {
        resolve(null);
      } else {
        resolve(result.rows[0]);
      }
    } catch (error) {
      reject(
        `Error buscando en la tabla iv_transaccion_cabecera: ${error.message.replace(
          /['"]+/g,
          ""
        )}`
      );
    }
  });
};

export default {
  insertTransaccion,
  getTransaccionByTipoComprobanteNumeroComprobanteAndTimbrado,
  changeProcesadoSsTransaccion,
  updateEstadoTransaccion,
  getTransaccionByiD,
};
