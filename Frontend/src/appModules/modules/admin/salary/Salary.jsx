import { useState, useEffect, Fragment } from "react";
import { Search, Plus } from "lucide-react";
import SalaryDuesTable from "../../../lib/tables/SalaryDuesTable";
import SalaryProccessedTable from "../../../lib/tables/SalaryProccessedTable";
function calculatePendingSalary(emp) {
  const currentMonth = new Date().getMonth();
  const { basic, due } = emp.salary;
  const lastProccessedMonth = new Date(
    emp.salary?.lastProccessedMonth
  ).getMonth();

  let totalDue = 0;

  if (lastProccessedMonth !== currentMonth) {
    // CASE 1: Same year (e.g., Feb -> Dec)
    if (currentMonth > lastProccessedMonth) {
      for (let m = lastProccessedMonth; m < currentMonth; m++) {
        if (m === lastProccessedMonth && due > 0) totalDue += due;
        else totalDue += basic;
      }
    }
    // CASE 2: Year rollover (e.g., Nov -> Feb)
    else {
      // Process remaining months of last year
      for (let m = lastProccessedMonth; m < 12; m++) {
        if (m === lastProccessedMonth && due > 0) totalDue += due;
        else totalDue += basic;
      }
      // Then months of new year
      for (let m = 1; m < currentMonth; m++) {
        totalDue += basic;
      }
    }
  } else if (lastProccessedMonth == currentMonth) {
    totalDue += due;
  }
  return totalDue;
}

export default function Salary() {
  const demoSalaryData = [
    {
      fullName: "Amit Sharma",
      email: "amit.sharma@office.com",
      department: "Engineering",
      salary: { basic: 45000, bonus: 5000 },
      month: "October 2025",
    },
    {
      fullName: "Priya Verma",
      email: "priya.verma@office.com",
      department: "Human Resources",
      salary: { basic: 40000, bonus: 3000 },
      month: "October 2025",
    },
    {
      fullName: "Rohit Singh",
      email: "rohit.singh@office.com",
      department: "Finance",
      salary: { basic: 55000, bonus: 8000 },
      month: "October 2025",
    },
    {
      fullName: "Neha Gupta",
      email: "neha.gupta@college.edu",
      department: "Administration",
      salary: { basic: 38000, bonus: 2000 },
      month: "October 2025",
    },
    {
      fullName: "Karan Mehta",
      email: "karan.mehta@office.com",
      department: "Engineering",
      salary: { basic: 48000, bonus: 4500 },
      month: "October 2025",
    },
    {
      fullName: "Simran Kaur",
      email: "simran.kaur@college.edu",
      department: "Teaching",
      salary: { basic: 42000, bonus: 5000 },
      month: "October 2025",
    },
    {
      fullName: "Deepak Patel",
      email: "deepak.patel@office.com",
      department: "Marketing",
      salary: { basic: 47000, bonus: 4000 },
      month: "October 2025",
    },
    {
      fullName: "Anjali Mishra",
      email: "anjali.mishra@office.com",
      department: "Finance",
      salary: { basic: 53000, bonus: 7000 },
      month: "October 2025",
    },
    {
      fullName: "Suresh Reddy",
      email: "suresh.reddy@college.edu",
      department: "Administration",
      salary: { basic: 39000, bonus: 2500 },
      month: "October 2025",
    },
    {
      fullName: "Pooja Yadav",
      email: "pooja.yadav@office.com",
      department: "Sales",
      salary: { basic: 46000, bonus: 5500 },
      month: "October 2025",
    },
  ];

  const [salaries, setSalaries] = useState(demoSalaryData);
  const [searchTerm, setSearchTerm] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [emps, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showAddSalaryModal, setShowAddSalaryModal] = useState(false);

  const fetchEmployee = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emp/allEmployees`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.emps) {
          setEmployees(data.emps);
        } else {
          setEmployees([]);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchEmployee();
  }, []);

  const filteredSalaries = salaries.filter(
    (emp) =>
      emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!emps) return;
    let filterData = emps.filter(
      (emp) =>
        (emp?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp?.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
        calculatePendingSalary(emp) !== 0
    );
    setFilteredEmployees([...filterData]);
  }, [emps, searchTerm]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Salary Management</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => setShowAddSalaryModal(true)}
        >
          <Plus size={18} />
          Add Salary
        </button>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or email"
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-slate-200 px-2 py-2 mx-auto w-fit rounded-full gap-4 flex">
        <button
          onClick={() => setSelectedTab(0)}
          className={`${
            selectedTab == 0 && "bg-black text-white"
          }   rounded-full px-4 py-2`}
        >
          Dues
        </button>
        <button
          onClick={() => setSelectedTab(1)}
          className={`${
            selectedTab == 1 && "bg-black text-white"
          }   rounded-full px-4 py-2`}
        >
          Proccessed
        </button>
      </div>

      {/* Salary Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm max-w-6xl mx-auto">
        {selectedTab == 0 ? (
          <SalaryDuesTable
            emps={filteredEmployees}
            calculatePendingSalary={calculatePendingSalary}
          />
        ) : (
          <SalaryProccessedTable ProccesedSalaryData={filteredSalaries} />
        )}
      </div>

      {response && (
        <div className="fixed z-100 top-20 right-8 transform -translate-x-1 bg-gray-800 p-4 rounded shadow-lg">
          <p className={response.success ? "text-green-500" : "text-red-500"}>
            {response.msg || "Default Message"}
          </p>
        </div>
      )}

      {showAddSalaryModal && (
        <AddSalaryModel
          emps={filteredEmployees}
          setShowAddSalaryModal={setShowAddSalaryModal}
          fetchEmployee={fetchEmployee}
          setResponse={setResponse}
        />
      )}
    </div>
  );
}

export const AddSalaryModel = ({
  emps,
  setShowAddSalaryModal,
  fetchEmployee,
  setResponse,
}) => {
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [newSalary, setNewSalary] = useState({
    proccessed: "",
    bonus: "",
    currency: "INR",
    lastProccessedMonth: new Date().toISOString(),
  });

  async function handleAddSalary() {
    if (!newSalary.proccessed) {
      alert("Please fill required fields");
      return;
    }

    const filterEmp = emps.filter((emp) => emp._id === selectedEmp)[0];
    const dueCalc = calculatePendingSalary(filterEmp) - newSalary.proccessed;

    const updatedEmp = {
      ...filterEmp,
      salary: { ...filterEmp.salary, ...newSalary, due: dueCalc },
    };

    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/emp/update/${updatedEmp._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmp),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.emp) {
          fetchEmployee();
          setResponse({ success: true, msg: data.message });
        } else {
          setResponse({ success: false, msg: data.message || "Update failed" });
        }
      })
      .catch((err) => {
        console.error(err);
        // setResponse({
        //   success: false,
        //   msg: "Something went wrong. Try again!",
        // });
      })
      .finally(() => {
        setShowAddSalaryModal(false);
        setTimeout(() => {
          setResponse(null);
        }, 2000);
      });

    // ==========================================================================
    // try {
    //   const res = await fetch(
    //     `${import.meta.env.VITE_BACKEND_URL}/api/salary/add`,
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(newSalary),
    //     }
    //   );

    //   const data = await res.json();
    //   if (data.success) {
    //     alert("Salary added successfully!");
    //     setShowAddSalaryModal(false);
    //     setNewSalary({
    //       empId: "",
    //       basic: "",
    //       bonus: "",
    //       currency: "INR",
    //       lastProcessedMonth: "",
    //     });
    //   } else {
    //     alert(data.message || "Failed to add salary");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   alert("Error adding salary");
    // }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Add Salary</h2>

        <div className="space-y-3">
          <select
            value={selectedEmp || ""}
            onChange={(e) => setSelectedEmp(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">Select Employee</option>
            {emps.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.fullName}
              </option>
            ))}
          </select>
          {selectedEmp && (
            <Fragment>
              <div className="flex flex-col pl-1">
                <label className="font-medium text-gray-700 text-md">
                  Due Salary:
                </label>
                <h1>
                  ₹
                  {calculatePendingSalary(
                    emps.filter((emp) => emp._id === selectedEmp)[0]
                  )}
                </h1>
              </div>
              <input
                type="number"
                value={newSalary.proccessed}
                onChange={(e) =>
                  setNewSalary({
                    ...newSalary,
                    proccessed: e.target.value, // store full ISO back
                  })
                }
                placeholder="Salary to be Process"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />

              <input
                type="number"
                placeholder="Bonus"
                value={newSalary.bonus}
                onChange={(e) =>
                  setNewSalary({
                    ...newSalary,
                    bonus: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />

              <input
                type="month"
                value={newSalary.lastProccessedMonth.slice(0, 7)}
                onChange={(e) =>
                  setNewSalary({
                    ...newSalary,
                    lastProcessedMonth: new Date(e.target.value).toISOString(), // store full ISO back
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />

              <select
                value={newSalary.currency}
                onChange={(e) =>
                  setNewSalary({
                    ...newSalary,
                    currency: e.target.value, // store full ISO back
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </select>
            </Fragment>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setShowAddSalaryModal(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleAddSalary}
            disabled={selectedEmp ? false : true}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
