var Patientreport=artifacts.require("./Patientreport.sol");

contract("Patientreport",function(accounts){
	var medicalInstance;

     it("initializes with two patients", function() {
        return Patientreport.deployed().then(function(instance) {
                 return instance.patientsCount();
     }).then(function(count) {
         assert.equal(count, 2);
     });
      });
			it("it initializes the patients with the correct values", function() {
	 return Patientreport.deployed().then(function(instance) {
		 medicalInstance = instance;
		 return medicalInstance.patients(1);
	 }).then(function(patient) {
		 assert.equal(patient[0], 1, "contains the correct id");
		 assert.equal(patient[1], "Patient 1", "contains the correct name");
		 assert.equal(patient[2], "null", "contains the disease");
		 assert.equal(patient[3], 0, "contains the correct RBCcount");
		  assert.equal(patient[4], 0, "contains the correct bp mm val");
			 assert.equal(patient[5], 0, "contains the correct bp hg val");
		 return medicalInstance.patients(2);
	 }).then(function(patient) {
		 assert.equal(patient[0], 2, "contains the correct id");
		 assert.equal(patient[1], "Patient 2", "contains the correct name");
		 assert.equal(patient[2], "null", "contains the disease");
		 assert.equal(patient[3], 0, "contains the correct RBCcount");
		 assert.equal(patient[4], 0, "contains the correct bp mm val");
			assert.equal(patient[5], 0, "contains the correct bp hg val");
	 });
 });
 it("allows a doctor to set a patient data", function() {
    return Patientreport.deployed().then(function(instance) {
    medicalInstance = instance;
      patientId = 1;
      return medicalInstance.patientVal(patientId, "cardiacsurgery",4,133,90);
		}).then(function(patient) {
      return medicalInstance.patients(1);
    }).then(function(patient){
			assert.equal(patient[2], "cardiacsurgery", "contains the disease");
			assert.equal(patient[3], 4, "contains the correct RBCcount");
			 assert.equal(patient[4], 133, "contains the  bp mm val");
				assert.equal(patient[5], 90, "contains the  bp hg val");
		});
  });
});
