import {Container, Grid, SimpleGrid, Text, Timeline, Title, useMantineTheme} from "@mantine/core";
import {Login, Sword, World} from "tabler-icons-react";
import {useContext, useEffect, useState} from "react";
import UserContext from "../../../context/User";
import StatCard from "../../../components/StatCard";
import {Link} from "./style";
import {t} from "i18next";
import {withNamespaces} from "react-i18next";

export const Visitor = () => {
	const user = useContext(UserContext);
	const theme = useMantineTheme();
	const [hasJoinedDiscord, setHasJoinedDiscord] = useState(false);

	useEffect(() => {
		fetch('https://discord.com/api/users/@me/guilds', {
			headers: {
				Authorization: `Bearer ${user.discordToken}`
			}
		}).then(response => response.json()).then(data => {
			for (let server of data) {
				if (server.id === process.env.REACT_APP_DISCORD_7E_ID) {
					setHasJoinedDiscord(true);
					break;
				}
			}
		}).catch(error => {
			console.error(error);
		});
	}, [user]);


	return (
		<Container py={"2rem"}>
			<Grid gutter="50">
				<Grid.Col span={12} sm={7}>
					<Title order={2} mb="2rem" color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9]}>
						{t('home.visitor.global.title')}
					</Title>

					<Text color="dimmed">
						{t('first_class')} {user.discordUsername}, {t('home.visitor.global.about_to_join')} <br/>
						{t('home.visitor.global.explanation')}
					</Text>

					<Title order={2} mt="3rem" mb="2rem" color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9]}>
						{t('home.visitor.stats.title')}
					</Title>

					<SimpleGrid cols={2} gutter="xl" mt="xl">
						<StatCard title={t('soldiers')} icon={<Sword />} value="68" />
						<StatCard title={t('operations')} icon={<World />} value="12" />
					</SimpleGrid>
				</Grid.Col>
				<Grid.Col span={12} sm={5}>
					<Title order={2} mb="2rem" color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9]}>
						{t('home.visitor.timeline.title')}
					</Title>
					<Timeline active={hasJoinedDiscord ? 1 : 0} bulletSize={34} lineWidth={2}>
						<Timeline.Item bullet={<Login size={22} />} title={t('home.visitor.timeline.steps.0.title')}>
							<Text color="dimmed" size="sm">{t('home.visitor.timeline.steps.0.description')}</Text>
						</Timeline.Item>

						<Timeline.Item bullet={<Login size={22} />} title={t('home.visitor.timeline.steps.1.title')}>
							<Text color="dimmed" size="sm">{t('home.visitor.timeline.steps.1.description')} <Link href={process.env.REACT_APP_DISCORD_INVITE_URL} target="_blank">{t('home.visitor.timeline.steps.1.here')}</Link>.</Text>
						</Timeline.Item>

						<Timeline.Item bullet={<Sword size={22} />} title={t('home.visitor.timeline.steps.2.title')} lineVariant="dashed">
							<Text color="dimmed" size="sm">{t('home.visitor.timeline.steps.2.description')}</Text>
						</Timeline.Item>

						<Timeline.Item title={t('home.visitor.timeline.steps.3.title')} bullet={<World size={22} />} >
							<Text color="dimmed" size="sm">{t('home.visitor.timeline.steps.3.description')}</Text>
						</Timeline.Item>
					</Timeline>
				</Grid.Col>
			</Grid>
		</Container>
	)
}

export default withNamespaces()(Visitor)