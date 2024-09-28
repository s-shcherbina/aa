import { Button, Stack, TextField, Typography } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IEventRegistrationProps } from '../common/types.ts'
import { Dayjs } from 'dayjs'
import { LABEL_SOURSES, SOURCES } from '../common/consts.ts'
import { $api } from '../utils/axios.ts'
import Radios from '../components/radios.tsx'
import axios from 'axios'

const EventRegistration: FC<IEventRegistrationProps> = ({ eventId, title }) => {
	const navigate = useNavigate()

	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null)
	const [source, setSource] = useState('')

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setSource((e.target as HTMLInputElement).value)

	const handleSubmitForm = async (e: SyntheticEvent) => {
		e.preventDefault()
		const registerData = { fullName, email, dateOfBirth, source, eventId }
		try {
			await $api.post('api/participants', registerData)
			navigate('/')
		} catch (error) {
			if (axios.isAxiosError(error)) alert(error.response?.data.message)
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
				<Typography
					variant='h6'
					sx={{ maxWidth: 600 }}
				>{`for the release movie ${title ? `"${title}"` : ''}`}</Typography>
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
					<Radios
						label={LABEL_SOURSES}
						value={source}
						items={SOURCES}
						handleChangeRadios={handleChange}
					/>
					<Button
						type='submit'
						variant='contained'
						sx={{ mt: { xs: 2, sm: 4 }, textTransform: 'none', maxWidth: 360 }}
					>
						<Typography variant='h5'>Registration</Typography>
					</Button>
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
