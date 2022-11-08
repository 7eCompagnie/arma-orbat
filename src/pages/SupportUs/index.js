import {withNamespaces} from "react-i18next";
import {Button, Container, Text, Title, useMantineTheme, Center} from "@mantine/core";
import {ExternalLink} from "tabler-icons-react";

export const SupportUs = () => {
	const theme = useMantineTheme();
	return (
		<Container py={"2rem"}>
			<Title order={2} mb="2rem" color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9]}>
				Nous avons besoin de votre aide !
			</Title>

			<Text color="dimmed">
				La 7ème Compagnie est une communauté qui vous propose des missions mensuelles gratuitement.
				Mais cela à un coût, et nous avons besoin de votre aide pour continuer à financer les différents serveurs.
			</Text>

			<Text color="dimmed">
				Si vous souhaitez nous aider, vous pouvez nous faire un don sur PayPal en cliquant le bouton ci-dessous.
			</Text>

			<Center mt="2rem">
				<Button mb="2rem" rightIcon={<ExternalLink size={18}/>} onClick={() => {
					window.open('https://www.paypal.com/donate?hosted_button_id=F8FEDJSANSKUU', '_blank').focus();
				}}>J'aide la 7E</Button>
			</Center>
		</Container>
	)
}

export default withNamespaces()(SupportUs);