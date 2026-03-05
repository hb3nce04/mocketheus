import {Counter, Gauge} from "prom-client";

export type MetricKind = 'gauge' | 'counter';

export interface MetricEntry {
    type: MetricKind;
    metric: Gauge<string> | Counter<string>; // Unió típus
    value: number;
    help: string;
}

export type MetricsStore = Record<string, MetricEntry>;
