import {Group, Paper, Text} from "@mantine/core";
import {useStyles} from "./style";
import {withNamespaces} from "react-i18next";
import {t} from "i18next";

export const Card = ({ player }) => {
	const {classes} = useStyles();

	return (
		<Paper withBorder p="md" radius="md">
			<Group position="apart">
				<Text color="dimmed" className={classes.title}>
					{player.playername}
				</Text>
			</Group>

			<Group spacing="xs" mt={25}>
				<Text className={classes.value}>{player.votes} {player.votes > 1 ? t('votes').toLowerCase() : t('vote').toLowerCase()}</Text>
			</Group>
		</Paper>
	)
}

export default withNamespaces()(Card);