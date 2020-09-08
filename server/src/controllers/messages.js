import Model from '../models/model';
import { sendNotificationToClient } from '../notify';

const messagesModel = new Model('messages');

export const messagesPage = async (req, res) => {
  try {
    const data = await messagesModel.select('name, message');
    res.status(200).json({ messages: data.rows });
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
    const tokens = [
      'cPrZ52b5YGmITH08oM7KQc:APA91bEx1MttKGKFHUCI4uATsplaQxAvjmob1lr4XrN4d8C-mqIko1po6tHDLEgD-1oWhiAV0kjqFH6qnKbcm5oU9VL6WVHyqT-kfxDDWp19PM2AZfCuJ_RzUlQrDt85_kv-aklhzaSl',
    ];
    const notificationData = {
      title: 'New message',
      body: message,
    };
    sendNotificationToClient(tokens, notificationData);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
