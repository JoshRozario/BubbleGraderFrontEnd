export const processImage = async (
  imageSrcs: string[],
  setResults: SetResultsCallback,
  setIsLoading: SetIsLoadingCallback,
  answerKey: AnswerKey,
  alreadyInFrame: boolean
  ): Promise<void> => {


  console.log("Processing image...");

  const formData = new FormData();
  for (const src of imageSrcs) {
    let imageBlob;
    if (typeof src === 'string') {
      const response = await fetch(src);
      imageBlob = await response.blob();
    } else {
      imageBlob = src; // Assuming src can be a Blob or File directly
    }
    formData.append('file', imageBlob, 'image.jpg'); // The backend needs to handle multiple files under the same key 'file'
  }

  formData.append('answer_key', JSON.stringify(answerKey));
  formData.append('already_in_frame', alreadyInFrame.toString());


  fetch('https://zadss.pythonanywhere.com/process', {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    const blobResults = data.map((result: { visualised: string; }) => {
      // Log the base64 string for debugging purposes
      console.log("Base64 String:", result.visualised);
      
      // Ensure the string is split correctly and only the base64 part is passed to atob
      const base64Data = result.visualised
  
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const imageBlob = new Blob([byteArray], { type: 'image/jpeg' });  // Adjust the MIME type if necessary
      const blobUrl = URL.createObjectURL(imageBlob);
  
      return { ...result, visualised: blobUrl }; // Replace the base64 string with the blob URL
    });
  
    setResults(blobResults); // Update the state with the new results containing blob URLs
    setIsLoading(false);    
  })
  
  .catch(error => {
    console.error("Error processing images: ", error);
  });
};
