import { NoteStoreImplementation } from '../../store/store'

type noteProps = {
    freq: number,
    name: string,
    audioContext: AudioContext,
    primaryfilter: BiquadFilterNode,
    sineVolume: number,
    squareVolume: number,
    noiseVolume: number,
    noteStore: NoteStoreImplementation,
};

export const note = ({ freq, name, audioContext, primaryfilter, sineVolume, squareVolume, noiseVolume, noteStore }: noteProps) => {

    //Gain
    const noteGain = audioContext.createGain();
    noteGain.gain.setValueAtTime(0, 0);
    noteGain.connect(primaryfilter);

    //Sinus
    const sinGain = audioContext.createGain();
    sinGain.gain.setValueAtTime(sineVolume, 0);
    sinGain.connect(noteGain);
    const sinOsc = audioContext.createOscillator();
    sinOsc.frequency.setValueAtTime(freq, 0);
    sinOsc.type = 'sine';
    sinOsc.connect(sinGain);
    sinOsc.start();

    //Square
    const squareGain = audioContext.createGain();
    squareGain.gain.setValueAtTime(squareVolume, 0);
    squareGain.connect(noteGain);
    const squareOsc = audioContext.createOscillator();
    squareOsc.frequency.setValueAtTime(freq, 0);
    squareOsc.type = 'square';
    squareOsc.connect(squareGain);
    squareOsc.start();

    //Noise
    const buffer = audioContext.createBuffer(
        1,
        audioContext.sampleRate * 1,
        audioContext.sampleRate
    );
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < buffer.length; i++) {
        channelData[i] = Math.random() * 2 - 1;
    }
    audioContext.resume();
    const whiteNoiseGain = audioContext.createGain();
    whiteNoiseGain.gain.setValueAtTime(noiseVolume, 0);
    whiteNoiseGain.connect(noteGain);
    const whiteNoise = audioContext.createBufferSource();
    whiteNoise.buffer = buffer;
    whiteNoise.connect(whiteNoiseGain);
    whiteNoise.loop = true;
    whiteNoise.start();


    // Add to the Store
    noteStore.addNote(
        freq,
        name,
        noteGain,
        sinOsc,
        sinGain,
        squareOsc,
        squareGain,
        whiteNoise,
        whiteNoiseGain)

}