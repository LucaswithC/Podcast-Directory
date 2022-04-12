
const { parsed } = require('dotenv-safe').config();

// ... imports or other code up here ...

/**
 * Function that mutates the original webpack config.
 * Supports asynchronous changes when a promise is returned (or it's an async function).
 *
 * @param {import('preact-cli').Config} config - original webpack config
 * @param {import('preact-cli').Env} env - current environment and options pass to the CLI
 * @param {import('preact-cli').Helpers} helpers - object with useful helpers for working with the webpack config
 * @param {Record<string, unknown>} options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
 */

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