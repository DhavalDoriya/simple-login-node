/* import express from 'express';

const router = express.Router();


router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

export default router; */
import express from 'express';
import postRoute from './postRoute';
import userRoute from './userRoute';



const router = express.Router();


postRoute(router);
userRoute(router);

export default router;
