import React, {useContext} from 'react';
import {IconChevronLeft, IconChevronRight} from '@tabler/icons';
import {Avatar, Box, Group, Menu, Text, UnstyledButton, useMantineTheme} from '@mantine/core';
import {getDiscordAvatar} from "../../utils/discord";
import UserContext from "../../context/User";
import {roles} from "../../data/roles";
import {t} from "i18next";
import {withNamespaces} from "react-i18next";
import {Logout} from "tabler-icons-react";
import {links as data} from '../../data/userBoxLinks'

export function UserBoxNavbar() {
	const theme = useMantineTheme();
	const user = useContext(UserContext);
	const items = data.map((item) => (
		<Menu.Item
			icon={item.icon}
			onClick={() => {
				item.action();
			}}
			key={item.label}
		>
			{t(item.label)}
		</Menu.Item>
	));

	return (
		<Menu
			position="right-end"
			width="target">
			<Menu.Target>
				<Box
					sx={{
						paddingTop: theme.spacing.sm,
						borderTop: `1px solid ${
							theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
						}`,
					}}
				>
					<UnstyledButton
						sx={{
							display: 'block',
							width: '100%',
							padding: theme.spacing.xs,
							borderRadius: theme.radius.sm,
							color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

							'&:hover': {
								backgroundColor:
									theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
							},
						}}
					>
						<Group>
							<Avatar
								src={getDiscordAvatar(user.discordIdentifier, user.discordAvatar)}
								radius="xl"
							/>
							<Box sx={{ flex: 1 }}>
								<Text size="sm" weight={500}>
									{user.discordUsername}
								</Text>
								<Text color="dimmed" size="xs">
									{t(roles[user.role.toLowerCase()].display)}
								</Text>
							</Box>

							{theme.dir === 'ltr' ? <IconChevronRight size={18} /> : <IconChevronLeft size={18} />}
						</Group>
					</UnstyledButton>
				</Box>
			</Menu.Target>
			<Menu.Dropdown>
				{items}
				<Menu.Divider />
				<Menu.Item
					color="red"
					icon={<Logout/>}
					onClick={() => {
						localStorage.removeItem('token');
						window.location = "/";
					}}>
					{t('navbar.user.logout')}
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}

export default withNamespaces()(UserBoxNavbar);