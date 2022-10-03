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

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
    entries: [],
  };

  patientsData.push(newPatient);
  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addEntry = (patientId: string, rawEntry: any) => {
  let patient: Patient;
  let entry: Entry;
  try {
    patient = patientsData.find((p) => p.id === patientId) as Patient;
    if (patient === undefined) throw new Error("Patient not found.");
  } catch {
    throw new Error("Patient not found.");
  }
  if (
    !rawEntry.date ||
    !rawEntry.type ||
    !rawEntry.specialist ||
    !rawEntry.description
  ) {
    throw new Error("Essential field not provided.");
  }
  switch (rawEntry.type) {
    case "Hospital":
      if (rawEntry.discharge) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        entry = {
          ...rawEntry,
          id: uuid(),
        };
      } else {
        throw new Error("Required field missing.");
      }
      break;
    case "OccupationalHealthcare":
      if (rawEntry.employerName) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        entry = {
          ...rawEntry,
          id: uuid(),
        };
      } else {
        throw new Error("Required field missing.");
      }
      break;
    case "HealthCheck":
      if (rawEntry.healthCheckRating) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        entry = {
          ...rawEntry,
          id: uuid(),
        };
      } else {
        throw new Error("Required field missing.");
      }
      break;
    default:
      throw new Error("Unspecified type.");
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
