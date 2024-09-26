import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Button,
	FormControlLabel,
	Grid2,
	Pagination,
	Stack,
	Switch,
	Typography,
} from '@mui/material'
import { $api } from '../utils/axios'
import { AxiosResponse } from 'axios'
import { IEvent, IEventProps } from '../common/types.ts'
import { EVENTS_ON_ONE_PAGE } from '../common/consts.ts'

const Events: FC<IEventProps> = ({
	checked,
	handleChange,
	// setEventId,
	setEvent,
}) => {
	const navigate = useNavigate()
	const [eventsState, setEventsState] = useState<AxiosResponse<IEvent[]>>()
	const [page, setPage] = useState(1)

	const fetchEvents = async () => {
		try {
			const response = await $api.get('api/events')
			setEventsState(response)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchEvents()
	}, [page])

	return (
		<Stack>
			<Grid2
				container
				columnSpacing={{ xs: 2, md: 4 }}
				rowSpacing={{ xs: 2, md: 4 }}
				sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
			>
				{eventsState?.data
					.slice(
						(page - 1) * EVENTS_ON_ONE_PAGE,
						(page - 1) * EVENTS_ON_ONE_PAGE + EVENTS_ON_ONE_PAGE,
					)
					.map(item => (
						<Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
							<Stack
								sx={{
									border: `2px solid gray`,
									borderRadius: 1,
									p: 1.5,
								}}
							>
								<Typography variant='h5' noWrap>
									{item.title}
								</Typography>
								<img src={`https://image.tmdb.org/t/p/w200/${item.poster}`} />
								<Typography variant='h6'>{`Date: ${item.eventDate}`}</Typography>
								<Typography>
									<span>{item.description}</span>
								</Typography>
								<Typography variant='h6'>Organizer:</Typography>
								<Typography variant='h6' sx={{ mt: -1 }} noWrap>
									{item.organizer}
								</Typography>
								<Stack direction='row' justifyContent='space-between'>
									<Button
										sx={{ textTransform: 'none' }}
										onClick={() => {
											// setEventId(it.id)
											setEvent(item)
											navigate('/event_registration')
										}}
									>
										<Typography variant='h6'>Register</Typography>
									</Button>
									<Button
										sx={{ textTransform: 'none' }}
										onClick={() => {
											// setEventId(it.id)
											setEvent(item)
											navigate('/participants')
										}}
									>
										<Typography variant='h6'>View</Typography>
									</Button>
								</Stack>
							</Stack>
						</Grid2>
					))}
			</Grid2>
			<Pagination
				count={
					eventsState?.data.length &&
					Math.ceil(eventsState?.data.length / EVENTS_ON_ONE_PAGE)
				}
				page={page}
				// boundaryCount={2}
				sx={{ alignSelf: 'center', mt: 3 }}
				onChange={(e: ChangeEvent<unknown>, value: number) => setPage(value)}
			/>
			<FormControlLabel
				control={<Switch checked={checked} onChange={handleChange} />}
				label={
					checked ? (
						<Typography variant='h6' color='primary'>
							Stop loading
						</Typography>
					) : (
						<Typography variant='h6' color='textPrimary'>
							Load more
						</Typography>
					)
				}
			/>
		</Stack>
	)
}
export default Events
