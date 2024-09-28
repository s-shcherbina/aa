import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Button,
	FormControlLabel,
	Grid2,
	Pagination,
	Popover,
	Stack,
	Switch,
	Typography,
} from '@mui/material'
import { $api } from '../utils/axios'
import { IEvent, IEventProps } from '../common/types.ts'
import {
	createParticipants,
	EVENTS_ON_ONE_PAGE,
	LABEL_SORTING,
	sortEvents,
	SORTING,
} from '../common/consts.ts'
import Radios from '../components/radios.tsx'

const Events: FC<IEventProps> = ({
	checked,
	handleChange,
	setEvent,
	pageFromApi,
}) => {
	const navigate = useNavigate()
	const [eventsState, setEventsState] = useState<IEvent[]>()
	const [page, setPage] = useState(1)
	const [description, setDescription] = useState('')
	const [sort, setSort] = useState('')
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

	const handleChangeRadios = (e: ChangeEvent<HTMLInputElement>) => {
		setSort((e.target as HTMLInputElement).value)
	}

	const handlePopoverClose = () => setAnchorEl(null)
	const open = Boolean(anchorEl)

	const fetchEvents = async () => {
		try {
			const response = await $api.get('api/events')
			setEventsState(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	createParticipants(eventsState)

	useEffect(() => {
		fetchEvents()
	}, [pageFromApi])

	return (
		<Stack>
			<Grid2
				container
				columnSpacing={{ xs: 2, md: 4 }}
				rowSpacing={{ xs: 2, md: 4 }}
				sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
			>
				{sortEvents(eventsState, sort)
					?.slice(
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
								<Typography
									aria-owns={open ? 'mouse-over-popover' : undefined}
									aria-haspopup='true'
									onMouseEnter={(event: React.MouseEvent<HTMLElement>) => {
										setAnchorEl(event.currentTarget)
										setDescription(item.description)
									}}
									onMouseLeave={handlePopoverClose}
									sx={{ cursor: 'pointer' }}
								>
									<span>{item.description}</span>
								</Typography>
								<Popover
									id='mouse-over-popover'
									sx={{ pointerEvents: 'none' }}
									open={open}
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'center',
										horizontal: 'left',
									}}
									onClose={handlePopoverClose}
									disableRestoreFocus
								>
									<Typography variant='h6' sx={{ p: 2, maxWidth: 260 }}>
										{description}
									</Typography>
								</Popover>
								<Typography variant='h6'>Organizer:</Typography>
								<Typography variant='h6' sx={{ mt: -1 }} noWrap>
									{item.organizer}
								</Typography>
								<Stack direction='row' justifyContent='space-between'>
									<Button
										sx={{ textTransform: 'none' }}
										onClick={() => {
											setEvent(item)
											navigate('/event_registration')
										}}
									>
										<Typography variant='h6'>Register</Typography>
									</Button>
									<Button
										sx={{ textTransform: 'none' }}
										onClick={() => {
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
					eventsState?.length &&
					Math.ceil(eventsState?.length / EVENTS_ON_ONE_PAGE)
				}
				page={page}
				sx={{ alignSelf: 'center', mt: 3 }}
				onChange={(e: ChangeEvent<unknown>, value: number) => {
					setPage(value)
					e.preventDefault()
				}}
			/>
			<Stack
				spacing={2}
				direction={{ xs: 'column', sm: 'row' }}
				alignItems={{ xs: 'flex-start', sm: 'center' }}
				justifyContent='space-between'
				maxWidth={600}
				sx={{ mt: 3 }}
			>
				<FormControlLabel
					control={
						<Switch checked={checked} color='primary' onChange={handleChange} />
					}
					label={
						checked ? (
							<Typography variant='h6'>Stop loading</Typography>
						) : (
							<Typography variant='h6'>Load more</Typography>
						)
					}
				/>
				<Stack direction='row' spacing={1}>
					<Typography variant='h6'>Processed pages from API:</Typography>
					<Typography variant='h6' color='primary'>
						{pageFromApi ? pageFromApi : 0}
					</Typography>
				</Stack>
			</Stack>
			<Radios
				label={LABEL_SORTING}
				value={sort}
				items={SORTING}
				handleChangeRadios={handleChangeRadios}
			/>
		</Stack>
	)
}
export default Events
