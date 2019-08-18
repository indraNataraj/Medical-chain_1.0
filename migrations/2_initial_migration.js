var Patientreport = artifacts.require("./Patientreport.sol");

module.exports = function(deployer) {
  deployer.deploy(Patientreport);
};
