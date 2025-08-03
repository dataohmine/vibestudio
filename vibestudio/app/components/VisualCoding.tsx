'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Square, RotateCcw, Plus, Trash2, Code } from 'lucide-react'

interface CodeBlock {
  id: string
  type: 'action' | 'event' | 'control' | 'sensing'
  category: string
  label: string
  color: string
  params?: { [key: string]: any }
  children?: CodeBlock[]
}

interface Sprite {
  id: string
  name: string
  x: number
  y: number
  rotation: number
  size: number
  costume: string
  visible: boolean
}

const blockTemplates: CodeBlock[] = [
  // Events
  { id: 'start', type: 'event', category: 'Events', label: '🏁 When green flag clicked', color: 'bg-yellow-400' },
  { id: 'click', type: 'event', category: 'Events', label: '👆 When sprite clicked', color: 'bg-yellow-400' },
  { id: 'key_space', type: 'event', category: 'Events', label: '⌨️ When SPACE key pressed', color: 'bg-yellow-400' },
  
  // Motion
  { id: 'move', type: 'action', category: 'Motion', label: '➡️ Move 10 steps', color: 'bg-blue-400', params: { steps: 10 } },
  { id: 'turn_right', type: 'action', category: 'Motion', label: '↻ Turn right 15 degrees', color: 'bg-blue-400', params: { degrees: 15 } },
  { id: 'turn_left', type: 'action', category: 'Motion', label: '↺ Turn left 15 degrees', color: 'bg-blue-400', params: { degrees: 15 } },
  { id: 'goto', type: 'action', category: 'Motion', label: '📍 Go to x:0 y:0', color: 'bg-blue-400', params: { x: 0, y: 0 } },
  
  // Looks
  { id: 'say', type: 'action', category: 'Looks', label: '💬 Say "Hello!" for 2 seconds', color: 'bg-purple-400', params: { text: 'Hello!', duration: 2 } },
  { id: 'think', type: 'action', category: 'Looks', label: '🤔 Think "Hmm..." for 2 seconds', color: 'bg-purple-400', params: { text: 'Hmm...', duration: 2 } },
  { id: 'show', type: 'action', category: 'Looks', label: '👁️ Show', color: 'bg-purple-400' },
  { id: 'hide', type: 'action', category: 'Looks', label: '🙈 Hide', color: 'bg-purple-400' },
  
  // Control
  { id: 'wait', type: 'control', category: 'Control', label: '⏱️ Wait 1 second', color: 'bg-orange-400', params: { duration: 1 } },
  { id: 'repeat', type: 'control', category: 'Control', label: '🔄 Repeat 10 times', color: 'bg-orange-400', params: { times: 10 }, children: [] },
  
  // Games
  { id: 'dance_move', type: 'action', category: 'Games', label: '💃 Do a dance move!', color: 'bg-red-400' },
  { id: 'jump', type: 'action', category: 'Games', label: '🦘 Jump up and down!', color: 'bg-red-400' },
  { id: 'spin_crazy', type: 'action', category: 'Games', label: '🌪️ Spin like crazy!', color: 'bg-red-400' },
]

export default function VisualCoding() {
  const [selectedCategory, setSelectedCategory] = useState('Motion')
  const [programBlocks, setProgramBlocks] = useState<CodeBlock[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [sprite, setSprite] = useState<Sprite>({
    id: 'poodle',
    name: 'Poodle',
    x: 0,
    y: 0,
    rotation: 0,
    size: 100,
    costume: '🐶',
    visible: true
  })
  const [message, setMessage] = useState('')

  const categories = ['Games', 'Events', 'Motion', 'Looks', 'Control']
  
  const addBlock = (template: CodeBlock) => {
    const newBlock: CodeBlock = {
      ...template,
      id: template.id + '_' + Date.now(),
      children: template.children ? [] : undefined
    }
    setProgramBlocks([...programBlocks, newBlock])
  }

  const removeBlock = (blockId: string) => {
    setProgramBlocks(programBlocks.filter(block => block.id !== blockId))
  }

  const generateJavaScriptCode = (blocks: CodeBlock[]): string => {
    if (blocks.length === 0) {
      return '// Add blocks to see the generated code!\n// This shows what your visual blocks do in real JavaScript'
    }

    let code = '// Generated JavaScript code from your blocks:\n\n'
    
    blocks.forEach((block) => {
      const blockType = block.id.split('_')[0]
      
      switch (blockType) {
        case 'start':
          code += `// Event: When program starts\n`
          code += `function startProgram() {\n`
          break
          
        case 'move':
          const steps = block.params?.steps || 10
          code += `  // Move the sprite ${steps} steps forward\n`
          code += `  sprite.x += ${steps};\n`
          break
          
        case 'say':
          const text = block.params?.text || 'Hello!'
          const duration = block.params?.duration || 2
          code += `  // Say "${text}" for ${duration} seconds\n`
          code += `  showMessage("${text}");\n`
          break
          
        case 'dance':
          code += `  // Do a dance move (spin 4 times)\n`
          code += `  for (let i = 0; i < 4; i++) {\n`
          code += `    sprite.rotation += 90;\n`
          code += `  }\n`
          break
          
        default:
          code += `  // ${block.label}\n`
          break
      }
      
      code += '\n'
    })
    
    return code
  }

  const executeProgram = async () => {
    if (programBlocks.length === 0) return
    
    setIsRunning(true)
    setMessage('')
    setSprite(prev => ({ ...prev, x: 0, y: 0, rotation: 0, visible: true }))
    
    // Simple execution simulation
    for (let block of programBlocks) {
      const blockType = block.id.split('_')[0]
      
      switch (blockType) {
        case 'move':
          const steps = block.params?.steps || 10
          setSprite(prev => ({ ...prev, x: prev.x + steps }))
          break
        case 'say':
          const text = block.params?.text || 'Hello!'
          setMessage(text)
          await new Promise(resolve => setTimeout(resolve, 2000))
          setMessage('')
          break
        case 'dance':
          for (let i = 0; i < 4; i++) {
            setSprite(prev => ({ ...prev, rotation: prev.rotation + 90 }))
            await new Promise(resolve => setTimeout(resolve, 200))
          }
          break
      }
      
      await new Promise(resolve => setTimeout(resolve, 300))
    }
    
    setIsRunning(false)
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Block Palette */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🧩 Code Blocks</h3>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 mb-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blocks */}
          <div className="space-y-2">
            {blockTemplates
              .filter(block => block.category === selectedCategory)
              .map(block => (
                <motion.div
                  key={block.id}
                  className={`${block.color} text-white p-3 rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-shadow`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addBlock(block)}
                >
                  <div className="text-sm font-medium">{block.label}</div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Controls */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={executeProgram}
              disabled={isRunning || programBlocks.length === 0}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running...' : 'Run Program'}
            </button>
            
            <button
              onClick={() => setProgramBlocks([])}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Clear
            </button>

            <div className="text-sm text-gray-600">
              Blocks: {programBlocks.length}
            </div>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Script Area */}
          <div className="w-1/2 bg-gray-100 p-4 overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📜 Your Program</h3>
            
            {programBlocks.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <div className="text-4xl mb-4">🧩</div>
                <div className="font-medium">Drag blocks here to build your program!</div>
                <div className="text-sm mt-2">Start with "When green flag clicked"</div>
              </div>
            ) : (
              <div className="space-y-2">
                {programBlocks.map((block, index) => (
                  <motion.div
                    key={block.id}
                    className={`${block.color} text-white p-3 rounded-lg shadow-sm relative group`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{block.label}</div>
                      <button
                        onClick={() => removeBlock(block.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-black/20 rounded transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Stage Area */}
          <div className="w-1/2 bg-white border-l border-gray-200 p-4 flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🎭 Stage</h3>
            
            <div 
              className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-lg border-2 border-gray-300 overflow-hidden"
              style={{ width: '300px', height: '200px', margin: '0 auto' }}
            >
              {/* Sprite */}
              {sprite.visible && (
                <motion.div
                  className="absolute text-center select-none"
                  style={{
                    left: `${150 + sprite.x}px`,
                    top: `${100 - sprite.y}px`,
                    transform: `rotate(${sprite.rotation}deg) scale(${sprite.size / 100})`,
                    fontSize: '2rem'
                  }}
                  animate={{
                    left: `${150 + sprite.x}px`,
                    top: `${100 - sprite.y}px`,
                    rotate: sprite.rotation,
                    scale: sprite.size / 100
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {sprite.costume}
                </motion.div>
              )}

              {/* Speech bubble */}
              <AnimatePresence>
                {message && (
                  <motion.div
                    className="absolute bg-white border border-gray-300 rounded-lg p-2 shadow-lg"
                    style={{
                      left: `${170 + sprite.x}px`,
                      top: `${80 - sprite.y}px`,
                      maxWidth: '120px'
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <div className="text-sm text-gray-800">{message}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Code Preview Panel */}
            <div className="mt-6 flex-1">
              <h4 className="text-md font-bold text-gray-800 mb-2 flex items-center gap-2">
                <Code className="w-4 h-4" />
                Generated Code
              </h4>
              <div className="bg-gray-900 rounded-lg p-4 overflow-y-auto max-h-64 border border-gray-300">
                <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                  {generateJavaScriptCode(programBlocks)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}