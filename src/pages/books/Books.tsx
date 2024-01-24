import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useAppDiapatchAndSelector'

function Books() {
	const { books } = useAppSelector(state => state.books)
	const location = useLocation()
	const bookId = location.pathname.replace('/book/', '')
	const data = books.filter(book => book.id === bookId)

	console.log('data', data)
	return <h1>Book</h1>
}

export default Books
