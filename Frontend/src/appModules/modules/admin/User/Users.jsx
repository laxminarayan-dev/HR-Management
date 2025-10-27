import { useState, useEffect } from "react";
import UserDetailTable from "../../../lib/tables/UserDetailTable";

export default function Users() {
  const [users, setUsers] = useState();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/allUsers`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.users) {
          setUsers(data.users);
        } else {
          setUsers([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const setAddUser = () => {};
  return (
    <div className="p-8">
      {/* Employee management content goes here */}

      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          type="button"
          onClick={() => setAddUser(true)}
          className="border p-1 px-3 rounded-full cursor-pointer hover:bg-gray-900 hover:text-gray-100"
        >
          Add User
        </button>
      </div>
      {users == null ? (
        <div className="w-full h-90 flex justify-center items-center">
          <div className="animate-spin border border-b-white border-l-0 w-10 h-10 rounded-full"></div>
        </div>
      ) : users.length == 0 ? (
        <div>
          <h1>No User found!</h1>
        </div>
      ) : (
        users.length > 0 && <UserDetailTable users={users} />
      )}

      {/* {
        <AddEmployeeModal
          open={addEmpModel}
          onClose={setAddEmpModel}
          onAdd={setEmplist}
        />
      } */}
    </div>
  );
}
