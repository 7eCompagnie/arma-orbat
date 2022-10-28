import {Group, Text, ThemeIcon, UnstyledButton} from "@mantine/core";
import {links as data} from '../../data/navbarLinks'
import {t} from "i18next";
import {useLocation, useNavigate} from "react-router-dom";
import {useContext} from "react";
import UserContext from "../../context/User";
import {isGranted} from "../../data/roles";
import {withNamespaces} from "react-i18next";

function MainLink({ icon, color, label, to, permission }) {
	const navigate = useNavigate();
	const user = useContext(UserContext);
	const location = useLocation();

	if (!isGranted(user, permission))
		return null;

	return (
		<UnstyledButton
			onClick={() => {
				navigate(to)
			}}
			sx={(theme) => ({
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
			})}
		>
			<Group>
				<ThemeIcon color={color} variant="light">
					{icon}
				</ThemeIcon>

				<Text size="sm">{t(label)}</Text>
			</Group>
		</UnstyledButton>
	);
}

export function NavbarLinks() {
	const links = data.map((link) => <MainLink {...link} key={link.label} />);
	return <div>{links}</div>;
}

export default withNamespaces()(NavbarLinks);