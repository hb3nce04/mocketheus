import {changeMetrics, metricsStore, registerMetric, removeMetric} from "./metrics.controller.js";
import { Request, Response } from 'express';

const renderAdminPage = (req: Request, res: Response) => {
    return res.render('admin', {
        metrics: Object.entries(metricsStore).map(([name, m]) => ({
            name,
            type: m.type,
            value: m.value,
            help: m.help
        }))
    });
}

const createMetric = (req: Request, res: Response) => {
    const { name, type, help, value } = req.body;
    registerMetric(name, type, help, value)
    return res.redirect('/admin');
};

const updateMetric = (req: Request, res: Response) => {
    const { name, value } = req.body;
    changeMetrics(name, value)
    return res.redirect('/admin');
}
export const deleteMetric = (req: Request, res: Response) => {
    const { name } = req.body;
    removeMetric(name)
    return res.redirect('/admin');
};

export {renderAdminPage, createMetric, updateMetric};
