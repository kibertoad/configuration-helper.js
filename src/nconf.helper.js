let fs = require('fs');

/**
 * Load default configuration. Throws an error if path is not specified
 * @param {object} nconf - instance of an nconf
 * @param {string} SERVICE_CONFIG_FILE - path to config file
 */
function loadDefaultConfiguration(nconf, SERVICE_CONFIG_FILE) {
  if (SERVICE_CONFIG_FILE) {
    _loadConfiguration(nconf, 'defaultConf', SERVICE_CONFIG_FILE);
  } else {
    throw new Error('Default config file not specified.');
  }
}

/**
 * Load main configuration. Should be called before the default configuration is loaded
 * @param {object} nconf - instance of an nconf
 * @param {string} SERVICE_CONFIG_FILE - path to config file
 */
function loadConfiguration(nconf, SERVICE_CONFIG_FILE) {
  if (SERVICE_CONFIG_FILE) {
    _loadConfiguration(nconf, 'mainConf', SERVICE_CONFIG_FILE);
  } else {
    console.log('No main configuration specified, skipping loading. Only default configuration will be used');
  }
}

/**
 * Load configuration overrides. Should be called before the main configuration is loaded
 * @param {object} nconf - instance of an nconf
 * @param {string} SERVICE_CONFIG_FILE - path to config file
 */
function loadOverrides(nconf, SERVICE_CONFIG_FILE) {
  if (SERVICE_CONFIG_FILE) {
    _loadConfiguration(nconf, 'overrideConf', SERVICE_CONFIG_FILE);
  } else {
    console.log('No overrides specified, skipping loading.');
  }
}

/**
 * Load and decrypt configuration.
 * @param {object} nconf - instance of an nconf
 * @param {string} SERVICE_CONFIG_FILE - path to the encrypted config file
 * @param {string} DECRYPTION_KEY - key that will be used for decrypting the config file
 */
function loadEncryptedConfiguration(nconf, SERVICE_CONFIG_FILE, DECRYPTION_KEY) {
  if (SERVICE_CONFIG_FILE) {
    if (!DECRYPTION_KEY) {
      throw new Error('Decryption key not specified.');
    }
    _loadConfiguration(nconf, 'encryptedConf', SERVICE_CONFIG_FILE, DECRYPTION_KEY);
  } else {
    console.log('Encrypted configuration file not specified, skipping loading.');
  }
}


function _loadConfiguration(nconf, storeName, SERVICE_CONFIG_FILE, DECRYPTION_KEY) {
  if (!fs.existsSync(SERVICE_CONFIG_FILE)) {
    throw new Error('Config file does not exist: ' + SERVICE_CONFIG_FILE);
  }

  let params = {file: SERVICE_CONFIG_FILE};
  if (DECRYPTION_KEY) {
    params.secure = DECRYPTION_KEY;
  }
  nconf.file(storeName, params);
}


module.exports = {loadDefaultConfiguration, loadConfiguration, loadOverrides, loadEncryptedConfiguration};
