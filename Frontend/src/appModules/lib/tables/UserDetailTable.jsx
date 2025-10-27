import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDetailTable = ({ users }) => {
  return (
    <div className="bg-white border border-stone-200 shadow-sm p-4 mb-10 flex flex-col gap-2 rounded-lg">
      {/* Table Header */}
      <div className="flex border-b gap-3 border-stone-300 p-2 text-sm font-semibold text-slate-600">
        <h1 className="flex-[1.2]">User ID</h1>
        <h1 className="flex-1">Name</h1>
        <h1 className="flex-[1.5]">Email</h1>
        <h1 className="flex-[0.5]"></h1>
      </div>

      {/* Table Body */}
      <div>
        {users.map((user, index) => (
          <UserTableRow key={index} data={user} />
        ))}
      </div>
    </div>
  );
};

const UserTableRow = ({ data }) => {
  return (
    <div className="relative flex justify-center border-b gap-3 border-stone-200 p-2 text-sm hover:bg-stone-50 transition">
      <span className="flex-[1.2] flex items-center truncate">{data.id}</span>
      <span className="flex-1 flex items-center truncate">{data.name}</span>
      <span className="flex-[1.5] flex items-center truncate">
        {data.email}
      </span>

      <div className="flex-[0.5] flex items-center justify-center">
        <Trash2
          size={16}
          className="cursor-pointer text-red-500 hover:text-red-600"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default UserDetailTable;
