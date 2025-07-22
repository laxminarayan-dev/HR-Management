import { Users, Building, Banknote, User, Ellipsis } from "lucide-react";
import { MyLineChart, MyPieChart, MyBarChart } from "../../lib/MyChart";

const Dashboard = () => {
  const employees = [
    {
      name: "Alice Johnson",
      role: "Software Engineer",
      department: "Engineering",
      status: "Active",
    },
    {
      name: "Michael Smith",
      role: "HR Manager",
      department: "Human Resources",
      status: "Active",
    },
    {
      name: "Sophie Lee",
      role: "Product Designer",
      department: "Design",
      status: "On Leave",
    },
    {
      name: "Daniel Kim",
      role: "Sales Executive",
      department: "Sales",
      status: "Active",
    },
    {
      name: "Rachel Adams",
      role: "Marketing Lead",
      department: "Marketing",
      status: "Resigned",
    },
    {
      name: "James Patel",
      role: "DevOps Engineer",
      department: "Engineering",
      status: "Active",
    },
    {
      name: "Laura Chen",
      role: "Recruiter",
      department: "Human Resources",
      status: "Active",
    },
    {
      name: "Chris Evans",
      role: "QA Analyst",
      department: "Quality Assurance",
      status: "On Leave",
    },
    {
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
          <h1 className="font-bold text-2xl">Leave Trend - 2025</h1>
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
        <div className="bg-white border border-stone-100 shadow-sm p-5 flex flex-col gap-8 rounded-lg">
          <div>
            <h1 className="text-2xl font-bold">Recent Employee Activity</h1>
            <p className="text-sm">
              An overview of recently active or updated employee profiles.
            </p>
          </div>
          {/* table */}
          <div className="">
            {/* table header */}
            <div className="flex justify-center border-b gap-3 border-stone-300 py-3 px-1 text-sm">
              <h1 className="flex-[1.5] text-slate-500">Employee</h1>
              <h1 className="flex-1 text-slate-500 hidden md:block">
                Department
              </h1>
              <h1 className="flex-1 text-slate-500 hidden lg:block">Role</h1>
              <h1 className="flex-1 text-slate-500">Status</h1>
              <h1 className="flex-[0.5] text-slate-500"></h1>
            </div>
            {/* table body */}
            <div>
              {employees.map((emp, index) => (
                <div
                  key={emp.name + index}
                  className="flex justify-center border-b gap-3 border-stone-300 py-3 text-sm"
                >
                  <h1 className="flex-[1.5] flex justify-start items-center gap-1 truncate">
                    <User size={16} /> {emp.name}
                  </h1>
                  <h1 className="flex-1 hidden md:block">{emp.role}</h1>
                  <h1 className="flex-1 hidden lg:block">{emp.department}</h1>
                  <h1 className="flex-1">{emp.status}</h1>
                  <h1 className="flex-[0.5]">
                    <Ellipsis />
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Dashboard;
