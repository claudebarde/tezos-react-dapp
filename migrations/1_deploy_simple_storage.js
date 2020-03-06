const simpleStorage = artifacts.require("SimpleStorage");
//const { alice } = require('../scripts/sandbox/accounts');

const initial_storage = 2;

module.exports = async deployer => {
  await deployer.deploy(simpleStorage, initial_storage);
};
module.exports.initial_storage = initial_storage;
