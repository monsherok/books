import { ReactNode } from 'react'
import Search from '../search/Search'

interface LayoutProps {
	children: ReactNode
}

function Layout({ children }: LayoutProps) {
	return (
		<div className='container mx-auto flex flex-col '>
			<div className='bg-[url("/img/bg.jpg")] bg-center py-7 flex flex-col items-center justify-center'>
				<h1 className='text-4xl text-white mb-4'>Search for books</h1>
				<Search />
			</div>
			{children}
		</div>
	)
}

export default Layout
