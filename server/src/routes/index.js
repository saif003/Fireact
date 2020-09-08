import express from 'express';
import { messagesPage, addMessage } from '../controllers';
import { modifyMessage } from '../middleware';

const indexRouter = express.Router();
indexRouter.get('/messages', messagesPage);
indexRouter.post('/messages', modifyMessage, addMessage);

export default indexRouter;
