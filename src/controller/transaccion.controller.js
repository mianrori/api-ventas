import {
  insertTransaccionService,
  updateEstadoTransaccionService,
} from "../services/transaccion.service.js";

export const insertTransaccionController = async (req, res) => {
  const data = req.body;
  const idUsuario = req.user.id;
  const idCliente = req.user.idCliente;
  const idLocal = req.user.idLocal;
  let idTransaccion;
  console.info(`USER: ${req.user.id}-${req.user.userName}`);
  try {
    idTransaccion = await insertTransaccionService(
      req,
      idUsuario,
      idCliente,
      idLocal,
      data
    );
    if (idTransaccion) {
      res.status(201).json({
        env: process.env.NODE_ENV,
        success: true,
        idTransaccion,
        messages: ["La transacción ha sido creada."],
      });
    }
  } catch (error) {
    console.error(`Error in INSERT: ${error}`);
    res.status(422).json({
      env: process.env.NODE_ENV,
      success: false,
      idTransaccion: 0,
      messages: [error],
    });
  }
};

export const updateEstadoTransaccionController = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const idUsuario = req.user.id;
  const idCliente = req.user.idCliente;
  const idLocal = req.user.idLocal;
  let idTransaccion;
  console.info(`USER: ${req.user.id}-${req.user.userName}`);
  try {
    idTransaccion = await updateEstadoTransaccionService(
      req,
      id,
      idUsuario,
      idCliente,
      idLocal,
      data
    );
    res.status(200).json({
      env: process.env.NODE_ENV,
      success: true,
      messages: ["El estado de la transacción ha sido actualizado."],
    });
  } catch (error) {
    console.error(`Error in UPDATE: ${error}`);
    res.status(422).json({
      env: process.env.NODE_ENV,
      success: false,
      messages: [error],
    });
  }
};

export default {
  insertTransaccionController,
  updateEstadoTransaccionController,
};
