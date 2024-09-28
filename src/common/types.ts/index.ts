import { ChangeEvent } from 'react'

export interface IEvent {
	title: string
	poster: string
	description: string
	eventDate: string
	organizer: string
	avatar: string
	image: string
	id?: number
}

export interface IParticipant {
	fullName: string
	email: string
	dateOfBirth: string
	source: string
	eventId: number
	id: number
}

export interface ILayoutProps {
	title?: string
}

export interface IEventProps {
	checked: boolean
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void
	setEvent: (value: IEvent) => void
	pageFromApi: number
}

export interface IParticipantsProps {
	event?: IEvent
}

export interface IEventRegistrationProps {
	eventId?: number
	title?: string
}

export interface IMovieFromApi {
	title: string
	backdrop_path: string
	overview: string
	release_date: string
	poster_path: string
}

export interface IMovieApiResponse {
	results: IMovieFromApi[]
}

export interface IRadiosProps {
	label: string
	value: string
	items: { label: string; value: string }[]
	handleChangeRadios: (e: ChangeEvent<HTMLInputElement>) => void
}

export interface IGenerateParticipantsProps {
	eventsState: IEvent[]
}

// DATABASE_URL="postgresql://postgres:events@localhost:5432/eventsdb" yarn start
