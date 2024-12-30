import streamlit as st
from dotenv import load_dotenv
import os
from openai import OpenAI
import pytesseract
from PIL import Image
from gtts import gTTS
import pyautogui
from screeninfo import get_monitors
import speech_recognition as sr

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Initialize session state
if 'extracted_text' not in st.session_state:
    st.session_state.extracted_text = ""

def capture_selected_screen(screen_index):
    try:
        screens = get_monitors()
        screen = screens[screen_index]
        
        # Capture screenshot
        screenshot = pyautogui.screenshot(region=(screen.x, screen.y, screen.width, screen.height))
        screenshot.save("screenshot.png")
        
        # Extract text
        image = Image.open("screenshot.png")
        text = pytesseract.image_to_string(image)
        return text.strip(), "screenshot.png"
    except Exception as e:
        st.error(f"Error capturing screen: {e}")
        return "", None

def get_ai_response(text, question):
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful tutor. Provide clear, concise answers."},
                {"role": "user", "content": f"Content: {text}\nQuestion: {question}\nProvide a clear explanation."}
            ],
            temperature=0.7,
            max_tokens=300
        )
        return response.choices[0].message.content
    except Exception as e:
        st.error(f"Error getting AI response: {e}")
        return ""

def listen_for_question():
    recognizer = sr.Recognizer()
    try:
        with sr.Microphone() as source:
            st.markdown("🎤 **Listening... Please ask your question.**")
            recognizer.adjust_for_ambient_noise(source, duration=1)
            audio = recognizer.listen(source)
            
        question = recognizer.recognize_google(audio)
        return question
    except Exception as e:
        st.error(f"Error with voice input: {e}")
        return None

def speak_response(text):
    try:
        tts = gTTS(text=text, lang="en")
        tts.save("response.mp3")
        if os.name == 'posix':  # macOS/Linux
            os.system("afplay response.mp3")
        else:  # Windows
            os.system("start response.mp3")
    except Exception as e:
        st.error(f"Error with text-to-speech: {e}")

def main():
    st.title("💡 Smart Study Assistant")
    
    # Screen Selection
    screens = get_monitors()
    screen_options = [f"Screen {i+1}: {s.width}x{s.height}" for i, s in enumerate(screens)]
    
    col1, col2 = st.columns([3, 1])
    
    with col1:
        selected_screen = st.selectbox("Select Screen:", range(len(screen_options)), 
                                     format_func=lambda x: screen_options[x])
    
    with col2:
        if st.button("📷 Capture Screen"):
            text, image_path = capture_selected_screen(selected_screen)
            if image_path:
                st.session_state.extracted_text = text
                st.image(image_path, caption="Captured Screen", use_container_width=True)
                st.text_area("Extracted Text", text, height=100)

    # Voice Input and Response
    if st.session_state.extracted_text and st.button("🎤 Ask Question"):
        question = listen_for_question()
        if question:
            st.info(f"Your question: {question}")
            
            with st.spinner("Getting answer..."):
                response = get_ai_response(st.session_state.extracted_text, question)
                st.markdown(f"🤖 **Answer:**\n{response}")
                speak_response(response)

if __name__ == "__main__":
    main()
