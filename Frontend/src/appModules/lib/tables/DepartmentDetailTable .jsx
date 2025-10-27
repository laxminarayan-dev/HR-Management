import { Pen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DepartmentDetailTable = ({ tableData }) => {
  return (
    <div className="bg-white border border-stone-200 shadow-sm p-4 mb-10 flex flex-col gap-2 rounded-lg">
      <div className="flex border-b gap-2 border-stone-300 p-2 text-sm font-semibold text-slate-600">
        <h1 className="flex-[1.2]">Name</h1>
        <h1 className="flex-1 block">Head</h1>
        <h1 className="flex-1 hidden lg:block">Budget</h1>
        <h1 className="flex-1 hidden xl:block">Location</h1>
        <h1 className="flex-1 hidden xl:block">Status</h1>
        <h1 className="flex-[0.5]"></h1>
      </div>

      <div>
        {tableData.map((dept, i) => (
          <DepartmentTableRow key={i} data={dept} />
        ))}
      </div>
    </div>
  );
};

const DepartmentTableRow = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="flex border-b gap-2 border-stone-200 p-2 text-sm hover:bg-stone-50 transition">
      <span className="flex-[1.2] flex items-center truncate">{data.name}</span>
      <span className="flex-1  items-center truncate">
        {data.head ? data.head.fullName : "—"}
      </span>
      <span className="flex-1 hidden lg:flex items-center">
        ₹{data.budget?.allocated?.toLocaleString()} {data.budget?.currency}
      </span>
      <span className="flex-1 hidden xl:flex items-center truncate">
        {data.location?.city}, {data.location?.state}
      </span>
      <span className="flex-1 hidden xl:flex items-center">{data.status}</span>
      <div className="flex-[0.5] flex items-center justify-center">
        <Pen
          size={16}
          className="cursor-pointer text-blue-600 hover:text-blue-800"
          onClick={() => navigate(`/department/${data._id}`)}
        />
      </div>
    </div>
  );
};

export default DepartmentDetailTable;
