import React, { createContext, useContext, useState } from 'react';

type RecordingContextType = {
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  isRecording: boolean;
  useCamera: boolean;
  setUseCamera: (value: boolean) => void;
};

const RecordingContext = createContext<RecordingContextType | undefined>(undefined);

export const RecordingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [useCamera, setUseCamera] = useState(true);

  const startRecording = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      });
      
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: useCamera
      });

      // Dispatch custom event with streams
      window.dispatchEvent(new CustomEvent('start-recording', {
        detail: { screenStream, audioStream }
      }));
      
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const stopRecording = () => {
    window.dispatchEvent(new CustomEvent('stop-recording'));
    setIsRecording(false);
  };

  return (
    <RecordingContext.Provider value={{
      startRecording,
      stopRecording,
      isRecording,
      useCamera,
      setUseCamera
    }}>
      {children}
    </RecordingContext.Provider>
  );
};

export const useRecording = () => {
  const context = useContext(RecordingContext);
  if (!context) {
    throw new Error('useRecording must be used within a RecordingProvider');
  }
  return context;
};