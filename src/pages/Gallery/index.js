import {Container, SimpleGrid, useMantineTheme} from "@mantine/core";
import ImageCard from "./ImageCard/ImageCard";
import {useContext, useEffect, useState} from "react";
import {getImages} from "../../services/images";
import UserContext from "../../context/User";

const Gallery = () => {
	const [images, setImages] = useState([]);
	const user = useContext(UserContext);
	const theme = useMantineTheme();

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
					           defaultLiked={ !!image.likes.find((like) => like.userId === user.id) }
					/>
				))}
			</SimpleGrid>
		</Container>
	);
}

export default Gallery;