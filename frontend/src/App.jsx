import {BrowserRouter,Routes,Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import DonorDetailPage from "./pages/DonorDetailPage";
import {Toaster} from "react-hot-toast";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/create" element={<CreatePage/>}/>
        <Route path="/donor/:id" element={<DonorDetailPage/>}/>
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}
export default App;