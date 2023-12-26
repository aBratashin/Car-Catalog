import React from 'react'
import FormItem from './form-item/FormItem.jsx'

const Form = ({ handleSubmit, register, errors, id, changeCar, createCar }) => {
	const linkRegExp =
		/^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/

	return (
		<form
			onSubmit={handleSubmit(id ? changeCar : createCar)}
			className='w-1/2 bg-gray-800 p-4 m-8 rounded-2xl'
		>
			<FormItem
				itemName='Название'
				reg={register}
				err={errors}
				required={true}
				minLength={4}
				type='text'
				id='name'
				placeholder='Введите название'
				className='bg-gray-700 border rounded-lg w-full p-2.5 border-gray-600'
			/>

			<FormItem
				itemName='Цена'
				reg={register}
				err={errors}
				required={true}
				minLength={3}
				type='number'
				id='price'
				placeholder='Введите цену'
				className='bg-gray-700 border rounded-lg w-full p-2.5 border-gray-600'
			/>

			<FormItem
				itemName='Картинка'
				reg={register}
				err={errors}
				required={true}
				minLength={5}
				pattern={linkRegExp}
				type='text'
				id='image'
				placeholder='Введите ссылку'
				className='bg-gray-700 border rounded-lg w-full p-2.5 border-gray-600'
			/>

			{id ? (
				<button className='text-white bg-blue-700 hover:bg-blue-800 rounded-lg w-full px-5 py-2.5 text-center'>
					Изменить
				</button>
			) : (
				<button className='text-white bg-blue-700 hover:bg-blue-800 rounded-lg w-full px-5 py-2.5 text-center'>
					Добавить
				</button>
			)}
		</form>
	)
}

export default Form
