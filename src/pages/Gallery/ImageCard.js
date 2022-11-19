import {IconHeart, IconHeartBroken} from '@tabler/icons';
import {ActionIcon, Avatar, Badge, Card, Center, Group, Image, Text, Tooltip,} from '@mantine/core';
import {useStyles} from "./style";
import {getDiscordAvatar} from "../../utils/discord";
import {addLike, getLikesOfImage, removeLike} from "../../services/imageLikes";
import {useEffect, useState} from "react";
import {t} from "i18next";
import {withNamespaces} from "react-i18next";


function ImageCard({id, image, title, description, author, rating, defaultLiked, ...others}) {
	const { classes, cx, theme } = useStyles();
	const [liked, setLiked] = useState(defaultLiked);
	const [likesCount, setLikesCount] = useState(0);

	useEffect(() => {
		getLikesOfImage(id).then((data) => {
			setLikesCount(data.length)
		})
	}, [id]);


	const toggleLike = () => {
		if (liked)
			removeLike(id).then(() => {
				setLiked(false)
				getLikesOfImage(id).then((data) => {
					setLikesCount(data.length)
				})
			})
		else
			addLike(id).then(() => {
				setLiked(true)
				getLikesOfImage(id).then((data) => {
					setLikesCount(data.length)
				})
			})
	}

	return (
		<Card withBorder radius="md" className={cx(classes.card)} {...others}>
			<Card.Section>
				<Image src={image} height={180} />
			</Card.Section>

			<Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
				{rating}
			</Badge>

			<Text className={classes.title} weight={500}>
				{title}
			</Text>

			<Text size="sm" color="dimmed" lineClamp={4}>
				{description}
			</Text>

			<Group position="apart" className={classes.user}>
				<Center>
					<Avatar src={getDiscordAvatar(author.discordIdentifier, author.discordAvatar)} size={24} radius="xl" mr="xs" />

					<Text size="sm" inline>
						{t('gallery.published_by')} <span style={{fontWeight: "bold"}}>{author.discordUsername}</span>
					</Text>
				</Center>
			</Group>

			<Card.Section className={classes.footer}>
				<Group position="apart">
					<Text size="xs" color="dimmed">
						{likesCount} {t('gallery.people_liked_this')}
					</Text>
					<Group spacing={0}>
						<Tooltip label={liked ? t('gallery.dont_like') : t('gallery.like') } position="top" withArrow>
							<ActionIcon onClick={() => toggleLike()}>
								{ liked ? <IconHeartBroken size={18} color={theme.colors.red[6]} /> : <IconHeart size={18} color={theme.colors.red[6]} /> }
							</ActionIcon>
						</Tooltip>
					</Group>
				</Group>
			</Card.Section>
		</Card>
	);
}

export default withNamespaces()(ImageCard)