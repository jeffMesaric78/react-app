import { Button, HStack, Input } from "@chakra-ui/react";
import { FormEvent, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export interface Query {
  username: string;
  password: string;
}

const UserForm = () => {
  const [query, setQuery] = useState<Query>({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const m = location.state?.message;

  useEffect(() => {}, []); // Empty array ensures this runs only once on mount

  useEffect(() => {
    console.log(m);
    setMessage(m);

    console.log(message);

    //reset state once message has been set...
    navigate(location.pathname, {});
  }, [message]); // Empty array ensures this runs only once on mount

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    navigate("/user/" + query.username, {
      state: { query: query, previousUrl: location.pathname },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          onChange={(e) => setQuery({ ...query, username: e.target.value })}
          value={query.username}
          id="username"
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          onChange={(e) => setQuery({ ...query, password: e.target.value })}
          value={query.password}
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
      {message && <div style={{ color: "red" }}>{message}</div>}
    </form>
  );
};

export default UserForm;
