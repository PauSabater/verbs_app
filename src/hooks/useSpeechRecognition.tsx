import { useState, useEffect, useRef } from 'react';

export const useSpeechRecognition = (language = 'de-DE') => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioStart = new Audio('/audio/effects/start-recording.mp3');
  const audioStop = new Audio('/audio/effects/stop-recording.mp3');

  useEffect(() => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      console.error('Speech Recognition not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognitionRef.current = recognition;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      audioStop.play()
      setTranscript(event.results[0][0].transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onstart = () => {
        audioStart.play()
        setTimeout(() => {
          setIsListening(true)
        }, 100)
    }
    recognition.onend = () => {
      audioStop.play()
      setIsListening(false)
    }

    return () => {
      recognition.stop();
    };
  }, [language]);

  const startRecognition = () => {
    recognitionRef.current?.start();
  };

  const stopRecognition = () => {
    recognitionRef.current?.stop();
  };

  return { transcript, isListening, startRecognition, stopRecognition };
};
