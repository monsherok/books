import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { useAppDispatch } from './hooks/useAppDiapatchAndSelector'
import Books from './pages/book/Books'
import Home from './pages/home/Home'
import { fetchBooks } from './store/slices/books.slice'

function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchBooks('react'))
	}, [])

	return (
		<Layout>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/book/:id' element={<Books />} />
				<Route path='*' element={<h1>404</h1>} />
			</Routes>
		</Layout>
	)
}

export default App
