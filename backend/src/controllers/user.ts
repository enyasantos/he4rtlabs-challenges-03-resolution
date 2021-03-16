import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import client from '../database/connection';

export default {
  async index(req: Request, res: Response){
    try {
      const users: Promise<User[]> = (await client)
    .db('database')
    .collection('users')
    .find()
    .toArray()
    
    return res.status(200).json(await users);
    } catch {
      return res.status(500).json({ message: 'Erro interno ao listar usuários. Tente novamente.' })
    }
  },

  async create (req: Request, res: Response) {
    try {
      const {
        email,
        password
      } = req.body
    
      const resultUser: Promise<User> = (await client)
      .db('database')
      .collection('users')
      .findOne({ email })
    
      if(await resultUser) {
        return res.status(409).json({ message: 'Email já cadastrado.'});
      }
    
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
    
      const result = (await client)
      .db('database')
      .collection('users')
      .insertOne({
        email,
        password: hash
      });
      
      return res.status(201).json({ ok: 'ok', id: (await result).insertedId });
  
    } catch {
      return res.status(500).json({ message: 'Erro interno ao criar conta. Tente novamente.' })
    }
  }
}