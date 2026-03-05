import express from 'express';
import {createMetric, renderAdminPage, updateMetric} from "../controllers/admin.controller.js";

const router = express.Router();

router.get('/', renderAdminPage);
router.post('/', createMetric);
router.post('/update', updateMetric);

export default router;
