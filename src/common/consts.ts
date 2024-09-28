import { $api } from '../utils/axios.ts'
import { organizers } from './moks.ts'
import { IEvent } from './types.ts'

export const API_URL = 'http://localhost:3000/'

export const EVENTS_ON_ONE_PAGE = 8

export const FIRST_LOADING_PAGE = 1

export const LAST_LOADING_PAGE = 67

export const LABEL_SOURSES = 'Where did you hear about this event?'

export const LABEL_SORTING = 'Sort upcoming events by'

export const SOURCES = [
	{ label: 'Social media', value: 'socialMedia' },
	{ label: 'Friends', value: 'friends' },
	{ label: 'Found myself', value: 'foundMyself' },
]

export const SORTING = [
	{ label: 'Date', value: 'date' },
	{ label: 'Title', value: 'title' },
	{ label: 'Organizer', value: 'organizer' },
]

export const index = (mult: number, plus = 0) =>
	Math.trunc(Math.random() * mult + plus)

export const sortEvents = (events: IEvent[] | undefined, sort: string) => {
	if (sort === 'date')
		return events?.sort(
			(a, b) => +new Date(a.eventDate) - +new Date(b.eventDate),
		)
	if (sort === 'title')
		return events?.sort((a, b) =>
			a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1,
		)
	if (sort === 'organizer')
		return events?.sort((a, b) =>
			a.organizer.toLowerCase() < b.organizer.toLowerCase() ? -1 : 1,
		)
	return events
}

export const createParticipants = async (events: IEvent[] | undefined) => {
	if (events?.length) {
		for (const event of events) {
			const participantData = {
				fullName: organizers[index(100)].name,
				email: `${organizers[index(100)].name
					.replace(' ', '')
					.slice(0, 6)
					.toLowerCase()}@gmail.com`,
				dateOfBirth: `${index(40, 1970)}${events[
					index(events.length - 1)
				].eventDate.slice(4)}`,
				source: SOURCES[index(3)].value,
				eventId: event.id,
			}
			try {
				await $api.post('api/participants', participantData)
			} catch (error) {
				console.log(error)
			}
		}
	}
}

export const MOVIE_API_TOKEN =
	'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzhjNWNmNTBiYmM5MzAwYzc5OTVjMzNjOTc0MThmMiIsIm5iZiI6MTcyNjg3MzM1NC40OTEwNTYsInN1YiI6IjY2ZWRiMWQzNjliOTY4NzA0ZGFkZDQxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p2Asb4GJ04b7DE2Alsxo3KDNNCYMeo1w5mWCyo4KFgE'
