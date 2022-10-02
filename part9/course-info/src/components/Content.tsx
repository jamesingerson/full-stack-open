import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((course, i) => (
        <Part key={i} coursePart={course}></Part>
      ))}
    </>
  );
};

export default Content;
