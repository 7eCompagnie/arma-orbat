import {Text} from "@mantine/core";
import React, {useContext} from "react";
import Visitor from "../Visitor";
import UserContext from "../../../context/User";

export const Content = () => {
	const user = useContext(UserContext);

	// TODO: Change to dashboard loading
	if (!user)
		return <Visitor />

	return (
		user.role === "VISITOR" ? <Visitor/> : <Text>Dashboard</Text>
	)
}

export default Content