import { ChangeEvent } from 'react'
import { NavigateFunction } from 'react-router-dom'

export interface INavigation {
	id: number
	navigate: NavigateFunction
}

export interface IShowData {
	name: string
	data: string
	date?: string
	poster?: string
	organizer?: string
	id: number
	navigate?: NavigateFunction
}

export interface IEvent {
	title: string
	poster: string
	description: string
	eventDate: string
	organizer: string
	avatar: string
	image: string
	id: number
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
	// 	setChecked: (value: boolean) => void
}

export interface IEventProps {
	checked: boolean
	handleChange: (event: ChangeEvent<HTMLInputElement>) => void
	// setEventId: (value: number) => void
	setEvent: (value: IEvent) => void
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
