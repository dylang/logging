import { getCallee } from '../mixins/callee';

export interface LogMessage {
    level: number;
    time: number;
    v: number;
    pid: number;
    hostname: string;
    duration: number;
    callee: ReturnType<typeof getCallee>;
    msg?: string;
    data?: unknown[];
    type?: string;
    message?: string;
    percentage?: number;
}
