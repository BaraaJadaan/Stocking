import './App.scss';
import Daily from './components/News';
import Weekly from './components/News';
import Monthly from './components/News';
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import Main from './pages/Main';
const App = () => {
 
 

  return (
    <>
    <BrowserRouter>
      <Main/>
    <Routes>
      <Route exact path="/daily" element={<Daily/>} />
      <Route exact path="/weekly" element={<Weekly/>} />
      <Route exact path="/monthly" element={<Monthly/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App