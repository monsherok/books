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
				`?q='${booksState.search}'&orderBy=${booksState.orderBy}&startIndex=${booksState.pagination}&maxResults=5&key=${API_KEY}`
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
}

const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		setSearchText(state, action) {
			state.search = action.payload
			state.pagination = 0
		},
		fetchMoreBooks(state) {
			state.pagination += 5
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchBooks.pending, state => {
				state.books = []
				state.booksLength = 0
				state.status = 'loading'
			})
			.addCase(fetchBooks.fulfilled, (state, action) => {
				action.payload.items.forEach(item => state.books.push(item))
				state.booksLength = action.payload.totalItems
				state.status = 'loaded'
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
