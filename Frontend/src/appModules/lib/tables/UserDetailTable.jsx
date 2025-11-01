import { Trash2 } from "lucide-react";
import CryptoJS from "crypto-js";

const generateUserId = (mongoId) => {
  const hash = CryptoJS.MD5(mongoId).toString();
  return "USR" + hash.substring(0, 6).toUpperCase();
};

const UserDetailTable = ({ users, handleDelete }) => {
  return (
    <div className="bg-white border border-stone-200 shadow-sm p-4 mb-10 flex flex-col gap-2 rounded-lg max-w-6xl mx-auto">
      {/* Table Header */}
      <div className="flex border-b gap-1 border-stone-300 p-2 text-sm font-semibold text-slate-600">
        <h1 className="flex-[1]">User ID</h1>
        <h1 className="flex-1">Name</h1>
        <h1 className="flex-[1]">Email</h1>
        <h1 className="flex-[1] hidden md:block">Department</h1>
        <h1 className="flex-[1] hidden md:block">Designation</h1>
        <h1 className="flex-[0.5]"></h1>
      </div>

      {/* Table Body */}
      <div>
        {users.map((user, index) => (
          <UserTableRow key={index} handleDelete={handleDelete} data={user} />
        ))}
      </div>
    </div>
  );
};

const UserTableRow = ({ data, handleDelete }) => {
  return (
    <div className="relative flex justify-center border-b gap-1 border-stone-200 p-2 text-sm hover:bg-stone-50 transition">
      <span className="flex-[1] flex items-center truncate">
        {generateUserId(data._id)}
      </span>
      <span className="flex-1 flex items-center truncate">{data.fullName}</span>
      <span className="flex-[1] flex items-center truncate">{data.email}</span>
      <span className="flex-[1] items-center truncate hidden md:flex">
        {data.department?.name || "N/A"}
      </span>
      <span className="flex-[1] items-center truncate hidden md:flex">
        {data?.designation || "N/A"}
      </span>

      <div className="flex-[0.5] flex items-center justify-center">
        <Trash2
          size={16}
          className="cursor-pointer text-red-500 hover:text-red-600"
          onClick={() => {
            console.log(data);

            handleDelete(data._id);
          }}
        />
      </div>
    </div>
  );
};

export default UserDetailTable;
