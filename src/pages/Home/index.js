import UserContext from "../../context/User";
import {useContext} from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

const Home = () => {
    const user = useContext(UserContext);
    let token = localStorage.getItem('token')

    if (token === "undefined") {
        localStorage.removeItem('token')
        token = undefined
    }

    if (!user && token)
        return <h1>Loading...</h1>
    else if (!user && !token)
        return <Login />
    else
        return <Dashboard />
}

export default Home;