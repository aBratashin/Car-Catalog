import React, { useEffect, useState } from 'react'
import CarItem from './car-item/CarItem.jsx'
import CreateCarForm from './create-car-form/CreateCarForm.jsx'
import { CarService } from '../../../services/CarService.js'

const Home = () => {
	const [cars, setCars] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const data = await CarService.getAll()
			setCars(data)
		}
		fetchData()
	}, [])

	const delCar = id => {
		const newData = cars.filter(car => car.id !== id)
		setCars(newData)
	}
	
	return (
		<div className='flex flex-col justify-center items-center w-full font-bold py-10 px-5'>
			<h1 className='text-6xl m-4 text-green-500 text-center'>Каталог машин</h1>
			<CreateCarForm setCars={setCars} />
			<div className='flex flex-wrap justify-center items-center'>
				{cars.length ? (
					cars.map(car => <CarItem car={car} key={car.id} delCar={delCar} />)
				) : (
					<h1 className='text-4xl text-red-500'>Нет машин</h1>
				)}
			</div>
		</div>
	)
}

export default Home
