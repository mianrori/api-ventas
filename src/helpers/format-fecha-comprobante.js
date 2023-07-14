import moment from "moment";

export const formatFechaComprobante = (fechaComprobante) => {
  let result = moment(fechaComprobante, "DD/MM/YYYY HH:mm:ss").format(
    "DD/MM/YYYY"
  );
  return result;
};

export default { formatFechaComprobante };
