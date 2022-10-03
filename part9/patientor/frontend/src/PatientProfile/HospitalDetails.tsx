import { HospitalEntry } from "../types";

const HospitalDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <>
      <h4>Hospital Details:</h4>
      <p>
        Discharge: {entry.discharge.date} {entry.discharge.criteria}
      </p>
    </>
  );
};

export default HospitalDetails;
