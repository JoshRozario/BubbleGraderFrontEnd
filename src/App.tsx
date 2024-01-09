import React from 'react';
import BubbleSheetMarker from './components/BubbleSheetMarker';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import ImageUploadInstructions from './components/Instructions'

function App() {
  return (
      <Router>
          <Navbar />
          <Routes>
              <Route path="/upload-instructions" element={<ImageUploadInstructions />} />
              <Route path="/" element={<BubbleSheetMarker/>} />
          </Routes>
      </Router>
  );
}

export default App;
