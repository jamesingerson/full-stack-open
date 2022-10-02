import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { setActiveProfile, useStateValue } from "../state";
import { Typography } from "@material-ui/core";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntriesList from "./EntriesList";

const PatientProfile = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    throw new Error("Patient Not Specified");
  }
  const [{ activeProfile }, dispatch] = useStateValue();
  React.useEffect(() => {
    const fetchPatient = async () => {
      if (activeProfile.id != id) {
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
      {!!activeProfile.entries && activeProfile.entries[0] && (
        <EntriesList entries={activeProfile.entries} />
      )}
    </div>
  );
};

export default PatientProfile;
