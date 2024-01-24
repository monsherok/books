import { IBook } from './books.types'

export interface BooksState {
	books: IBook[]
	booksLength: number
	status: 'loading' | 'loaded' | 'error'
	orderBy: 'relevance' | 'newest'
	search: string
	category:
		| 'all'
		| 'art'
		| 'biography'
		| 'computers'
		| 'history'
		| 'medical'
		| 'poetry'
	pagination: number
}
