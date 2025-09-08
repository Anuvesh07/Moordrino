# 🔦 Moordrino  

✨ **Moordrino** is a fun little project that takes plain text, converts it into **Morse Code**, and flashes it through the LED on an **Arduino Mega 2560**.  
Type → Translate → Flash → Done. Simple as that.  

---

## ╰┈➤🚪 What’s Inside  

- 🎨 **Frontend**: React + Vite + Tailwind CSS  
- ⚙️ **Backend**: Python Flask + pyserial  
- 🔌 **Hardware**: Arduino Mega 2560 (LED on Pin 13)  

---

## 🎮 How to Use  

1. Connect your Arduino Mega 2560 to your computer  
2. Run the backend + frontend servers  
3. Open the app in your browser  
4. Type a message → see the **live Morse translation**  
5. Hit **"Flash Morse Code"** → LED blinks your message in Morse!  

---

## ⏱️ Morse Code Timing  

- Dot (`.`) → 200ms  
- Dash (`-`) → 600ms  
- Gap (dot/dash) → 200ms  
- Gap (letters) → 600ms  
- Gap (words) → 1400ms  

---

## 🔍 Quick Test  

- **Arduino** → open Serial Monitor, send `.`, `-`, `|`, `/` → LED should blink  
- **Backend** → visit [http://localhost:5000/health](http://localhost:5000/health) → should say server is running  
- **Frontend** → check browser DevTools → see requests hitting backend  

---

## 💭 Thoughts  

Honestly, this project started from a place of frustration.  
I kinda messed up by volunteering for a professor’s project. At first, I was hyped — had that early enthusiasm — but then it went downhill. My team wasn’t motivated, they just threw stuff at AI to do their part, and then told me to build the CAD design for the structure. Basically, I was doing the grunt work while they’d end up with the recognition. At some point, I just said *f off*.  

But since I couldn’t just walk away completely, I decided to mess around on my own. That’s when I started experimenting with the Arduino LED, playing with Morse code, and well… that’s how **Moordrino** was born.  

Now it’s more like my own side quest — messing with LEDs, Morse code, and whatever else comes to mind. I’m also thinking about trying out stuff with Raspberry Pi, maybe hosting n8n flows on a better board, and slowly saving up to push this further.  

So yeah — what started as me being pissed off kinda turned into something fun and experimental. Not perfect, not polished, but mine. 🚀 







## Updates 

if possible gona add golang insted for faster results

