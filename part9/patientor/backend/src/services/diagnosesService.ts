import diagnosesData from "../../data/diagnoses";

import { Diagnose } from "../types";

const getDiagnosesData = (): Array<Diagnose> => {
  return diagnosesData;
};

// const addDiagnoses = () => {
//   return null;
// };

export default {
  getDiagnosesData,
  //addDiagnoses,
};
