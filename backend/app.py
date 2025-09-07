from flask import Flask, request, jsonify
from flask_cors import CORS
import serial
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration - Change this to match your Arduino's serial port
# Windows: 'COM3', 'COM4', etc.
# macOS: '/dev/tty.usbmodem*' or '/dev/tty.usbserial*'
# Linux: '/dev/ttyUSB0', '/dev/ttyACM0', etc.
SERIAL_PORT = 'COM3'  # UPDATE THIS TO YOUR ARDUINO'S PORT (e.g., COM4, COM5, etc.)
BAUD_RATE = 9600

@app.route('/send_morse', methods=['POST'])
def send_morse():
    """
    Endpoint to receive Morse code and send it to Arduino via serial
    """
    try:
        # Get the Morse code from the request
        data = request.get_json()
        morse_code = data.get('morse_code', '')
        
        if not morse_code:
            return jsonify({'error': 'No Morse code provided'}), 400
        
        print(f"Received Morse code: {morse_code}")
        
        # Open serial connection to Arduino
        try:
            ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
            time.sleep(2)  # Wait for Arduino to initialize
            
            # Send each character of the Morse code
            for char in morse_code:
                if char == '.':
                    ser.write(b'.')  # Send dot
                elif char == '-':
                    ser.write(b'-')  # Send dash
                elif char == ' ':
                    ser.write(b'|')  # Send letter pause
                elif char == '/':
                    ser.write(b'/')  # Send word pause
                
                # Small delay between characters
                time.sleep(0.1)
            
            # Close the serial connection
            ser.close()
            
            return jsonify({
                'success': True, 
                'message': f'Morse code sent successfully: {morse_code}'
            })
            
        except serial.SerialException as e:
            return jsonify({
                'error': f'Serial communication error: {str(e)}. Check if Arduino is connected to {SERIAL_PORT}'
            }), 500
            
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """
    Simple health check endpoint
    """
    return jsonify({'status': 'Backend server is running'})

if __name__ == '__main__':
    print(f"Starting Flask server...")
    print(f"Arduino serial port configured as: {SERIAL_PORT}")
    print(f"Make sure to update SERIAL_PORT in app.py if needed")
    print(f"Server will be available at: http://localhost:5000")
    
    app.run(debug=True, host='0.0.0.0', port=5000)