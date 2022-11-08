import {Box, Group, Menu, Skeleton, UnstyledButton, useMantineTheme} from "@mantine/core";
import {t} from "i18next";
import {IconChevronLeft, IconChevronRight} from "@tabler/icons";
import {Logout} from "tabler-icons-react";
import React from "react";
import {links as data} from "../../data/userBoxLinks";

export const Loading = () => {
	const theme = useMantineTheme();

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
							<Skeleton height={38} width={38} radius="xl"/>
							<Box sx={{ flex: 1 }}>
								<Skeleton height={8} radius="xl" width="80%" />
								<Skeleton height={4} width="40%" mt={8} radius="xl" />
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
	)
}

export default Loading;