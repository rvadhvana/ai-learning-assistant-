import streamlit as st
from dotenv import load_dotenv
import os
from openai import OpenAI
import pytesseract
from PIL import Image
from gtts import gTTS
import speech_recognition as sr

# Load environment variables
load_dotenv()

# Initialize OpenAI client with Streamlit secrets
client = OpenAI(api_key=st.secrets["OPENAI_API_KEY"])

# Initialize session state
if 'extracted_text' not in st.session_state:
    st.session_state.extracted_text = ""

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

def speak_response(text):
    try:
        tts = gTTS(text=text, lang="en")
        tts.save("response.mp3")
        st.audio("response.mp3")
    except Exception as e:
        st.error(f"Error with text-to-speech: {e}")

def resume_builder_mode():
    st.header("📝 Resume Builder")
    st.write("Get professional help with your resume")
    
    uploaded_file = st.file_uploader("Upload your resume (PNG, JPG)", type=['png', 'jpg', 'jpeg'])
    
    if uploaded_file:
        image = Image.open(uploaded_file)
        text = pytesseract.image_to_string(image)
        st.session_state.extracted_text = text
        st.image(image, caption="Uploaded Resume", use_container_width=True)
        st.text_area("Extracted Text", text, height=100)
        
        question = st.text_input("Ask a question about your resume:")
        if st.button("Get Suggestions"):
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
    
    uploaded_file = st.file_uploader("Upload study material (PNG, JPG)", type=['png', 'jpg', 'jpeg'])
    
    if uploaded_file:
        image = Image.open(uploaded_file)
        text = pytesseract.image_to_string(image)
        st.session_state.extracted_text = text
        st.image(image, caption="Study Material", use_container_width=True)
        st.text_area("Extracted Text", text, height=100)
        
        question = st.text_input("Ask your question:")
        if st.button("Get Help"):
            if question:
                st.info(f"Your question: {question}")
                system_prompt = "You are a helpful tutor. Explain concepts clearly and provide examples."
                with st.spinner("Preparing response..."):
                    response = get_ai_response(st.session_state.extracted_text, question, system_prompt)
                    st.markdown(f"🤖 **Explanation:**\n{response}")
                    speak_response(response)

def main():
    st.set_page_config(page_title="AI Learning Assistant", page_icon="🤖", layout="wide")
    
    # Sidebar for navigation
    st.sidebar.title("Navigation")
    mode = st.sidebar.radio(
        "Select Mode:",
        ["Resume Builder", "AI Tutor"]
    )
    
    # Main content
    st.title("🤖 AI Learning Assistant")
    
    # Mode selection
    if mode == "Resume Builder":
        resume_builder_mode()
    elif mode == "AI Tutor":
        ai_tutor_mode()
    
    # Footer
    st.sidebar.markdown("---")
    st.sidebar.markdown("Made with ❤️ by Romik Vadhvana")

if __name__ == "__main__":
    main()
    
