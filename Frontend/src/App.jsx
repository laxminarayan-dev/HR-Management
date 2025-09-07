import { Routes, Route } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

import Root from "./Root";
import AdminLogin from "./appModules/modules/admin/auth/AdminLogin";
import ErrorPage from "./appModules/sharedComponents/ErrorPage";
import Loading from "./appModules/sharedComponents/Loading";
import Dashboard from "./appModules/modules/admin/Dashboard";
import Employees from "./appModules/modules/admin/employees/Employees";
import EmployeeDetail from "./appModules/modules/admin/employees/EmployeeDetail";
import Department from "./appModules/modules/admin/Department";
import Leaves from "./appModules/modules/admin/Leaves";
import Salary from "./appModules/modules/admin/Salary";
import Users from "./appModules/modules/admin/User/Users";
import IndUser from "./appModules/modules/admin/User/IndUser";

const App = () => {
  const [isloggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token && token != "") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <Fragment>
      {isloggedIn === null ? (
        <Loading />
      ) : isloggedIn ? (
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="employee/:id" element={<EmployeeDetail />} />
            <Route path="departments" element={<Department />} />
            <Route path="leaves" element={<Leaves />} />
            <Route path="salary" element={<Salary />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<IndUser />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      ) : (
        <AdminLogin setIsLoggedIn={setIsLoggedIn} />
      )}
    </Fragment>
  );
};
export default App;
