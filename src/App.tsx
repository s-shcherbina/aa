import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Events from './pages/events'
import Participants from './pages/participants'
import EventRegistration from './pages/event-registration'
import Layout from './components/layout'
import './App.css'
import { ChangeEvent, useEffect, useState } from 'react'
import { $api, $movieApi } from './utils/axios'
import { organizers } from './common/moks'
import { IEvent, IMovieApiResponse } from './common/types.ts'
import { FIRST_LOADING_PAGE, LAST_LOADING_PAGE } from './common/consts.ts'

let page: number

const App = () => {
	const [load, setLoad] = useState<IMovieApiResponse>()
	const [checked, setChecked] = useState(false)
	const [event, setEvent] = useState<IEvent>()

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked)
	}

	const loadEvents = async (page: number) => {
		try {
			const response = await $movieApi.get<IMovieApiResponse>(
				`/upcoming?language=en-US&page=${page}`,
			)
			setLoad(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	const createEvents = async () => {
		try {
			const events = load?.results
				.filter(item => +new Date(item.release_date) - +new Date() > 0)
				.filter(item => item.backdrop_path && item.overview.length > 100)
				.map(item => {
					const index = Math.round(Math.random() * 100)
					return {
						title: item.title,
						poster: item.backdrop_path,
						description: item.overview,
						eventDate: item.release_date,
						image: item.poster_path,
						organizer: organizers[index].name,
						avatar: organizers[index].poster,
					}
				}) as IEvent[]
			if (events?.length)
				for (const event of events) {
					await $api.post('api/events', event)
				}
			page = page + 1
			localStorage.setItem('page', String(page))
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		let interval: number
		if (checked) {
			interval = setInterval(() => {
				page = Number(localStorage.getItem('page'))
				if (!page) {
					localStorage.setItem('page', '1')
					page = FIRST_LOADING_PAGE
				}
				if (page > LAST_LOADING_PAGE) {
					localStorage.setItem('page', '1')
					page = FIRST_LOADING_PAGE
					setChecked(!checked)
				}
				loadEvents(page)
			}, 2000)
			return () => clearInterval(interval)
		}
	}, [checked])

	useEffect(() => {
		createEvents()
	}, [load])

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout title={event?.title} />}>
					<Route
						path='/'
						element={
							<Events
								checked={checked}
								handleChange={handleChange}
								setEvent={setEvent}
							/>
						}
					/>
					<Route path='participants' element={<Participants event={event} />} />
					<Route
						path='event_registration'
						element={
							<EventRegistration eventId={event?.id} title={event?.title} />
						}
					/>
					<Route path='*' element={<Navigate to='/' />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
