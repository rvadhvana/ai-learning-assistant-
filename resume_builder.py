from dotenv import load_dotenv
import os
from openai import OpenAI
from extract_text import extract_text_from_image
from screen_capture import capture_screen
import speech_recognition as sr
import time
from gtts import gTTS

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

# Get AI suggestions
def get_ai_suggestions(prompt):
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

# Text-to-Speech Output
def speak_text(text):
    tts = gTTS(text=text, lang="en")
    tts.save("response.mp3")
    os.system("afplay response.mp3")  # For macOS, use 'afplay'. Replace with 'mpg123' for Linux/Windows.

# Get voice input
def listen_to_voice():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening... Speak now!")
        # Adjust for ambient noise
        recognizer.adjust_for_ambient_noise(source, duration=1)
        audio = recognizer.listen(source)

    try:
        query = recognizer.recognize_google(audio)
        print(f"You said: {query}")
        return query
    except sr.UnknownValueError:
        print("Sorry, I could not understand the audio.")
        return "I couldn't understand that."
    except sr.RequestError as e:
        print(f"Could not request results; {e}")
        return "I couldn't understand that."

def main():
    last_text = ""

    while True:
        try:
            # Capture screen
            image_path = capture_screen()
            text = extract_text_from_image(image_path)

            # Process only if text has changed
            if text and text != last_text:
                print("Extracted Text:\n", text)

                # Get voice input
                query = listen_to_voice()

                # Create AI prompt
                prompt = f"I am working on this resume content:\n{text}\nUser asked: {query}\nWhat improvements can I make?"
                suggestions = get_ai_suggestions(prompt)
                print("\nAI Suggestions:\n", suggestions)

                # Speak the suggestions
                speak_text(suggestions)

                # Update last_text
                last_text = text

            # Wait before the next check
            time.sleep(5)

        except Exception as e:
            print(f"An error occurred: {e}")
            time.sleep(5)
            continue

if __name__ == "__main__":
    main()
    
