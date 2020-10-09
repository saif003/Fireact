import Model from '../models/model';
import { sendNotificationToClient } from '../notify';

const messagesModel = new Model('messages');

const tokens = [];

export const messagesPage = async (req, res) => {
  try {
    const data = await messagesModel.select('name, message');
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const registerToken = async (req, res) => {
  try {
    const token = req.body.firebaseToken;
    if (!tokens.find(t => t === token)) {
      tokens.push(token);
      console.log('added token', tokens);
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const addMessage = async (req, res) => {
  const { name, message } = req.body;
  const columns = 'name, message';
  const values = `'${name}', '${message}'`;
  try {
    const data = await messagesModel.insertWithReturn(columns, values);
    const notificationData = {
      title: `New message from ${name}`,
      message,
    };
    console.log('sending message: ', notificationData, ' to ', tokens);
    sendNotificationToClient(tokens, notificationData);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
