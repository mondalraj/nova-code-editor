import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditorPage from "./pages/editorPage";
import HomePage from "./pages/homePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/editor/:roomId/:username" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
