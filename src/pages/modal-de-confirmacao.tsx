/**
 * Modal de confirmação
 *
 * - Crie um component para o modal de confirmação
 * - Utilize o código abaixo como base
 * - O modal deve ser aberto ao clicar no botão "Abrir modal de confirmação"
 * - O título deve ser "Confirmação"
 * - O conteudo deve ser dinâmico
 */

import { FormEvent, useState } from 'react';
import styles from '@/styles/modal.module.css';
import { Modal } from '@/components/Modal';

type InputProps = {
	user?: FormDataEntryValue  | null,
	password?: FormDataEntryValue | null ,
}

export default function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [inputs, setInputs] = useState<InputProps>();

	function handleModalConfirm() {
		setModalIsOpen(false);
		alert(`Usuário '${inputs?.user?.toString().trim()}' cadastrado com sucesso!!!`)
	}

	function handleModalClose() {
		setModalIsOpen(false);
	}

	function handleFormChange(ev: FormEvent<HTMLFormElement>) {
		ev.preventDefault();

        const formData = new FormData(ev.currentTarget);

        const data = {
            user: formData.get('user'),
            password: formData.get('password'),
        };

		setInputs(data)
	}

	function renderModalContent() {
		return (
			<div data-modal-content className={styles['modal-form']}>
				<form onChange={handleFormChange}>
					<div>
						<label htmlFor="input-name">User</label>
						<input type="text" id="input-name" name='user' placeholder="Insira seu nickname" />
					</div>

					<div>
						<label htmlFor="input-name">Senha</label>
						<input type="password" id="input-name" name='password' placeholder="Insira sua senha" />
					</div>
				</form>
			</div>
		);
	}

	return (
		<>
			<main className={styles.container}>
				<button type="button" onClick={() => setModalIsOpen(true)}>
					Abrir modal de confirmação
				</button>
			</main>

			{/* Renderizar modal de confirmação */}
			<Modal
				isOpen={modalIsOpen}
				title="Confirmação"
				onClose={handleModalClose}
				onConfirm={handleModalConfirm}
				footer={{ confirmText: 'Cadastrar' }}
			>
				{renderModalContent()}
			</Modal>
		</>
	);
}
