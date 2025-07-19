import { Routes, Route } from "react-router-dom";
import { Fragment, useState } from "react";

import AdminLogin from "./appModules/modules/admin/auth/AdminLogin";

import Root from "./Root";
const App = () => {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  return (
    <Fragment>
      {isloggedIn == true ? (
        <Fragment>
          <Routes>
            <Route path="/" element={<Root />}>
              <Route
                index
                element={<div>Welcome to the Admin Dashboard</div>}
              />
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
