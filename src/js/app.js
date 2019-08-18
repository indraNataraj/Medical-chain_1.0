App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Patientreport.json", function(medical) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Patientreport = TruffleContract(medical);
      // Connect provider to interact with contract
      App.contracts.Patientreport.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Patientreport.deployed().then(function(instance) {
      medicalInstance = instance;
      return medicalInstance.patientsCount();
    }).then(function(patientsCount) {
      var patientDetails = $("#patientDetails");
      patientDetails.empty();

      for (var i = 1; i <= patientsCount; i++) {
        medicalInstance.patients(i).then(function(patient) {
          var id = patient[0];
          var name = patient[1];
          var disease = patient[2];
           var rbc =patient[3];
           var bpbefore =patient[4];
           var bpafter =patient[5];


          // Render patient Result
          var patientTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + disease + "</td><td>"+ rbc + "</td><td>"+ bpbefore + "</td><td>"+ bpafter + "</td></tr>";
          patientDetails.append(patientTemplate);
        });
      }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
