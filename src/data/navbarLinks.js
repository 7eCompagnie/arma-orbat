import {CalendarStats, Dashboard, DeviceGamepad2, Sword} from "tabler-icons-react";

export const links = [
	{ icon: <Dashboard size={16} />, to: "/", color: 'blue', label: 'navbar.links.dashboard', permission: 'VISITOR' },
	{ icon: <DeviceGamepad2 size={16} />, to: "/test", color: 'teal', label: 'navbar.links.play', permission: 'USER' },
	{ icon: <Sword size={16} />, to: "/test2", color: 'violet', label: 'navbar.links.get_trained', permission: 'USER' },
	// { icon: <Database size={16} />, color: 'grape', label: 'Databases' },
];

export const dropdownLinks = [
	{
		label: 'trainings',
		icon: <CalendarStats size={16}/>,
		color: "red",
		permission: "ADMIN",
		links: [
			{ label: 'navbar.links.trainings.manage', to: '/manage', permission: 'ADMIN' },
			{ label: 'navbar.links.trainings.create', to: '/', permission: 'ADMIN' },
			{ label: 'navbar.links.trainings.pass', to: '/', permission: 'ADMIN' },
		]
	},
	{
		label: 'campaigns',
		icon: <CalendarStats size={16}/>,
		color: "red",
		permission: "ADMIN",
		links: [
			{ label: 'navbar.links.campaigns.manage', to: '/', permission: 'ADMIN' },
			{ label: 'navbar.links.campaigns.create', to: '/', permission: 'ADMIN' }
		],
	},
	{
		label: 'roles.administrator',
		icon: <CalendarStats size={16}/>,
		color: "red",
		permission: "ADMIN",
		links: [
			{ label: 'navbar.links.admin.users', to: '/', permission: 'ADMIN' },
			{ label: 'navbar.links.admin.whitelist', to: '/', permission: 'ADMIN' },
			{ label: 'navbar.links.admin.config', to: '/', permission: 'ADMIN' }
		]
	}
];