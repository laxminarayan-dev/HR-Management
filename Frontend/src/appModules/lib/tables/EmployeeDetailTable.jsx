import { User, Pen } from "lucide-react";
import { useState } from "react";

// Sample Modal implementation (expand according to your edit/remove logic)
const EditEmployeeModal = ({ employee, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white rounded-lg p-6 w-96 relative">
      <button className="absolute top-2 right-3 text-xl" onClick={onClose}>
        ×
      </button>
      <h2 className="text-lg font-bold mb-4">Edit or Remove Entry</h2>
      <div>
        <p>Name: {employee.name}</p>
        <p>Salary: {employee.salary}</p>
        <p>Leaves: {employee.leaves}</p>
        <p>Joining Date: {employee.joiningDate}</p>
        {/* Form or actions for editing/removing */}
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded mr-2">
          Edit
        </button>
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
          Remove
        </button>
      </div>
    </div>
  </div>
);

const EmployeeDetailTable = ({ tableData }) => {
  const [modalEmployee, setModalEmployee] = useState(null);

  return (
    <div className="bg-white border border-stone-100 shadow-sm p-4 mb-10 flex flex-col gap-8 rounded-lg">
      {/* table */}
      <div className="">
        {/* table header */}
        <div className="flex justify-center border-b gap-3 border-stone-300 p-1 text-sm">
          <h1 className="flex-[1.5] text-slate-500">EmpId</h1>
          <h1 className="flex-[1.5] text-slate-500">Employee</h1>
          <h1 className="flex-1 text-slate-500">Salary</h1>
          <h1 className="flex-1 text-slate-500">Leaves</h1>
          <h1 className="flex-1 text-slate-500">Joining Date</h1>
          <h1 className="flex-[0.5] text-slate-500"></h1>
        </div>
        {/* table body */}
        <div>
          {tableData.map((emp, index) => (
            <DetailTableRow
              key={index}
              data={emp}
              onEditClick={setModalEmployee}
            />
          ))}
        </div>
      </div>
      {modalEmployee && (
        <EditEmployeeModal
          employee={modalEmployee}
          onClose={() => setModalEmployee(null)}
        />
      )}
    </div>
  );
};

const DetailTableRow = ({ data, onEditClick }) => (
  <div className="relative flex justify-center border-b gap-3 border-stone-300 py-3 text-sm">
    <h1 className="flex-[1.5] flex justify-start items-center gap-1 truncate">
      <User size={16} /> {data._id}
    </h1>
    <h1 className="flex-[1.5]">{data.fullName}</h1>
    <h1 className="flex-1">{data.salary.basic}</h1>
    <h1 className="flex-1">{data.leaves.totalLeaves}</h1>
    <h1 className="flex-1">{data.hireDate}</h1>
    <h1 className="flex-[0.5]">
      <Pen
        size={16}
        className="cursor-pointer"
        onClick={() => onEditClick(data)}
      />
    </h1>
  </div>
);

export default EmployeeDetailTable;
