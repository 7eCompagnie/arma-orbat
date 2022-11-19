import React, {useState} from "react";
import {
    ActionIcon,
    AppShell,
    Burger,
    Header,
    MediaQuery,
    Navbar,
    ScrollArea,
    Tooltip,
    useMantineColorScheme,
    useMantineTheme
} from "@mantine/core";
import {Bell, Moon, Sun} from "tabler-icons-react";
import {Route, Routes} from "react-router-dom";
import {t} from "i18next";
import {Container, Left, Logo, Right, Title} from "./style";
import logo from '../../../assets/images/logo.webp';
import {LanguagePicker} from "../../../components/LanguagePicker";
import UserBoxNavbar from "../../../components/UserBoxNavbar";
import NotFound from "../../NotFound";
import TopServeurs from "../../TopServeurs";
import SupportUs from "../../SupportUs";
import Content from "./Content";
import NavbarLinks from "../../../components/NavbarLinks";
import {NavbarLinksGroup} from "../../../components/NavbarDropdown";
import Gallery from "../../Gallery";

const Dashboard = () => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 300 }}>
                    <Navbar.Section grow component={ScrollArea}  scrollbarSize={6} offsetScrollbars>
                        <NavbarLinks/>
                        <NavbarLinksGroup/>
                    </Navbar.Section>
                    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                        <Navbar.Section>
                            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '1rem'}}>
                                <LanguagePicker small style={{marginRight: '1rem'}}/>
                                <Tooltip
                                    label={t('notifications')}
                                    position="bottom"
                                    withArrow
                                >
                                    <ActionIcon size="lg" radius="xl" style={{marginRight: '1rem'}}>
                                        <Bell />
                                    </ActionIcon>
                                </Tooltip>
                                <Tooltip
                                    label={dark ? t('light_mode') : t('dark_mode')}
                                    position="bottom"
                                    withArrow
                                >
                                    <ActionIcon size="lg" radius="xl" onClick={() => toggleColorScheme()}>
                                        {dark ? <Sun /> : <Moon />}
                                    </ActionIcon>
                                </Tooltip>
                            </div>
                        </Navbar.Section>
                    </MediaQuery>
                    <Navbar.Section>
                        <UserBoxNavbar />
                    </Navbar.Section>
                </Navbar>
            }
            header={
                <Header height={70} p="md">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>

                        <Container>
                            <Left>
                                <Logo src={logo} alt="Logo de la 7ème Compagnie" />
                                <Title style={{color: dark ? theme.colors.gray[4] : theme.colors.dark[9]}}>{t('7th_company')}</Title>
                            </Left>
                            <Right>
                                <LanguagePicker small style={{marginRight: '1rem'}}/>
                                <Tooltip
                                    label={t('notifications')}
                                    position="bottom"
                                    withArrow
                                >
                                    <ActionIcon size="lg" radius="xl" style={{marginRight: '1rem'}}>
                                        <Bell />
                                    </ActionIcon>
                                </Tooltip>
                                <Tooltip
                                    label={dark ? t('light_mode') : t('dark_mode')}
                                    position="bottom-end"
                                    withArrow
                                    placement="end"
                                >
                                    <ActionIcon size="lg" radius="xl" onClick={() => toggleColorScheme()}>
                                        {dark ? <Sun /> : <Moon />}
                                    </ActionIcon>
                                </Tooltip>
                            </Right>
                        </Container>
                    </div>
                </Header>
            }
        >
            <Routes>
                <Route index element={<Content/>} />
                <Route path="/gallery" element={<Gallery/>} />
                <Route path="/top-serveurs" element={<TopServeurs/>} />
                <Route path="/support-us" element={<SupportUs/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AppShell>
    );
}

export default Dashboard;