import {FORMAT} from './types';

export interface Blah {
    getOutputMode(): FORMAT;
}

export class GlobalState implements Blah {
    private outputMode = FORMAT.COLOR;
    private metadata = {};

    getOutputMode(): FORMAT {
        return this.outputMode;
    }

    getMetadata() {
        return this.metadata;
    }

    setMetadata(metadata: object) {
        this.metadata = metadata;
    }

    setOutputColor() {
        this.outputMode = FORMAT.COLOR;
    }

    setOutputJson() {
        this.outputMode = FORMAT.JSON;
        return this;
    }
}

export const globalState = new GlobalState();
