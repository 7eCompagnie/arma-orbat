import {createStyles} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
	link: {
		fontWeight: 500,
		display: 'block',
		textDecoration: 'none',
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
		paddingLeft: 31,
		marginLeft: 30,
		fontSize: theme.fontSizes.sm,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
		borderLeft: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,
			cursor: "pointer",
		},
	},

	chevron: {
		transition: 'transform 200ms ease',
	},
}));