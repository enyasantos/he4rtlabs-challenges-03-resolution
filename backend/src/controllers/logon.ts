import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import client from '../connection';
import * as jwt from 'jsonwebtoken';

export default {
  async create (req: Request, res: Response) {
    try {
      const {
        email,
        password
      } = req.body 
    
      const result: Promise<User> = (await client)
      .db('database')
      .collection('users')
      .findOne({ email })

      const responseDatabase = (await result);
    
      if(!responseDatabase) {
        return res.status(401).json({ message: 'Email não cadastrado.'});
      }
    
      const passwordDatabase = responseDatabase.password;
    
      if(await bcrypt.compare(passwordDatabase, password)) {
        return res.status(400).json({ message: 'Senha incorreta'});
      }

      const token = jwt.sign({ id: responseDatabase._id }, `${process.env.SECRET_KEY}`, { expiresIn: '1d' })
    
      return res.status(200).json({ message: 'ok', token });
  
    } catch (e){
      return res.status(500).json({ message: 'Erro interno ao logar.' });
    }
  },
}