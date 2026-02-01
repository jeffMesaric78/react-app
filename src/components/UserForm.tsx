import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button, HStack, Input } from "@chakra-ui/react";
import React, { FormEvent, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { checkIfUserExists, checkIfUserExists2 } from "../service/api";
import NotFound from "./NotFound";
import UserProfile from "./UserProfile";

const UserForm = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  //const [count, setCount] = useState(0);
  //const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  /*useEffect(() => {
    document.title = `number of failures: ${count}`;
  }, [count]);*/

  const navigate = useNavigate();
  const location = useLocation();
  const m = location.state?.message;

  useEffect(() => {
    // Data fetching logic here
    //console.log("user form initial effect");
    //setMessage(location.state?.message);
    //console.log("message: " + message);
    //navigate(location.pathname, { replace: true, state: {} });
  }, []); // Empty array ensures this runs only once on mount

  useEffect(() => {
    // Data fetching logic here
    //console.log("testing");

    console.log(m);

    //setShowMessage(!!location.state?.message);
    setMessage(m);

    //console.log(showMessage);
    console.log(message);

    navigate(location.pathname, {});

    //const newState = { newKey: 'newValue', anotherKey: 123 };
    // Update location.state
    //navigate(location.pathname, { replace: true, state: newState });
  }, [message]); // Empty array ensures this runs only once on mount

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    //console.log(user);

    navigate("/user/" + user.username, {
      state: { query: user, previousUrl: location.pathname },
    });
    //return <UserProfile username={user.username} password={user.password} />;

    //check();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          value={user.username}
          id="username"
          type="text"
          className="form-control"
        />
      </div>
      {/*<div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input id="age" type="number" className="form-control" />
      </div>*/}
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          value={user.password}
          id="password"
          type="password"
          className="form-control"
        />
      </div>
      <HStack>
        <Button type="submit">Login</Button>
        <Link to="/register" className="btn btn-primary">
          Not registered?
        </Link>
      </HStack>
      {message && <div style={{ color: "red" }}>{message}lsdkjflkd</div>}
    </form>
  );
};

export default UserForm;
