import { useEffect, useRef, useState } from 'react';
import autosize from 'autosize';

function App() {
  const textareaRef = useRef(null);
  let [speechRunning, setSpeechRunning] = useState(false);

  useEffect(() => {
    autosize(textareaRef.current);
  }, []);


  function textToSpeech() {
    
    if('speechSynthesis' in window) {
      // console.log(window.speechSynthesis.getVoices());

      let utterance;

      // utterance.rate = 1;
      // utterance.pitch = 0.7;
      // utterance.volume = 1;
      // let index = window.speechSynthesis.getVoices().findIndex((voice) => voice.lang === "gu");
      // console.log(window.speechSynthesis.getVoices()[index]);

      if(textareaRef.current.value === "") {
        utterance = new SpeechSynthesisUtterance("Hello there!, I am a text reader app. Please write some text in the textarea to convert into speech.")
        
      } else {
        
        utterance = new SpeechSynthesisUtterance(textareaRef.current.value);
      }
      
      // configuration
      utterance.pitch = 0.8;
      utterance.rate = 0.7;

      // console.log(utterance);


      utterance.onstart = function() {
        // making button disabled while speech is going on
        setSpeechRunning((prev) => !prev);
      }

      utterance.onend = function() {
        // making button enabled after speech is finished
        setSpeechRunning((prev) => !prev);
      }

      utterance.onerror = function() {
        textareaRef.current.value = "Sorry, I am not able to convert this text into speech. Please try again.";
      }


      window.speechSynthesis.speak(utterance);

    } else {
      alert('Your browser does not support Speech Synthesis API');
    }
  }

  return (
    <section className="flex flex-col items-center justify-start pt-20 h-screen bg-gray-200">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Text Reader App</h1>
      <textarea 
        ref={textareaRef}
        className="w-[80vw] h-[20vh] max-h-[70vh] border border-gray-300 rounded-md focus:outline-none focus:border-blue-700 px-4 py-2 resize-none break-all mt-5" 
        type="text" 
        placeholder="Write text here to convert into speech" 
      />
      <button className='mt-7 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800' onClick={textToSpeech} disabled={speechRunning}>
        {speechRunning ? "Speech is going on..." : "Text to Speech"}
      </button>
    </section>
  );
}

export default App;
