import {IconHeart, IconHeartBroken, IconTrash} from '@tabler/icons';
import {
	ActionIcon,
	Avatar,
	Badge,
	Card,
	Center,
	Group,
	Image,
	Modal,
	Skeleton,
	Text,
	Tooltip,
	Button,
	Divider
} from '@mantine/core';
import {useStyles} from "./style";
import {getDiscordAvatar} from "../../utils/discord";
import {addLike, getLikesOfImage, removeLike} from "../../services/imageLikes";
import {useEffect, useState} from "react";
import {t} from "i18next";
import {withNamespaces} from "react-i18next";
import {showNotification, updateNotification} from "@mantine/notifications";
import {deleteImage} from "../../services/images";
import {AlertCircle, Check} from "tabler-icons-react";
import {isGranted} from "../../data/roles";


function ImageCard({id, image, title, description, author, rating, likes, user, date, onDelete}) {
	const { classes, cx, theme } = useStyles();
	const [opened, setOpened] = useState(false);
	const [liked, setLiked] = useState(false);
	const [likesCount, setLikesCount] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!user)
			return
		setLiked(!!likes.find((like) => like.userId === user.id))
		getLikesOfImage(id).then((data) => {
			setLikesCount(data.length)
		})
	}, [id, user, likes]);

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

	const handleDeleteImage = () => {
		setLoading(true);
		showNotification({
			id: `delete-image-${title}`,
			loading: true,
			title: t('gallery.add.delete.running.title'),
			message: t('gallery.add.delete.running.description'),
			autoClose: false
		});

		deleteImage(id).then((data) => {
			setOpened(false)
			setLoading(false)
			onDelete()
			updateNotification({
				id: `delete-image-${title}`,
				color: 'teal',
				title: t('gallery.add.delete.success.title'),
				message: t('gallery.add.delete.success.description', {title: title}),
				icon: <Check/>,
				autoClose: 5000,
			});
		}).catch((e) => {
			setOpened(false)
			setLoading(false)
			updateNotification({
				id: `delete-image-${title}`,
				color: 'red',
				title: t('gallery.add.delete.error.title'),
				message: e.message,
				icon: <AlertCircle />,
				autoClose: 5000,
			});
			console.error(e)
		})
	}

	return (
		<Skeleton visible={!user} style={{overflow: 'visible'}}>
			<Card withBorder radius="md" className={cx(classes.card)}>
				<Card.Section>
					<Image radius="md" src={image} height={180} />
				</Card.Section>

				{user != null && (author.id === user.id || isGranted(user, 'ADMIN')) ? <ActionIcon onClick={() => setOpened(true)} variant="filled" radius="xl" color="red" size="lg" className={classes.trashIcon}>
					<IconTrash/>
				</ActionIcon> : null}

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
							{t('gallery.published_by')} <span style={{fontWeight: "bold"}}>{author.discordUsername}</span> {t('gallery.on')} {new Date(date).toLocaleDateString()}
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
			
			<Modal centered
			       overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
			       overlayOpacity={0.55}
			       overlayBlur={3}
					opened={opened}
					onClose={() => setOpened(false)}
			        title={t('gallery.add.confirm_delete.title', {title: title})}
			>
				<Text>
					{t('gallery.add.confirm_delete.message')}
				</Text>
				<Divider my="xl"/>
				<Group position="apart">
					<Button variant="subtle" onClick={() => setOpened(false)}>{t('cancel')}</Button>
					<Button color="red" onClick={() => handleDeleteImage()} loading={loading}>{t('delete')}</Button>
				</Group>
			</Modal>
		</Skeleton>
	);
}

export default withNamespaces()(ImageCard)