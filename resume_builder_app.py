import streamlit as st
from dotenv import load_dotenv
import os
from openai import OpenAI
from gtts import gTTS
import pytesseract
from PIL import Image

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Resume Builder Prompt
RESUME_PROMPT = """
You are a professional Resume Builder assistant.
Your job is to help create and improve resumes by analyzing the provided content and suggesting:
1. Formatting improvements.
2. Missing sections such as skills, experience, or education.
3. Better phrasing and stronger action verbs.
4. Industry-specific keywords to enhance visibility.
5. Suggestions for professional summaries and cover letters.
"""

# Extract text from an uploaded image
def extract_text(image):
    try:
        text = pytesseract.image_to_string(image)
        return text.strip()
    except Exception as e:
        st.error(f"Error extracting text: {e}")
        return ""

# Get AI suggestions
def get_ai_suggestions(prompt):
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": RESUME_PROMPT},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=500
        )
        return response.choices[0].message.content
    except Exception as e:
        st.error(f"Error getting AI suggestions: {e}")
        return ""

# Text-to-Speech Output
def speak_text(text):
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
    st.title("AI Resume Builder")
    st.write("Upload your resume as an image and get suggestions to improve it.")

    # Upload image file
    uploaded_file = st.file_uploader("Upload Resume Image", type=["png", "jpg", "jpeg"])

    if uploaded_file is not None:
        try:
            # Display uploaded image
            image = Image.open(uploaded_file)
            st.image(image, caption="Uploaded Resume", use_column_width=True)

            # Extract text
            extracted_text = extract_text(image)
            st.write("**Extracted Text:**")
            st.text_area("Resume Content", extracted_text, height=200)

            # Analyze and suggest improvements
            if st.button("Analyze Resume"):
                with st.spinner("Analyzing... Please wait."):
                    prompt = f"I am working on this resume content:\n{extracted_text}\nWhat improvements can I make?"
                    suggestions = get_ai_suggestions(prompt)

                    # Display suggestions
                    st.write("**AI Suggestions:**")
                    st.text_area("Suggestions", suggestions, height=200)

                    # Speak suggestions
                    speak_text(suggestions)
                    st.success("Analysis complete! Audio response has been played.")

        except Exception as e:
            st.error(f"An error occurred: {e}")

if __name__ == "__main__":
    main()

