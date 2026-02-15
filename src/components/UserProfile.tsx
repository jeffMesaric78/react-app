import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
//import { checkIfUserExists2 } from "../service/api";
import axios, { AxiosResponse } from "axios";
import Query from "./UserForm";

export interface User {
  username: string;
  password?: string;
  email?: string;
  profile?: string;
  // Add other props here as needed
}

interface PostResponse {
  status: string;
  token: string;
  userDetails: User;
}

function UserProfile() {
  const { username } = useParams();

  const [user, setUser] = useState<User | null>({
    username: "",
    password: "",
    email: "",
    profile: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Start as true

  const location = useLocation();
  const navigate = useNavigate();

  const query = location.state?.query;

  useEffect(() => {
    // Data fetching logic here
    console.log("user initial effect");
  }, []); // Empty array ensures this runs only once on mount

  const checkUser = async (userData: typeof Query) => {
    try {
      // Specify the response data type using a generic argument <PostResponse>
      const response: AxiosResponse<PostResponse> =
        await axios.post<PostResponse>(
          "http://localhost:8080/user/login", // Replace with your API endpoint
          userData, // The data to be sent in the request body
        );

      console.log("User created:", response.data);

      const status = response.data.status;

      if (status === "found") {
        const token = response.data.token;
        const { email, profile } = response.data.userDetails;
        setUser({
          username: query.username,
          email: email,
          profile: profile,
        });
      } else {
        navigate("/", {
          state: {
            user,
            previousUrl: location.pathname,
            message: "error retrieving profile",
          },
        });
      }

      return response.data; // The data property is automatically typed as PostResponse
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error creating user:", error.message);
        // You can handle different error scenarios here
      } else {
        console.error("An unexpected error occurred:", error);
      }

      navigate("/", {
        state: {
          user,
          previousUrl: location.pathname,
          message: "error retrieving profile",
        },
      });

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof query === "undefined") {
      console.log("query undefined...");
      console.log("username: " + username);

      setUser(null);

      ///this is when user tries to go directly to their page, would need to check here if they're logged in,
      // if not, redirect to login page
    } else {
      setIsLoading(true);

      console.log("running query...");
      console.log(JSON.stringify(query, null, 2));
      console.log(JSON.stringify(user, null, 2));

      checkUser(query);
    }
  }, [query]); // Re-run effect if username changes

  if (isLoading) {
    return <div>Loading...</div>; // Conditionally render the loading indicator
  }

  return (
    <>
      {user ? (
        <div>
          <h1>Welcome, {user.username}!</h1>
          <p>{user.profile}</p>
        </div>
      ) : (
        <div>No user...</div>
      )}
      <Link to="/" className="btn btn-primary">
        Login
      </Link>
    </>
  );
}

export default UserProfile;
