import { Fragment } from "react"

const UserLogin = () =>{
    return (
    <div className="bg-stone-200 w-96 h-80 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
">
        <form action="#" className="flex flex-col justify-center items-center gap-5 h-80 px-10">
            <input className="w-full border rounded-sm px-2 py-1" type="email" placeholder="Enter Email" />
            <input className="w-full border rounded-sm px-2 py-1" type="password" placeholder="Enter password" />
            <input className="border w-full px-2 py-1" type="submit" value='Submit' />
        </form>
    </div>
    )
}
export default UserLogin