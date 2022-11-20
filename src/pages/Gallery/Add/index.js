import {forwardRef, useEffect, useState} from "react";
import {Dropzone, IMAGE_MIME_TYPE} from '@mantine/dropzone';
import {IconPhoto, IconUpload} from '@tabler/icons';
import {t} from "i18next";
import {getOperations} from "../../../services/operations";
import {
	Alert,
	Button,
	Center,
	Container,
	Grid,
	Group,
	Image,
	Input,
	List,
	Select,
	Text,
	Textarea,
	useMantineTheme
} from "@mantine/core";
import {AlertCircle, Check, Send} from "tabler-icons-react";
import {createImage} from "../../../services/images";
import {showNotification, updateNotification} from "@mantine/notifications";
import {useNavigate} from "react-router-dom";

const Add = () => {
	const [operations, setOperations] = useState([]);
	const [files, setFiles] = useState([]);
	const [errors, setErrors] = useState([]);
	const theme = useMantineTheme();
	const navigate = useNavigate();
	const dark = theme.colorScheme === 'dark';
	const chooseOperationsData = operations.map((operation, i) => ({
		label: operation.campaign.name + ", " + operation.name,
		value: operation.name,
		date: operation.date,
		key: i
	}))
	const previews = files.map((file, index) => {
		const imageUrl = URL.createObjectURL(file);
		return (
			<Image
				key={index}
				src={imageUrl}
				imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
			/>
		);
	});

	const SelectItem = forwardRef(
		({ label, date, ...others }, ref) => (
			<div ref={ref} {...others}>
				<Group noWrap position="apart">
					<Text size="sm">{label}</Text>
					<Text align="right" size="xs" opacity={0.65}>
						{new Date(date).toLocaleDateString('fr')}
					</Text>
				</Group>
			</div>
		)
	);

	useEffect(() => {
		getOperations().then((data) => {
			setOperations(data)
		})
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault()
		showNotification({
			id: `post-image-${event.target.image_title.value}`,
			loading: true,
			title: t('gallery.add.upload.running.title'),
			message: t('gallery.add.upload.running.description'),
			autoClose: false
		});

		const title = event.target.image_title.value
		const description = event.target.image_description.value
		const operation = event.target.image_operation.value
		const image = files[0]

		if (!image)
			setErrors((old) => [...old, {message: t('gallery.add.upload.error.need_image')}])

		const formData = new FormData()
		formData.append('title', title)
		formData.append('description', description)
		formData.append('operation', operation)
		formData.append('image', image)

		createImage(formData).then(() => {
			updateNotification({
				id: `post-image-${title}`,
				color: 'teal',
				title: t('gallery.add.upload.success.title'),
				message: t('gallery.add.upload.success.description', {title: title}),
				icon: <Check/>,
				autoClose: 5000,
			});
			navigate('/gallery')
		}).catch((e) => {
			updateNotification({
				id: `post-image-${title}`,
				color: 'red',
				title: t('gallery.add.upload.error.title'),
				message: e.message,
				icon: <AlertCircle />,
				autoClose: 5000,
			});
			console.error(e)
		})
	}

	return (
		<Container py={"2rem"}>
			<form onSubmit={handleSubmit}>
				{ errors.length > 0 ? <Alert color="red" mb="md" title={t('errors_detected')}>
					<List size="sm" style={{listStyle: 'inside'}}>
						{errors.map((error, i) => (
							<List.Item key={i} color="red">{error.message}</List.Item>
						))}
					</List>
				</Alert> : null }
				<Grid>
					<Grid.Col span={12} xs={5} sm={12} md={5}>
						<Input.Wrapper label={t('gallery.add.image_title.label')} withAsterisk>
							<Input name="image_title" placeholder={t('gallery.add.image_title.placeholder')} required />
						</Input.Wrapper>
					</Grid.Col>
					<Grid.Col span={12} xs={7} sm={12} md={7}>
						<Select
							name="image_operation"
							label={t('gallery.add.choose_operation.label')}
							placeholder={t('gallery.add.choose_operation.placeholder')}
							nothingFound={t('gallery.add.choose_operation.not_found')}
							itemComponent={SelectItem}
							data={chooseOperationsData}
							filter={(value, item) => item.label.toLowerCase().includes(value.toLowerCase().trim())}
							searchable
							clearable
							required
						/>
					</Grid.Col>
					<Grid.Col span={12}>
						<Textarea
							name="image_description"
							label={t('gallery.add.image_description.label')}
							placeholder={t('gallery.add.image_description.placeholder')}
							required
						/>
					</Grid.Col>
					<Grid.Col span={12}>
						<Input.Wrapper label={t('gallery.add.image.label')} withAsterisk>
							<Dropzone
								onDrop={setFiles}
								onReject={(files) => setErrors(files[0].errors)}
								maxSize={3 * 1024 ** 2}
								maxFiles={1}
								accept={IMAGE_MIME_TYPE}
								required
							>
								<Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
									<Dropzone.Accept>
										<IconUpload
											size={50}
											stroke={1.5}
											color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
										/>
									</Dropzone.Accept>
									<Dropzone.Idle>
										{ files.length > 0 ? null : <IconPhoto color={dark ? theme.colors.gray[4] : theme.colors.dark[9]} size={50} stroke={1.5} /> }
									</Dropzone.Idle>
									{ files.length > 0 ? previews :
										<div>
											<Text size="xl" color={dark ? theme.colors.gray[4] : theme.colors.dark[9]} inline>
												Drag images here or click to select files
											</Text>
											<Text size="sm" color="dimmed" inline mt={7}>
												Attach as many files as you like, each file should not exceed 5mb
											</Text>
										</div>
									}
								</Group>
							</Dropzone>
						</Input.Wrapper>
					</Grid.Col>
					<Grid.Col span={12}>
						<Center>
							<Button type="submit" color="teal" rightIcon={<Send />}>Publier</Button>
						</Center>
					</Grid.Col>
				</Grid>
			</form>
		</Container>
	)
}

export default Add;