import { BrowserRouter, Route, Routes } from "react-router-dom";
import Studentcompletedetail from './Components/Studentdetails/Studentcompletedetail';
import Studentmarklist from "./Components/Studentdetails/Studentmarklist";


function App() {  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Studentcompletedetail />} />
      <Route path="/studentmark/:rollno" element={<Studentmarklist/>} />      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
// xcujg5h9lfcMMSlc