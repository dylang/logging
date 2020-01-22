import timeSpan from 'time-span';

let previousSpan = timeSpan();

export const getDuration = () => {
    const duration = previousSpan();
    previousSpan = timeSpan();
    return duration;
};
