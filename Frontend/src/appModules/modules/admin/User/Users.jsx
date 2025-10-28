import { useState, useEffect, useRef, Fragment } from "react";
import UserDetailTable from "../../../lib/tables/UserDetailTable";

export default function Users() {
  const [users, setUsers] = useState();
  const [response, setResponse] = useState(null);
  const [addUserModel, setAddUserModel] = useState(false);
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
  const handleDelete = (id) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
      method: "Delete",
    })
      .then(async (res) => {
        const result = await res.json();
        if (res.ok) {
          setResponse({ success: true, msg: result.message });
          setUsers(result.remainingUser);
        } else {
          console.log(res);
          setResponse({ success: false, msg: result.message });
        }
      })
      .catch((err) => {
        console.log(err);
        setResponse({ success: false, msg: "Internal Server Error!" });
      })
      .finally(() => {
        setTimeout(() => {
          setResponse(null);
        }, 2000);
      });
  };
  return (
    <div className="p-8">
      {/* Employee management content goes here */}

      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          type="button"
          onClick={() => setAddUserModel(true)}
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
        users.length > 0 && (
          <UserDetailTable handleDelete={handleDelete} users={users} />
        )
      )}
      {response && (
        <div className="fixed top-20 right-8 transform -translate-x-1 bg-gray-800 p-4 rounded shadow-lg">
          <p className={response.success ? "text-green-500" : "text-red-500"}>
            {response.msg || "Default Message"}
          </p>
        </div>
      )}

      {
        <AddUserModal
          open={addUserModel}
          onClose={setAddUserModel}
          onAdd={setUsers}
          setResponse={setResponse}
        />
      }
    </div>
  );
}

export const AddUserModal = ({ open, onClose, onAdd, setResponse }) => {
  const formRef = useRef(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setAdmin((prev) => ({ ...prev, isAdmin: true }));
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.users) {
          onAdd(data.users);
          setAdmin(null);
          onClose(false);
          setLoading(false);
          setResponse({ success: true, msg: data.message });
        } else {
          setResponse({ success: false, msg: data.message });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setTimeout(() => {
          setResponse(null);
        }, 2000);
      });
  };

  // Fetch employees for admin selection
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emp/allEmployees`)
      .then((res) => res.json())
      .then((data) => {
        const validEmployees = data.emps.filter(
          (emp) => emp.isAdmin == null || emp.isAdmin == false
        );
        if (data.emps) setEmployees(validEmployees);
      })
      .catch((err) => console.log(err));
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div
        ref={formRef}
        className="relative bg-white p-6 rounded-lg shadow-lg max-w-xl w-full overflow-y-hidden h-screen sm:max-h-[90vh] pt-12 sm:pt-5 sm:pb-10"
      >
        <h2 className="text-2xl font-bold mb-4">Add Department</h2>
        <div className="h-[100%] overflow-y-scroll overflow-x-hidden p-4 pb-14 sm:pb-6">
          <form
            className="flex flex-col gap-4 h-[inherit] pb-4"
            onSubmit={handleSubmit}
          >
            {admin ? (
              <Fragment>
                <div className="flex-1 grid gap-4 ">
                  <button
                    className="absolute right-20 text-red-400 cursor-pointer"
                    type="button"
                    onClick={() => setAdmin(null)}
                  >
                    clear
                  </button>
                  <div className="grid gap-1">
                    <label htmlFor="fullName" className="text-sm font-medium">
                      Full Name
                    </label>
                    <h1>{admin.fullName}</h1>
                  </div>

                  <div className="grid gap-1">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <h1>{admin.email}</h1>
                  </div>

                  <div className="grid gap-1">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone
                    </label>
                    <h1>{admin.phone}</h1>
                  </div>
                  {/* DOB */}
                  <div className="grid gap-1">
                    <label htmlFor="dob" className="text-sm font-medium">
                      Date of Birth
                    </label>
                    <h1>
                      {admin.dob
                        ? new Date(admin.dob).toLocaleDateString()
                        : "dd/mm/yyyy"}
                    </h1>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Department */}
                    <div className="grid gap-1">
                      <label
                        htmlFor="department"
                        className="text-sm font-medium"
                      >
                        Department
                      </label>
                      <h1>{admin.department?.name || "null"}</h1>
                    </div>

                    {/* Designation */}
                    <div className="grid gap-1">
                      <label
                        htmlFor="designation"
                        className="text-sm font-medium"
                      >
                        Designation
                      </label>
                      <h1>{admin.designation}</h1>
                    </div>
                  </div>

                  {/* Hire Date */}
                  <div className="grid gap-1">
                    <label htmlFor="hireDate" className="text-sm font-medium">
                      Hire Date
                    </label>
                    <h1>
                      {admin.hireDate
                        ? new Date(admin.hireDate).toLocaleDateString()
                        : "dd/mm/yyyy"}
                    </h1>
                  </div>

                  {/* Salary section */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Basic Salary */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="salaryBasic"
                        className="text-sm font-medium text-gray-700"
                      >
                        Basic Salary
                      </label>
                      <h1>{admin.salary.basic}</h1>
                    </div>

                    {/* Bonus */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="salaryBonus"
                        className="text-sm font-medium text-gray-700"
                      >
                        Bonus
                      </label>
                      <h1>{admin.salary.bonus}</h1>
                    </div>
                  </div>

                  {/* Leaves + Status Section */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Total Leaves */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="leavesTotal"
                        className="text-sm font-medium text-gray-700"
                      >
                        Total Leaves
                      </label>
                      <h1>{admin.leaves.totalLeaves}</h1>
                    </div>

                    {/* Leaves Taken */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="leavesTaken"
                        className="text-sm font-medium text-gray-700"
                      >
                        Leaves Taken
                      </label>
                      <h1>
                        {admin.leaves.leavesTaken == 0
                          ? "0"
                          : admin.leaves.leavesTaken}
                      </h1>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col sm:col-span-2">
                      <label
                        htmlFor="status"
                        className="text-sm font-medium text-gray-700"
                      >
                        Status
                      </label>
                      <h1>{admin.status}</h1>
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {[
                      { id: "line1", label: "Address Line 1" },
                      { id: "line2", label: "Address Line 2" },
                      { id: "city", label: "City" },
                      { id: "state", label: "State" },
                      { id: "postalCode", label: "Postal Code" },
                      { id: "country", label: "Country" },
                    ].map((field) => (
                      <div key={field.id} className="flex flex-col">
                        <label
                          htmlFor={field.id}
                          className="text-sm font-medium text-gray-700"
                        >
                          {field.label}
                        </label>
                        <h1>{admin.address[field.id]}</h1>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800 transition-colors"
                >
                  Assign as Admin
                </button>
              </Fragment>
            ) : (
              <div className="flex-1 flex flex-col items-start gap-2">
                <h1 className="font-semibold text-lg">Select an Employee</h1>
                {employees.map((emp) => {
                  return (
                    <button
                      type="button"
                      key={emp._id}
                      className=" bg-slate-100 w-full text-left px-4 py-2 rounded-md cursor-pointer hover:bg-blue-100"
                      onClick={() => {
                        setAdmin(emp);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-sm font-bold text-blue-400">
                          {/* Initials fallback */}
                          {(() => {
                            const names = emp.fullName.trim().split(" ");
                            const first = names[0] ? names[0][0] : "";
                            const last =
                              names.length > 1
                                ? names[names.length - 1][0]
                                : "";
                            return (first + last).toUpperCase();
                          })()}
                        </div>
                        <div>
                          {emp.fullName}
                          <br />
                          <div className="flex gap-3 text-sm text-slate-500">
                            <h1>
                              {emp.department == "" || !emp.department
                                ? "Null"
                                : emp.department.name}
                              {" : "}
                            </h1>
                            <h1>{emp.designation}</h1>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
            <button
              type="button"
              onClick={() => {
                setAdmin(null);
                onClose(false);
              }}
              className="bg-red-500 p-2 rounded text-white"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/70 z-50">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};
