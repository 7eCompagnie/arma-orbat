import {Settings, User} from "tabler-icons-react";
import React from "react";

export const links = [
	{
		label: 'navbar.user.profile',
		icon: <User/>,
		action: () => {
			console.log('Profile clicked');
		}
	},
	{
		label: 'navbar.user.settings',
		icon: <Settings/>,
		action: () => {
			console.log('Settings clicked');
		},
	}
]