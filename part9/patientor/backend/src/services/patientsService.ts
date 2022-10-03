import { v1 as uuid } from "uuid";

import patientsData from "../../data/patients";

import { Patient, NewPatient, PublicPatient, Entry } from "../types";

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

const getCompletePatient = (id: string): Patient => {
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

const addEntry = (patiendId: string, entry: Entry): Entry => {
  const patient: Patient = getCompletePatient(patiendId);
  if (!patient) {
    throw new Error("Patient not found.");
  }
  patient.entries.push(entry);
  return entry;
};

export default {
  getPublicPatientData,
  addPatient,
  getPatient,
  addEntry,
};
