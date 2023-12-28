import React from 'react'

const FormItem = ({
	itemName,
	reg,
	err,
	id,
	required,
	minLength,
	pattern,
	...props
}) => {
	return (
		<div className='mb-5'>
			<label htmlFor={id} className='block mb-2 text-white'>
				{itemName}
			</label>
			<input
				id={id}
				{...reg(id, {
					required: {
						value: required,
						message: 'Поле обязательно для заполнения!'
					},
					minLength: {
						value: minLength,
						message: `Минимальная длина символов: ${minLength}!`
					},
					pattern: {
						value: pattern,
						message: 'Введите корректную ссылку!'
					}
				})}
				{...props}
			/>
			{err?.[id] && (
				<div className='p-1 text-center text-red-500'>{err?.[id]?.message}</div>
			)}
		</div>
	)
}

export default FormItem
