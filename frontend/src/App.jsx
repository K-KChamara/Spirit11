import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/homePage";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Router>
      
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
