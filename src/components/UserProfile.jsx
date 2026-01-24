import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function UserProfile() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Use the username to fetch data from an API
    // Example: fetch(`/api/users/${username}`).then(...)
    console.log('Fetching profile for:', username);
    // Set state with fetched data
    setUserData({ name: username, bio: 'A cool person' });
  }, [username]); // Re-run effect if username changes

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {userData.name}!</h1>
      <p>{userData.bio}</p>
    </div>
  );
}

export default UserProfile