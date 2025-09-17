import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from localStorage (or backend in future)
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleDelete = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
