/**
 * Context Api
 *
 * - Criar um contexto para exibir mensagens de sucesso e erro
 * - Criar um componente para exibir as mensagens
 * - Criar um hook para disparar e consumir as mensagens
 * - Disparar as mensagens a partir dos botões abaixo
 */

import styles from '@/styles/context-api.module.css';
import { ToastMessage } from '@/components/ToastMessage';
import { useToast } from '@/contexts/toastContext';

export default function ContextApi() {
	const { toasts, sendToast } = useToast();

	function handleSuccessButtonClick() {
		sendToast({
			message: 'Successo',
			type: 'success'
		})
	}

	function handleErrorButtonClick() {
		sendToast({
			message: 'Erro',
			type: 'error'
		})
	}

	function handleTimerButtonClick() {
		sendToast({
			message: 'Mensagem com temporizador',
			type: 'success',
			duration: 3000
		})
	}

	return (
		<>
			<div className={styles.container}>
				<button type="button" onClick={handleSuccessButtonClick}>
					Disparar mensagem de sucesso
				</button>
				<button type="button" onClick={handleErrorButtonClick}>
					Disparar mensagem de erro
				</button>
				<button type="button" onClick={handleTimerButtonClick}>
					Disparar mensagem com temporizador
				</button>
			</div>

			<div className={styles['toast-container']}>
				{toasts?.map((toast) => (
					<ToastMessage key={toast.id} content={toast} />
				))}
			</div>
		</>
	);
}
