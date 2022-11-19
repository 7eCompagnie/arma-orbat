import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import React, {useEffect, useState} from "react";
import UserContext from "./context/User";
import "./assets/styles/reset.css";
import {ColorSchemeProvider, MantineProvider} from "@mantine/core";
import {getUserFromToken} from "./services/users";
import {NotificationsProvider} from "@mantine/notifications";

function App() {
    const [user, setUser] = React.useState(null);
    const token = localStorage.getItem('token')
    const [colorScheme, setColorScheme] = useState(localStorage.getItem('theme') || 'light');
    const toggleColorScheme = (value) => {
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
        localStorage.setItem('theme', value || (colorScheme === 'dark' ? 'light' : 'dark'));
    }

    useEffect(() => {
        if (token != null) {
            getUserFromToken(token).then(data => {
                setUser(data);
            });
        }
    }, [token]);

    return (

    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{
            colorScheme: colorScheme,
            fontFamily: 'Raleway, sans-serif',
            headings: {
                fontFamily: 'Monserrat, sans-serif',
            },
        }}>
            <NotificationsProvider>
                <UserContext.Provider value={user}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/*" element={<Home />} />
                        </Routes>
                    </BrowserRouter>
                </UserContext.Provider>
            </NotificationsProvider>
        </MantineProvider>
    </ColorSchemeProvider>
    );
}

export default App;
