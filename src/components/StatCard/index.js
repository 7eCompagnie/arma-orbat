import {Group, Paper, Text} from '@mantine/core';
import {useStyles} from "./style";

export const StatCard = ({title, icon, value }) => {
	const { classes } = useStyles();

	return (
		<Paper withBorder p="md" radius="md" key={title}>
			<Group position="apart">
				<Text size="xs" color="dimmed" className={classes.title}>
					{title}
				</Text>
				{icon}
			</Group>

			<Group align="flex-end" spacing="xs" mt={25}>
				<Text className={classes.value}>{value}</Text>
			</Group>
		</Paper>
	);
}

export default StatCard