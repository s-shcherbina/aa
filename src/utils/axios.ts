import axios from 'axios'
import { API_URL, MOVIE_API_TOKEN } from '../common/consts'

export const $movieApi = axios.create({
	baseURL: 'https://api.themoviedb.org/3/movie',
	timeout: 1000,
	headers: {
		accept: 'application/json',
		Authorization: MOVIE_API_TOKEN,
		// 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzhjNWNmNTBiYmM5MzAwYzc5OTVjMzNjOTc0MThmMiIsIm5iZiI6MTcyNjg3MzM1NC40OTEwNTYsInN1YiI6IjY2ZWRiMWQzNjliOTY4NzA0ZGFkZDQxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p2Asb4GJ04b7DE2Alsxo3KDNNCYMeo1w5mWCyo4KFgE',
	},
})

export const $api = axios.create({
	baseURL: API_URL,
	timeout: 1000,
})
