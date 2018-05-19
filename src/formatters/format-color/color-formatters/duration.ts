import * as timeSpan from 'time-span';
import * as prettyMs from 'pretty-ms';

const applicationStart = timeSpan();

export const duration = (fromTimespan: timeSpan.TimeSpanObject = applicationStart) => {
    const ms = fromTimespan();
    return prettyMs(ms, {secDecimalDigits: 0, msDecimalDigits: 0});
};
