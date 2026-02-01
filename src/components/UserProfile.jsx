import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { checkIfUserExists, checkIfUserExists2 } from "../service/api";

function UserProfile({ username, password }) {
  //const { username, password, email, profile } = useParams();
  //const [query, setQuery] = useState('');
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    profile: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const query = location.state?.query;

  useEffect(() => {
    // Data fetching logic here
    console.log("user initial effect");
  }, []); // Empty array ensures this runs only once on mount

  const check = async () => {
    try {
      //const response = await checkIfUserExists(user.username);

      //console.log("pass: " + user.password);

      /*if (!query) {
        setUser(null);
        //setIsLoading(false);
        return;
      } else {
        if (query.username == user.username) {
          console.log("test");
        }
        return;
      }*/

      const response = await checkIfUserExists2(query.username);

      //console.log(response);
      //console.log(JSON.stringify(response, null, 2));

      //const parsedData = JSON.parse(response);
      if ("status" in response) {
        const status = response["status"];
        //console.log("status: " + status);

        if (status === "found") {
          if ("token" in response) {
            const token = response["token"];
            //console.log("token: " + token);
          }

          if ("userDetails" in response) {
            const { email, profile } = response["userDetails"];
            //console.log("email: " + email);
            //console.log("profile: " + profile);

            setUser({
              username: query.username,
              email: email,
              profile: profile,
            });
          }

          /*navigate("/user/" + user.username, {
            state: { previousUrl: location.pathname },
          });*/
          //navigate("/test");
        } else {
          //setCount(count + 1);
          //setShowMessage(true);
          //navigate("xyz");
          navigate("/", {
            state: {
              user,
              previousUrl: location.pathname,
              message: "error retrieving profile",
            },
          });
        }
      }
    } catch (err) {
      console.log(err);
      //setCount(count + 1);
      //setShowMessage(true);

      /*navigate("/", {
        state: {
          user,
          previousUrl: location.pathname,
          message: "error retrieving profile",
        },
      });*/
    } finally {
      //console.log("finally");
    }
  };

  useEffect(() => {
    ///need to check if user is currently logged in

    console.log("running query...");
    console.log(JSON.stringify(query, null, 2));
    console.log(JSON.stringify(user, null, 2));

    check();

    //const userIn = location.state?.user; // Use optional chaining for safety

    //console.log("user username effect");
    //console.log(userIn);

    //setUser(userIn);

    //check();

    // Use the username to fetch data from an API
    // Example: fetch(`/api/users/${username}`).then(...)
    //console.log("Fetching profile for:", user.username);
    // Set state with fetched data
    //setUserData({ name: user.username, bio: user.profile });
  }, [query]); // Re-run effect if username changes

  /*if (!userData) {
    return <div>Loading...</div>;
  }*/

  return (
    <>
      <div>
        <h1>Welcome, {user.username}!</h1>
        <p>{user.profile}</p>
      </div>
      <Link to="/" className="btn btn-primary">
        Login
      </Link>
    </>
  );
}

export default UserProfile;
