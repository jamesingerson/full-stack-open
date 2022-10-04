import diagnosesData from "../../data/diagnoses";

import { Diagnosis } from "../types";

const getDiagnosesData = (): Array<Diagnosis> => {
  return diagnosesData;
};

export default {
  getDiagnosesData,
};
