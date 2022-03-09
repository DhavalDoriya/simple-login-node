
import express from 'express';
// import postRoute from './postRoute';
import userRoute from './userRoute';
import socialuserRoute from './socialuserRoute';



const router = express.Router();


socialuserRoute(router);
userRoute(router);

export default router;
