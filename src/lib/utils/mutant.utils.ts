export const vectorToMatrixDna = (dnaVector: string[]): string[][] => {
  return dnaVector.map((row) => row.trim().toUpperCase().split(""));
};

export const stringToVectorDna = (dnaString: string): string[] => {
  return dnaString.split("\n");
};
