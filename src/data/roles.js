export const roles = {
	"admin": {
		"display": "roles.administrator"
	},
	"user": {
		"display": "roles.user"
	},
	"visitor": {
		"display": "roles.visitor"
	}
}

export const isGranted = (user, role) => {
	if (user.role === role)
		return true;
	else if (user.role === "USER" && role === "VISITOR")
		return true;
	return user.role === 'ADMIN';
}