import React from 'react'
import { Link } from 'react-router-dom'
import { CarService } from '../../../../services/CarService.js'

const CarItem = ({ car, delCar, paramsId }) => {
	const deleteCar = async id => {
		try {
			delCar(id)
			return await CarService.deleteById(id)
		} catch (e) {
			console.log(`Ошибка при удалении машины: ${e}`)
		}
	}

	return (
		<div
			key={car.id}
			className='flex flex-col justify-center items-center bg-amber-50 text-blue-600 rounded-2xl w-auto text-center p-4 m-4'
		>
			<div>
				<img className='rounded-2xl w-full' src={`${car.image}`} alt='img' />
				<div className='flex justify-between py-4'>
					<div>
						<h2 className='text-3xl text-gray-800 w-auto text-left'>
							{car.name}
						</h2>
						<p className='bold text-2xl text-red-700 text-left'>
							{new Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'USD'
							}).format(car.price)}
						</p>
					</div>
					<div className='flex gap-4'>
						{!paramsId && (
							<>
								<Link
									to={`/car/${car.id}`}
									className='text-white bg-gray-800 hover:bg-gray-900 rounded-2xl text-sm p-4 my-2 flex flex-col justify-center items-center h-15'
								>
									Изменить
								</Link>
								<button
									className='text-white bg-red-700 hover:bg-red-800 rounded-2xl text-sm p-4 my-2 flex flex-col justify-center items-center h-15'
									onClick={() => deleteCar(car.id)}
								>
									Удалить
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CarItem
