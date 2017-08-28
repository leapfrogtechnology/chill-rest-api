import { Router } from 'express';
// import * as authenticate from '../middlewares/authenticate';

let router = Router();

// router.post('/', (request, response)=>{
//   console.log('login');
//   let data=request.body;
//   console.log(data);
//   response.json({data});
// });

router.get('/', (request, response)=>{

  response.json('User profile');

});

export default router;

