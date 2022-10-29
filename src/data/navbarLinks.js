import {
	Book,
	CalendarStats,
	Dashboard,
	DeviceGamepad2,
	Mail,
	Photo,
	ShieldLock,
	Sword,
	ZoomMoney
} from "tabler-icons-react";

export const links = [
	{ icon: <Dashboard size={16} />, to: "/", color: 'violet', label: 'navbar.links.dashboard', permission: 'VISITOR' },
	{ icon: <DeviceGamepad2 size={16} />, to: "/test", color: 'blue', label: 'navbar.links.play', permission: 'USER' },
	{ icon: <Sword size={16} />, to: "/test2", color: 'cyan', label: 'navbar.links.get_trained', permission: 'USER' },
	{ icon: <Mail size={16} />, to: "/top-serveurs", color: 'green', label: 'navbar.links.top_serveurs', permission: 'VISITOR' },
	{ icon: <Photo size={16} />, to: "/gallery", color: 'yellow', label: 'navbar.links.gallery', permission: 'VISITOR' },
	{ icon: <ZoomMoney size={16} />, to: "/support-us", color: 'orange', label: 'navbar.links.support_us', permission: 'USER' },
];

export const dropdownLinks = [
	{
		label: 'trainings',
		icon: <Book size={16}/>,
		color: "yellow",
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
		color: "orange",
		permission: "ADMIN",
		links: [
			{ label: 'navbar.links.campaigns.manage', to: '/', permission: 'ADMIN' },
			{ label: 'navbar.links.campaigns.create', to: '/', permission: 'ADMIN' }
		],
	},
	{
		label: 'roles.administrator',
		icon: <ShieldLock size={16}/>,
		color: "red",
		permission: "ADMIN",
		links: [
			{ label: 'navbar.links.admin.users', to: '/', permission: 'ADMIN' },
			{ label: 'navbar.links.admin.whitelist', to: '/', permission: 'ADMIN' },
			{ label: 'navbar.links.admin.config', to: '/', permission: 'ADMIN' }
		]
	}
];