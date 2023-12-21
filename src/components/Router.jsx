import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './screens/home/Home.jsx'
import CarDetail from './screens/car-detail/CarDetail.jsx'
import NotFound from './screens/not-found/NotFound.jsx'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Home />} path='/' />
				<Route element={<CarDetail />} path='/car/:id' />
				<Route element={<NotFound />} path='*' />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
