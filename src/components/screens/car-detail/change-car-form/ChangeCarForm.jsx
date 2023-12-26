import React, { memo, useEffect } from 'react'
import { CarService } from '../../../../services/CarService.js'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Form from '../../../ui/form/Form.jsx'

const ChangeCarForm = ({ car, setCar }) => {
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors }
	} = useForm({
		mode: 'onChange'
	})

	const { id } = useParams()

	const changeCarInDataBase = async data => {
		try {
			return await CarService.changeCarById(data)
		} catch (e) {
			console.log(`Ошибка при изменении данных на сервере: ${e}`)
		}
	}

	const changeCar = data => {
		const newData = {
			...car,
			name: data.name,
			price: data.price,
			image: data.image
		}
		setCar(newData)
		changeCarInDataBase(newData).then(r => console.log(r))
		reset()
	}

	car &&
		useEffect(() => {
			setValue('name', car?.name)
			setValue('price', car?.price)
			setValue('image', car?.image)
		}, [car])

	return (
		<Form
			handleSubmit={handleSubmit}
			register={register}
			errors={errors}
			id={id}
			changeCar={changeCar}
		/>
	)
}

export default memo(ChangeCarForm)
