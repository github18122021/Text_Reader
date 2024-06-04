import { useEffect, useRef } from 'react';
import autosize from 'autosize';

function App() {
  const textareaRef = useRef(null);

  useEffect(() => {
    autosize(textareaRef.current);
  }, []);

  return (
    <section className="flex flex-col items-center justify-start pt-20 h-screen bg-gray-200">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Text Reader App</h1>
      <textarea 
        ref={textareaRef}
        className="w-[80vw] h-[10vh] max-h-[70vh] border border-gray-300 rounded-md focus:outline-none focus:border-blue-700 px-4 py-2 resize-none break-all" 
        type="text" 
        placeholder="Write text here to convert into speech" 
      />
    </section>
  );
}

export default App;
