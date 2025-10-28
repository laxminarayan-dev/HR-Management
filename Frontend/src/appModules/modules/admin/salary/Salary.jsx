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
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [emps, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
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

  const fetchEntries = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/salary/`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.salaryEntries) {
          setEntries(data.salaryEntries.reverse());
        } else {
          setEntries([]);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchEmployee();
    fetchEntries();
  }, []);

  useEffect(() => {
    if (!entries) return;

    const filterData = entries.filter((entry) => {
      const searchMatch =
        entry?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry?.email?.toLowerCase().includes(searchTerm.toLowerCase());

      return searchMatch; // ✅ new filter condition
    });

    setFilteredEntries(filterData);
  }, [entries, searchTerm]);

  useEffect(() => {
    if (!emps) return;

    const filterData = emps.filter((emp) => {
      const searchMatch =
        emp?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp?.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const pendingSalary = calculatePendingSalary(emp);

      // --- hire date check ---
      const hireDate = new Date(emp.hireDate); // assuming `hireDate` field in employee
      const today = new Date();

      // difference in days
      const diffInDays = Math.floor((today - hireDate) / (1000 * 60 * 60 * 24));

      // include only if employee has worked for at least 30 days
      const workedMoreThan30Days = diffInDays >= 30;

      return (
        searchMatch && pendingSalary !== 0 && workedMoreThan30Days // ✅ new filter condition
      );
    });

    setFilteredEmployees(filterData);
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
          onClick={() => {
            setSelectedTab(0);
            fetchEmployee();
          }}
          className={`${
            selectedTab == 0 && "bg-black text-white"
          }   rounded-full px-4 py-2`}
        >
          Dues
        </button>
        <button
          onClick={() => {
            setSelectedTab(1);
            fetchEntries();
          }}
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
          <SalaryProccessedTable
            ProccesedSalaryData={filteredEntries}
            calculatePendingSalary={calculatePendingSalary}
          />
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
    lastProccessedMonth: new Date().toISOString(), // this is here because this value go to default month selector
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
    try {
      const salaryEntry = {
        fullName: filterEmp.fullName,
        email: filterEmp.email,
        phone: filterEmp.phone,
        department: filterEmp.department,
        designation: filterEmp.designation,
        hireDate: filterEmp.hireDate,
        salary: {
          basic: filterEmp.salary.basic,
          bonus: filterEmp.salary.bonus,
          currency: filterEmp.salary.currency,
          proccessed: newSalary.proccessed,
          bonusProccessed: newSalary.bonus,
          due: dueCalc,
          lastProccessedMonth: newSalary.lastProccessedMonth,
        },
      };
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/salary/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(salaryEntry),
        }
      );
      const data = await res.json();
      if (data.success) {
        setResponse({ success: true, msg: "Salary Entry added successfully!" });
      } else {
        setResponse({ success: false, msg: "Failed to add Salary Entry!" });
      }

      setShowAddSalaryModal(false);
      setNewSalary({
        proccessed: "",
        bonus: "",
        currency: "INR",
        lastProccessedMonth: new Date().toISOString(), // this is here because this value go to default month selector
      });
      setTimeout(() => {
        setResponse(null);
      }, 1000);
    } catch (error) {
      console.error(error);
      setResponse({ success: false, msg: "Failed to add Salary Entry!" });
      setTimeout(() => {
        setResponse(null);
      }, 1000);
    }
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
