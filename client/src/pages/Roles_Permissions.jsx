import React, { useState } from "react";

const Roles_Permissions = () => {
  const permissionsList = ["View", "Upload", "Download", "Delete"];

  const [permissions, setPermissions] = useState({
    Admin: {
      View: true,
      Upload: true,
      Download: true,
      Delete: true,
    },
    User: {
      View: true,
      Upload: true,
      Download: true,
      Delete: false,
    },
  });

  // Handle checkbox toggle
  const handleChange = (role, permission) => {
    setPermissions((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permission]: !prev[role][permission],
      },
    }));
  };

  // Save button handler
  const handleSave = () => {
    console.log("Saved Permissions:", permissions);

    // Later you can send this to backend
    // axios.post("/api/permissions", permissions)

    alert("Permissions updated successfully ✅");
  };

  return (
    <div className="bg-gray-200 min-h-full">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Roles & Permissions
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="text-left p-3">Permissions</th>
                <th className="text-center p-3">Admin</th>
                <th className="text-center p-3">User</th>
              </tr>
            </thead>

            <tbody>
              {permissionsList.map((permission) => (
                <tr
                  key={permission}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-3 font-medium text-gray-700">
                    {permission}
                  </td>

                  {/* Admin checkbox */}
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={permissions.Admin[permission]}
                      onChange={() =>
                        handleChange("Admin", permission)
                      }
                      className="w-4 h-4 accent-orange-600 cursor-pointer"
                    />
                  </td>

                  {/* User checkbox */}
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={permissions.User[permission]}
                      onChange={() =>
                        handleChange("User", permission)
                      }
                      className="w-4 h-4 accent-orange-600 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Save Button */}
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
