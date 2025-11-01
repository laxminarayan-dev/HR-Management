import CryptoJS from "crypto-js";
import { useLocation } from "react-router-dom";

function getMonthYear(monthNumber, year) {
  const date = new Date(year, monthNumber - 1); // months are 0-indexed
  const monthName = date.toLocaleString("default", { month: "short" });
  return `${monthName} ${year}`;
}

const calcMonts = (emp) => {
  const currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  const { basic } = emp.salary;
  const {
    conveyanceAllowances,
    houseRentAllowances,
    medicalAllowances,
    specialAllowances,
  } = emp.salary.allowance;
  const { epf, healthInsurance, professionalInsurance, tds } =
    emp.salary.deduction;
  let lastProccessedMonth = new Date(
    emp.salary?.lastProccessedMonth
  ).getMonth();
  let lastProccessedYear = new Date(
    emp.salary?.lastProccessedMonth
  ).getFullYear();

  const monthsWithSalary = [];
  let groccSalary =
    basic +
    conveyanceAllowances +
    houseRentAllowances +
    medicalAllowances +
    specialAllowances;
  let totalDeduction = epf + healthInsurance + professionalInsurance + tds;

  let netPayble = groccSalary - totalDeduction;

  if (!lastProccessedMonth) {
    lastProccessedMonth = new Date(emp.hireDate).getMonth();
    lastProccessedYear = new Date(emp.hireDate).getFullYear();
  }
  // CASE 1: Same year (e.g., Feb -> Dec)

  if (currentMonth > lastProccessedMonth && currentYear == lastProccessedYear) {
    for (let m = lastProccessedMonth; m < currentMonth; m++) {
      monthsWithSalary.push({
        month: getMonthYear(m + 1, lastProccessedYear),
        salary: netPayble,
      });
    }
  }
  // CASE 2: Year rollover (e.g., Nov -> Feb)
  else if (currentYear !== lastProccessedYear) {
    for (let y = lastProccessedYear; y < currentYear; y++) {
      // Process remaining months of last year
      if (y == lastProccessedYear) {
        for (let m = lastProccessedMonth; m <= 12; m++) {
          monthsWithSalary.push({
            month: getMonthYear(m + 1, y),
            salary: netPayble,
          });
        }
      } else {
        for (let m = 1; m <= 12; m++) {
          monthsWithSalary.push({
            month: getMonthYear(m + 1, y),
            salary: netPayble,
          });
        }
      }
    }
    // Then months of new year
    for (let m = 1; m < currentMonth; m++) {
      monthsWithSalary.push({
        month: getMonthYear(m, currentYear),
        salary: netPayble,
      });
    }
  }

  return monthsWithSalary;
};

const SalaryPrint = ({
  earnings = [
    {
      label: "House Rent Allowances",
      key: "houseRentAllowances",
      amount: 9408,
    },
    {
      label: "Conveyance Allowances",
      key: "conveyanceAllowances",
      amount: 1493,
    },
    { label: "Medical Allowances", key: "medicalAllowances", amount: 1167 },
    { label: "Special Allowances", key: "specialAllowances", amount: 18732 },
  ],
  deductions = [
    { label: "EPF", key: "epf", amount: 1800 },
    { label: "Health Insurance", key: "healthInsurance", amount: 500 },
    { label: "Professional Tax", key: "professionalInsurance", amount: 200 },
    { label: "TDS", key: "tds", amount: "" },
  ],
}) => {
  const location = useLocation();
  const emp = location.state?.emp;

  console.log(emp);

  const grossSalary =
    emp.salary.allowance.houseRentAllowances +
    emp.salary.allowance.conveyanceAllowances +
    emp.salary.allowance.medicalAllowances +
    emp.salary.allowance.specialAllowances +
    emp.salary.basic;

  const totalDeduction =
    emp.salary.deduction.epf +
    emp.salary.deduction.healthInsurance +
    emp.salary.deduction.professionalInsurance +
    emp.salary.deduction.tds;

  calcMonts(emp);

  const generateEmpId = (mongoId) => {
    const hash = CryptoJS.MD5(mongoId).toString();
    return "EMP" + hash.substring(0, 6).toUpperCase();
  };
  return (
    <div className="relative bg-[#fff] max-w-5xl mx-auto rounded-2xl sm:shadow-lg sm:border border-[#e8eaf5] p-8 md:p-12 overflow-hidden sm:my-20 print-area">
      {/* Header */}
      <div className="z-100 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] -rotate-12">
        <img
          className="w-[600px] opacity-10"
          src="./appsqaudz-logo.svg"
          alt=""
        />
      </div>
      <div className="text-center border-b-2 border-[#e4e7fc] pb-2 mb-3 flex flex-col justify-center items-center">
        <img className="w-90" src="./appsqaudz-logo.svg" alt="" />
        <h2 className="text-[1.15rem] md:text-[1.25rem] font-medium text-[#5561a7] mt-1 tracking-normal">
          Salary Slip for{" "}
          {emp.salary.lastProccessedMonth
            ? new Date(emp.salary.lastProccessedMonth).toLocaleString(
                "default",
                {
                  month: "short",
                  year: "numeric",
                }
              )
            : new Date(emp.hireDate).toLocaleString("default", {
                month: "short",
                year: "numeric",
              })}
        </h2>
      </div>
      {/* emp Details */}
      <div className="flex flex-col sm:flex-row md:gap-4 mb-7">
        <div className="flex-1">
          <div className="flex mb-2 gap-2">
            <div className="font-semibold text-[#6063a4] ">Name:</div>
            <div className="truncate">{emp.fullName}</div>
          </div>
          <div className="flex mb-2 gap-2">
            <div className="font-semibold text-[#6063a4] ">Emp. No:</div>
            <div>{generateEmpId(emp._id)}</div>
          </div>
          <div className="flex mb-2 gap-2">
            <div className="font-semibold text-[#6063a4] ">Designation:</div>
            <div>{emp.designation}</div>
          </div>
          <div className="flex mb-2 gap-2">
            <div className="font-semibold text-[#6063a4] ">Department:</div>
            <div>{emp.department?.name || "N/A"}</div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex mb-2 gap-2">
            <div className="font-semibold text-[#6063a4] ">Bank Name:</div>
            <div>{emp.bank?.name}</div>
          </div>
          <div className="flex mb-2 gap-2">
            <div className="font-semibold text-[#6063a4] ">IFSC Code:</div>
            <div>{emp.bank?.ifsc}</div>
          </div>
          <div className="flex mb-2 gap-2">
            <div className="font-semibold text-[#6063a4] ">A/c No.:</div>
            <div>{emp.bank?.account}</div>
          </div>
        </div>
      </div>
      {/* Earnings & Deductions */}
      <div className="flex flex-col sm:flex-row gap-6 mb-4">
        {/* Earnings */}
        <div className="bg-[#f6f7fe] rounded-xl flex-1 p-4 shadow-sm">
          <div className="font-semibold text-[#5559af] mb-2 text-center border-b border-[#e3e6fd] pb-1">
            Earnings
          </div>
          <table className="w-full text-[15px]">
            <tbody>
              <tr>
                <td className="font-medium text-[#6b6eab] py-1 px-3">
                  Basic Salary
                </td>
                <td className="text-right font-medium text-[#353a6d] py-1 px-3">
                  {emp.salary.basic}
                </td>
              </tr>
              {earnings.map((item, idx) => (
                <tr key={item.label}>
                  <td className="font-medium text-[#6b6eab] py-1 px-3">
                    {item.label}
                  </td>
                  <td className="text-right font-medium text-[#353a6d] py-1 px-3">
                    {emp.salary.allowance[item.key] &&
                      emp.salary.allowance[item.key].toLocaleString()}
                  </td>
                </tr>
              ))}
              <tr
                className={`font-semibold bg-[#e5e8fa] text-[#202049] rounded-lg`}
              >
                <td className="font-medium text-[#6b6eab] py-1 px-3">
                  Gross Salary
                </td>
                <td className="text-right font-medium text-[#353a6d] py-1 px-3">
                  {grossSalary}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Deductions */}
        <div className="bg-[#f6f7fe] rounded-xl flex-1 p-4 shadow-sm">
          <div className="font-semibold text-[#5559af] mb-2 text-center border-b border-[#e3e6fd] pb-1">
            Deductions
          </div>
          <table className="w-full text-[15px]">
            <tbody>
              {deductions.map((item, idx) => {
                return (
                  <tr key={item.label}>
                    <td className="font-medium text-[#6b6eab] p-1 px-3">
                      {item.label}
                    </td>
                    <td className="text-right font-medium text-[#353a6d] p-1 px-3">
                      {emp.salary?.deduction[item.key] &&
                        emp.salary?.deduction[item.key].toLocaleString()}
                    </td>
                  </tr>
                );
              })}
              <tr className="font-semibold bg-[#e5e8fa] text-[#202049]">
                <td className="font-medium text-[#6b6eab] p-1 px-3">
                  Total Deduction
                </td>
                <td className="text-right font-medium text-[#353a6d] p-1 px-3">
                  {totalDeduction}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Net Pay */}
      <div className="p-1 px-3 bg-[#f6f7fe] shadow rounded-lg mt-10">
        <table className="w-full text-[15px] my-4">
          <tbody>
            {calcMonts(emp).length > 0 &&
              calcMonts(emp).map((data) => {
                return (
                  <tr key={data.month}>
                    <td className="font-medium text-[#6b6eab] py-1 px-3 text-lg">
                      Salary of {data.month}
                    </td>
                    <td className="text-right font-medium text-[#353a6d] py-1 px-4 text-lg">
                      {data.salary}
                    </td>
                  </tr>
                );
              })}

            <tr>
              <td className="font-medium text-[#6b6eab] py-1 px-3 text-lg">
                Due Salary
              </td>
              <td className="text-right font-medium text-[#353a6d] py-1 px-4 text-lg">
                {calcMonts(emp).length > 0
                  ? emp.salary.lastDue
                  : emp.salary.netPay}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between items-center font-semibold bg-[#e5eafb] rounded-lg px-4 py-3 text-[#394396] text-lg mb-2">
          <span>Net Payble</span>
          <span>{emp.salary.netPay}</span>
          {/* <span>{calculatePendingSalary(emp)}</span> */}
        </div>
        <div className="flex justify-between items-center font-semibold bg-green-100 rounded-lg px-4 py-3 text-green-500 text-lg mb-2">
          <span>Total Paid</span>
          <span>{emp.salary.proccessed}</span>
        </div>
        <div className="flex justify-between items-center font-semibold bg-red-100 rounded-lg px-4 py-3 text-red-400 text-lg mb-2">
          <span>Remaining Dues</span>
          <span>{emp.salary.due}</span>
        </div>
      </div>
    </div>
  );
};

export default SalaryPrint;
