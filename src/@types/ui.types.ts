import { IBook } from './books.types'

export interface BooksState {
	books: IBook[]
	booksLength: number
	status: 'loading' | 'loaded' | 'error'
	orderBy: 'relevance' | 'newest'
	search: string
	pagination: number
	paginationStep: number
	isInitialRequest: boolean
	paginationStatus: 'loading' | 'loaded' | 'error'
	category:
		| 'all'
		| 'art'
		| 'biography'
		| 'computers'
		| 'history'
		| 'medical'
		| 'poetry'
}
