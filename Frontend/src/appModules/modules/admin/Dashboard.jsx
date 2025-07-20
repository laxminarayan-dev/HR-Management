import { Users, Building, Banknote } from "lucide-react";

const Dashboard = () => {
  const icon = {
    users: <Users />,
    building: <Building />,
    banknote: <Banknote />,
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
      heading: "Monthly Pay",
      value: "2000000",
      prefix: "₹",
    },
  ];
  return (
    <section className="max-w-7xl m-auto flex flex-col gap-5">
      <h1 className="text-2xl font-semibold">AdminDashboard Overview</h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-5">
        {dashboardData.map((item, index) => {
          return (
            <div
              key={index}
              className="flex rounded-lg gap-2 shadow-sm py-2 bg-white border border-slate-200"
            >
              <div className="w-14 flex justify-center items-center">
                {icon[item.icon]}
              </div>
              <div className="flex flex-col">
                <span>{item.heading}</span>
                <span>
                  {item.prefix}
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
     
    </section>
  );
};
export default Dashboard;
