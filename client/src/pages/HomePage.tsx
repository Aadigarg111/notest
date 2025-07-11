import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Mic, 
  BookOpen, 
  Brain, 
  Play,
  Sparkles,
  Zap,
  Target,
  Users
} from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Mic,
      title: 'Live Speech Recognition',
      description: 'Real-time transcription with intelligent noise filtering and context understanding.',
      color: 'primary'
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Smart summarization, key point extraction, and concept classification.',
      color: 'secondary'
    },
    {
      icon: BookOpen,
      title: 'Smart Note Generation',
      description: 'Automatically structured notes with highlights and important concepts.',
      color: 'accent'
    },
    {
      icon: Target,
      title: 'Study Assistance',
      description: 'Generate flashcards, practice questions, and personalized study materials.',
      color: 'primary'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '1,234', icon: Users },
    { label: 'Notes Created', value: '5,678', icon: BookOpen },
    { label: 'AI Insights', value: '12,345', icon: Sparkles },
    { label: 'Study Sessions', value: '890', icon: Brain }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div 
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-gradient">AI-Powered</span>
          <br />
          Smart Notes
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Revolutionize your classroom learning with intelligent note-taking that understands context, 
          filters noise, and generates structured insights in real-time.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/lecture" className="btn-primary flex items-center justify-center space-x-2">
            <Play className="w-5 h-5" />
            <span>Start Live Lecture</span>
          </Link>
          <Link to="/notes" className="btn-secondary flex items-center justify-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>View Notes</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="card text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
          >
            <stat.icon className="w-8 h-8 text-primary-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="card hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            >
              <div className={`w-12 h-12 rounded-lg bg-${feature.color}-600/20 flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="card max-w-2xl mx-auto">
          <Zap className="w-12 h-12 text-accent-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Learning?</h3>
          <p className="text-gray-300 mb-6">
            Join thousands of students who are already using AI Smart Notes to enhance their 
            learning experience and improve their academic performance.
          </p>
          <Link to="/lecture" className="btn-accent">
            Get Started Now
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage; 