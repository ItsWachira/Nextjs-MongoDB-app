import connectMongo from '../../../utils/dbConfig';
import User from '../../../models/userModel';


/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function userAPI(req, res) {
  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    if (req.method === 'POST') {
      console.log('CREATING DOCUMENT');
      const createdUser = await User.create(req.body);
      console.log('CREATED DOCUMENT');
      res.json({ createdUser });
    } else if (req.method === 'GET') {
      console.log('FETCHING DOCUMENTS');
      const fetchedUsers = await User.find({});
      console.log('FETCHED DOCUMENTS');
      res.json({ fetchedUsers });
    } else {
      throw new Error(`Unsupported HTTP method: ${req.method}`);
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}