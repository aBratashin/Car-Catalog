import React, { useState } from 'react'
import { CarService } from '../../../../services/CarService.js'
import { useParams } from 'react-router-dom'

const CreateCarForm = ({ setCars, car, setCar }) => {
	const clearData = {
		name: '',
		price: '',
		image: ''
	}

	const [data, setData] = useState(clearData)

	const addCarToDataBase = async data => {
		try {
			const carsData = await CarService.getAll()
			return await CarService.addCar({
				id: carsData[carsData.length - 1].data + 1,
				...data
			})
		} catch (e) {
			console.log(`Ошибка при добавлении машины на сервер: ${e}`)
		}
	}

	const createCar = e => {
		if (!data.name || !data.price || !data.image) return
		e.preventDefault()
		setCars(prev => [...prev, { id: prev[prev.length - 1].id + 1, ...data }])
		setData(clearData)
		addCarToDataBase(data).then(r => console.log(r))
	}

	const { id } = useParams()

	const changeCarInDataBase = async data => {
		try {
			return await CarService.changeCarById(data)
		} catch (e) {
			console.log(`Ошибка при изменении данных на сервере: ${e}`)
		}
	}

	const changeCar = e => {
		if (!data.name || !data.price || !data.image) return
		e.preventDefault()
		const newData = {
			...car,
			name: data.name,
			price: data.price,
			image: data.image
		}
		setCar(newData)
		setData(clearData)
		changeCarInDataBase(newData).then(r => console.log(r))
	}

	return (
		<form className="w-1/2 bg-gray-800 p-4 m-8 rounded-2xl">
			<div className="mb-5">
				<label htmlFor="name" className="block mb-2 text-white">
					Название
				</label>
				<input
					type="text"
					id="name"
					required
					placeholder="Введите название"
					className="bg-gray-700 border rounded-lg w-full p-2.5 border-gray-600"
					value={data.name}
					onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
				/>
			</div>
			<div className="mb-5">
				<label htmlFor="price" className="block mb-2 text-white">
					Цена
				</label>
				<input
					type="number"
					id="price"
					required
					placeholder="Введите цену"
					className="bg-gray-700 border rounded-lg w-full p-2.5 border-gray-600"
					value={data.price}
					onChange={e => setData(prev => ({ ...prev, price: e.target.value }))}
				/>
			</div>
			<div className="mb-5">
				<label htmlFor="img" className="block mb-2 text-white">
					Картинка
				</label>
				<input
					type="text"
					id="img"
					required
					placeholder="Введите ссылку"
					className="bg-gray-700 border rounded-lg w-full p-2.5 border-gray-600"
					value={data.image}
					onChange={e => setData(prev => ({ ...prev, image: e.target.value }))}
				/>
			</div>
			{id ? (
				<button
					type="img"
					className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg w-full px-5 py-2.5 text-center"
					onClick={changeCar}
				>
					Изменить
				</button>
			) : (
				<button
					type="img"
					className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg w-full px-5 py-2.5 text-center"
					onClick={createCar}
				>
					Добавить
				</button>
			)}
		</form>
	)
}

export default CreateCarForm
