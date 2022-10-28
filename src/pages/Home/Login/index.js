import {Button, useMantineTheme} from "@mantine/core";
import {popupCenter} from "../../../utils/popup";
import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {Carousel} from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import logo from "../../../assets/images/logo.webp";
import {
    CarouselSlide,
    Container,
    Description,
    DescriptionText,
    DescriptionTitle,
    Left,
    Logo,
    Right,
    StyledTitle,
    SubTitle
} from "./style";
import {signIn} from "../../../services/users";

const Login = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const navigate = useNavigate();
    const theme = useMantineTheme();
    const autoplay = useRef(Autoplay({ delay: 5000 }));
    const images = [
        {
            url: "https://images.unsplash.com/photo-1571795184552-5f1df723de54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&q=80",
            title: "Opération Black Mamba",
            description: "Les hommes de l'opération Black Mamba se sont rendues au Mali pour défendre le territoire."
        },
        {
            url: "https://images.unsplash.com/photo-1569242840510-9fe6f0112cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
            title: "Opération Liberty",
            description: "Les hommes de l'opération Liberty se sont rendues au Mali pour défendre le territoire."
        },
        {
            url: "https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            title: "Opération Hemlig",
            description: "Les hommes de l'opération Hemlig se sont rendues au Mali pour défendre le territoire."
        },
        {
            url: "https://images.unsplash.com/photo-1541513982013-5dc4f56697f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            title: "Opération Irène",
            description: "Les hommes de l'opération Irène se sont rendues au Mali pour défendre le territoire."
        },
        {
            url: "https://images.unsplash.com/photo-1583872341575-610c859c7a57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1pbGl0YXJ5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1152&q=80",
            title: "Opération Varan",
            description: "Les hommes de l'opération Varan se sont rendues au Mali pour défendre le territoire."
        },
    ];

    if (urlParams.get('error')) {
        if (window.opener && window.opener !== window) {
            window.opener.location.reload();
            window.close();
        }

        navigate('/')
    }

    useEffect(() => {
        if (code) {
            signIn(code).then(data => {
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
    });

    const openLoginWindow = () => {
        popupCenter(process.env.REACT_APP_DISCORD_LOGIN_URL, "Connexion à la 7ème Compagnie via Discord", 500, 700);
    }

    return (
        <Container>
            <Left style={{background: theme.colors.dark[6]}}>
                <Logo src={logo} />
                <StyledTitle>La 7ème Compagnie</StyledTitle>
                <SubTitle order={2} style={{color: theme.colors.gray[5]}}>Bienvenue soldat !<br/> Veuillez vous connectez via Discord pour accèder à l'OrBat.</SubTitle>
                <Button size="lg" onClick={() => openLoginWindow()}>Se connecter</Button>
            </Left>
            <Right>
                <Carousel style={{width: '100%'}} orientation="vertical" withControls={false} slideGap="0" height="100%" width="100vw" withIndicators loop plugins={[autoplay.current]}>
                    {images.map((image, index) => (
                        <CarouselSlide key={index} style={{backgroundImage: `url(${image.url})`}}>
                            <Description>
                                <DescriptionTitle order={3}>{image.title}</DescriptionTitle>
                                <DescriptionText>{image.description}</DescriptionText>
                            </Description>
                        </CarouselSlide>
                    ))}
                </Carousel>
            </Right>
        </Container>
    );
}

export default Login;