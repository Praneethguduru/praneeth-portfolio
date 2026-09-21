import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Demo from "./pages/Demo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/projects' element={<Projects />} />

        <Route path='/projects/:slug' element={<ProjectDetails />} />

        <Route path='/projects/:slug/demo' element={<Demo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
