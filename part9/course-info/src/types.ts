interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescribedPart extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDescribedPart {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescribedPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDescribedPart {
  type: "special";
  requirements: string[];
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;
