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
        success: true,
        idTransaccion,
        messages: ["La transacción ha sido creada."],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(422).json({
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
      success: true,
      messages: ["El estado de la transacción ha sido actualizado."],
    });
  } catch (error) {
    console.log(error);
    res.status(422).json({
      success: false,
      messages: [error],
    });
  }
};

export default {
  insertTransaccionController,
  updateEstadoTransaccionController,
};
