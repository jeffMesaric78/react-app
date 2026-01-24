import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button, HStack, Input } from "@chakra-ui/react";
import React, { FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkIfUserExists } from "../service/api";
import NotFound from "./NotFound";

const Form = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [count, setCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    document.title = `number of failures: ${count}`;
  }, [count]);

  const navigate = useNavigate();

  useEffect(() => {
    // Data fetching logic here
    console.log("testing");
  }, []); // Empty array ensures this runs only once on mount

  const check = async () => {
    try {
      const response = await checkIfUserExists(user.username);
      console.log(response);

      //const parsedData = JSON.parse(response);
      if ("status" in response) {
        const status = response["status"];
        console.log("status: " + status);

        if (status === "found") {
          if ("token" in response) {
            const token = response["token"];
            console.log("token: " + token);
          }

          navigate("/user/" + user.username);
          //navigate("/test");
        } else {
          setCount(count + 1);
          setShowMessage(true);
          navigate("xyz");
        }
      }
    } catch (err) {
      console.log(err);
      setCount(count + 1);
      //setShowMessage(true);
    } finally {
      console.log("finally");
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(user);

    check();
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
        <Button type="button">Not registered?</Button>
        <Link to="/test" className="btn btn-primary">
          Test
        </Link>
      </HStack>
      {showMessage && (
        <div style={{ color: "red" }}>You are not registered!</div>
      )}
    </form>
  );
};

export default Form;
