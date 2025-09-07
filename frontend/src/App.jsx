import { useState } from 'react'

// Morse code mapping
const morseCodeMap = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '0': '-----', ' ': '/'
}

function App() {
  const [inputText, setInputText] = useState('')
  const [isFlashing, setIsFlashing] = useState(false)

  // Convert text to Morse code
  const textToMorse = (text) => {
    return text.toUpperCase()
      .split('')
      .map(char => morseCodeMap[char] || '')
      .filter(morse => morse !== '')
      .join(' ')
  }

  const morseCode = textToMorse(inputText)

  // Send Morse code to backend
  const flashMorseCode = async () => {
    if (!morseCode.trim()) return

    setIsFlashing(true)
    try {
      const response = await fetch('http://localhost:5000/send_morse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ morse_code: morseCode }),
      })

      if (!response.ok) {
        throw new Error('Failed to send Morse code')
      }

      console.log('Morse code sent successfully!')
    } catch (error) {
      console.error('Error sending Morse code:', error)
      alert('Error: Make sure the backend server is running and Arduino is connected')
    } finally {
      setIsFlashing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">
          Morse Code LED Flash
        </h1>
        
        <div className="space-y-6">
          {/* Input Text Area */}
          <div className="bg-gray-800 rounded-lg p-6">
            <label className="block text-lg font-medium mb-3 text-gray-300">
              Enter your message:
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message here..."
              className="w-full h-32 p-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Morse Code Display */}
          <div className="bg-gray-800 rounded-lg p-6">
            <label className="block text-lg font-medium mb-3 text-gray-300">
              Morse Code Translation:
            </label>
            <div className="min-h-32 p-4 bg-gray-700 border border-gray-600 rounded-lg">
              <div className="text-xl font-mono text-green-400 break-all">
                {morseCode || 'Your Morse code will appear here...'}
              </div>
            </div>
          </div>

          {/* Flash Button */}
          <div className="text-center">
            <button
              onClick={flashMorseCode}
              disabled={!morseCode.trim() || isFlashing}
              className={`px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 ${
                !morseCode.trim() || isFlashing
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              }`}
            >
              {isFlashing ? 'Flashing...' : 'Flash Morse Code'}
            </button>
          </div>

          {/* Instructions */}
          <div className="bg-gray-800 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-3 text-blue-400">Instructions:</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Make sure your Arduino Mega 2560 is connected and running the Morse code sketch</li>
              <li>Start the Python backend server (it should be running on localhost:5000)</li>
              <li>Type your message in the text area above</li>
              <li>Watch the live Morse code translation</li>
              <li>Click "Flash Morse Code" to send it to your Arduino LED</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App