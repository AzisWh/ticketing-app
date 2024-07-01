import React from "react";

const Committee = ({ onLogout }) => {
  return (
    <div>
      {" "}
      <p>You are an Panitia.</p>
      <button onClick={onLogout} className="bg-red-500 text-white py-2 px-4 rounded">
        Logout
      </button>
    </div>
  );
};

export default Committee;
