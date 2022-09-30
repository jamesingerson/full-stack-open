import patientsData from "../../data/patients";

import { NonSensitivePatientData } from "../types";

const getNonSensitivePatientData = (): Array<NonSensitivePatientData> => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

// const addPatient = () => {
//   return null;
// };

export default {
  getNonSensitivePatientData,
  //addPatient,
};
