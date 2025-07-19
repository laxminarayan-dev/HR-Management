import { Mail, Lock, Eye, EyeOff } from "lucide-react";
0.0;
import { useState } from "react";
import { Link } from "react-router-dom";
const UserLogin = () => {
  const [passwordState, setPasswordState] = useState(true);
  const [response, setResponse] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        let resp = await res.json();
        console.log(resp);

        if (res.ok) {
          setResponse(resp.message);
        } else {
          setResponse(resp.message);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      className="flex justify-center items-center w-full min-h-[calc(100dvh-48px)] bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url("/loginb.jpg") ` }}
    >
      <div
        className=" w-96
  shadow-lg shadow-blue-200 border border-stone-100 py-10 rounded-lg "
        style={{ background: "rgba(255,255,255,0.5)" }}
      >
        <form
          action="#"
          className="flex flex-col justify-center items-start gap-5 h-80 px-10 "
          onSubmit={handleSubmit}
        >
          <div className="text-center w-full">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <h3 className="text-xs mt-2">
              Please enter your details to sign in
            </h3>
          </div>
          <div className="w-full flex flex-col justify-center items-start gap-1">
            <label
              className="text-xs flex justify-center items-center gap-2"
              htmlFor="email"
            >
              <Mail size={18} /> Your Email Address
            </label>
            <input
              className="focus:outline-0 w-full border border-slate-300 rounded-lg px-2 py-1"
              type="email"
              id="email"
              placeholder="Enter Email Address"
              name="email"
            />
          </div>
          <div className="w-full flex flex-col justify-center items-start gap-1">
            <label
              className="text-xs flex justify-center items-center gap-2"
              htmlFor="pass"
            >
              <Lock size={18} /> Password
            </label>
            <div className=" w-full border border-slate-300 rounded-lg px-2 py-1 flex justify-between">
              <input
                className="focus:outline-0 flex-1"
                type={passwordState ? "password" : "text"}
                placeholder={
                  passwordState ? "*****************" : "Enter Password"
                }
                id="pass"
                name="password"
              />
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => {
                  setPasswordState(!passwordState);
                }}
              >
                {!passwordState ? <Eye /> : <EyeOff />}
              </button>
            </div>
            {response && response}
          </div>

          <div className="w-full flex flex-col justify-center items-start gap-1">
            <div className="flex justify-between items-center w-full py-3">
              <div className="flex justify-center items-center gap-2">
                <input type="checkbox" name="" id="" />{" "}
                <p className="text-sm text-slate-900">Remember me</p>
              </div>
              <Link className="text-sm underline text-slate-900">
                Forgot password?
              </Link>
            </div>
            <input
              className="border border-slate-300 bg-slate-900 text-white rounded-lg w-full px-2 py-1"
              type="submit"
              value="Submit"
            />
            <hr />
            <Link to="/user/register" className="underline text-sm">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UserLogin;
