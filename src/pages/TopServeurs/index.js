import {withNamespaces} from "react-i18next";
import {Alert, Button, Center, Container, Grid, SimpleGrid, Title, useMantineTheme} from "@mantine/core";
import {useContext, useEffect, useState} from "react";
import {getPlayersRanking, getServerInfos, userHasVoted} from "../../services/topServeurs";
import Card from "./Card";
import {getMonthName} from "../../utils/date";
import Stat from "./Stat";
import {AlertCircle, CircleCheck, ExternalLink, MailForward, Pointer} from "tabler-icons-react";
import UserContext from "../../context/User";
import {t} from "i18next";
import {getSetting} from "../../services/settings";

export const TopServeurs = () => {
	const user = useContext(UserContext);
	const theme = useMantineTheme();
	const [players, setPlayers] = useState([]);
	const [hasVoted, setHasVoted] = useState(false);
	const [monthlyStats, setMonthlyStats] = useState([]);
	const [goalVotes, setGoalVotes] = useState(0);
	const [goalClicks, setGoalClicks] = useState(0);

	useEffect(() => {
		getPlayersRanking().then(res => {
			setPlayers(res.players);
		}).catch(err => {
			console.log(err);
		});

		getServerInfos().then(res => {
			setMonthlyStats(res.server.last_monthly_stat[0]);
		}).catch(err => {
			console.log(err);
		});

		userHasVoted(user.discordUsername).then(res => {
			setHasVoted(res.success);
		}).catch(err => {
			console.log(err);
		});

		getSetting('VOTES_GOAL').then(res => {
			setGoalVotes(res.value);
		}).catch(err => {
			console.log(err);
		});

		getSetting('CLICKS_GOAL').then(res => {
			setGoalClicks(res.value);
		}).catch(err => {
			console.log(err);
		});
	}, [user]);

	const alert = hasVoted ? (
		<Alert mb="2rem" icon={<AlertCircle size={16} />} title={t('top_serveurs.vote.done_title')} color="red">
			{t('top_serveurs.vote.done')}
		</Alert>
	) : (
		<Alert mb="2rem" icon={<CircleCheck size={16} />} title={t('top_serveurs.vote.available_title')} color="green">
			{t('top_serveurs.vote.available')}
		</Alert>
	);

	const items = players.map((player, index) => {
		return (
			<Card key={index} player={player} />
		);
	}).filter((item, index) => index > 0);

	const currentMonth = getMonthName(new Date().getMonth()).toLowerCase();

	return (
		<Container py={"2rem"}>
			{ alert }
			<Center>
				<Button mb="2rem" rightIcon={<ExternalLink size={18}/>} onClick={() => {
					window.open(`https://top-serveurs.net/arma3/vote/la-7e-compagnie?pseudo=${user.discordUsername}`, '_blank').focus();
				}}>{t('top_serveurs.vote.button')}</Button>
			</Center>
			<Grid>
				<Grid.Col span={12} sm={6} md={8} order={2} orderSm={1}>
					<Title order={2} mb="2rem" color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9]}>
						{t('top_serveurs.ranking.title')}
					</Title>
					<SimpleGrid cols={3} breakpoints={[
						{maxWidth: theme.breakpoints.xl, cols: 3},
						{maxWidth: theme.breakpoints.lg, cols: 2},
						{maxWidth: theme.breakpoints.md, cols: 1},
						{maxWidth: theme.breakpoints.sm, cols: 2},
						{maxWidth: theme.breakpoints.xs, cols: 1},
					]}>
						{items}
					</SimpleGrid>
				</Grid.Col>
				<Grid.Col span={12} sm={6} md={4} mb="2rem" order={1} orderSm={2}>
					<Title order={2} mb="2rem" color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9]}>
						{t('top_serveurs.stats.title')}
					</Title>
					<SimpleGrid cols={1}>
						<Stat title={t('top_serveurs.stats.monthly_votes')} goalValue={goalVotes} goalUnit={t('votes').toLowerCase()} icon={<MailForward size={34} />} value={monthlyStats[currentMonth + "_votes"]}/>
						<Stat title={t('top_serveurs.stats.monthly_clicks')} goalValue={goalClicks} goalUnit={t('clicks').toLowerCase()} icon={<Pointer size={34} />} value={monthlyStats[currentMonth + "_clics"]}/>
					</SimpleGrid>
				</Grid.Col>
			</Grid>
		</Container>
	)
}

export default withNamespaces()(TopServeurs);