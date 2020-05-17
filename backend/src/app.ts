import express from 'express';
import { Response, Request } from 'express';

const app = express();
const port = 3000;

app.get('/', (req: Request<any>, res: Response<any>, next: express.NextFunction) => {
  res.send('Hello World!');
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on http://localhost:${port}`);
});