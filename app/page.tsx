'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Sparkles, Zap } from 'lucide-react'
import VisualCoding from './components/VisualCoding'

export default function Home() {
  const [activeTab, setActiveTab] = useState('visual')

  const tabs = [
    { id: 'visual', label: 'Visual Coding', icon: Palette },
    { id: 'about', label: 'About', icon: Sparkles }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                VibeStudio
              </h1>
            </motion.div>
            
            <nav className="flex space-x-1">
              {tabs.map((tab) => {
                const IconComponent = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-purple-100 text-purple-700 shadow-sm'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'visual' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-screen -mx-4 -my-8"
          >
            <VisualCoding />
          </motion.div>
        )}

        {activeTab === 'about' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                🎨 VibeStudio - AI/ML Portfolio Project
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                A visual coding platform showcasing skills in educational technology, React development, and interactive user interfaces.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
                <h3 className="text-2xl font-bold text-purple-600 mb-4">🧩 Visual Programming</h3>
                <p className="text-gray-600 mb-4">
                  Learn programming concepts by dragging and dropping colorful code blocks. No typing required!
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Motion and animation controls</li>
                  <li>• Events and user interaction</li>
                  <li>• Loops and conditional logic</li>
                  <li>• Variables and data handling</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
                <h3 className="text-2xl font-bold text-purple-600 mb-4">🎭 Interactive Stage</h3>
                <p className="text-gray-600 mb-4">
                  Watch your programs come to life on our interactive stage with animated characters!
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Real-time program execution</li>
                  <li>• Animated sprite characters</li>
                  <li>• Speech bubbles and effects</li>
                  <li>• Immediate visual feedback</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
                <h3 className="text-2xl font-bold text-purple-600 mb-4">💻 Learn Real Code</h3>
                <p className="text-gray-600 mb-4">
                  See how your visual blocks translate to real JavaScript code in our live code preview!
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Real-time code generation</li>
                  <li>• Bridge to text programming</li>
                  <li>• Educational comments</li>
                  <li>• Professional coding practices</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
                <h3 className="text-2xl font-bold text-purple-600 mb-4">🎮 Creative Projects</h3>
                <p className="text-gray-600 mb-4">
                  Build games, animations, and interactive stories that spark creativity and imagination!
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Virtual pet simulations</li>
                  <li>• Interactive games</li>
                  <li>• Art and animation projects</li>
                  <li>• Music and sound experiences</li>
                </ul>
              </div>
            </div>

            <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Technical Skills Demonstrated</h3>
              <p className="text-gray-600 mb-6">
                This project showcases React/Next.js development, TypeScript, animation libraries, and educational UX design.
              </p>
              <button
                onClick={() => setActiveTab('visual')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-colors"
              >
                View Demo 🚀
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}