import express from 'express';
import { messagesPage, addMessage, registerToken } from '../controllers';
import { modifyMessage } from '../middleware';

const indexRouter = express.Router();

indexRouter.post('/register', registerToken);
indexRouter.get('/messages', messagesPage);
indexRouter.post('/messages', modifyMessage, addMessage);

export default indexRouter;
