
const { parsed } = require('dotenv-safe').config();


export default function(config, env, helpers) {
    // dotenv injection
    const { plugin } = helpers.getPluginsByName(config, 'DefinePlugin')[0];
    Object.assign(
      plugin.definitions,
      Object.keys(parsed).reduce(
        (env, key) => ({
          ...env,
          [`process.env.${key}`]: JSON.stringify(parsed[key]),
        }),
        {}
      )
    );
  }

//   export default (config, env, helpers) => {
//     config.plugins.push(
//         new helpers.webpack.DefinePlugin({
//             'process.env.API_KEY': JSON.stringify('XGJV68AC7WREW5Y5FGXP'),
//             'process.env.API_SECRET': JSON.stringify('ppxeYFEzZJ#bYR77crWP5wTz#p#kTdB38TfeV9$')
//         }),
//     );
// };