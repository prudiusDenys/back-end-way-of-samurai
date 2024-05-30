import {Request, Response, Router} from 'express';
import {videos} from './videos-router';

export const removeAllDataRouter = Router({})

removeAllDataRouter.delete('/', (req: Request, res: Response) => {
  videos = [];

  res.send(204)
})
