import { useEffect } from 'react';
import styles from './style.module.css';

type ModalProps = {
	children: React.ReactNode;
	title: string;
	isOpen: boolean;
	onClose?: (type: 'click' | 'esc', target: EventTarget) => void;
	onConfirm?: () => void;
	footer?: {
		hidden?: boolean;
		confirmText?: string;
		cancelText?: string;
	};
};

/* 
	Modal

	- Ao clicar no wrapper do modal, o modal deve ser fechado, porém esta ação deve ser ignorada caso o usuário clique em qualquer elemento dentro do modal
*/

export const Modal: React.FC<ModalProps> = ({ children, title, isOpen, ...props }) => {
	
	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, props]);
	
	function handleCloseClick(e: React.MouseEvent) {
		if (e.target === e.currentTarget) {
			props.onClose?.('click', e.target);
		}
	}

	function handleConfirmClick(e: React.MouseEvent) {
		props.onConfirm?.();
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') props.onClose?.('esc', e.target as EventTarget);
	}

	if (!isOpen) return null;

	return (
		<div data-modal-wrapper className={styles.wrapper} onClick={handleCloseClick}>
			<div data-modal-container>
				<header data-modal-header>
					<h2>{title}</h2>

					<button data-modal-close onClick={handleCloseClick}>
						X
					</button>
				</header>

				{children}

				{!props.footer?.hidden && (
					<div data-modal-footer>
						<button data-modal-cancel onClick={handleCloseClick}>
							{props.footer?.cancelText ?? 'Cancelar'}
						</button>

						<button data-modal-confirm onClick={handleConfirmClick} data-type="confirm">
							{props.footer?.confirmText ?? 'Confirmar'}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
