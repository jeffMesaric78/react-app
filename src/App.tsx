import ListGroup from "./components/ListGroup";
import Form from "./components/Form";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>App home page</h1>
              <Form />
            </>
          }
        />
        <Route path="/test" element={<h1>Hello</h1>} />
        <Route path="/user/:username" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
