type ProcessImageResults = {
    score: number;
    numberOfQuestions: number;
    visualised: string;  // URL or base64 string for the image
  };
  

type AnswerKey = { [key: string]: number };

type SetResultsCallback = (results: ProcessImageResults) => void;