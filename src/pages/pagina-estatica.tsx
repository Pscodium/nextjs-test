/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * - Você deve transformar essa página em uma página estática
 * - A página deve ser gerada no momento da build
 * - A página deve ser atualizada a cada 1 minuto
 */

import styles from '@/styles/lista.module.css';
import { ICity } from '@/types/city.d';
import { GetStaticProps } from 'next';

type ListProps = {
	list: ICity[];
}

export async function getStaticProps() {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/cities/10`);
		const data: ICity[] = await response.json();

		if (!response.ok) {
			throw new Error('Erro ao obter os dados');
		}

		return {
			props: {
				list: data,
			},
			revalidate: 30,
		};
	} catch (error) {
		console.error(error);
		return {
			props: {
				list: [],
			},
		};
	}
};

export default function List({ list }: ListProps) {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h2>Lista de cidades</h2>

				<div data-list-container>
					{list.map((city) => (
						<div data-list-item key={city.id}>
							{city.name}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
