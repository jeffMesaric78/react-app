import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button, HStack, Input } from "@chakra-ui/react";
import React, { FormEvent } from "react";

const Form = () => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input id="username" type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input id="age" type="number" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input id="email" type="text" className="form-control" />
      </div>
      <HStack>
        <Button type="submit">Login</Button>
        <Button type="button">Not registered?</Button>
      </HStack>
    </form>
  );
};

export default Form;
