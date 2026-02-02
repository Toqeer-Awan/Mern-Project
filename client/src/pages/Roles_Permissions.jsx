import React, { useState } from "react";

const Roles_Permissions = () => {

  const permissions = [
    { key: "view", label: "View" },
    { key: "upload", label: "Upload" },
    { key: "download", label: "Download" },
    { key: "delete", label: "Delete" },
    { key: "addUser", label: "Add User" },
    { key: "removeUser", label: "Remove User" },
    { key: "changeRole", label: "Change Role" },
  ];

 
  const [roles, setRoles] = useState({
    Admin: {
      view: true,
      upload: true,
      download: true,
      delete: true,
      addUser: true,
      removeUser: true,
      changeRole: true,
    },
    Moderator: {
      view: true,
      upload: true,
      download: true,
      delete: false,
      addUser: false,
      removeUser: false,
      changeRole: false,
    },
    User: {
      view: true,
      upload: true,
      download: true,
      delete: false,
      addUser: false,
      removeUser: false,
      changeRole: false,
    },
  });

  //  Toggle permission
  const togglePermission = (role, permissionKey) => {
    setRoles((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permissionKey]: !prev[role][permissionKey],
      },
    }));
  };

  // Save handler
  const handleSave = () => {
    console.log("Saved Roles & Permissions:", roles);
    alert("Permissions updated successfully ✅");
  };

  const roleNames = Object.keys(roles);

  return (
    <div className="bg-gray-200 min-h-full">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Roles & Permissions
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/*  Dynamic Header */}
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="text-left p-3">Permissions</th>
                {roleNames.map((role) => (
                  <th key={role} className="text-center p-3">
                    {role}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Dynamic Body */}
            <tbody>
              {permissions.map(({ key, label }) => (
                <tr
                  key={key}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-3 font-medium text-gray-700">
                    {label}
                  </td>

                  {roleNames.map((role) => (
                    <td key={role} className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={roles[role][key]}
                        onChange={() =>
                          togglePermission(role, key)
                        }
                        className="w-4 h-4 accent-orange-600 cursor-pointer"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*  Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Roles_Permissions;
