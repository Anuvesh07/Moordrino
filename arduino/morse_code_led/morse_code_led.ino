/*
 * Morse Code LED Flash
 * 
 * This Arduino sketch receives Morse code commands via serial communication
 * and flashes the built-in LED (pin 13) accordingly.
 * 
 * Commands:
 * '.' = Dot (short flash)
 * '-' = Dash (long flash)
 * '|' = Letter pause
 * '/' = Word pause
 * 
 * Hardware: Arduino Mega 2560 with built-in LED on pin 13
 */

// Pin definitions
const int LED_PIN = 13;  // Built-in LED on Arduino Mega 2560

// Morse code timing constants (in milliseconds)
const int DOT_DURATION = 200;           // Duration of a dot
const int DASH_DURATION = DOT_DURATION * 3;  // Duration of a dash (3x dot)
const int PAUSE_DURATION = DOT_DURATION;     // Pause between dots and dashes
const int LETTER_PAUSE = DOT_DURATION * 3;   // Pause between letters
const int WORD_PAUSE = DOT_DURATION * 7;     // Pause between words

void setup() {
  // Initialize the LED pin as an output
  pinMode(LED_PIN, OUTPUT);
  
  // Initialize serial communication at 9600 baud
  Serial.begin(9600);
  
  // Turn off LED initially
  digitalWrite(LED_PIN, LOW);
  
  // Signal that Arduino is ready
  Serial.println("Arduino Morse Code LED ready!");
  
  // Flash LED 3 times to indicate startup
  for (int i = 0; i < 3; i++) {
    digitalWrite(LED_PIN, HIGH);
    delay(100);
    digitalWrite(LED_PIN, LOW);
    delay(100);
  }
}

void loop() {
  // Check if data is available on the serial port
  if (Serial.available() > 0) {
    // Read the incoming character
    char command = Serial.read();
    
    // Process the command using a switch statement
    switch (command) {
      case '.':
        // Flash dot
        flashDot();
        break;
        
      case '-':
        // Flash dash
        flashDash();
        break;
        
      case '|':
        // Letter pause (no LED activity, just wait)
        delay(LETTER_PAUSE);
        break;
        
      case '/':
        // Word pause (no LED activity, just wait)
        delay(WORD_PAUSE);
        break;
        
      default:
        // Unknown command - do nothing
        break;
    }
  }
}

/**
 * Flash the LED for a dot duration
 */
void flashDot() {
  digitalWrite(LED_PIN, HIGH);
  delay(DOT_DURATION);
  digitalWrite(LED_PIN, LOW);
  delay(PAUSE_DURATION);
}

/**
 * Flash the LED for a dash duration
 */
void flashDash() {
  digitalWrite(LED_PIN, HIGH);
  delay(DASH_DURATION);
  digitalWrite(LED_PIN, LOW);
  delay(PAUSE_DURATION);
}