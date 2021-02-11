import Keyboard from './component/keyboard/Keyboard';

import './App.css';

const App = () => {

  const audioContext = new AudioContext();

  // First paramter = number of chanel (1 for mono, 2 for duo <-> Stero or polyphony)
  const buffer = audioContext.createBuffer(
    1,
    audioContext.sampleRate * 1,
    audioContext.sampleRate,
  )

  // Represente 1 second of audio. 
  const channelData = buffer.getChannelData(0);

  // The lengh of the array contained in channelData is equal to the sample rate
  console.log(channelData.length);
  console.log(audioContext.sampleRate);

  // Create white noise by assigning random value between -1 and 1
  for (let i= 0; i > buffer.length;i++) {
    channelData[i] = Math.random() * 2 - 1;
  }

  // Create a Gain control (Master Volumne)
  const primaryGainControl= audioContext.createGain();
  primaryGainControl.gain.setValueAtTime(0.05, 0);
  primaryGainControl.connect(audioContext.destination);

  const playWhiteNoiseHandler = () => {
    //Resume audioContext when clicking button
    console.log("Resume audioContext");
    audioContext.resume();
    //Create a Buffer Source
    const whiteNoiseSource = audioContext.createBufferSource();
    whiteNoiseSource.buffer = buffer;
    //Link Audio Source to Gain control
    whiteNoiseSource.connect(primaryGainControl);
    whiteNoiseSource.start();
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Synth
        </p>
        <button onClick={playWhiteNoiseHandler}>White Noise</button>
        <Keyboard/>
      </header>
    </div>
  );
}

export default App;
