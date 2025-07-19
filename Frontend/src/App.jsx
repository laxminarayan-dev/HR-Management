import { Routes, Route } from "react-router-dom";
import { Fragment, useState } from "react";

import AdminLogin from "./appModules/modules/admin/auth/AdminLogin";
import Root from "./Root";
import Dashboard from "./appModules/modules/admin/Dashboard";
import Employees from "./appModules/modules/admin/Employees";
import Department from "./appModules/modules/admin/Department";
import Leaves from "./appModules/modules/admin/Leaves";
import Salary from "./appModules/modules/admin/Salary";

const App = () => {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  return (
    <Fragment>
      {isloggedIn == true ? (
        <Fragment>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route index element={<Dashboard />} />
              <Route path="employees" element={<Employees />} />
              <Route path="departments" element={<Department />} />
              <Route path="leaves" element={<Leaves />} />
              <Route path="salary" element={<Salary />} />
              <Route path="*" element={<Dashboard />} />
            </Route>
          </Routes>
        </Fragment>
      ) : (
        <AdminLogin setIsLoggedIn={setIsLoggedIn} />
      )}
    </Fragment>
  );
};
export default App;
