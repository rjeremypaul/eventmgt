import React, { useState } from 'react';
import { useAuth } from './AuthContext';

function UserProfile() {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Add logic to save edited user data (e.g., API call)
    console.log('Saving edited user:', editedUser);

    // Update the user profile in the AuthContext
    updateUserProfile(editedUser);

    // Exit edit mode after saving
    setIsEditing(false);
  };

  return (
    <div>
      <h2>User Profile</h2>
      {user ? ( // Check if user is defined
        isEditing ? (
          <>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={editedUser.username}
                onChange={handleChange}
              />
            </label>
            {/* Add more input fields for other user details */}
            <br />
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            {/* Add more user details as needed */}
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </>
        )
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}

export default UserProfile;
