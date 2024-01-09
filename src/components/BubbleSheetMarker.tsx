import React, { useState } from 'react';
import { processImage } from '../utils/ImageProcessing';
import UploadIcon from '../assets/upload.svg?react';

type AnswerKey = {
  [key: string]: number;  // This allows any string to be used as an index into the object
};

type AnswerEntry = {
  question: string;
  answer: string;
};

const letterToNumber = (letter:string) => {
  const charCode = letter.toUpperCase().charCodeAt(0);
  const charCodeOfA = 'A'.charCodeAt(0);
  return charCode - charCodeOfA; // A will be 0, B will be 1, ...
}


const BubbleSheetMarker: React.FC = () => {
  const [images, setImages] = useState<string[]>([]); // Changed to array
  const [files, setFiles] = useState<string[]>([])
  const [results, setResults] = useState<any>(null);
  const [alreadyInFrame, setAlreadyInFrame] = useState<boolean>(false);
  const [answerEntries, setAnswerEntries] = useState<AnswerEntry[]>([{ question: '', answer: '' }]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    setFiles([])
    setImages([])

    // Process each file
    const files = Array.from(event.target.files);
    files.forEach(file => {
      setFiles(prevFiles => [...prevFiles, file.name])
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setImages(prevImages => [...prevImages, e.target.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };


const addAnswerEntry = () => {
  setAnswerEntries([...answerEntries, { question: '', answer: '' }]);
};

// Function to handle updating individual answer entries
const updateAnswerEntry = (index: number, question: string, answer: string) => {
  const newEntries = answerEntries.map((entry, i) =>
    i === index ? { ...entry, question, answer } : entry
  );
  setAnswerEntries(newEntries);
};

const handleSubmit = () => {
  const answerKey: AnswerKey = answerEntries.reduce((acc: AnswerKey, entry) => {
    const questionIndex = parseInt(entry.question)
    const answerIndex = /^[A-Za-z]$/.test(entry.answer) ? letterToNumber(entry.answer) : parseInt(entry.answer) - 1; // Convert letter to number
    console.log(questionIndex, answerIndex)

    if (questionIndex >= 0 && answerIndex >= 0) { // Check if indexes are valid
      acc[questionIndex.toString()] = answerIndex; // Update answerKey with adjusted indices
    }
    return acc;
  }, {} as AnswerKey);

  if (images && Object.keys(answerKey).length > 0) {
    processImage(images, setResults, answerKey, alreadyInFrame);
  } else {
    console.error("Image or answer key is missing!");
  }
};


return (
  <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white w-full">
    <div className="mb-4 pt-6 text-4xl font-bold">Bubble Sheet Marker</div>
    <div className='text-base text-center mb-6 md:w-[500px] pt-8'> Upload your bubble question sheets and provide the correct answers to have them marked </div>
    <div className="flex flex-col p-6 bg-gray-800 rounded-lg shadow-lg items-center justify-center">
      <label className="flex flex-col items-center justify-center bg-blue-500 rounded-lg px-6 py-2 cursor-pointer">
        <UploadIcon className="w-8 h-8" />
        <span className="mt-2 text-base leading-normal">Select Files</span>
        <input
          id="file-upload"
          type="file"
          multiple // Added multiple attribute
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>
      {/* Display all selected images */}
      <div className='mt-4'>Selected Files:</div>
      {files && files.map((file)=>(
        <div>
          {file}
        </div>
      ))}
        {images[0] && [images[0]].map((image, index) => (
          <div  className="mt-4 flex flex-col items-center ">
            <img src={image} alt={`Bubble Sheet ${index}`} className="rounded-md" />
            <p className='mt-3'>First image is shown to help you create the answer key below</p>
          </div>
        ))}
      <div className="mt-3">
        <input
          id="custom-checkbox"
          type="checkbox"
          checked={alreadyInFrame}
          onChange={(e) => setAlreadyInFrame(e.target.checked)}
          className="" // Hide the default checkbox
        />
        <label className='pl-3 font-semibold'>Tick this if the page is entirely in view (No background) </label>
      </div>
      {results && 
        <p className="font-semibold text-2xl self-start justify-self-start mt-5">Results:</p>
      }
      {results && results.map((result : any, index: number) => (
        <div className="mt-4 p-4 bg-gray-700 rounded-md">
          <div className='pt-2 text-lg font-semibold'>Score: {result.score}/{result.numberOfQuestions} </div>
          <img className='pt-4 m-auto' src={result.visualised} alt="Processed Sheet"/>
          <div> {files[index]} </div>
        </div>
      ))}
    </div>
    <div className='mt-4'>
      {answerEntries.map((entry, index) => (
        <div key={index} className="answer-entry">
          <label className='pr-3 border-r-4 border-gray-700'>
            Question {index + 1}
          </label>
          <input
            className='focus:outline-none'
            type="text"
            placeholder="Answer"
            value={entry.answer}
            onChange={(e) => 
              updateAnswerEntry(index, String(index), e.target.value)
            }
          />
        </div>
      ))}
    </div>
    <button className='mt-4' onClick={addAnswerEntry}>Add More</button>
    <button className='' onClick={handleSubmit}>Submit</button>
  </div>
);
}

export default BubbleSheetMarker;
