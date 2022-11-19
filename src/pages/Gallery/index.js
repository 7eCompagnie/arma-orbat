import {Container, Group, SimpleGrid, useMantineTheme, Button} from "@mantine/core";
import ImageCard from "./ImageCard";
import {useContext, useEffect, useState} from "react";
import {getImages} from "../../services/images";
import UserContext from "../../context/User";
import {t} from "i18next";
import {CameraPlus} from "tabler-icons-react";
import {useNavigate} from "react-router-dom";

const Gallery = () => {
	const [images, setImages] = useState([]);
	const user = useContext(UserContext);
	const theme = useMantineTheme();
	const navigate = useNavigate();

	useEffect(() => {
		getImages().then(data => {
			setImages(data);
		}).catch(error => {
			console.error(error);
		});
	}, []);

	if (!user)
		return <h1>Loading</h1>

	return (
		<Container py={"2rem"}>
			<Group position="right">
				<Button onClick={() => navigate('/gallery/add')} mb="xl" leftIcon={<CameraPlus/>}>{t('gallery.add_image')}</Button>
			</Group>
			<SimpleGrid cols={2} breakpoints={[
				{maxWidth: theme.breakpoints.lg, cols: 2},
				{maxWidth: theme.breakpoints.md, cols: 1},
				{maxWidth: theme.breakpoints.sm, cols: 2},
				{maxWidth: theme.breakpoints.xs, cols: 1},
			]}>
				{images.map(image => (
					<ImageCard image={`${process.env.REACT_APP_API_ENDPOINT}/${image.image}`}
					           key={image.id}
					           id={image.id}
					           rating={image.operation.name}
					           title={image.title}
					           description={image.description}
					           author={image.user}
					           date={image.createdAt}
					           defaultLiked={ !!image.likes.find((like) => like.userId === user.id) }
					/>
				))}
			</SimpleGrid>
		</Container>
	);
}

export default Gallery;