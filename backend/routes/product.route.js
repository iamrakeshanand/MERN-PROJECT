import express from 'express';

import { createproduct, delprod, getproducts, updateprod } from '../controllers/product.controller.js';

const router=express.Router();

router.put("/:id",updateprod);
router.get("/",getproducts)
router.delete("/:id", delprod); 
router.post('/', createproduct);

export default router;