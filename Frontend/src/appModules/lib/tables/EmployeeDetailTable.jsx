import CryptoJS from "crypto-js";
import { Pen } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const DetailTableRow = ({ data, generateEmpId }) => {
  const navigate = useNavigate();
  return (
    <div className="relative flex justify-center border-b gap-3 border-stone-200 p-2 text-sm hover:bg-stone-50 transition">
      <span className="flex-[1.2] flex items-center truncate">
        {generateEmpId(data._id)}
      </span>
      <span className="flex-1 flex items-center truncate">{data.fullName}</span>
      <span className="flex-1 flex items-center">{data.phone}</span>
      <span className="flex-1 hidden sm:flex items-center">
        {data.department?.name}
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
          onClick={() => navigate(`/employee/${data._id}`)}
        />
      </div>
    </div>
  );
};

export default EmployeeDetailTable;
