type Rating = 1 | 2 | 3;

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseInput {
  exercises: Array<number>;
  target: number;
}

function onlyNumbers(array: any[]) {
  return array.every((element: number) => {
    return typeof element === "number" && !isNaN(element);
  });
}

function nonZero(array: number[]): number[] {
  return array.filter((x) => x != 0);
}

function describeRating(rating: Rating): string {
  switch (rating) {
    case 3:
      return "excellent!";
    case 2:
      return "not too bad but could be better";
    case 1:
      return "room for improvement";
    default:
      throw new Error("Could not interpret rating!");
  }
}

const parseArguments = (args): ExerciseInput => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (onlyNumbers(args[2]) && !isNaN(Number(args[3]))) {
    return {
      exercises: args[2],
      target: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateExercises = (exercises: number[], target: number): Result => {
  const periodLength = exercises.length;
  const trainingDays = nonZero(exercises).length;
  const success = periodLength === trainingDays;
  const average = exercises.reduce((sum, x) => sum + x, 0) / periodLength;
  const rating = average >= 2 ? 3 : average >= 1 ? 2 : 1;
  const ratingDescription = describeRating(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
