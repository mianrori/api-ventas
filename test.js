import axios from "axios";

const username = "desigual";
const password = "123456";

const credentials = Buffer.from(`${username}:${password}`).toString("base64");
const authHeader = `Basic ${credentials}`;

const data = {
  estado: "PAG",
};

axios
  .post("https://localhost:4897/delsol/api/transaccion/152", data, {
    headers: {
      Authorization: authHeader,
    },
  })
  .then((response) => {
    // Procesar la respuesta exitosa
    console.log(response.data);
  })
  .catch((error) => {
    // Procesar el error de la solicitud
    console.error(error);
  });
