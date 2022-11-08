import {Badge, createStyles, Group, Paper, Progress, Text, ThemeIcon} from "@mantine/core";
import {withNamespaces} from "react-i18next";
import {t} from "i18next";

const ICON_SIZE = 60;

const useStyles = createStyles((theme) => ({
	card: {
		position: 'relative',
		overflow: 'visible',
		padding: theme.spacing.xl,
		paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
	},

	icon: {
		position: 'absolute',
		top: -ICON_SIZE / 3,
		left: `calc(50% - ${ICON_SIZE / 2}px)`,
	},

	cardTitle: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		lineHeight: 1,
	},
}));

export function Stat({title, goalValue, goalUnit, icon, value}) {
	const { classes } = useStyles();
	const percentage = goalValue === 0 ? 0 : Math.round((value / goalValue) * 100);
	const dateToday = new Date();
	const lastDayOfMonth = new Date(dateToday.getFullYear(), dateToday.getMonth()+1, 0).getDate();
	const daysUntilEndOfMonth = lastDayOfMonth - dateToday.getDate();

	return (
		<Paper radius="md" withBorder className={classes.card} mt={ICON_SIZE / 3}>
			<ThemeIcon className={classes.icon} size={ICON_SIZE} radius={ICON_SIZE}>
				{icon}
			</ThemeIcon>

			<Text align="center" weight={700} className={classes.carTitle}>
				{title}
			</Text>
			<Text color="dimmed" align="center" size="sm">
				{goalValue} {goalUnit}
			</Text>

			<Group position="apart" mt="xs">
				<Text size="sm" color="dimmed">
					Progression
				</Text>
				<Text size="sm" color="dimmed">
					{percentage}%
				</Text>
			</Group>

			<Progress value={percentage} mt={5} />

			<Group position="apart" mt="md">
				<Text size="sm">{value} / {goalValue} {goalUnit}</Text>
				<Badge size="sm">{daysUntilEndOfMonth} {daysUntilEndOfMonth > 1 ? t('days_left').toLowerCase() : t('day_left').toLowerCase()}</Badge>
			</Group>
		</Paper>
	);
}

export default withNamespaces()(Stat);