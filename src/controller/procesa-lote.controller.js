import { procesaLoteService } from "../services/procesa-lote.service.js";

export const procesaLoteController = async (req, res) => {
  const data = req.body;
  const idUsuario = req.user.id;
  const idCliente = req.user.idCliente;
  const idLocal = req.user.idLocal;
  let result;
  console.info(`USER: ${req.user.id}-${req.user.userName}`);
  try {
    result = await procesaLoteService(req, idUsuario, idCliente, idLocal, data);
    if (result) {
      res.status(200).json({
        env: process.env.NODE_ENV,
        success: result.errors.length > 0 ? false : true,
        messages: `Se han procesado ${result.inserts.length} con éxito y ${result.errors.length} con error`,
        inserts: result.inserts,
        errors: result.errors,
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

export default procesaLoteController;
