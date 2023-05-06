import express from 'express';
import { getAllProducts } from '../controllers/products.js'
const router = express.Router();

router.post('/all', getAllProducts);

export default router;