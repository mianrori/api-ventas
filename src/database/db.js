import "dotenv/config";
import moment from "moment";
import oracledb from "oracledb";

export const connect = () => {
  return new Promise(async (resolve, reject) => {
    try {
      oracledb.initOracleClient({ libDir: "C:\\oracle\\instantclient_19_10" });
      oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

      console.log(
        `[${moment(new Date()).format(
          "DD/MM/YYYY hh:mm:ss.SSSZ"
        )}]: Connecting to the ${process.env.DB_SID} database.`
      );
      const connection = await oracledb.getConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SID}`,
      });
      console.log(
        `[${moment(new Date()).format(
          "DD/MM/YYYY hh:mm:ss.SSSZ"
        )}]: Connected to the ${process.env.DB_SID} database.`
      );
      resolve(connection);
    } catch (error) {
      reject(
        `[${moment(new Date()).format(
          "DD/MM/YYYY hh:mm:ss.SSSZ"
        )}]: Error connecting to ${process.env.DB_SID}: ${error.message.replace(
          /['"]+/g,
          ""
        )}`
      );
    }
  });
};

export default {
  connect,
};
