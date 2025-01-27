import express from 'express';
import { PrismaClient } from '@prisma/client';

//Configuração do ExpressJS.
const app = express();
const port = 3000;
app.use(express.json());

//Configuração do Prisma.
const prisma = new PrismaClient();

// Função para criação de novo usuário.
app.post('/user', async (req, res) => {
	await prisma.user.create({
		data: {
			email: req.body.email,
			name: req.body.name,
			age: req.body.age,
		},
	});

	res.status(201).json(req.body);
});

//Função para Listar todos os usuários
app.get('/user', async (req, res) => {
	const users = await prisma.user.findMany();
	res.status(200).json(users);
});

// Função para buscar um usuário.
app.get('/user/:id', async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.params.id,
		},
	});

	if (!user) {
		res.status(404).send('Usuário não encontrado.');
	}

	res.status(200).json(user);
});

//Função para editar um usuário.
app.put('/user/:id', async (req, res) => {
	await prisma.user.update({
		where: {
			id: req.params.id,
		},
		data: {
			email: req.body.email,
			name: req.body.name,
			age: req.body.age,
		},
	});
	res.status(204).send('Usuário atualizado com sucesso.');
});

//Função para deletar um usuário.
app.delete('/user/:id', async (req, res) => {
	await prisma.user.delete({
		where: {
			id: req.params.id,
		},
	});
	res.status(204).send('Usuário deletado com sucesso.');
});

// Log do servidor.
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
