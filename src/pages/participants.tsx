import { FC, useEffect, useState } from 'react'
import { Box, Button, Grid2, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
// import { participants } from '../common/moks'
import { IParticipant, IParticipantsProps } from '../common/types.ts'
import { $api } from '../utils/axios.ts'

const Participants: FC<IParticipantsProps> = ({ event }) => {
	const navigate = useNavigate()
	const [participants, setParticipants] = useState<IParticipant[]>()

	const fetchParticipants = async (eventId: number) => {
		try {
			const response = await $api.get<IParticipant[]>('api/participants', {
				params: { eventId: eventId },
			})
			console.log(response)
			setParticipants(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (!event) navigate('/')
	}, [event, navigate])

	useEffect(() => {
		fetchParticipants(Number(event?.id))
	}, [event])

	console.log(participants)

	return (
		<Stack sx={{ mt: 2 }}>
			<Stack
				direction={{ xs: 'column-reverse', sm: 'row' }}
				justifyContent='space-around'
			>
				<img
					src={`https://image.tmdb.org/t/p/w300/${event?.image}`}
					width={250}
				/>
				<Box
					sx={{
						display: { xs: 'none', md: 'flex' },
						background: `url(https://image.tmdb.org/t/p/w200/${event?.poster})`,
						px: 10,
						flexGrow: 1,
						color: '#fff',
						border: 'solid',
					}}
				></Box>
				<Stack>
					<img
						src={`https://image.tmdb.org/t/p/w200/${event?.avatar}`}
						width={200}
					/>
					<Typography
						variant='h6'
						sx={{ mt: 2 }}
					>{`Organizer: ${event?.organizer}`}</Typography>
					<Typography variant='h6'>{`Date: ${event?.eventDate}`}</Typography>
				</Stack>
			</Stack>
			<Typography variant='h6' sx={{ mt: 2 }}>
				{event?.description}
			</Typography>
			<Grid2
				container
				columnSpacing={{ xs: 2, md: 4 }}
				rowSpacing={{ xs: 2, md: 4 }}
				sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
			>
				{participants?.map(item => (
					<Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
						<Stack
							sx={{
								border: `2px solid gray`,
								borderRadius: 1,
								p: 1.5,
							}}
						>
							<Typography variant='h5' noWrap>
								{item.fullName}
							</Typography>
							<Typography>{item.email}</Typography>
						</Stack>
					</Grid2>
				))}
			</Grid2>
			<Button
				sx={{ textTransform: 'none', alignSelf: 'flex-start', mt: 3 }}
				onClick={() => navigate('/')}
			>
				<Typography variant='h5'>Back to events</Typography>
			</Button>
		</Stack>
	)
}

export default Participants
