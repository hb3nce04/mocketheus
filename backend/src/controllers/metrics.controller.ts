import client, {Counter, Gauge} from 'prom-client';
import { Request, Response } from 'express';
import {MetricEntry, MetricKind, MetricsStore} from "../types/metrics.js";

const register = new client.Registry();
const metricsStore: MetricsStore = {};

const getMetrics = async (req: Request, res: Response): Promise<void> => {
    Object.values(metricsStore).forEach((entry: MetricEntry) => {
        if (entry.type === 'gauge' && entry.metric instanceof Gauge) {
            entry.metric.set(entry.value);
        }
    });

    res.setHeader('Content-Type', register.contentType);
    res.end(await register.metrics());
};

const registerMetric = (name: string, type: string, help: string, value: string): void => {
    if (!metricsStore[name]) {
        let metric: Gauge<string> | Counter<string>;

        if (type === 'gauge') {
            metric = new client.Gauge({ name, help });
        } else if (type === 'counter') {
            metric = new client.Counter({ name, help });
        } else {
            return;
        }

        register.registerMetric(metric);
        const numericValue = Number(value) || 0;

        metricsStore[name] = {
            type: type as MetricKind,
            metric,
            value: numericValue,
            help
        };

        if (metric instanceof Gauge) {
            metric.set(numericValue);
        } else if (metric instanceof Counter && numericValue > 0) {
            metric.inc(numericValue);
        }
    }
};

const changeMetrics = (name: string, value: string | number): void => {
    const entry = metricsStore[name];
    if (!entry) return;

    const numericValue = Number(value) || 0;
    const { metric } = entry;

    if (entry.type === 'gauge' && metric instanceof Gauge) {
        metric.set(numericValue);
        entry.value = numericValue;
    }
    else if (entry.type === 'counter' && metric instanceof Counter) {
        const diff = numericValue - entry.value;
        if (diff > 0) {
            metric.inc(diff);
            entry.value = numericValue;
        }
    }
};

const removeMetric = (name: string): void => {
    const entry = metricsStore[name];
    if (!entry) return;
    delete metricsStore[name];
    // Error: A metric with the name asd has already been registered.
    register.removeSingleMetric(name);
}

export {metricsStore, getMetrics, registerMetric, changeMetrics, removeMetric};
