import { HealthCheckEntry } from "../types";

const HealthCheckDetails: React.FC<{
  entry: HealthCheckEntry;
}> = ({ entry }) => {
  return (
    <>
      <h4>Health Check Details:</h4>
      <p>Health Rating: {entry.healthCheckRating}</p>
    </>
  );
};

export default HealthCheckDetails;
