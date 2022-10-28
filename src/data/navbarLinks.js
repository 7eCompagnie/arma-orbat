import {Dashboard, DeviceGamepad2, Sword} from "tabler-icons-react";

export const links = [
	{ icon: <Dashboard size={16} />, to: "/", color: 'blue', label: 'navbar.links.dashboard', permission: 'VISITOR' },
	{ icon: <DeviceGamepad2 size={16} />, to: "/test", color: 'teal', label: 'navbar.links.play', permission: 'USER' },
	{ icon: <Sword size={16} />, to: "/test2", color: 'violet', label: 'navbar.links.trainings', permission: 'USER' },
	// { icon: <Database size={16} />, color: 'grape', label: 'Databases' },
];