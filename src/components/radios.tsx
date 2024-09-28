import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Stack,
	Typography,
} from '@mui/material'
import { FC } from 'react'
import { IRadiosProps } from '../common/types.ts'

const Radios: FC<IRadiosProps> = ({
	label,
	value,
	items,
	handleChangeRadios,
}) => {
	return (
		<FormControl sx={{ mt: { xs: 2, sm: 4 } }}>
			<FormLabel>
				<Typography variant='h5'>{label}</Typography>
			</FormLabel>
			<RadioGroup
				name='radio-group'
				value={value}
				onChange={handleChangeRadios}
			>
				<Stack
					direction={{ sm: 'row' }}
					justifyContent='space-between'
					sx={{ maxWidth: 600, mt: 1 }}
				>
					{items.map(item => (
						<FormControlLabel
							key={item.value}
							value={item.value}
							control={
								<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
							}
							label={<Typography variant='h6'>{item.label}</Typography>}
						/>
					))}
				</Stack>
			</RadioGroup>
		</FormControl>
	)
}

export default Radios
