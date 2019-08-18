pragma solidity ^0.5.0;


contract Patientreport {
  struct Patient {
         uint256  id;
         string name;
         string disease;
         uint256 RBCcount;
         uint256 bpbefore;
         uint256 bpafter;
     }

     // Read/write candidates
     mapping(uint256 => Patient) public patients;

     // Store Candidates Count
     uint public patientsCount;

    constructor() public {
        addPatient("Patient 1");
        addPatient("Patient 2");
  }
  function addPatient (string memory  _name) internal  {
          patientsCount ++;
          patients[patientsCount] = Patient(patientsCount, _name, "null",0,0,0);
      }
      function patientVal (uint _patientId,string memory _disease,uint256  _rbc,uint256  _bpbef,uint256  _bpaft) public {

           patients[_patientId].disease=_disease;
            patients[_patientId].RBCcount=_rbc;
             patients[_patientId].bpbefore=_bpbef;
              patients[_patientId].bpafter=_bpaft;
       }
}
