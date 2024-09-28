import { Popover, Stack, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ILayoutProps } from '../common/types.ts'

const Layout: FC<ILayoutProps> = ({ title }): JSX.Element => {
	const { pathname } = useLocation()
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

	const handlePopoverClose = () => setAnchorEl(null)
	const open = Boolean(anchorEl)

	const partticipantsTitle = `Participants of the movie release event "${title}"}`

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
				{pathname === '/participants' ? (
					<>
						<span
							aria-owns={open ? 'mouse-over-popover' : undefined}
							aria-haspopup='true'
							onMouseEnter={(event: React.MouseEvent<HTMLElement>) =>
								setAnchorEl(event.currentTarget)
							}
							onMouseLeave={handlePopoverClose}
							style={{ textAlign: 'center', cursor: 'pointer' }}
						>
							{partticipantsTitle}
						</span>
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
								{partticipantsTitle}
							</Typography>
						</Popover>
					</>
				) : (
					'Events'
				)}
			</Typography>
			<Outlet />
		</Stack>
	)
}

export default Layout
