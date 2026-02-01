import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button, HStack, Input } from "@chakra-ui/react";
import React, { FormEvent, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { checkIfUserExists, checkIfUserExists2 } from "../service/api";
import NotFound from "./NotFound";

const RegistrationForm = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(user);

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

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          value={user.email}
          id="email"
          type="text"
          className="form-control"
        />
      </div>

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
        <Button type="submit">Register</Button>
        <Link to="/" className="btn btn-primary">
          Login
        </Link>
      </HStack>
    </form>
  );
};

export default RegistrationForm;
