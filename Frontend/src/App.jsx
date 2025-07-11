import {Routes,Route} from "react-router-dom" 
import UserLogin from "./appModules/modules/user/auth/UserLogin"
import UserRegister from "./appModules/modules/user/auth/UserRegister"
import UserHome from "./appModules/modules/user/UserHome"

import AdminHome from "./appModules/modules/admin/AdminHome"
import AdminLogin from "./appModules/modules/admin/auth/AdminLogin"
import AdminRegister from "./appModules/modules/admin/auth/AdminRegister"
import { Fragment } from "react"
import Navbar from "./appModules/sharedComponents/Navbar"

const App = () => {
    return (
        <Fragment>
            <Navbar/>
        <Routes>
            <Route path="/userLogin" element={<UserLogin/>}></Route>
            <Route path="/userRegister" element={<UserRegister/>}></Route>
            <Route path="/userHome" element={<UserHome/>}></Route>
            <Route path="/adminHome" element={<AdminHome/>}></Route>
            <Route path="/adminLogin" element={<AdminLogin/>}></Route>
            
            <Route path="/adminRegister" element={<AdminRegister/>}></Route>
        </Routes>
        </Fragment>
    )
}
export default App