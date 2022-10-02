import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case "normal":
      return (
        <>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <i>{coursePart.description}</i>
        </>
      );
    case "groupProject":
      return (
        <>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <i>Project Count: {coursePart.groupProjectCount}</i>
        </>
      );
    case "submission":
      return (
        <>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <p>
            <i>{coursePart.description}</i>
          </p>
          <p>
            Submit to:{" "}
            <a href={coursePart.exerciseSubmissionLink}>
              {coursePart.exerciseSubmissionLink}
            </a>
          </p>
        </>
      );
    case "special":
      return (
        <>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <p>
            <i>{coursePart.description}</i>
          </p>
          <p>Required Skills:</p>
          <ul>
            {coursePart.requirements.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;
