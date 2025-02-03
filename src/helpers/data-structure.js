export const dataStructure = (
  monedas,
  tiposFormasCobros,
  marcasTarjetas,
  entidades,
  data,
  index = undefined
) => {
  const obj = {
    idTipoComprobante: {
      type: "string",
      minSize: 3,
      maxSize: 3,
      size: 3,
      value: ["FAC", "NOC"],
      required: true,
    },
    idCondicionVenta: {
      type: "string",
      minSize: 3,
      maxSize: 3,
      size: 3,
      value: ["CON", "CRE"],
      required: data.idTipoComprobante === "FAC" ? true : false,
    },
    nroComprobante: {
      type: "string",
      minSize: 15,
      maxSize: 15,
      size: 15,
      required: true,
      format: "001-001-0000001",
      pattern: /^\d{3}-\d{3}-\d{7}$/g,
    },
    rucCi: {
      type: "string",
      minSize: 1,
      maxSize: 20,
      size: 20,
      required: true,
    },
    nombre: {
      type: "string",
      minSize: 1,
      maxSize: 100,
      size: 100,
      required: true,
    },
    fechaHora: {
      type: "string",
      minSize: 19,
      maxSize: 19,
      size: 19,
      required: true,
      format: "dd/mm/yyyy hh24:mi:ss",
      pattern:
        /^(0[1-9]|[1-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/20[2-9][0-9] (0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/g,
    },
    timbrado: {
      type: "number",
      minSize: 8,
      maxSize: 8,
      size: 8,
      required: true,
    },
    vtoTimbrado: {
      type: "string",
      minSize: 10,
      maxSize: 10,
      size: 10,
      required: true,
      format: "dd/mm/yyyy",
      //pattern: /^(0[1-9]|[1-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/20[2-9][0-9]$/g,
    },
    idMoneda: {
      type: "string",
      minSize: 1,
      maxSize: 4,
      size: 4,
      value: monedas,
      required: true,
    },
    tipoCambio: {
      type: "number",
      minSize: 1,
      maxSize: 5,
      size: 5,
      required: true,
    },
    exenta: {
      type: "number",
      minSize: 1,
      maxSize: 20,
      size: 20,
      required: true,
    },
    gravada5: {
      type: "number",
      minSize: 1,
      maxSize: 20,
      size: 20,
      required: true,
    },
    gravada10: {
      type: "number",
      minSize: 1,
      maxSize: 20,
      size: 20,
      required: true,
    },
    items: {
      type: "array",
      required: false,
      props: {
        idArticulo: {
          type: "string",
          minSize: 1,
          maxSize: 30,
          size: 30,
          required: true,
        },
        desArticulo: {
          type: "string",
          minSize: 1,
          maxSize: 300,
          size: 300,
          required: true,
        },
        idColor: {
          type: "string",
          minSize: 1,
          maxSize: 30,
          size: 30,
          required: false,
        },
        desColor: {
          type: "string",
          minSize: 1,
          maxSize: 300,
          size: 300,
          required: index !== undefined && data[index].idColor ? true : false,
        },
        idPaisOrigen: {
          type: "string",
          minSize: 1,
          maxSize: 30,
          size: 30,
          required: false,
        },
        desPaisOrigen: {
          type: "string",
          minSize: 1,
          maxSize: 300,
          size: 300,
          required:
            index !== undefined && data[index].idPaisOrigen ? true : false,
        },
        idFamilia: {
          type: "string",
          minSize: 1,
          maxSize: 30,
          size: 30,
          required: false,
        },
        desFamilia: {
          type: "string",
          minSize: 1,
          maxSize: 300,
          size: 300,
          required: index !== undefined && data[index].idFamilia ? true : false,
        },
        idSeccion: {
          type: "string",
          minSize: 1,
          maxSize: 30,
          size: 30,
          required: false,
        },
        desSeccion: {
          type: "string",
          minSize: 1,
          maxSize: 300,
          size: 300,
          required: index !== undefined && data[index].idSeccion ? true : false,
        },
        idMarca: {
          type: "string",
          minSize: 1,
          maxSize: 30,
          size: 30,
          required: false,
        },
        desMarca: {
          type: "string",
          minSize: 1,
          maxSize: 300,
          size: 300,
          required: index !== undefined && data[index].idMarca ? true : false,
        },
        talle: {
          type: "string",
          minSize: 1,
          maxSize: 10,
          size: 10,
          required: false,
        },
        cantidad: {
          type: "number",
          minSize: 1,
          maxSize: 10,
          size: 10,
          required: true,
        },
        precioUnitario: {
          type: "number",
          minSize: 1,
          maxSize: 20,
          size: 20,
          required: true,
        },
      },
    },
    formasCobros: {
      type: "array",
      required:
        data.idTipoComprobante === "FAC" && data.idCondicionVenta === "CON"
          ? true
          : false,
      props: {
        idTipo: {
          type: "number",
          minSize: 1,
          maxSize: 10,
          size: 10,
          value: valuesOfTiposFormasCobros(tiposFormasCobros),
          required: true,
        },
        idMarcaTarjeta: {
          type: "number",
          minSize: 1,
          maxSize: 10,
          size: 10,
          value: valuesOfMarcasTarjetas(marcasTarjetas),
          required:
            index !== undefined &&
            isRequiredMarcaTarjeta(tiposFormasCobros, data[index].idTipo),
        },
        idEntidad: {
          type: "number",
          minSize: 1,
          maxSize: 10,
          size: 10,
          value: valuesOfEntidades(entidades),
          required:
            index !== undefined &&
            isRequiredEntidad(tiposFormasCobros, data[index].idTipo),
        },
        idMoneda: {
          type: "string",
          minSize: 1,
          maxSize: 4,
          size: 4,
          value: monedas,
          required: true,
        },
        tipoCambio: {
          type: "number",
          minSize: 1,
          maxSize: 5,
          size: 45,
          required: true,
        },
        monto: {
          type: "number",
          minSize: 1,
          maxSize: 20,
          size: 20,
          required: true,
        },
      },
    },
  };
  return obj;
};

const isRequiredMarcaTarjeta = (tiposFormasCobros, id) => {
  let result = false;
  if (id !== undefined) {
    for (let i = 0; i < tiposFormasCobros.length; i++) {
      if (
        tiposFormasCobros[i].id === id &&
        tiposFormasCobros[i].requiereMarca === "S"
      ) {
        result = true;
      }
    }
  }
  return result;
};
const isRequiredEntidad = (tiposFormasCobros, id) => {
  let result = false;
  if (id !== undefined) {
    for (let i = 0; i < tiposFormasCobros.length; i++) {
      if (
        tiposFormasCobros[i].id === id &&
        tiposFormasCobros[i].requiereEntidad === "S"
      ) {
        result = true;
      }
    }
  }
  return result;
};

const valuesOfTiposFormasCobros = (tiposFormasCobros) => {
  let value = [];
  for (let i = 0; i < tiposFormasCobros.length; i++) {
    value.push(tiposFormasCobros[i].id);
  }
  return value;
};

const valuesOfEntidades = (entidades) => {
  let value = [];
  for (let i = 0; i < entidades.length; i++) {
    value.push(entidades[i].id);
  }
  return value;
};

const valuesOfMarcasTarjetas = (marcasTarjetas) => {
  let value = [];
  for (let i = 0; i < marcasTarjetas.length; i++) {
    value.push(marcasTarjetas[i].id);
  }
  return value;
};

export default { dataStructure };
