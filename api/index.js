//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require("dotenv").config();
const axios = require("axios").default;
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { Type } = require("./src/db");
const { upperFirst } = require("./src/utils/index");

const { PORT } = process.env;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(PORT, async () => {
    try {
      const { data } = await axios.get("https://pokeapi.co/api/v2/type");
      const arrTypes = data.results
        .map(({ name }) => ({ name: upperFirst(name) }))
        .sort((a, b) => {
          if (a.name < b.name) return -1;
          if (b.name < a.name) return 1;
          return 0;
        });
      await Type.bulkCreate(arrTypes);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
    }
  });
});
