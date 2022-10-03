import { useStateValue } from "../state";
import { Entry } from "../types";

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
        </div>
      ))}
    </div>
  );
};

export default EntriesList;
