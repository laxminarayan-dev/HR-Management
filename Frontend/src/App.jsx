import { Routes, Route } from "react-router-dom";
import UserLogin from "./appModules/modules/user/auth/UserLogin";
import UserRegister from "./appModules/modules/user/auth/UserRegister";
import UserWelcome from "./appModules/modules/user/UserWelcome";

import AdminHome from "./appModules/modules/admin/AdminHome";
import AdminLogin from "./appModules/modules/admin/auth/AdminLogin";
import AdminRegister from "./appModules/modules/admin/auth/AdminRegister";

import Welcome from "./Welcome";
import { Fragment } from "react";
import Navbar from "./appModules/sharedComponents/Navbar";

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/user" element={<UserWelcome />}>
          <Route path="login" element={<UserLogin />}></Route>
          <Route path="register" element={<UserRegister />}></Route>
        </Route>
        <Route path="/admin" element={<AdminHome />}>
          <Route path="login" element={<AdminLogin />}></Route>
          <Route path="register" element={<AdminRegister />}></Route>
        </Route>
      </Routes>
    </Fragment>
  );
};
export default App;
