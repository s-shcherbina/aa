import {
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Popover,
	Radio,
	RadioGroup,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import {
	ChangeEvent,
	FC,
	MouseEvent,
	SyntheticEvent,
	useEffect,
	useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { IEventRegistrationProps } from '../common/types.ts'
import { Dayjs } from 'dayjs'
import { SOURCES } from '../common/consts.ts'
import { $api } from '../utils/axios.ts'

const EventRegistration: FC<IEventRegistrationProps> = ({ eventId, title }) => {
	const navigate = useNavigate()

	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null)
	const [source, setSource] = useState('')
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
		navigate('/')
	}

	const open = Boolean(anchorEl)
	const id = open ? 'simple-popover' : undefined

	const handleSubmitForm = async (e: SyntheticEvent) => {
		e.preventDefault()
		const registerData = { fullName, email, dateOfBirth, source, eventId }
		try {
			const participant = await $api.post('api/participants', registerData)
			console.log(participant)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (!eventId) navigate('/')
	}, [eventId, navigate])

	return (
		<form id='register-form' onSubmit={handleSubmitForm}>
			<Stack
				sx={{
					m: { xs: 2, md: 4, lg: 8 },
					p: { xs: 3, md: 6, lg: 8 },
					border: '2px solid gray',
					maxWidth: 800,
				}}
			>
				<Typography variant='h4'>Event Registration</Typography>
				<Typography variant='h6'>{`for the release movie ${
					title ? `"${title}"` : ''
				}`}</Typography>
				<Stack spacing={{ xs: 2, sm: 3 }} sx={{ maxWidth: 360, mt: 3 }}>
					<Stack spacing={1}>
						<Typography variant='h6'>Full name</Typography>
						<TextField
							label='First name, last name'
							value={fullName}
							required
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setFullName(e.target.value)
							}}
						/>
					</Stack>
					<Stack spacing={1}>
						<Typography variant='h6'>Email</Typography>
						<TextField
							label='Don`t use mail sevices .ru'
							type='email'
							value={email}
							required
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setEmail(e.target.value)
							}}
						/>
					</Stack>
					<Stack>
						<Typography variant='h6'>Date of birth</Typography>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer components={['DatePicker']}>
								<DatePicker
									label='Select your date of birth'
									sx={{ width: '100%' }}
									value={dateOfBirth}
									onChange={newValue => setDateOfBirth(newValue)}
								/>
							</DemoContainer>
						</LocalizationProvider>
					</Stack>
				</Stack>
				<Stack>
					<FormControl sx={{ mt: { xs: 2, sm: 4 } }}>
						<FormLabel>
							<Typography variant='h5'>
								Where did you hear about this event?
							</Typography>
						</FormLabel>
						<RadioGroup
							name='radio-group'
							value={source}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setSource((e.target as HTMLInputElement).value)
							}
						>
							<Stack
								direction={{ sm: 'row' }}
								justifyContent='space-between'
								sx={{ maxWidth: 600, mt: 1 }}
							>
								{SOURCES.map(item => (
									<FormControlLabel
										key={item.value}
										value={item.value}
										control={
											<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
										}
										label={
											<Typography variant='h6' sx={{ opacity: 0.7 }}>
												{item.label}
											</Typography>
										}
									/>
								))}
							</Stack>
						</RadioGroup>
					</FormControl>
					<Button
						type='submit'
						variant='contained'
						sx={{ mt: { xs: 2, sm: 4 }, textTransform: 'none', maxWidth: 360 }}
						onClick={handleClick}
					>
						<Typography variant='h5'>Registration</Typography>
					</Button>
					<Popover
						id={id}
						open={open}
						anchorEl={anchorEl}
						onClose={handleClose}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
						sx={{ maxWidth: 500 }}
					>
						<Typography variant='h5' sx={{ p: 2 }}>
							Thanks for registering! We are waiting for you at the movie
							release {`"${title}"`}!
						</Typography>
					</Popover>
					<Button
						sx={{ textTransform: 'none', maxWidth: 360, mt: 1 }}
						onClick={() => navigate('/')}
					>
						<Typography variant='h5'>Back to events</Typography>
					</Button>
				</Stack>
			</Stack>
		</form>
	)
}

export default EventRegistration
