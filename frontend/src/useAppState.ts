import { useReducer } from "react";

type Action =
    { type: 'octave'; value: number } |
    { type: 'mainVolume'; value: number } |
    { type: 'noiseVolume'; value: number } |
    { type: 'sineVolume'; value: number } |
    { type: 'squareVolume'; value: number } |
    { type: 'filterFreq'; value: number }


export type State = {
    octave: number,
    mainVolume: number,
    noiseVolume: number,
    sineVolume: number,
    squareVolume: number,
    filterFreq: number
};

export type Dispatcher = (action: Action) => void;

function reducer(state: any, action: Action) {
    switch (action.type) {
        case 'octave':
            return { ...state, octave: action.value };
        case 'mainVolume':
            return { ...state, mainVolume: action.value };
        case 'noiseVolume':
            return { ...state, noiseVolume: action.value };
        case 'sineVolume':
            return { ...state, sineVolume: action.value };
        case 'mainVolume':
            return { ...state, mainVolume: action.value };
        case 'filterFreq':
            return { ...state, filterFreq: action.value };
        default:
            throw new Error();
    }
}

export function useAppState() {
    const initStateObject = { octave: 5, mainVolume: 0.05, noiseVolume: 1, sineVolume: 1, squareVolume: 1, filterFreq: 5000 };
    return useReducer(reducer, initStateObject);
};
