import {createStyles} from "@mantine/core";

export const useStyles = createStyles((theme) => ({
	root: {
		paddingTop: 80,
	},

	inner: {
		position: 'relative',
	},

	image: {
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		zIndex: 0,
		opacity: 0.75,
		margin: '0 auto',
		width: '70%',

		'& path': {
			fill: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
		}
	},

	content: {
		paddingTop: 160,
		position: 'relative',
		zIndex: 1,

		[theme.fn.smallerThan('sm')]: {
			paddingTop: 120,
		},
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		textAlign: 'center',
		fontWeight: 900,
		fontSize: 38,
		color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.dark[9],

		[theme.fn.smallerThan('sm')]: {
			fontSize: 32,
		},
	},

	description: {
		maxWidth: 540,
		margin: 'auto',
		marginTop: theme.spacing.xl,
		marginBottom: theme.spacing.xl * 1.5,
	},
}));