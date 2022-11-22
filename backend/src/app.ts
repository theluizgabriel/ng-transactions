import * as express from 'express';
import loginRoute from './routes/login.route'
import registerRoute from './routes/register.route'
import balanceRoute from './routes/balance.route'
import transactionRoute from './routes/transactions.route'
import userRoute from './routes/user.route'

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.router();

    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private router():void {
    this.app.use('/login', loginRoute);
    this.app.use('/register', registerRoute);
    this.app.use('/balance', balanceRoute)
    this.app.use('/transactions', transactionRoute)
    this.app.use('/users', userRoute)
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };