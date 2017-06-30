# Configuration utils

Library contains utils to work with configuration providers.

Provides convenience methods for layered loading of configuration parameters. After loading is completed, they can be accessed using standard nconf means.

Here is the list of supported configuration layers: (note that their priority depends on the order in which they are called in consuming application - those that are called first have
higher priority):

SERVICE_CONFIG_FILE
SERVICE_OVERRIDE_CONFIG_FILE
SERVICE_ENCRYPTED_CONFIG_FILE

If SERVICE_ENCRYPTED_CONFIG_FILE is specified, DECRYPTION_KEY that should be used for decryption should also be provided.

## Example

Here is how configuration loading code inside the consuming application should look like:

let nconf = require('nconf');
let configurationHelper = require('configuration-helper');

nconf.argv();
let SERVICE_CONFIG_FILE = nconf.get('SERVICE_CONFIG_FILE');
let SERVICE_OVERRIDE_CONFIG_FILE = nconf.get('SERVICE_OVERRIDE_CONFIG_FILE');
let SERVICE_ENCRYPTED_CONFIG_FILE = nconf.get('SERVICE_ENCRYPTED_CONFIG_FILE');
let DECRYPTION_KEY = nconf.get('DECRYPTION_KEY') || process.env.DECRYPTION_KEY;

configurationHelper.loadOverrides(nconf, SERVICE_OVERRIDE_CONFIG_FILE);
configurationHelper.loadEncryptedConfiguration(nconf, SERVICE_ENCRYPTED_CONFIG_FILE, DECRYPTION_KEY);
configurationHelper.loadConfiguration(nconf, SERVICE_CONFIG_FILE);
configurationHelper.loadDefaultConfiguration(nconf, 'config/service.default.conf.json');
nconf.env();

module.exports = nconf;


## Usage recommendations

In order to supply decryption key in a secure way, use the decryption key retrieval code from the example and then start service using the following command structure:

" DECRYPTION_KEY=dummyKey pm2 start src/server.js --name=dummy-service -- --SERVICE_CONFIG_FILE=config/overrides/service.profileName.public.conf.json --SERVICE_ENCRYPTED_CONFIG_FILE=config/overrides/service.profileName.restricted.conf.encrypted.json"
