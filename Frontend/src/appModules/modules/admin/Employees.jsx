import { useRef, useEffect, useState } from "react";
import EmployeeDetailTable from "../../lib/tables/EmployeeDetailTable";

const Employees = () => {
  const [emplist, setEmplist] = useState([]);
  const [addEmpModel, setAddEmpModel] = useState(false);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emp/allEmployees`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.emps) {
          setEmplist(data.emps);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Employee Management</h1>
      {/* Employee management content goes here */}

      <div className="flex items-center justify-between pb-5">
        <div>
          {emplist.length == 0 && (
            <div>
              <h1>No Employee found!</h1>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setAddEmpModel(true)}
          className="border p-1 px-3 rounded-full cursor-pointer hover:bg-gray-900 hover:text-gray-100"
        >
          Add Emp
        </button>
      </div>
      {console.log(emplist)}
      {emplist.length > 0 && <EmployeeDetailTable tableData={emplist} />}
      {<AddEmployeeModal open={addEmpModel} onClose={setAddEmpModel} />}
    </div>
  );
};

export default Employees;

export const AddEmployeeModal = ({ open, onClose, onAdd }) => {
  const [form, setForm] = useState({
    id: "",
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    department: "",
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
  });

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Compose salary, leaves, address objects
    const empData = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      dob: form.dob,
      department: form.department,
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
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emp/addEmp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
    // end api
  }

  const departments = [{ _id: 1, name: "Tech" }];
  const designations = [{ _id: 1, name: "Manager" }];

  const formRef = useRef(null);

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <h2 className="text-2xl font-bold mb-4">Add Employee</h2>
        <div
          ref={formRef}
          className="h-[80vh] overflow-y-scroll overflow-x-hidden p-4"
        >
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

            <div className="grid gap-1">
              <label htmlFor="dob" className="text-sm font-medium">
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                className="border w-full border-gray-300 rounded-lg py-1 px-3"
                value={form.dob}
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
                value={form.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep.name}>
                    {dep.name}
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

            <div className="grid gap-1">
              <label htmlFor="hireDate" className="text-sm font-medium">
                Hire Date
              </label>
              <input
                id="hireDate"
                name="hireDate"
                type="date"
                className="border w-full border-gray-300 rounded-lg py-1 px-3"
                value={form.hireDate}
                onChange={handleChange}
              />
            </div>

            {/* Salary section */}
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="grid gap-1">
                <label htmlFor="salaryBasic" className="text-sm font-medium">
                  Basic Salary
                </label>
                <input
                  id="salaryBasic"
                  name="salaryBasic"
                  type="number"
                  className="border border-gray-300 rounded-lg py-1 px-3"
                  value={form.salaryBasic}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="salaryBonus" className="text-sm font-medium">
                  Bonus
                </label>
                <input
                  id="salaryBonus"
                  name="salaryBonus"
                  type="number"
                  className="border border-gray-300 rounded-lg py-1 px-3"
                  value={form.salaryBonus}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Leaves section */}
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="grid gap-1">
                <label htmlFor="leavesTotal" className="text-sm font-medium">
                  Total Leaves
                </label>
                <input
                  id="leavesTotal"
                  name="leavesTotal"
                  type="number"
                  className="border border-gray-300 rounded-lg py-1 px-3"
                  value={form.leavesTotal}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="leavesTaken" className="text-sm font-medium">
                  Leaves Taken
                </label>
                <input
                  id="leavesTaken"
                  name="leavesTaken"
                  type="number"
                  className="border border-gray-300 rounded-lg py-1 px-3"
                  value={form.leavesTaken}
                  onChange={handleChange}
                />
              </div>
              {/* Status */}
              <div className="grid gap-1">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="border border-gray-300 rounded-lg py-1 px-3"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>

            {/* Address section */}
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { id: "addressLine1", label: "Address Line 1" },
                { id: "addressLine2", label: "Address Line 2" },
                { id: "addressCity", label: "City" },
                { id: "addressState", label: "State" },
                { id: "addressPostalCode", label: "Postal Code" },
                { id: "addressCountry", label: "Country" },
              ].map((field) => (
                <div key={field.id} className="grid gap-1">
                  <label htmlFor={field.id} className="text-sm font-medium">
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    className="border border-gray-300 rounded-lg py-1 px-3"
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
    </div>
  );
};
