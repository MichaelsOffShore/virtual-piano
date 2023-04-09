import "./App.css";
import useEventListener from "@use-it/event-listener";
import * as Tone from "tone";
import gong from "./Audio/gong.mp3";
import kick from "./Audio/drumKick.mp3";
import maracas from "./Audio/maracas.mp3";
import triangle from "./Audio/triangle.mp3";
import hihat from "./Audio/hi-hat.mp3";
import snare from "./Audio/snare.mp3";

function App() {
  const recorder = new Tone.Recorder();
  const maxOctave = 8;
  const maxSoundBank = 3;
  let recorderChange = false;

  let recording = false;
  let octave = 4;
  let soundBank = 1;
  let synth = new Tone.Synth().toDestination().connect(recorder);

  let filter = new Tone.AutoFilter(0);
  let distortion = new Tone.Distortion(0);

  synth.chain(filter, distortion, Tone.Destination.connect(recorder));

  let autoFilterOn = false;
  let distortionOn = false;

  function toggleDistortion() {
    if (distortionOn) {
      //turn off
      document.querySelector(".distortion").style.backgroundColor = "tomato";
      distortion = new Tone.Distortion(0);
      synth = new Tone.Synth()
        .toDestination()
        .connect(recorder)
        .connect(distortion);
      console.log("Distortion Off!");
      distortionOn = false;
      synth.chain(distortion, distortion, Tone.Destination.connect(recorder));
    } else {
      //turn on
      document.querySelector(".distortion").style.backgroundColor = "green";
      distortion = new Tone.Distortion(10);
      synth = new Tone.Synth()
        .toDestination()
        .connect(recorder)
        .connect(distortion);
      console.log("Distortion On!");
      distortionOn = true;
      synth.chain(filter, distortion, Tone.Destination.connect(recorder));
    }
  }
  function toggleAutoFilter() {
    if (autoFilterOn) {
      //turn off
      document.querySelector(".autoFilter").style.backgroundColor = "tomato";
      filter = new Tone.AutoFilter(0);
      synth = new Tone.Synth()
        .toDestination()
        .connect(recorder)
        .connect(filter);
      autoFilterOn = false;
      synth.chain(filter, distortion, Tone.Destination.connect(recorder));
    } else {
      //turn on
      document.querySelector(".autoFilter").style.backgroundColor = "green";
      filter = new Tone.AutoFilter(1);
      synth = new Tone.Synth()
        .toDestination()
        .connect(recorder)
        .connect(filter);
      autoFilterOn = true;
      synth.chain(filter, distortion, Tone.Destination.connect(recorder));
    }
  }

  function startRecording() {
    if (recording) {
      document.querySelector(".recordingButton").style.backgroundColor =
        "black";
      recorderChange = true;
      recording = false;
      changeSound();
      recorderChange = false;
      stopRecording();
    } else {
            
      document.querySelector(".recordingButton").style.backgroundColor = "tomato";
      recorder.start();
      recording = true;
    }
  }



  function stopRecording() {

    setTimeout(async () => {
      const recording = await recorder.stop();
      const url = URL.createObjectURL(recording);
      const anchor = document.createElement("a");
      anchor.download = "recording.webm";
      anchor.href = url;
      anchor.click();
    }, 2000);
  }

  function playC() {
    synth.triggerAttackRelease("C" + octave, "8n");
    updateScreen("C");
  }
  function playDb() {
    synth.triggerAttackRelease("Db" + octave, "8n");
    updateScreen("Db");
  }
  function playD() {
    synth.triggerAttackRelease("D" + octave, "8n");
    updateScreen("D");
  }
  function playEb() {
    synth.triggerAttackRelease("Eb" + octave, "8n");
    updateScreen("Eb");
  }
  function playE() {
    synth.triggerAttackRelease("E" + octave, "8n");
    updateScreen("E");
  }
  function playF() {
    synth.triggerAttackRelease("F" + octave, "8n");
    updateScreen("F");
  }
  function playGb() {
    synth.triggerAttackRelease("Gb" + octave, "8n");
    updateScreen("Gb");
  }
  function playG() {
    synth.triggerAttackRelease("G" + octave, "8n");
    updateScreen("G");
  }
  function playAb() {
    synth.triggerAttackRelease("Ab" + octave, "8n");
    updateScreen("Ab");
  }
  function playA() {
    synth.triggerAttackRelease("A" + octave, "8n");
    updateScreen("A");
  }
  function playBb() {
    synth.triggerAttackRelease("Bb" + octave, "8n");
    updateScreen("Bb");
  }
  function playB() {
    synth.triggerAttackRelease("B" + octave, "8n");
    updateScreen("B");
  }
  function pad1() {
    const player = new Tone.Player(kick).toDestination().connect(recorder);
    Tone.loaded().then(() => {
      player.start();
    });
    updateScreen("D-1");
  }
  function pad2() {
    const player = new Tone.Player(hihat).toDestination().connect(recorder);
    Tone.loaded().then(() => {
      player.start();
    });
    updateScreen("D-2");
  }
  function pad3() {
    const player = new Tone.Player(snare).toDestination().connect(recorder);
    Tone.loaded().then(() => {
      player.start();
    });
    updateScreen("D-3");
  }
  function pad4() {
    const player = new Tone.Player(triangle).toDestination().connect(recorder);
    Tone.loaded().then(() => {
      player.start();
    });
    updateScreen("D-4");
  }
  function pad5() {
    const player = new Tone.Player(maracas).toDestination().connect(recorder);
    Tone.loaded().then(() => {
      player.start();
    });
    updateScreen("D-5");
  }
  function pad6() {
    const player = new Tone.Player(gong).toDestination().connect(recorder);
    Tone.loaded().then(() => {
      player.start();
    });
    updateScreen("D-6");
  }
  function increaseOctave() {
    if (octave != maxOctave) {
      octave++;
      document.getElementById("octaveIndex").innerHTML = octave;
    }
    return;
  }
  function decreaseOctave() {
    if (octave != 0) {
      octave--;
      document.getElementById("octaveIndex").innerHTML = octave;
    }
    return;
  }
  function changeSound() {
    if (soundBank < maxSoundBank) {
      if (!recorderChange) {
        soundBank++;
        recorderChange = false;
      }
      switch (soundBank) {
        case 1:
          synth = new Tone.Synth().toDestination().connect(recorder);
          document.getElementById("pianoSoundText").innerHTML = "Classic-Synth";
          break;
        case 2:
          synth = new Tone.AMSynth().toDestination().connect(recorder);
          document.getElementById("pianoSoundText").innerHTML = "AM-Synth";
          break;
        case 3:
          synth = new Tone.DuoSynth().toDestination().connect(recorder);
          document.getElementById("pianoSoundText").innerHTML = "Duo-Synth";
          break;
        default:
          console.log("Error");
          break;
      }
    } else {
      soundBank = 1;
      synth = new Tone.Synth().toDestination().connect(recorder);
      document.getElementById("pianoSoundText").innerHTML = "Classic-Synth";
    }
  }
  function updateScreen(text) {
    document.getElementById("noteText").innerHTML = text;
  }

  function keyPressHandler(event) {
    switch (event.keyCode) {
      case 65:
        playC();
        break;
      case 89:
        playDb();
        break;
      case 83:
        playD();
        break;
      case 85:
        playEb();
        break;
      case 68:
        playE();
        break;
      case 70:
        playF();
        break;
      case 73:
        playGb();
        break;
      case 71:
        playG();
        break;
      case 79:
        playAb();
        break;
      case 72:
        playA();
        break;
      case 80:
        playBb();
        break;
      case 74:
        playB();
        break;

      case 49:
        pad1();
        break;
      case 50:
        pad2();
        break;
      case 51:
        pad3();
        break;
      case 52:
        pad4();
        break;
      case 53:
        pad5();
        break;
      case 54:
        pad6();
        break;
      default:
        break;
    }
  }

  useEventListener("keydown", keyPressHandler);

  return (
    <div className="App">
      <div className="controlsContainer"></div>

      <div className="pianoContainer">
        <button onClick={playC} className="whiteKey">
          C
        </button>

        <button onClick={playDb} className="blackKey">
          Db
        </button>

        <button onClick={playD} className="whiteKey">
          D
        </button>

        <button onClick={playEb} className="blackKey">
          Eb
        </button>

        <button onClick={playE} className="whiteKey" style={{ marginRight: "1.45vh"}}>
          E
        </button>

        <button onClick={playF} className="whiteKey">
          F
        </button>

        <button onClick={playGb} className="blackKey">
          Gb
        </button>

        <button onClick={playG} className="whiteKey">
          G
        </button>

        <button onClick={playAb} className="blackKey">
          Ab
        </button>

        <button onClick={playA} className="whiteKey">
          A
        </button>

        <button onClick={playBb} className="blackKey">
          Bb
        </button>

        <button onClick={playB} className="whiteKey">
          B
        </button>

        <div id="octaveIndex">4</div>
        <div id="rectangleOctaveHeading">Octave Level</div>
        <div id="rectangleDrumpadHeading">Drumpad Keys</div>
        <div id="rectangleSoundHeading">Sound Change</div>
        <div id="rectangleRecordHeading">Record</div>
        <div id="backCircle1"></div>
        <div id="backCircle2"></div>

        <div className="octaveUp" onClick={increaseOctave}>
          +
        </div>
        <div className="octaveDown" onClick={decreaseOctave}>
          -
        </div>
        <div id="rectangleHeading">Distortion</div>
        <button className="distortion" onClick={toggleDistortion}>
          Distortion
        </button>
        <div id="rectangleHeading2">AutoFilter</div>
        <button className="autoFilter" onClick={toggleAutoFilter}>
          AutoFilter
        </button>

        <button onClick={changeSound} className="soundChange"></button>
        <button onClick={startRecording} className="recordingButton"></button>
        <div className="screen">
          <p id="pianoSoundText">Classic-Synth</p>
          <br></br>
          <br></br>
          <p id="noteText">----</p>
        </div>

        <div className="drumPadContainer">
          <button
            onClick={pad1}
            className="drumPad"
            style={{ backgroundColor: "#000000" }}
          >
            1
          </button>
          <button
            onClick={pad2}
            className="drumPad"
            style={{ backgroundColor: "#000000" }}
          >
            2
          </button>
          <button
            onClick={pad3}
            className="drumPad"
            style={{ backgroundColor: "#000000" }}
          >
            3
          </button>
          <br />
          <button
            onClick={pad4}
            className="drumPad"
            style={{ backgroundColor: "#000000" }}
          >
            4
          </button>
          <button
            onClick={pad5}
            className="drumPad"
            style={{ backgroundColor: "#000000" }}
          >
            5
          </button>
          <button
            onClick={pad6}
            className="drumPad"
            style={{ backgroundColor: "#000000" }}
          >
            6
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
