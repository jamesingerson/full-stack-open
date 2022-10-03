import diagnosesData from "../../data/diagnoses";

import { Diagnosis } from "../types";

const getDiagnosesData = (): Array<Diagnosis> => {
  return diagnosesData;
};

// const addDiagnoses = () => {
//   return null;
// };

export default {
  getDiagnosesData,
  //addDiagnoses,
};
