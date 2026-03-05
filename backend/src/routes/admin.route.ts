import express from 'express';
import {createMetric, deleteMetric, renderAdminPage, updateMetric} from "../controllers/admin.controller.js";

const router = express.Router();

router.get('/', renderAdminPage);
router.post('/', createMetric);
router.post('/update', updateMetric);
router.post('/delete', deleteMetric);

export default router;
