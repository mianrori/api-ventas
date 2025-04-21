import express from "express";
import {
  insertTransaccionController,
  updateEstadoTransaccionController,
} from "../controller/transaccion.controller.js";
import procesaLoteController from "../controller/procesa-lote.controller.js";

export const router = express.Router();

router.route("/transaccion").post(insertTransaccionController);
router.route("/transaccion/:id").patch(updateEstadoTransaccionController);
router.route("/transaccion/lote").post(procesaLoteController);
