import { v1 as uuid } from "uuid";

import patientsData from "../../data/patients";

import { Patient, NewPatient, PublicPatient } from "../types";

const getPublicPatientData = (): Array<PublicPatient> => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): PublicPatient => {
  const patient = patientsData.find((p) => p.id === id);
  if (!patient) {
    throw new Error("No patient found with that id!");
  }
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
    entries: [],
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPublicPatientData,
  addPatient,
  getPatient,
};
