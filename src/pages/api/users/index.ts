/**
 * @api {get} /api/users Read list
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que retorne uma lista de usuários
 * - A request deve receber apenas o método GET
 * - A lista deve conter pelo menos 2 usuários
 * - Cada usuário deve ter um id, nome e email
 * - Utilize a interface IUser para tipar os dados
 */

import { NextApiRequest, NextApiResponse } from 'next/types';

import { IUser } from '@/types/user.d';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const users: Array<IUser> = [
		{ id: 1, name: 'John', email: 'john@example.com' },
		{ id: 2, name: 'Sophie', email: 'sophie@example.com' },
		{ id: 3, name: 'Thomas', email: 'thomas@example.com' },
		{ id: 4, name: 'Mary', email: 'mary@example.com' },
		{ id: 5, name: 'Alex', email: 'alex@example.com' },
	];

	if (req.method === 'GET') {
		return res.status(200).json(users);
	} 
	
	return res.status(405).json({ message: 'Method Not Allowed' });
	
};
