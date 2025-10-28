import { Edit, Trash2, FileText } from "lucide-react";

function SalaryProccessedTable({
  ProccesedSalaryData,
  calculatePendingSalary,
}) {
  return (
    <table className="min-w-full border-collapse bg-white">
      <thead className="bg-gray-100 text-gray-700 text-sm uppercase font-semibold">
        <tr>
          <th className="py-3 px-4 text-left">Employee</th>
          <th className="py-3 px-4 text-left">Department</th>
          <th className="py-3 px-4 text-left">Salary</th>
          <th className="py-3 px-4 text-left">Bonus</th>
          <th className="py-3 px-4 text-left truncate">Processed Salary</th>
          <th className="py-3 px-4 text-left truncate">Processed Bonus</th>
          <th className="py-3 px-4 text-left truncate">Due Salary</th>
          <th className="py-3 px-4 text-left">Month</th>
          <th className="py-3 px-4 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {ProccesedSalaryData.length > 0 ? (
          ProccesedSalaryData.map((sal, idx) => (
            <tr
              key={idx}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4 font-medium truncate">{sal.fullName}</td>
              <td className="py-3 px-4 truncate">
                {sal.department?.name || "N/A"}
              </td>
              <td className="py-3 px-4">
                ₹{sal.salary.basic.toLocaleString()}
              </td>
              <td className="py-3 px-4">
                {sal.salary.bonus ? (
                  <>₹{sal.salary.bonus.toLocaleString()}</>
                ) : (
                  "N/A"
                )}
              </td>
              <td className="py-3 px-4 font-semibold">
                ₹{sal.salary.proccessed.toLocaleString()}
              </td>
              <td className="py-3 px-4 font-semibold">
                {sal.salary.bonusProccessed ? (
                  <>₹{sal.salary.bonusProccessed.toLocaleString()}</>
                ) : (
                  "N/A"
                )}
              </td>
              <td className="py-3 px-4 font-semibold">
                ₹{calculatePendingSalary(sal)}
              </td>
              <td className="py-3 px-4 truncate">
                {sal.salary.lastProccessedMonth
                  ? new Date(sal.salary.lastProccessedMonth).toLocaleString(
                      "default",
                      {
                        month: "short",
                        year: "numeric",
                      }
                    )
                  : "N/A"}
              </td>
              <td className="py-3 px-4 flex justify-center gap-3">
                <button className="text-red-500 hover:text-red-400">
                  <Trash2 size={18} />
                </button>
                <button className="text-green-500 hover:text-green-400">
                  <FileText size={18} />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="py-6 text-center text-gray-500 italic">
              No salary records found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default SalaryProccessedTable;
