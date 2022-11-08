import {Group, Skeleton, ThemeIcon, UnstyledButton} from "@mantine/core";

export const Loading = ({color}) => {
	return (
		<UnstyledButton
			sx={(theme) => ({
				display: 'block',
				width: '100%',
				padding: theme.spacing.xs,
				borderRadius: theme.radius.sm,
				color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

				'&:hover': {
					backgroundColor:
						theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
				},
			})}
		>
			<Group>
				<ThemeIcon color={color} variant="light">
					<Skeleton height={12} circle/>
				</ThemeIcon>

				<Skeleton height={8} radius="xl" style={{flex: 1}}/>
			</Group>
		</UnstyledButton>
  );
}

export default Loading;