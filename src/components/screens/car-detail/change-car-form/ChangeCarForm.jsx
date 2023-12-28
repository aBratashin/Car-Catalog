import React, { memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Form from '../../../ui/form/Form.jsx'
import { useParams } from 'react-router-dom'

const ChangeCarForm = ({ car, changeMutation }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm({
		mode: 'onChange'
	})

	const { id } = useParams()

	useEffect(() => {
		setValue('name', car?.name)
		setValue('price', car?.price)
		setValue('image', car?.image)
	}, [car])

	const changeCar = data => {
		try {
			const newData = {
				...car,
				name: data.name,
				price: data.price,
				image: data.image
			}
			changeMutation.mutate(newData)
		} catch (e) {
			console.log(`Ошибка при изменении данных на сервере: ${e}`)
		}
	}

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
