import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

interface User {
  name: string;
  email: string;
}

interface UserDetails {
  [key: string]: string;
}

const UserProfile: React.FC = () => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [userDetails1, setUserDetails1] = useState<User[] | null>(null);
  const [userDetails2, setUserDetails2] = useState<UserDetails | null>(null);

  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!storedToken) {
          console.error("Token not found in local storage");
          return;
        }

        const response1: AxiosResponse<User[]> = await axios.get(
          "http://localhost:8070/auth/users"
        );
        setUserDetails1(response1.data);

        const response2: AxiosResponse<UserDetails> = await axios.get(
          "http://localhost:8070/auth/users/sumitra"
        );
        setUserDetails2(response2.data);

        const response: AxiosResponse<User> = await axios.get(
          `http://localhost:8070/auth/validate?token=${storedToken}`
        );
        setUserDetails(response.data);

        console.log("hi");
        console.log(response1.data);
        console.log(response2.data);
      } catch (error: any) {
        console.error("Failed to fetch user profile:", error.message);
      }
    };

    if (storedToken) {
      fetchUserProfile();
    }
  }, [storedToken]);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Token from local storage: {storedToken}</p>

      {userDetails1 && userDetails1.length > 0 && (
        <div>
          {userDetails1.map((user, index) => (
            <div key={index}>
              <p>Username: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          ))}
        </div>
      )}
      <div></div>
      <div>
        <div>
          <h1>User Details:</h1>
          {userDetails2 && Object.keys(userDetails2).length > 0 ? (
            <ul>
              {Object.entries(userDetails2).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          ) : (
            <p>No user details available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
