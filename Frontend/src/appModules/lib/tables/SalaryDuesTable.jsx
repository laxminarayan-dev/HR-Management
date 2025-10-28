import { Pen } from "lucide-react";
function SalaryDuesTable({ emps, calculatePendingSalary }) {
  return (
    <table className="min-w-full border-collapse bg-white">
      <thead className="bg-gray-100 text-gray-700 text-sm uppercase font-semibold">
        <tr>
          <th className="py-3 px-4 text-left truncate">Employee</th>
          <th className="py-3 px-4 text-left truncate">Department</th>
          <th className="py-3 px-4 text-left truncate">Salary</th>
          <th className="py-3 px-4 text-left truncate">Last Proccessed</th>
          <th className="py-3 px-4 text-left truncate">Last Dues</th>
          <th className="py-3 px-4 text-left truncate">Total Due</th>
          <th className="py-3 px-4 text-left truncate">
            Last Salary Proccesed
          </th>
        </tr>
      </thead>
      <tbody>
        {emps.length > 0 ? (
          emps.map((emp, ind) => (
            <tr
              key={ind}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4 font-medium truncate">{emp.fullName}</td>
              <td className="py-3 px-4 truncate">
                {emp.department?.name || "Null"}
              </td>
              <td className="py-3 px-4">
                ₹{emp.salary.basic.toLocaleString()}
              </td>
              <td className="py-3 px-4">
                ₹{emp.salary.proccessed.toLocaleString()}
              </td>
              <td className="py-3 px-4">₹{emp.salary.due}</td>
              <td className="py-3 px-4 font-semibold">
                ₹{calculatePendingSalary(emp)}
              </td>
              <td className="py-3 px-4">
                {new Date(emp.salary.lastProccessedMonth).toLocaleString(
                  "default",
                  {
                    month: "short",
                    year: "numeric",
                  }
                )}
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

export default SalaryDuesTable;
