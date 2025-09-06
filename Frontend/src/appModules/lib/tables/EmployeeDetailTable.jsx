import CryptoJS from "crypto-js";
import { User, Pen } from "lucide-react";
import { useState } from "react";

const EditEmployeeModal = ({ employee, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white rounded-lg p-6 w-96 relative shadow-lg">
      <button
        className="absolute top-2 right-3 text-xl hover:text-red-500"
        onClick={onClose}
      >
        ×
      </button>
      <h2 className="text-lg font-bold mb-4">Employee Details</h2>

      {/* Show full employee details */}
      <div className="space-y-2 text-sm">
        <p>
          <b>Name:</b> {employee.fullName}
        </p>
        <p>
          <b>Email:</b> {employee.email}
        </p>
        <p>
          <b>Phone:</b> {employee.phone}
        </p>
        <p>
          <b>Department:</b> {employee.department}
        </p>
        <p>
          <b>Designation:</b> {employee.designation}
        </p>
        <p>
          <b>Status:</b> {employee.status}
        </p>
        <p>
          <b>DOB:</b> {new Date(employee.dob).toLocaleDateString()}
        </p>
        <p>
          <b>Hire Date:</b> {new Date(employee.hireDate).toLocaleDateString()}
        </p>
        <p>
          <b>Salary:</b> {employee.salary.basic.toLocaleString()}{" "}
          {employee.salary.currency}
        </p>
        <p>
          <b>Bonus:</b> {employee.salary.bonus.toLocaleString()}
        </p>
        <p>
          <b>Leaves:</b> {employee.leaves.leavesTaken} taken /{" "}
          {employee.leaves.leavesRemaining} remaining
        </p>
        <p>
          <b>Address:</b> {employee.address.line1}, {employee.address.line2},{" "}
          {employee.address.city}, {employee.address.state} -{" "}
          {employee.address.postalCode}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-3">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Edit
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Remove
        </button>
      </div>
    </div>
  </div>
);

const EmployeeDetailTable = ({ tableData }) => {
  const [modalEmployee, setModalEmployee] = useState(null);

  const generateEmpId = (mongoId) => {
    const hash = CryptoJS.MD5(mongoId).toString();
    return "EMP" + hash.substring(0, 6).toUpperCase();
  };

  return (
    <div className="bg-white border border-stone-200 shadow-sm p-4 mb-10 flex flex-col gap-2 rounded-lg">
      {/* table header */}
      <div className="flex border-b gap-3 border-stone-300 p-2 text-sm font-semibold text-slate-600">
        <h1 className="flex-[1.2]">EmpId</h1>
        <h1 className="flex-1">Name</h1>
        <h1 className="flex-1">Phone</h1>
        <h1 className="flex-1 hidden sm:block">Department</h1>
        <h1 className="flex-1 hidden sm:block">Designation</h1>
        <h1 className="flex-1 hidden lg:block">Salary</h1>
        <h1 className="flex-1 hidden lg:block">Leaves Avail.</h1>
        <h1 className="flex-1 hidden lg:block">Leaves Taken</h1>
        <h1 className="flex-1 hidden xl:block">Joining Date</h1>
        <h1 className="flex-[1.5] hidden xl:block">Address</h1>
        <h1 className="flex-[0.5]"></h1>
      </div>

      {/* table body */}
      <div>
        {tableData.map((emp, index) => (
          <DetailTableRow
            key={index}
            data={emp}
            onEditClick={setModalEmployee}
            generateEmpId={generateEmpId}
          />
        ))}
      </div>

      {/* modal */}
      {modalEmployee && (
        <EditEmployeeModal
          employee={modalEmployee}
          onClose={() => setModalEmployee(null)}
        />
      )}
    </div>
  );
};

const DetailTableRow = ({ data, onEditClick, generateEmpId }) => (
  <div className="relative flex justify-center border-b gap-3 border-stone-200 p-2 text-sm hover:bg-stone-50 transition">
    <span className="flex-[1.2] flex items-center truncate">
      {generateEmpId(data._id)}
    </span>
    <span className="flex-1 flex items-center truncate">{data.fullName}</span>
    <span className="flex-1 flex items-center">{data.phone}</span>
    <span className="flex-1 hidden sm:flex items-center">
      {data.department}
    </span>
    <span className="flex-1 hidden sm:flex items-center">
      {data.designation}
    </span>
    <span className="flex-1 hidden lg:flex items-center">
      {data.salary.basic.toLocaleString()} {data.salary.currency}
    </span>
    <span className="flex-1 hidden lg:flex items-center">
      {data.leaves.leavesRemaining}
    </span>
    <span className="flex-1 hidden lg:flex items-center">
      {data.leaves.leavesTaken}
    </span>
    <span className="flex-1 hidden xl:flex items-center">
      {new Date(data.hireDate).toLocaleDateString()}
    </span>
    <div className="flex-[1.5] hidden xl:flex items-center min-w-0">
      <span
        className="truncate block"
        title={`${data.address.line1}, ${data.address.line2}, ${data.address.city}, ${data.address.state}`}
      >
        {`${data.address.line1}, ${data.address.line2}, ${data.address.city}, ${data.address.state}`}
      </span>
    </div>
    <div className="flex-[0.5] flex items-center justify-center">
      <Pen
        size={16}
        className="cursor-pointer text-blue-600 hover:text-blue-800"
        onClick={() => onEditClick(data)}
      />
    </div>
  </div>
);

export default EmployeeDetailTable;
