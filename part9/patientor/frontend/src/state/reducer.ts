import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_ACTIVE_PROFILE";
      payload: Patient | undefined;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      patientId: string;
      payload: Entry;
    };

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi,
  };
};

export const setActiveProfile = (
  activeProfile: Patient | undefined
): Action => {
  return {
    type: "SET_ACTIVE_PROFILE",
    payload: activeProfile,
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient,
  };
};

export const setDiagnosesList = (diagnosesListFromApi: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: diagnosesListFromApi,
  };
};

export const addEntry = (patientId: string, newEntry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    patientId,
    payload: newEntry,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_ACTIVE_PROFILE":
      return {
        ...state,
        activeProfile: action.payload,
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (list, diagnosis) => ({ ...list, [diagnosis.code]: diagnosis }),
            {}
          ),
        },
      };
    case "ADD_ENTRY":
      return {
        ...state,
        activeProfile: {
          ...state.patients[action.patientId],
          entries: [
            ...state.patients[action.patientId].entries,
            action.payload,
          ],
        },
        patients: {
          ...state.patients,
          [action.patientId]: {
            ...state.patients[action.patientId],
            entries: [
              ...state.patients[action.patientId].entries,
              action.payload,
            ],
          },
        },
      };
    default:
      return state;
  }
};
