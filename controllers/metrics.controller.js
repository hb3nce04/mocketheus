import client from 'prom-client';

const register = new client.Registry();
const metricsStore = {};

const getMetrics = async (req, res) => {
    Object.values(metricsStore).forEach(metrics => {
        if (metrics.type === 'gauge') metrics.metric.set(metrics.value);
    });
    res.setHeader('Content-Type', register.contentType);
    res.end(await register.metrics());
};

const registerMetric = (name, type, help, value) => {
    if (!metricsStore[name]) {
        let metric;
        if (type === 'gauge') {
            metric = new client.Gauge({ name, help });
        }
        if (type === 'counter') {
            metric = new client.Counter({ name, help });
        }
        register.registerMetric(metric);
        const numericValue = Number(value) || 0;
        metricsStore[name] = {
            type,
            metric,
            value: numericValue,
            help
        };
        if (type === 'gauge') {
            metric.set(numericValue);
        }
        if (type === 'counter' && numericValue > 0) {
            metric.inc(numericValue);
        }
    }
};

const changeMetrics = (name, value) => {
    const m = metricsStore[name];
    if (!m) return;
    const numericValue = Number(value) || 0;
    const metric = m.metric;
    if (m.type === 'gauge') {
        metric.set(numericValue);
        m.value = numericValue;
    }
    if (m.type === 'counter') {
        const diff = numericValue - m.value;
        if (diff > 0) {
            metric.inc(diff);
            m.value = numericValue;
        }
    }
};

export {metricsStore, getMetrics, registerMetric, changeMetrics};
