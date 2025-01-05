import { motion } from 'framer-motion';
import { Video, Download, Monitor } from 'lucide-react';
import { useRecording } from './RecordingContext';

const Hero = () => {
  const { startRecording, stopRecording, isRecording } = useRecording();

  return (
    <section className="relative overflow-hidden">
      {/* Rest of the Hero component remains the same until the button */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 opacity-10" /> */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Professional Screen Recordings
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              In Just One Click
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Free online screen recorder with audio, webcam, and professional editing tools. Perfect for creating YouTube videos, tutorials, and presentations.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Video size={20} />
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
          </motion.div>
        </motion.div>

        {/* Features section remains the same */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 3), duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
            >
              <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const features = [
  {
    icon: Video,
    title: "Screen Recording",
    description: "Capture your screen in high quality with support for multiple monitors and window selection."
  },
  {
    icon: Monitor,
    title: "Webcam Recording",
    description: "Add your webcam feed to create engaging tutorial videos and presentations."
  },
  {
    icon: Download,
    title: "Instant Download",
    description: "Download your recordings instantly in WebM format, ready to share or edit."
  }
];

export default Hero;