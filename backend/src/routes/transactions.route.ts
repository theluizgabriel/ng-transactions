import * as express from 'express';
import Transactions from '../models/Transactions';
import TransactionController from '../controllers/transaction.controller';
import TransactionService from '../services/transaction.service';
import { validateToken, validateTokenExists } from '../utils/tokenValidations';

const router = express.Router();

const transactionController = new TransactionController(new TransactionService(Transactions));

router.post('/', validateTokenExists, validateToken, async (req, res) => { transactionController.create(req, res); });
router.get('/', validateTokenExists, validateToken, async (req, res) => { transactionController.getTransactions(req, res); })
router.get('/:filter', validateTokenExists, validateToken, async (req, res) => { transactionController.getFilterTransaction(req, res); })

export default router;