import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { IBooksResponse } from '../../@types/books.types'
import { BooksState } from '../../@types/ui.types'
import axios from '../../axios'

const API_KEY = 'AIzaSyCScDXqEdHBWgz5mVXr5zEPfiaocrYa-f0'

export const fetchBooks = createAsyncThunk<IBooksResponse, BooksState>(
	'books/fetchBooks',
	async (booksState, thunkAPI) => {
		try {
			const { data } = await axios.get(
				`?q='${booksState.search}'&orderBy=${booksState.orderBy}&startIndex=${booksState.pagination}&maxResults=30&key=${API_KEY}`
			)
			console.log(booksState.books.length)
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue((error as AxiosError).response?.data)
		}
	}
)

const initialState: BooksState = {
	books: [],
	booksLength: 0,
	status: 'loading',
	search: '',
	orderBy: 'relevance',
	category: 'all',
	pagination: 0,
	paginationStatus: 'loading',
	paginationStep: 30,
	isInitialRequest: true,
}

const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		setSearchText(state, action) {
			state.search = action.payload
			state.pagination = 0
			state.isInitialRequest = true
		},
		fetchMoreBooks(state, action) {
			state.pagination = action.payload
			state.isInitialRequest = false
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchBooks.pending, state => {
				if (state.isInitialRequest) {
					state.books = []
					state.booksLength = 0
					state.status = 'loading'
				}
				state.paginationStatus = 'loading'
			})
			.addCase(fetchBooks.fulfilled, (state, action) => {
				if (state.isInitialRequest) {
					state.books = action.payload.items
					state.booksLength = action.payload.totalItems
					state.status = 'loaded'
					state.isInitialRequest = false
				} else {
					action.payload.items.forEach(item => state.books.push(item))
				}
				state.paginationStatus = 'loaded'
			})
			.addCase(fetchBooks.rejected, state => {
				state.books = []
				state.booksLength = 0
				state.status = 'error'
			})
	},
})

export const { setSearchText, fetchMoreBooks } = booksSlice.actions
export const booksReducer = booksSlice.reducer
