import React, { useEffect, useState } from "react";

const Admin = () => {
  const { token, user, onLogout } = useAuth();

  useEffect(() => {
    // Lakukan fetch data user jika token tersedia
    if (token) {
      fetch("https://9c20-103-246-107-5.ngrok-free.app/api/login", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch user data");
          }
          return res.json();
        })
        .then((data) => {})
        .catch(() => {
          // Handle ketika fetch gagal atau token tidak valid
          onLogout();
        });
    }
  }, [token, onLogout]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {user && <p>Welcome, {user.name}!</p>}
      {user && user.role === 1 && <p>You are an Admin.</p>}
      <p className="mt-4">{token ? "Ada token" : "Tidak ada token"}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Admin;
