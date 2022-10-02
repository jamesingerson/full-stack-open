import { v1 as uuid } from "uuid";

import patientsData from "../../data/patients";

import {
  NonSensitivePatientData,
  Patient,
  NewPatient,
  PublicPatient,
} from "../types";

const getNonSensitivePatientData = (): Array<NonSensitivePatientData> => {
  return patientsData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getPublicPatient = (id: string): PublicPatient => {
  const patient = patientsData.find((p) => p.id === id);

  if (!patient) {
    throw new Error("No patient found with that id!");
  }

  const {
    // unused ars ignore pattern not respected here for some reason
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //ssn: _,
    ...publicPatient
  } = patient;

  return { ...publicPatient, entries: [] };
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
  getNonSensitivePatientData,
  addPatient,
  getPublicPatient,
};
