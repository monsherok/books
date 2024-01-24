import { Link } from 'react-router-dom'
import { IBook } from '../../@types/books.types'

function Book(book: IBook) {
	return (
		<Link
			className='flex flex-col py-6 px-5 bg-brown-50 gap-2 hover:shadow-lg hover:drop-shadow-xl cursor-pointer transition-all'
			to={'/book/' + book.id}
		>
			<div className='flex items-center justify-center py-3'>
				<img
					className=' shadow-lg drop-shadow-xl'
					src={book.volumeInfo.imageLinks?.thumbnail}
					alt={book.volumeInfo.title}
				/>
			</div>
			<p className='underline text-gray-600 text-sm'>
				{book.volumeInfo.categories}
			</p>
			<h6 className='font-bold'>{book.volumeInfo.title}</h6>
			<p className='text-gray-600 text-sm'>{book.volumeInfo.authors}</p>
		</Link>
	)
}

export default Book
