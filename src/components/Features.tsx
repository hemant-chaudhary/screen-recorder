import { motion } from 'framer-motion';
import { Mic, Video, Share2, Edit3 } from 'lucide-react';

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need to Create Amazing Content
          </h2>
          <p className="text-xl text-gray-600">
            Professional-grade features, completely free
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    icon: Video,
    title: "HD Screen Recording",
    description: "Capture your screen in crystal clear quality with support for up to 4K resolution."
  },
  {
    icon: Mic,
    title: "Crystal Clear Audio",
    description: "Record your voice and system audio with professional-grade quality."
  },
  {
    icon: Edit3,
    title: "Easy Editing",
    description: "Simple tools to trim and enhance your recordings right in the browser."
  },
  {
    icon: Share2,
    title: "Quick Sharing",
    description: "Download and share your recordings instantly with anyone."
  }
];

export default Features;