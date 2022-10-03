import { OccupationalHealthcareEntry } from "../types";

const OccupationalHealthcareDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <>
      <h4>Occupational Healthcare Details:</h4>
      <p>Employer: {entry.employerName}</p>
      {!!entry.sickLeave && (
        <p>
          Sick Leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
        </p>
      )}
    </>
  );
};

export default OccupationalHealthcareDetails;
