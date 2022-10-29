import {useStyles} from "./style";
import {Container, Title, Text, Group, Button} from "@mantine/core";
import {Illustration} from "./Illustation";
import {t} from "i18next";
import {withNamespaces} from "react-i18next";
import {useNavigate} from "react-router-dom";

export const NotFound = () => {
	const { classes } = useStyles();
	const navigate = useNavigate();

	return (
		<Container className={classes.root}>
			<div className={classes.inner}>
				<Illustration className={classes.image} />
				<div className={classes.content}>
					<Title className={classes.title}>{t('404.title')}</Title>
					<Text color="dimmed" size="lg" align="center" className={classes.description}>
						{t('404.description')}
					</Text>
					<Group position="center">
						<Button size="md" onClick={() => navigate('/')}>{t('404.back_to_home')}</Button>
					</Group>
				</div>
			</div>
		</Container>
	)
}

export default withNamespaces()(NotFound);