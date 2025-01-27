import { KennelPage } from "./pages/KennelPage/KennelPage";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/kennels/:id" element={<KennelPage />} />
      </Routes>
    </>
  );
}

export default App;
