import React, { useState, useRef, useEffect } from 'react';
import { Video, Mic, Camera, StopCircle, Download } from 'lucide-react';
import { useRecording } from './RecordingContext';
import AvatarPreview from './AvatarPreview';

const ScreenRecorder = () => {
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isRecording, useCamera, setUseCamera } = useRecording();
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [avatarSize, setAvatarSize] = useState<'small' | 'medium' | 'large'>('large');
  const [isRounded, setIsRounded] = useState(false);

  const videoSizeClasses = {
    small: 'w-24 h-24',
    medium: 'w-32 h-32',
    large: 'w-48 h-48'
  };

  useEffect(() => {
    const handleStartRecording = async (event: CustomEvent) => {
      const { screenStream, audioStream } = event.detail;
      
      // Get camera stream if useCamera is enabled
      let cameraStream: MediaStream | null = null;
      if (useCamera) {
        try {
          cameraStream = await navigator.mediaDevices.getUserMedia({ 
            video: true,
            audio: false 
          });
        } catch (err) {
          console.error('Error accessing camera:', err);
          setUseCamera(false);
          return;
        }
      }

      const tracks = [
        ...screenStream.getVideoTracks(),
        ...audioStream.getAudioTracks(),
        ...(cameraStream?.getVideoTracks() || [])
      ];
      
      const combinedStream = new MediaStream(tracks);
      setStream(combinedStream);

      // Set the camera stream directly to video element
      if (videoRef.current && useCamera) {
        videoRef.current.srcObject = cameraStream;
      }

      const mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType: 'video/webm'
      });

      mediaRecorderRef.current = mediaRecorder;
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        setRecordedChunks(chunks);
        tracks.forEach(track => track.stop());
        setStream(null);
      };

      mediaRecorder.start();
    };

    const handleStopRecording = () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    };

    window.addEventListener('start-recording' as any, handleStartRecording);
    window.addEventListener('stop-recording', handleStopRecording);

    return () => {
      window.removeEventListener('start-recording' as any, handleStartRecording);
      window.removeEventListener('stop-recording', handleStopRecording);
    };
  }, [useCamera]);

  const downloadRecording = () => {
    if (recordedChunks.length === 0) return;
    
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = 'screen-recording.webm';
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {/* Video/Avatar preview */}
      <div className={`
        mb-4 bg-black shadow-lg overflow-hidden
        ${videoSizeClasses[avatarSize]}
        ${isRounded ? 'rounded-full' : 'rounded-lg'}
      `}>
        {useCamera ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className={`
              object-cover
              ${videoSizeClasses[avatarSize]}
              ${isRounded ? 'rounded-full' : 'rounded-lg'}
            `}
          />
        ) : (
          <AvatarPreview 
            avatarUrl={avatarUrl} 
            onAvatarChange={setAvatarUrl}
            avatarSize={avatarSize}
            isRounded={isRounded}
          />
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-2 bg-white p-3 rounded-lg shadow-lg">
        <button
          onClick={() => setUseCamera(!useCamera)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            useCamera 
              ? 'bg-purple-500 text-white hover:bg-purple-600' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Camera size={20}/>
          {useCamera ? 'Use Avatar' : 'Use Camera'}
        </button>

        <div className="flex gap-4 items-center">
          <select 
            value={avatarSize}
            onChange={(e) => setAvatarSize(e.target.value as 'small' | 'medium' | 'large')}
            className="px-2 py-1 rounded border border-gray-300 text-sm"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isRounded}
              onChange={(e) => setIsRounded(e.target.checked)}
              className="rounded"
            />
            Rounded
          </label>
        </div>

        {recordedChunks.length > 0 && (
          <button
            onClick={downloadRecording}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Download size={20} />
            Download
          </button>
        )}
      </div>

      <div className="space-y-4"> 
        {/* Controls */}

      </div>
    </div>
  );
};

export default ScreenRecorder;