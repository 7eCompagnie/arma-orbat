import {Group, Text, ThemeIcon, UnstyledButton} from "@mantine/core";
import {links as data} from '../../data/navbarLinks'
import {t} from "i18next";
import {useLocation} from "react-router-dom";
import {useContext} from "react";
import UserContext from "../../context/User";
import {isGranted} from "../../data/roles";
import {withNamespaces} from "react-i18next";
import Loading from "./Loading";

function MainLink({ icon, color, label, to, permission, onLinkClicked}) {
	const user = useContext(UserContext);
	const location = useLocation();

	if (!user)
		return <Loading color={color}/>;

	if (!isGranted(user, permission))
		return null;

	return (
		<UnstyledButton
			onClick={() => onLinkClicked(to)}
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

export function NavbarLinks({onLinkClicked}) {
	const links = data.map((link) => <MainLink {...link} onLinkClicked={onLinkClicked} key={link.label} />);
	return <div>{links}</div>;
}

export default withNamespaces()(NavbarLinks);