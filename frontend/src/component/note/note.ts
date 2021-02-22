type noteProps = {
    freq: number;
    audioContext: AudioContext;
    primaryfilter: BiquadFilterNode;
    sineVolume: number,
    squareVolume: number,
    noiseVolume: number,
};

export const note = ({ freq, audioContext, primaryfilter, sineVolume, squareVolume, noiseVolume }: noteProps) => {

    //Gain
    const noteGain = audioContext.createGain();
    noteGain.gain.setValueAtTime(sineVolume, 0);
    noteGain.connect(primaryfilter);

    //Sinus
    const sinGain = audioContext.createGain();
    sinGain.gain.setValueAtTime(sineVolume, 0);
    sinGain.connect(noteGain);
    const sinOscillator = audioContext.createOscillator();
    sinOscillator.frequency.setValueAtTime(freq, 0);
    sinOscillator.type = 'sine';
    sinOscillator.connect(sinGain);
    sinOscillator.start();

    //Square
    const squareGain = audioContext.createGain();
    squareGain.gain.setValueAtTime(squareVolume, 0);
    squareGain.connect(noteGain);
    const squareOscillator = audioContext.createOscillator();
    squareOscillator.frequency.setValueAtTime(freq, 0);
    squareOscillator.type = 'square';
    squareOscillator.connect(squareGain);
    squareOscillator.start();

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
    const noiseGain = audioContext.createGain();
    noiseGain.gain.setValueAtTime(noiseVolume, 0);
    noiseGain.connect(noteGain);
    const whiteNoiseSource = audioContext.createBufferSource();
    whiteNoiseSource.buffer = buffer;
    whiteNoiseSource.connect(noiseGain);
    whiteNoiseSource.loop = true;
    whiteNoiseSource.start();

}