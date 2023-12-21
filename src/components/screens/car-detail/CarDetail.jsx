import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CarService } from '../../../services/CarService.js'
import CarItem from '../home/car-item/CarItem.jsx'
import NotFound from '../not-found/NotFound.jsx'

const CarDetail = () => {
	const { id } = useParams()
	const [car, setCar] = useState({})

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await CarService.getById(id)
				setCar(data)
			} catch (e) {
				console.log(`Ошибка при получении машины по id: ${e}`)
			}
		}
		fetchData()
	}, [id])

	if (!car) return <NotFound />

	return (
		<div className='flex flex-col justify-center items-center font-bold'>
			<Link
				className='mt-4 p-4 bg-green-700 hover:bg-green-800 rounded-2xl'
				to='/'
			>
				Назад
			</Link>
			<CarItem car={car} />
		</div>
	)
}

export default CarDetail
