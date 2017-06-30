const expect = require('chai').expect;
const nconfHelper = require('../src');
const nconf = require('nconf');

describe('nconfHelper', () => {

  beforeEach(() => {
    nconf.remove('overrideConf');
    nconf.remove('encryptedConf');
    nconf.remove('mainConf');
    nconf.remove('defaultConf');
  });

  it('load encrypted configuration', () => {
    nconfHelper.loadEncryptedConfiguration(nconf, './test/data/encrypted.config.json', 'dummy-master-key');
    expect(nconf.get('TESLA_MESSAGE_SERVICE_DB_USER')).to.be.equal('tesla_bbd_test');
  });

  it('load encrypted configuration, wrong key', () => {
    expect(function () {
      nconfHelper.loadEncryptedConfiguration(nconf, './test/data/encrypted.config.json', 'aaa');
    }).to.throw(/Unexpected token/);
  });

  it('load encrypted configuration, no key', () => {
    expect(function () {
    nconfHelper.loadEncryptedConfiguration(nconf, './test/data/encrypted.config.json');
    }).to.throw(/Decryption key not specified/);
  });

  it('load non-encrypted default configuration', () => {
    nconfHelper.loadDefaultConfiguration(nconf, './test/data/defaultConfig.json');
    expect(nconf.get('TESLA_MESSAGE_SERVICE_DB_USER')).to.be.equal('default_tesla_bbd_test');
  });

  it('load non-encrypted default and main configuration', () => {
    nconfHelper.loadConfiguration(nconf, './test/data/config.json');
    nconfHelper.loadDefaultConfiguration(nconf, './test/data/defaultConfig.json');
    expect(nconf.get('TESLA_MESSAGE_SERVICE_DB_USER')).to.be.equal('tesla_bbd_test');
  });

  it('load non-encrypted main configuration', () => {
    nconfHelper.loadConfiguration(nconf, './test/data/config.json');
    expect(nconf.get('TESLA_MESSAGE_SERVICE_DB_USER')).to.be.equal('tesla_bbd_test');
  });

  it('load non-encrypted override', () => {
    nconfHelper.loadOverrides(nconf, './test/data/config.json');
    expect(nconf.get('TESLA_MESSAGE_SERVICE_DB_USER')).to.be.equal('tesla_bbd_test');
  });

  it('load configuration, wrong path', () => {
    expect(function () {
      nconfHelper.loadConfiguration(nconf, './test/data/wrong.config.json');
    }).to.throw(Error, /Config file does not exist/);
  });

});
