import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from "../types";
import { addEntry, setActiveProfile, useStateValue } from "../state";
import { Button, Typography } from "@material-ui/core";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntriesList from "./EntriesList";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientProfile = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    throw new Error("Patient Not Specified");
  }
  const [{ activeProfile }, dispatch] = useStateValue();
  React.useEffect(() => {
    const fetchPatient = async () => {
      if (!activeProfile || activeProfile.id != id) {
        try {
          const { data: patientData } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setActiveProfile(patientData));
        } catch (e) {
          console.error(e);
        }
      }
    };
    void fetchPatient();
  }, [dispatch]);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (!activeProfile) return <p>Loading Profile...</p>;

  return (
    <div>
      <Typography variant="h4">
        {activeProfile.name}{" "}
        {activeProfile.gender === "female" ? (
          <FemaleIcon />
        ) : activeProfile.gender === "male" ? (
          <MaleIcon />
        ) : (
          <TransgenderIcon />
        )}
      </Typography>

      <p>SSN: {activeProfile.ssn}</p>
      <p>Occupation: {activeProfile.occupation}</p>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        patientId={id}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      {!!activeProfile &&
        !!activeProfile.entries &&
        activeProfile.entries[0] && (
          <EntriesList entries={activeProfile.entries} />
        )}
    </div>
  );
};

export default PatientProfile;
