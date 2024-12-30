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

# Common functions (reuse your existing functions)
def capture_selected_screen(screen_index):
    # ... (your existing function)
    pass

def get_ai_response(text, question, system_prompt):
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
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
    # ... (your existing function)
    pass

def speak_response(text):
    # ... (your existing function)
    pass

# Mode-specific functions
def smart_exam_coach_mode():
    st.header("📚 Smart Exam Coach")
    st.write("Get real-time help with your study materials")
    
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

    if st.session_state.extracted_text and st.button("🎤 Ask Question"):
        question = listen_for_question()
        if question:
            st.info(f"Your question: {question}")
            system_prompt = "You are an intelligent exam assistant. Help explain concepts clearly and provide helpful study guidance."
            with st.spinner("Getting answer..."):
                response = get_ai_response(st.session_state.extracted_text, question, system_prompt)
                st.markdown(f"🤖 **Answer:**\n{response}")
                speak_response(response)

def resume_builder_mode():
    st.header("📝 Resume Builder")
    st.write("Get professional help with your resume")
    
    uploaded_file = st.file_uploader("Upload your resume (PNG, JPG, PDF)", type=['png', 'jpg', 'jpeg', 'pdf'])
    
    if uploaded_file:
        image = Image.open(uploaded_file)
        text = pytesseract.image_to_string(image)
        st.session_state.extracted_text = text
        st.image(image, caption="Uploaded Resume", use_container_width=True)
        st.text_area("Extracted Text", text, height=100)
        
        if st.button("🎤 Ask for Suggestions"):
            question = listen_for_question()
            if question:
                st.info(f"Your question: {question}")
                system_prompt = "You are a professional resume expert. Provide specific suggestions for improvement."
                with st.spinner("Analyzing resume..."):
                    response = get_ai_response(st.session_state.extracted_text, question, system_prompt)
                    st.markdown(f"🤖 **Suggestions:**\n{response}")
                    speak_response(response)

def ai_tutor_mode():
    st.header("🎓 AI Tutor")
    st.write("Your personal AI tutor for any subject")
    
    # Similar structure to exam coach but with different prompts
    # ... (implement similar to smart_exam_coach_mode but with tutor-specific prompts)

def main():
    st.set_page_config(page_title="AI Learning Assistant", page_icon="🤖", layout="wide")
    
    # Sidebar for navigation
    st.sidebar.title("Navigation")
    mode = st.sidebar.radio(
        "Select Mode:",
        ["Smart Exam Coach", "Resume Builder", "AI Tutor"]
    )
    
    # Main content
    st.title("🤖 AI Learning Assistant")
    
    # Mode selection
    if mode == "Smart Exam Coach":
        smart_exam_coach_mode()
    elif mode == "Resume Builder":
        resume_builder_mode()
    elif mode == "AI Tutor":
        ai_tutor_mode()
    
    # Footer
    st.sidebar.markdown("---")
    st.sidebar.markdown("Made with ❤️ by Your Name")

if __name__ == "__main__":
    main() 