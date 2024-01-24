import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Books from './pages/books/Books'
import Home from './pages/home/Home'

function App() {
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
