import ListGroup from "./components/ListGroup";
import UserForm from "./components/UserForm";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import NotFound from "./components/NotFound";
import React, { FormEvent, useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import RegistrationForm from "./components/RegistrationForm";

const useSubdomain = () => {
  const [subdomain, setSubdomain] = useState(null);

  useEffect(() => {
    const host = window.location.host;
    console.log(host);
    // Logic to extract the subdomain part (e.g., 'john' from 'john.localhost:3000' or 'john.example.com')
    const arr = host.split(".");
    // Adjust logic for localhost vs production domains
    if (host.includes("localhost")) {
      host.startsWith("localhost") ? setSubdomain(null) : setSubdomain(arr[0]);
    } else {
      // For production, assume top-level domain and second-level domain exist
      setSubdomain(arr.length > 2 ? arr[0] : null);
    }
  }, []);

  return subdomain;
};

function App() {
  const subdomain = useSubdomain();
  console.log(subdomain);

  //subdomain == null &&
  return (
    <>
      {subdomain == null ? (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>App home page</h1>
                <UserForm />
              </>
            }
          />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <HomePage name={subdomain} />
      )}
    </>
  );
}

export default App;
