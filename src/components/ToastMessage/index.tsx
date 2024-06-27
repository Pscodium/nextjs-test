import { IToastMessage } from '@/types/toast-message.d';

import styles from './style.module.css';
import { useToast } from '@/contexts/toastContext';

type ToastMessageProps = {
	content: IToastMessage;
};

export const ToastMessage: React.FC<ToastMessageProps> = ({ content: data }) => {
	const { closeToast } = useToast();

	return (
		<div className={styles.container} data-toast-type={data.type} data-toast-id={data.id}>
			<span data-content>{data.message}</span>

			<span data-close onClick={() => closeToast(data.id)}>╳</span>
		</div>
	);
};
