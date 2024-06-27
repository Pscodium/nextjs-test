/**
 * Formulário
 *
 * - Primeiramente vá até /src/pages/api/users/create.ts e implemente a API
 * - Deve ser implementado utilizando a lib react-hook-form
 * - O formulário deve ter os seguintes campos: nome, e-mail
 * - Os dois campos são obrigatórios e precisam de validação
 * - Ao dar 'submit', deve ser feito uma request para /api/users/create
 * - Lide com os possíveis erros
 */

import styles from '@/styles/formulario.module.css';
import { useForm } from 'react-hook-form';

type FormData = {
	name: string,
	email: string
}

export default function Form() {
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

	async function onSubmit(data: FormData) {
		try {
			const response = await fetch('/api/users/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
	  
			if (!response.ok) {
			  	throw new Error('Erro ao criar usuário');
			}
	  
			alert(`Usuário '${data.name}' criado com sucesso!!!`)
		} catch (error) {
			console.error('Erro:', error);
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.content}>
					<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type="text"
						placeholder="Nome"
						{...register('name', { required: true })}
					/>
					{errors.name && <span className={styles.error}>Nome é obrigatório</span>}

					<input
						type="email"
						placeholder="E-mail"
						{...register('email', { required: true })}
					/>
					{errors.email && <span className={styles.error}>E-mail é obrigatório</span>}

					<button type="submit" data-type="confirm">
						Enviar
					</button>
				</form>
			</div>
		</div>
	);
}
