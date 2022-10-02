import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { setActiveProfile, useStateValue } from "../state";
import { Box, Typography } from "@material-ui/core";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

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
      <Box>
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

        <Typography variant="body1">SSN: {activeProfile.ssn}</Typography>
        <Typography variant="body1">
          Occupation: {activeProfile.occupation}
        </Typography>
      </Box>
    </div>
  );
};

export default PatientProfile;
