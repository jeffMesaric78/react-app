import ListGroup from "./components/ListGroup";
import Form from "./components/Form";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Jenny's business page</h1>
              <Form />
            </>
          }
        />
        <Route path="/test" element={<h1>hello</h1>} />
      </Routes>
    </>
  );
}

export default App;
