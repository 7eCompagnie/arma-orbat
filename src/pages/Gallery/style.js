import {createStyles} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
	card: {
		position: 'relative',
		overflow: 'visible',
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
	},

	rating: {
		position: 'absolute',
		top: theme.spacing.xs,
		right: theme.spacing.xs + 2,
		pointerEvents: 'none',
	},

	trashIcon: {
		position: 'absolute',
		top: -theme.spacing.md,
		left: -theme.spacing.md + 2,
	},

	title: {
		display: 'block',
		marginTop: theme.spacing.md,
		marginBottom: theme.spacing.xs / 2,
	},

	action: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
		...theme.fn.hover({
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
		}),
	},

	user: {
		marginTop: theme.spacing.md,
	},

	footer: {
		padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
		marginTop: theme.spacing.md,
		borderTop: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
		}`,
	},
}));