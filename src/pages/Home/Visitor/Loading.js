import {Container, Grid, SimpleGrid, Skeleton, Text, Timeline, Title, useMantineTheme} from "@mantine/core";
import {t} from "i18next";
import StatCard from "../../../components/StatCard";
import {Login, Sword, World} from "tabler-icons-react";

export const Loading = () => {
	const theme = useMantineTheme();

	return (
		<Container py={"2rem"}>
			<Grid gutter="50">
				<Grid.Col span={12} sm={7}>
					<Title order={2} mb="2rem" color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9]}>
						<Skeleton height={8} radius="xl" width="40%" />
					</Title>

					<Text color="dimmed">
						<Skeleton height={8} radius="xl" />
						<Skeleton height={8} mt={6} radius="xl" />
						<Skeleton height={8} mt={6} width="70%" radius="xl" />
						<Skeleton height={8} mt={12} radius="xl" />
						<Skeleton height={8} mt={6} radius="xl" />
						<Skeleton height={8} mt={6} width="70%" radius="xl" />
					</Text>

					<Title order={2} mt="3rem" mb="2rem" color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9]}>
						<Skeleton height={8} radius="xl" width="40%" />
					</Title>

					<SimpleGrid cols={2} gutter="xl" mt="xl">
						<StatCard title={t('soldiers')} icon={<Sword />} value="68" isLoading={true} />
						<StatCard title={t('operations')} icon={<World />} value="12" isLoading={true} />
					</SimpleGrid>
				</Grid.Col>
				<Grid.Col span={12} sm={5}>
					<Title order={2} mb="2rem" color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9]}>
						<Skeleton height={8} radius="xl" width="40%" />
					</Title>
					<Timeline active={0} bulletSize={34} lineWidth={2}>
						<Timeline.Item bullet={<Login size={22} />} title={<Skeleton height={6} radius="xl" width="40%"/>
						}>
							<Skeleton height={4} mt={12} radius="xl" />
							<Skeleton height={4} mt={6} radius="xl" width="40%" />
						</Timeline.Item>

						<Timeline.Item bullet={<Login size={22} />} title={<Skeleton height={6} radius="xl" width="40%"/>
						}>
							<Skeleton height={4} mt={12} radius="xl" />
							<Skeleton height={4} mt={6} radius="xl" width="40%" />
						</Timeline.Item>

						<Timeline.Item bullet={<Sword size={22} />} title={<Skeleton height={6} radius="xl" width="40%"/>
						}>
							<Skeleton height={4} mt={12} radius="xl" />
							<Skeleton height={4} mt={6} radius="xl" width="40%" />
						</Timeline.Item>

						<Timeline.Item bullet={<World size={22} />} title={<Skeleton height={6} radius="xl" width="40%"/>
						}>
							<Skeleton height={4} mt={12} radius="xl" />
							<Skeleton height={4} mt={6} radius="xl" width="40%" />
						</Timeline.Item>
					</Timeline>
				</Grid.Col>
			</Grid>
		</Container>
	)
}

export default Loading;