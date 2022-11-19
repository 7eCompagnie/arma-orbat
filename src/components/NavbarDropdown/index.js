import {useContext, useEffect, useState} from 'react';
import {Box, Collapse, Group, Text, ThemeIcon, UnstyledButton} from '@mantine/core';
import {ChevronRight} from "tabler-icons-react";
import {useStyles} from "./style";
import {useLocation, useNavigate} from "react-router-dom";
import {t} from "i18next";
import {dropdownLinks} from "../../data/navbarLinks";
import {isGranted} from "../../data/roles";
import UserContext from "../../context/User";
import {withNamespaces} from "react-i18next";
import {isTrainer} from "../../services/users";
import {getSetting} from "../../services/settings";
import Loading from "../NavbarLinks/Loading";

export function LinksGroup({ icon, label, initiallyOpened, links, to, color, permission }) {
	const { classes, theme } = useStyles();
	const user = useContext(UserContext);
	const navigate = useNavigate();
	const hasLinks = Array.isArray(links);
	const location = useLocation();
	const [userIsTrainer, setUserIsTrainer] = useState(false);
	const [zeusRoleId, setZeusRoleId] = useState({});

	const [opened, setOpened] = useState(initiallyOpened || false);

	useEffect(() => {
		if (!user) return;

		isTrainer(user).then((data) => {
			setUserIsTrainer(data);
		}).catch((err) => {
			console.error(err);
		});

		getSetting('ZEUS_ROLE_ID').then((data) => {
			setZeusRoleId(data);
		}).catch((err) => {
			console.error(err);
		})
	}, [user]);

	if (!user)
		return <Loading color={color} />

	const items = (hasLinks ? links : []).map((link) => {
		if (isGranted(user, permission) ||
			((link.label === "navbar.links.trainings.pass") && userIsTrainer) ||
			(label === "campaigns" && user.trainings.filter((training) => training.trainingId === zeusRoleId.value))) {
			return <Text
				className={classes.link}
				key={link.label}
				onClick={() => navigate(link.to)}
				style={{
					fontWeight: location.pathname === link.to ? "bold" : "normal",
					color: location.pathname === link.to ? theme.colors.dark[9] : theme.colors.gray[7]
				}}
			>
				{t(link.label)}
			</Text>
		} else
			return null;
	});

	if (isGranted(user, permission) ||
		(label === "trainings" && userIsTrainer) ||
		(label === "campaigns" && user.trainings.filter((training) => training.trainingId === zeusRoleId.value) > 0)) {
		return (
			<>
				<UnstyledButton onClick={() => setOpened((o) => !o)} sx={(theme) => ({
					display: 'block',
					width: '100%',
					padding: theme.spacing.xs,
					borderRadius: theme.radius.sm,
					color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
					backgroundColor:
						location.pathname === to ? theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0] : "transparent",

					'&:hover': {
						backgroundColor:
							theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
					},
					'&:focus': {
						backgroundColor:
							theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
					},
				})}>
					<Group position="apart" spacing={0}>
						<Group>
							<ThemeIcon color={color} variant="light" size={30}>
								{icon}
							</ThemeIcon>

							<Text size="sm">{t(label)}</Text>
						</Group>
						{hasLinks && (
							<ChevronRight
								className={classes.chevron}
								size={14}
								style={{
									transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
								}}
							/>
						)}
					</Group>
				</UnstyledButton>
				{hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
			</>
		);
	} else
		return null
}

export function NavbarLinksGroup() {
	const items = dropdownLinks.map((item) => (
		<LinksGroup key={item.label} {...item} />
	));

	return (
		<Box
			sx={(theme) => ({
				borderRadius: theme.radius.sm,
			})}
		>
			{items}
		</Box>
	);
}

export default withNamespaces()(NavbarLinksGroup);