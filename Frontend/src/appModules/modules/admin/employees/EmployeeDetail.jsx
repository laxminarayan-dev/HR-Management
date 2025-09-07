import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

export default function EmployeeDetail() {
  const initialData = {
    salary: {
      basic: 0,
      bonus: 0,
      currency: "INR",
    },
    leaves: {
      totalLeaves: 0,
      leavesTaken: 0,
      leavesRemaining: 0,
    },
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
    },
    _id: "",
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    department: "",
    designation: "",
    hireDate: "",
    status: "",
    __v: 0,
  };
  const [updateEmpModel, setUpdateEmpModel] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [response, setResponse] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emp/detail/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch employee");
        return res.json();
      })
      .then((data) => {
        if (data.emp) {
          setEmployee(data.emp);
        } else {
          setEmployee(initialData);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-white p-8 w-full min-h-60">
      {employee == null ? (
        <div className="w-full h-90 flex justify-center items-center">
          <div className="animate-spin border border-b-white border-l-0 w-10 h-10 rounded-full"></div>
        </div>
      ) : (
        <React.Fragment>
          <div>
            <div className="flex items-center gap-4 mb-6">
              {/* Placeholder for an employee photo */}
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-400">
                {/* Initials fallback */}
                {(() => {
                  const names = employee.fullName.trim().split(" ");
                  const first = names[0] ? names[0][0] : "";
                  const last =
                    names.length > 1 ? names[names.length - 1][0] : "";
                  return (first + last).toUpperCase();
                })()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-700">
                  {employee.fullName || "Employee Name"}
                </h2>
                <span className="block text-sm text-gray-500">
                  {employee.designation || "Designation"}
                </span>
              </div>
              <span
                className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${
                  employee.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {employee.status || "Status"}
              </span>
            </div>

            <div className="border-t border-gray-100 pt-6 mb-6 grid grid-cols-2 gap-5 text-sm">
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <div className="text-gray-500">{employee.email}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Phone:</span>
                <div className="text-gray-500">{employee.phone}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Department:</span>
                <div className="text-gray-500">{employee.department}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">DOB:</span>
                <div className="text-gray-500">
                  {employee.dob
                    ? new Date(employee.dob).toLocaleDateString()
                    : ""}
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Hire Date:</span>
                <div className="text-gray-500">
                  {employee.hireDate
                    ? new Date(employee.hireDate).toLocaleDateString()
                    : ""}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl pb-4">
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                Compensation
              </h3>
              <div className="flex flex-col gap-1">
                <div>
                  <span className="text-gray-600">Salary:</span>{" "}
                  <span className="font-bold">
                    {employee.salary.basic.toLocaleString()}{" "}
                    {employee.salary.currency}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Bonus:</span>{" "}
                  <span>{employee.salary.bonus.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl pb-4">
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                Leaves
              </h3>
              <div>
                <span className="text-gray-600">
                  {employee.leaves.leavesTaken} taken
                </span>{" "}
                /{" "}
                <span className="text-gray-600">
                  {employee.leaves.leavesRemaining} remaining
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl mb-8">
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                Address
              </h3>
              <div className="text-gray-600">
                {employee.address.line1}, {employee.address.line2},{" "}
                {employee.address.city}, {employee.address.state} -{" "}
                {employee.address.postalCode}, {employee.address.country}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setUpdateEmpModel(true)}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-bold shadow hover:bg-blue-700"
              >
                Edit
              </button>
              <button className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white font-bold shadow hover:bg-red-600">
                Remove
              </button>
            </div>
            {
              <UpdateEmployeeModal
                initialData={employee}
                open={updateEmpModel}
                onClose={setUpdateEmpModel}
                onUpdate={setEmployee}
                setResponse={setResponse}
              />
            }
          </div>
          {response && (
            <div className="absolute top-20 right-1 transform -translate-x-1/2 bg-gray-800 p-4 rounded shadow-lg">
              <p
                className={response.success ? "text-green-500" : "text-red-500"}
              >
                {response.msg || "Default Message"}
              </p>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export const UpdateEmployeeModal = ({
  initialData,
  open,
  onClose,
  onUpdate,
  setResponse,
}) => {
  const initialForm = {
    fullName: initialData.fullName,
    email: initialData.email,
    phone: initialData.phone,
    dob: initialData.dob,
    department: initialData.department,
    designation: initialData.designation,
    hireDate: initialData.hireDate,
    status: initialData.status,
    salaryBasic: initialData.salary.basic,
    salaryBonus: initialData.salary.bonus,
    leavesTotal: initialData.leaves.totalLeaves,
    leavesTaken: initialData.leaves.leavesTaken,
    addressLine1: initialData.address.line1,
    addressLine2: initialData.address.line2,
    addressCity: initialData.address.city,
    addressState: initialData.address.state,
    addressPostalCode: initialData.address.postalCode,
    addressCountry: initialData.address.country,
    id: initialData._id,
  };
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [objComp, setObjComp] = useState(true);
  const departments = [{ _id: 1, name: "Tech" }];
  const designations = [{ _id: 1, name: "Manager" }];
  const formRef = useRef(null);

  // use effect for updating value form when model is opened
  useEffect(() => {
    setForm({
      fullName: initialData.fullName,
      email: initialData.email,
      phone: initialData.phone,
      dob: initialData.dob,
      department: initialData.department,
      designation: initialData.designation,
      hireDate: initialData.hireDate,
      status: initialData.status,
      salaryBasic: initialData.salary.basic,
      salaryBonus: initialData.salary.bonus,
      leavesTotal: initialData.leaves.totalLeaves,
      leavesTaken: initialData.leaves.leavesTaken,
      addressLine1: initialData.address.line1,
      addressLine2: initialData.address.line2,
      addressCity: initialData.address.city,
      addressState: initialData.address.state,
      addressPostalCode: initialData.address.postalCode,
      addressCountry: initialData.address.country,
      id: initialData._id,
    });
  }, [open]);

  //   use effect for comparing object and setting the update button
  useEffect(() => {
    setObjComp(deepCompare(initialForm, form));
  }, [form]);

  // use effect for closing the model when click outside
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

  function formatDateForInput(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

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
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emp/update/${form.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.emp) {
          onUpdate(data.emp);
          onClose(false);
          setResponse({ success: true, msg: data.message });
        } else {
          setResponse({ success: false, msg: data.message || "Update failed" });
        }
      })
      .catch((err) => {
        console.error(err);
        setResponse({
          success: false,
          msg: "Something went wrong. Try again!",
        });
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => setResponse(null), 2000);
      });

    // end api
  }

  function deepCompare(obj1, obj2) {
    if (obj1 === obj2) return true; // same reference or primitive value

    if (obj1 == null || obj2 == null) return false;

    if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;

    const keys1 = Object.getOwnPropertyNames(obj1);
    const keys2 = Object.getOwnPropertyNames(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
      if (!keys2.includes(key)) return false;

      if (!deepCompare(obj1[key], obj2[key])) return false;
    }

    return true;
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div
        ref={formRef}
        className="relative bg-white p-6 rounded-lg shadow-lg max-w-xl w-full overflow-y-hidden  h-screen sm:max-h-[90vh] pt-12 sm:pt-5 sm:pb-10"
      >
        <h2 className="text-2xl font-bold mb-4">Update Employee</h2>
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

            <div className="grid gap-1">
              <label htmlFor="dob" className="text-sm font-medium">
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                className="border w-full border-gray-300 rounded-lg py-1 px-3"
                value={formatDateForInput(form.dob)}
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
                value={formatDateForInput(form.hireDate)}
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
                { id: "addressCountry", label: "Country", readOnly: true },
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
                    readOnly={field.readOnly || false}
                    disabled={field.readOnly || false}
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={objComp}
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800 disabled:bg-blue-300 transition-colors"
            >
              Update
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};
