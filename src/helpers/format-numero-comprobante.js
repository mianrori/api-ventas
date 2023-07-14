export const formatNumeroComprobante = (nroComprobante) => {
  let result = nroComprobante.replaceAll("-", "");
  return parseInt(result);
};

export default {
  formatNumeroComprobante,
};
