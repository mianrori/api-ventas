import { getTransaccionByTipoComprobanteNumeroComprobanteAndTimbrado } from "../database/transaccion.database.js";
import { dataStructure } from "./data-structure.js";

export const validateData = async (
  db,
  monedas,
  tiposFormasCobros,
  marcasTarjetas,
  entidades,
  data
) => {
  let errors = [];
  let existsComprobante =
    await getTransaccionByTipoComprobanteNumeroComprobanteAndTimbrado(
      db,
      data.idTipoComprobante,
      data.nroComprobante,
      data.timbrado
    );
  if (existsComprobante) {
    errors.push(
      `El comprobante ${data.idTipoComprobante}: ${data.nroComprobante} con timbrado ${data.timbrado} ya existe.`
    );
  }
  const structure = dataStructure(
    monedas,
    tiposFormasCobros,
    marcasTarjetas,
    entidades,
    data
  );
  analyzeData(
    data,
    structure,
    monedas,
    tiposFormasCobros,
    marcasTarjetas,
    entidades,
    errors
  );
  return errors;
};

export const toProcessData = (
  data,
  errors,
  attr,
  key,
  index = undefined,
  parent = undefined
) => {
  //Si el atributo es requerido y no existe
  if (attr.required && !data.hasOwnProperty(key)) {
    errors.push(
      `El atributo${parent !== undefined ? " " + parent + " ->" : ""} ${key} ${
        index !== undefined ? "de la posición " + index + " " : ""
      }es requerido.`
    );
  } else {
    //Si el atributo existe y el tipo de dato es correcto; pero, el valor que contiene no es válido
    if (
      data.hasOwnProperty(key) &&
      attr.hasOwnProperty("value") &&
      !attr.value.includes(data[key].toString())
    ) {
      errors.push(
        `El valor que contiene el atributo${
          parent !== undefined ? " " + parent + " ->" : ""
        } ${key} ${
          index !== undefined ? "de la posición " + index + " " : ""
        }es incorrecto. Puede contener los valores: ${attr.value}`
      );
    } else {
      //Si el atributo existe y su valor es válido
      if (data.hasOwnProperty(key)) {
        if (
          Array.isArray(data[key]) &&
          attr.type === "array" &&
          data[key].length === 0
        ) {
          errors.push(
            `El atributo${
              parent !== undefined ? " " + parent + " ->" : ""
            } ${key} ${
              index !== undefined ? "de la posición " + index + " " : ""
            }al menos debe contener un valor.`
          );
        }
        //Valida la propiedad type del atributo
        if (
          (typeof data[key] !== attr.type && attr.type !== "array") ||
          (!Array.isArray(data[key]) && attr.type === "array")
        ) {
          errors.push(
            `El tipo de dato del atributo${
              parent !== undefined ? " " + parent + " ->" : ""
            } ${key} ${
              index !== undefined ? "de la posición " + index + " " : ""
            }es incorrecto. Debe ser del tipo ${attr.type}`
          );
        }
        //Valida la propiedad size del atributo
        if (
          typeof data[key] === "number"
            ? data[key].toString().length < attr.minSize ||
              data[key].toString().length > attr.maxSize
            : data[key].length < attr.minSize || data[key].length > attr.maxSize
        ) {
          errors.push(
            `La longitud del atributo${
              parent !== undefined ? " " + parent + " ->" : ""
            } ${key} ${
              index !== undefined ? "de la posición " + index + " " : ""
            }debe ser ${
              attr.minSize === attr.maxSize
                ? "de " + attr.maxSize
                : "entre " + attr.minSize + " y " + attr.maxSize
            } caracteres como máximo.`
          );
        }
        //Valida el patrón
        if (attr.hasOwnProperty("pattern")) {
          let pattern = new RegExp(attr.pattern);
          let isCorrect = pattern.test(data[key]);
          if (!isCorrect) {
            errors.push(
              `El formato del atributo${
                parent !== undefined ? " " + parent + " ->" : ""
              } ${key} ${
                index !== undefined ? "de la posición " + index + " " : ""
              }es incorrecto. Debe ser del tipo ${attr.format}.`
            );
          }
        }
      }
    }
  }
  return errors;
};

const analyzeData = (
  data,
  structure,
  monedas,
  tiposFormasCobros,
  marcasTarjetas,
  entidades,
  errors,
  index = undefined
) => {
  for (let key in structure) {
    if (structure[key].type === "array") {
      toProcessData(data, errors, structure[key], key, index);
      let d = data[key];
      if (d !== undefined) {
        for (let i = 0; i < d.length; i++) {
          let _structure = dataStructure(
            monedas,
            tiposFormasCobros,
            marcasTarjetas,
            entidades,
            d,
            i
          );
          let props = _structure[key].props;
          for (let p in props) {
            toProcessData(d[i], errors, props[p], p, i, key);
          }
        }
      }
    } else {
      toProcessData(data, errors, structure[key], key);
    }
  }
};

export default { validateData };
