import { Request, Response, Errback, NextFunction, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import * as jwtCheck from 'express-jwt';

import User from './models/User';
import Note from './models/Note';

const router: Router = Router();
const TOKEN_SECRET = 'topchek';

router.get('/', (req, res) => {
  res.json({ message: 'API' });
});

router.get('/user', jwtCheck({ secret: TOKEN_SECRET }), async (req, res) => {
  if (req.user._id) {
    try {
      const user = await User.findById(req.user._id).select('-password');

      if (user) {
        const notes = await user.getNotes();

        // @ts-ignore
        res.json({ ...user._doc, notes });
      } else {
        throw new Error('UnauthorizedError');
      }
    } catch (e) {
      throw new Error(e);
    }
  } else {
    throw new Error('UnauthorizedError');
  }
});

router.get('/users', jwtCheck({ secret: TOKEN_SECRET }), async (req, res) => {
  if (req.user._id) {
    const users = await User.find().select('-password');
    console.log('/users', users);
    res.json({ users });
  } else {
    throw new Error('UnauthorizedError');
  }
});

router.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;

  console.log('/register', username, password);

  if (!username || !password) res.json({ error: 'Not enough data' });
  const user = await User.findOne({ username });

  if (user) {
    res.json({ error: 'User with such username already exists' });
  } else {
    try {
      const newUser = await User.create({ username, password });
      const token = jwt.sign({ _id: newUser._id }, TOKEN_SECRET);

      res.send(token);
    } catch (e) {
      res.json({ error: e });
    }
  }
});

router.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  console.log('/login', username, password);

  if (!username || !password) res.json({ error: 'Not enough data' });
  const user = await User.findOne({ username });
  console.log('/login user', user);

  if (user) {
    const valid = await user.validatePassword(password);
    console.log('valid', valid);
    if (valid) {
      const token = jwt.sign({ _id: user._id }, TOKEN_SECRET);

      res.send(token);
    } else res.json({ error: 'Wrong password' });
  }
});

router.get('/notes', jwtCheck({ secret: TOKEN_SECRET }), async (req, res) => {
  console.log('/notes userId', req.user._id);

  if (req.user._id) {
    const notes = await Note.find({ author: req.user._id });
    res.json({ notes });
  } else {
    throw new Error('UnauthorizedError');
  }
});

router.post('/notes', jwtCheck({ secret: TOKEN_SECRET }), async (req, res) => {
  const { title, text } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    try {
      const newNote = await Note.create({ title, text, author: user._id });
      console.log('new note', newNote);
      res.json({ note: newNote });
    } catch (e) {
      res.json({ error: e });
    }
  } else {
    throw new Error('UnauthorizedError');
  }
});

router.put('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    console.log('new note', note);

    res.json(note);
  } catch (e) {
    res.json({ error: e });
  }
});

router.delete('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndRemove(req.params.id);
    console.log('deleted note', note);

    res.json(note);
  } catch (e) {
    res.json({ error: e });
  }
});

router.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Invalid token...' });
  }
});

export default router;
