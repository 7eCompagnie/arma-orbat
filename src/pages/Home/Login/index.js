import {Container, Button} from "@mantine/core";
import {popupCenter} from "../../../utils/popup";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const navigate = useNavigate();

    useEffect(() => {
        if (code) {
            fetch('http://localhost:4000/users/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code
                })
            }).then(r => r.json()).then(data => {
                console.log(data)
                localStorage.setItem('token', data.token)

                if (window.opener && window.opener !== window) {
                    window.opener.location.reload();
                    window.close();
                }

                navigate('/')
            }).catch(e => {
                console.error(e)
            })
        }
    }, [code, navigate]);


    const openLoginWindow = () => {
        popupCenter(process.env.REACT_APP_DISCORD_LOGIN_URL, "Connexion à la 7ème Compagnie via Discord", 500, 700);
    }

    return (
        <Container>
            <Button onClick={() => openLoginWindow()}>Discord Login</Button>
        </Container>
    );
}

export default Login;