import oracledb from "oracledb";

export const generaDocumentoAlternativoService = (db, nroDoc) => {
  return new Promise(async (resolve) => {
    try {
      const result = await db.execute(
        `BEGIN
            pro_genera_doc_alt(:pNroDoc);
         END;`,
        {
          pNroDoc: {
            type: oracledb.STRING,
            val: nroDoc,
            dir: oracledb.BIND_IN,
          },
        }
      );
      resolve();
    } catch (error) {
      console.log(`Error ejecutando pro_genera_doc_alt: ${error}`);
    }
  });
};

export default { generaDocumentoAlternativoService };
