import { useRef, useEffect, useState } from "react";
import EmployeeDetailTable from "../../../lib/tables/EmployeeDetailTable";

const Employees = () => {
  const [emplist, setEmplist] = useState(null);
  const [addEmpModel, setAddEmpModel] = useState(false);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emp/allEmployees`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.emps) {
          setEmplist(data.emps);
        } else {
          setEmplist([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-8">
      {/* Employee management content goes here */}

      <div className="flex items-center justify-between mb-10 ">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <button
          type="button"
          onClick={() => setAddEmpModel(true)}
          className="border p-1 px-3 rounded-full cursor-pointer hover:bg-gray-900 hover:text-gray-100"
        >
          Add Employee
        </button>
      </div>
      {emplist == null ? (
        <div className="w-full h-90 flex justify-center items-center">
          <div className="animate-spin border border-b-white border-l-0 w-10 h-10 rounded-full"></div>
        </div>
      ) : emplist.length == 0 ? (
        <div>
          <h1>No Employee found!</h1>
        </div>
      ) : (
        emplist.length > 0 && <EmployeeDetailTable tableData={emplist} />
      )}

      {
        <AddEmployeeModal
          open={addEmpModel}
          onClose={setAddEmpModel}
          onAdd={setEmplist}
        />
      }
    </div>
  );
};

export default Employees;

export const AddEmployeeModal = ({ open, onClose, onAdd }) => {
  const initialData = {
    id: "",
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    department: null,
    designation: "",
    salaryBasic: "",
    salaryBonus: "",
    leavesTotal: 24,
    leavesTaken: 0,
    status: "Active",
    addressLine1: "",
    addressLine2: "",
    addressCity: "",
    addressState: "",
    addressPostalCode: "",
    addressCountry: "India",
    hireDate: "",
  };
  const [form, setForm] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const designations = [
    { _id: 1, name: "Manager" },
    { _id: 2, name: "Senior Manager" },
    { _id: 3, name: "Assistant Manager" },
    { _id: 4, name: "Software Engineer" },
    { _id: 5, name: "Sales Executive" },
    { _id: 6, name: "HR Specialist" },
    { _id: 7, name: "Accountant" },
    { _id: 8, name: "Intern" },
    { _id: 9, name: "Team Lead" },
    { _id: 10, name: "Director" },
  ];

  const formRef = useRef(null);
  const [defaultDate, setDefaultDate] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    setToday(formattedToday);
    today.setFullYear(today.getFullYear() - 18);
    const formattedDate = today.toISOString().split("T")[0];
    setDefaultDate(formattedDate);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose(); // 🔥 call close function
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/department/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.departments) setDepartments(data.departments);
        else {
          setDepartments([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // Compose salary, leaves, address objects
    const empData = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      dob: form.dob,
      department: form.department || { _id: "", name: "" },
      designation: form.designation,
      hireDate: form.hireDate,
      salary: {
        basic: Number(form.salaryBasic),
        bonus: Number(form.salaryBonus),
      },
      leaves: {
        totalLeaves: Number(form.leavesTotal),
        leavesTaken: Number(form.leavesTaken),
        leavesRemaining: Number(form.leavesTotal) - Number(form.leavesTaken),
      },
      status: form.status,
      address: {
        line1: form.addressLine1,
        line2: form.addressLine2,
        city: form.addressCity,
        state: form.addressState,
        postalCode: form.addressPostalCode,
        country: form.addressCountry,
      },
    };

    // call api
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emp/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.emps) {
          onAdd(data.emps);
          setForm(initialData);
          onClose(false);
          setLoading(false);
        }
      })
      .catch((err) => console.error(err));
    // end api
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div
        ref={formRef}
        className="relative bg-white p-6 rounded-lg shadow-lg max-w-xl w-full overflow-y-hidden  h-screen sm:max-h-[90vh] pt-12 sm:pt-5 sm:pb-10"
      >
        <h2 className="text-2xl font-bold mb-4">Add Employee</h2>
        <div className="h-[100%] overflow-y-scroll overflow-x-hidden p-4 pb-14 sm:pb-6">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-1">
              <label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                className="border border-gray-300 rounded-lg py-1 px-3"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="border border-gray-300 rounded-lg py-1 px-3"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-1">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                className="border border-gray-300 rounded-lg py-1 px-3"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            {/* DOB */}
            <div className="grid gap-1">
              <label htmlFor="dob" className="text-sm font-medium">
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                className="border w-full border-gray-300 rounded-lg py-1 px-3"
                defaultValue={defaultDate}
                max={defaultDate}
                onChange={handleChange}
              />
            </div>

            {/* Department */}
            <div className="grid gap-1">
              <label htmlFor="department" className="text-sm font-medium">
                Department
              </label>
              <select
                id="department"
                name="department"
                className="border border-gray-300 rounded-lg py-1 px-3"
                value={form.department?._id}
                onChange={(e) => {
                  const depId = e.target.value;
                  const selectedDep = departments.find(
                    (dep) => dep?._id === depId
                  );
                  setForm({
                    ...form,
                    department:
                      { _id: selectedDep._id, name: selectedDep.name } || null, // ✅ store full object if you want
                  });
                }}
              >
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep?._id} value={dep?._id}>
                    {dep?.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Designation */}
            <div className="grid gap-1">
              <label htmlFor="designation" className="text-sm font-medium">
                Designation
              </label>
              <select
                id="designation"
                name="designation"
                className="border border-gray-300 rounded-lg py-1 px-3"
                value={form.designation}
                onChange={handleChange}
                required
              >
                <option value="">Select Designation</option>
                {designations.map((des) => (
                  <option key={des._id} value={des.name}>
                    {des.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Hire Date */}
            <div className="grid gap-1">
              <label htmlFor="hireDate" className="text-sm font-medium">
                Hire Date
              </label>
              <input
                id="hireDate"
                name="hireDate"
                type="date"
                className="border w-full border-gray-300 rounded-lg py-1 px-3"
                defaultValue={today}
                min={today}
                onChange={handleChange}
              />
            </div>

            {/* Salary section */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Basic Salary */}
              <div className="flex flex-col">
                <label
                  htmlFor="salaryBasic"
                  className="text-sm font-medium text-gray-700"
                >
                  Basic Salary <span className="text-red-500">*</span>
                </label>
                <input
                  id="salaryBasic"
                  name="salaryBasic"
                  type="number"
                  className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={form.salaryBasic}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Bonus */}
              <div className="flex flex-col">
                <label
                  htmlFor="salaryBonus"
                  className="text-sm font-medium text-gray-700"
                >
                  Bonus
                </label>
                <input
                  id="salaryBonus"
                  name="salaryBonus"
                  type="number"
                  className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={form.salaryBonus}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Leaves + Status Section */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Total Leaves */}
              <div className="flex flex-col">
                <label
                  htmlFor="leavesTotal"
                  className="text-sm font-medium text-gray-700"
                >
                  Total Leaves
                </label>
                <input
                  id="leavesTotal"
                  name="leavesTotal"
                  type="number"
                  className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={form.leavesTotal}
                  onChange={handleChange}
                />
              </div>

              {/* Leaves Taken */}
              <div className="flex flex-col">
                <label
                  htmlFor="leavesTaken"
                  className="text-sm font-medium text-gray-700"
                >
                  Leaves Taken
                </label>
                <input
                  id="leavesTaken"
                  name="leavesTaken"
                  type="number"
                  className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={form.leavesTaken}
                  onChange={handleChange}
                />
              </div>

              {/* Status */}
              <div className="flex flex-col sm:col-span-2">
                <label
                  htmlFor="status"
                  className="text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>

            {/* Address Section */}
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              {[
                { id: "addressLine1", label: "Address Line 1" },
                { id: "addressLine2", label: "Address Line 2" },
                { id: "addressCity", label: "City" },
                { id: "addressState", label: "State" },
                { id: "addressPostalCode", label: "Postal Code" },
                { id: "addressCountry", label: "Country" },
              ].map((field) => (
                <div key={field.id} className="flex flex-col">
                  <label
                    htmlFor={field.id}
                    className="text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    value={form[field.id]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800 transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => onClose(false)}
              className="bg-red-500 p-2 rounded text-white"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/70 bg-opacity-60 z-50">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};
