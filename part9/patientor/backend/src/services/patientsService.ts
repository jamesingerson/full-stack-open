import { v1 as uuid } from "uuid";

import patientsData from "../../data/patients";

import { NonSensitivePatientData, Patient, NewPatient } from "../types";

const getNonSensitivePatientData = (): Array<NonSensitivePatientData> => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatientData,
  addPatient,
};
