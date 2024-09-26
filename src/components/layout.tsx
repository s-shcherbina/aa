import { Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ILayoutProps } from '../common/types.ts'

const Layout: FC<ILayoutProps> = ({ title }): JSX.Element => {
	const { pathname } = useLocation()

	return pathname === '/event_registration' ? (
		<Outlet />
	) : (
		<Stack
			sx={{
				mx: { xs: 2, md: 4, lg: 8 },
				p: { xs: 2, md: 4 },
				mt: 2,
				border: '2px solid gray',
				borderRadius: 1,
			}}
		>
			<Typography variant='h4'>
				{pathname === '/participants'
					? `Participants of the movie release event "${title}"`
					: 'Events'}
			</Typography>
			<Outlet />
		</Stack>
	)
}

export default Layout
