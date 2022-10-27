import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import React, {useEffect} from "react";
import UserContext from "./context/User";
import "./assets/styles/reset.css";

function App() {
    const [user, setUser] = React.useState(null);
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) {
            fetch('http://localhost:4000/users/token', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => response.json()).then(data => {
                setUser(data);
            })
        }
    }, [token]);

    return (
        <UserContext.Provider value={user}>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
