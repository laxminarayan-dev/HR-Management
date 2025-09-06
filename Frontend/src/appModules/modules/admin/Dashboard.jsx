import { Users, Building, Banknote } from "lucide-react";
import { MyLineChart, MyPieChart, MyBarChart } from "../../lib/MyChart";
import EmployeeActivityTable from "../../lib/tables/EmployeeActivityTable";
const Dashboard = () => {
  const employees = [
    {
      id: "userq2345",
      name: "Alice Johnson",
      role: "Software Engineer",
      department: "Engineering",
      status: "Active",
    },
    {
      id: "user3452",
      name: "Michael Smith",
      role: "HR Manager",
      department: "Human Resources",
      status: "Active",
    },
    {
      id: "user2353r",
      name: "Sophie Lee",
      role: "Product Designer",
      department: "Design",
      status: "On Leave",
    },
    {
      id: "user234rwe",
      name: "Daniel Kim",
      role: "Sales Executive",
      department: "Sales",
      status: "Active",
    },
    {
      id: "userqw4rase",
      name: "Rachel Adams",
      role: "Marketing Lead",
      department: "Marketing",
      status: "Resigned",
    },
    {
      id: "userasdvc",
      name: "James Patel",
      role: "DevOps Engineer",
      department: "Engineering",
      status: "Active",
    },
    {
      id: "userq2345",
      name: "Laura Chen",
      role: "Recruiter",
      department: "Human Resources",
      status: "Active",
    },
    {
      id: "userq2345",
      name: "Chris Evans",
      role: "QA Analyst",
      department: "Quality Assurance",
      status: "On Leave",
    },
    {
      id: "userq2345",
      name: "Priya Singh",
      role: "Business Analyst",
      department: "Product",
      status: "Active",
    },
  ];

  const icon = {
    users: <Users size={16} />,
    building: <Building size={16} />,
    banknote: <Banknote size={16} />,
  };
  const dashboardData = [
    {
      icon: "users",
      heading: "Total Employees",
      value: "20",
      prefix: "",
    },
    {
      icon: "building",
      heading: "Total Department",
      value: "2",
      prefix: "",
    },
    {
      icon: "banknote",
      heading: "Salary Processed This Month",
      value: "2000000",
      prefix: "₹",
    },
  ];
  return (
    <section className="max-w-7xl m-auto flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-semibold"> Dashboard</h1>
        <h2 className="text-md">
          Welcome back! Here's a summary of your HR metrics.
        </h2>
      </div>
      {/* overview section */}
      <div className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-5">
        {dashboardData.map((item, index) => {
          return (
            <div
              key={index}
              className="flex rounded-lg gap-2 shadow-sm py-2 px-4 bg-white border border-slate-200"
            >
              <div className="flex flex-col justify-center items-start flex-1">
                <span className="font-semibold text-xs line-clamp-1 ">
                  {item.heading}
                </span>
                <span className="font-bold text-xl">
                  {item.prefix}
                  {item.value}
                </span>
              </div>
              <div className="w-10 flex justify-end items-start text-gray-400">
                {icon[item.icon]}
              </div>
            </div>
          );
        })}
      </div>
      {/* bar section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-1">
        <div className="bg-white py-3 px-5 border border-stone-100 rounded-md shadow-sm">
          <h1 className="font-bold text-2xl">Leave Trend</h1>
          <p className="text-sm mb-5">Monthly count of employees on leave.</p>
          <MyBarChart />
        </div>

        <div className="bg-white py-3 px-5 border border-stone-100 rounded-md shadow-sm">
          <h1 className="font-bold text-2xl">Hiring Flow</h1>
          <p className="text-sm mb-5">Monthly count of employees on leave.</p>
          <MyLineChart />
        </div>

        <div className="bg-white py-3 px-5 border border-stone-100 rounded-md shadow-sm">
          <h1 className="font-bold text-2xl">Department Strength</h1>
          <p className="text-sm mb-5">
            Employee distribution across departments.
          </p>
          <MyPieChart />
        </div>
      </div>
      {/* tabular section  */}
      <div>
        <EmployeeActivityTable tableData={employees} />
      </div>
    </section>
  );
};
export default Dashboard;
