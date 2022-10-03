import { useStateValue } from "../state";
import { Entry } from "../types";
import HealthCheckDetails from "./HealthCheckDetails";
import HospitalDetails from "./HospitalDetails";
import OccupationalHealthcareDetails from "./OccupationalHealthDetails";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const EntriesList = ({ entries }: { entries: Entry[] }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div>
      <h2>Entries</h2>
      {entries.map((e) => (
        <div key={e.id}>
          <p>
            {e.date} <i>{e.description}</i>
          </p>
          {!!e.diagnosisCodes && (
            <>
              <p>Diagnoses:</p>
              <ul>
                {e.diagnosisCodes?.map((d) => (
                  <li key={d}>
                    {d}: {diagnoses[d].name}
                  </li>
                ))}
              </ul>
            </>
          )}
          <p>Diagnosed by: {e.specialist}</p>
          <EntryDetails entry={e} />
        </div>
      ))}
    </div>
  );
};

export default EntriesList;
