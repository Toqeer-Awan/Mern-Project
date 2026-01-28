import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";

const Table = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John",
      role: "User",
    },
    {
      id: 2,
      name: "Jane",
      role: "Admin",
    },
    {
      id: 3,
      name: "Bob",
      role: "User",
    },
    {
      id: 4,
      name: "Alice",
      role: "User",
    },
  ]);

  const handleRoleChange = (id, newRole) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, role: newRole } : user
    ));
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b text-center align-middle w-1/12">ID</th>
            <th className="py-3 px-4 border-b text-center align-middle w-3/12">Name</th>
            <th className="py-3 px-4 border-b text-center align-middle w-4/12">Role</th>
            <th className="py-3 px-4 border-b text-center align-middle w-4/12">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b text-center align-middle">{user.id}</td>
              <td className="py-3 px-4 border-b text-center align-middle">{user.name}</td>
              <td className="py-3 px-4 border-b text-center align-middle">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="w-full max-w-xs mx-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </td>
              <td className="py-3 px-4 border-b text-center align-middle">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="flex cursor-pointer items-center justify-center gap-2 mx-auto text-red-600 hover:text-red-800 hover:bg-red-50 px-4 py-2 rounded transition-colors"
                >
                  <MdDelete className="text-lg " />
                  <span>Delete User</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table