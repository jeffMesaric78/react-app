import { Link, useNavigate } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div>
        <h1>Page not found</h1>
      </div>
      <Link to="/" className="btn btn-primary">
        Login
      </Link>
    </>
  );
}

export default NotFound;
