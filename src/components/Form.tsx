import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button, HStack, Input } from "@chakra-ui/react";
import React, { FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { checkIfUserExists } from "../service/api";

const Form = () => {
  const [user, setUser] = useState({ username: "", password: "" });

  useEffect(() => {
    console.log("testing");
  }, []);

  const check = async () => {
    try {
      const response = await checkIfUserExists(user.username);
      console.log(response);
    } catch (err) {
      console.log(err);
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
          type="text"
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
    </form>
  );
};

export default Form;
