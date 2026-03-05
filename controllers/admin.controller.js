import {changeMetrics, metricsStore, registerMetric} from "./metrics.controller.js";

const renderAdminPage = (req, res) => {
    return res.render('admin', {
        metrics: Object.entries(metricsStore).map(([name, m]) => ({
            name,
            type: m.type,
            value: m.value,
            help: m.help
        }))
    });
}

const createMetric = (req, res) => {
    const { name, type, help, value } = req.body;
    registerMetric(name, type, help, value)
    return res.redirect('/admin');
};

const updateMetric = (req, res) => {
    const { name, value } = req.body;
    changeMetrics(name, value)
    return res.redirect('/admin');
}

export {renderAdminPage, createMetric, updateMetric};
