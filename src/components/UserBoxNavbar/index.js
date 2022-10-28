import React, {useContext} from 'react';
import {ChevronLeft, ChevronRight} from 'tabler-icons-react';
import {Avatar, Box, Group, Text, UnstyledButton, useMantineTheme} from '@mantine/core';
import {getDiscordAvatar} from "../../utils/discord";
import UserContext from "../../context/User";
import {roles} from "../../data/roles";
import {t} from "i18next";
import {withNamespaces} from "react-i18next";

export function UserBoxNavbar() {
	const theme = useMantineTheme();
	const user = useContext(UserContext);

	return (
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

					{theme.dir === 'ltr' ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
				</Group>
			</UnstyledButton>
		</Box>
	);
}

export default withNamespaces()(UserBoxNavbar);