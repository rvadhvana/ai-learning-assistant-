from dotenv import load_dotenv
import os
from openai import OpenAI
import pytesseract
from PIL import Image
import speech_recognition as sr
from gtts import gTTS
import time
import pyautogui
from screeninfo import get_monitors

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Mode Prompt
EXAM_PROMPT = """
You are an intelligent exam assistant. Analyze the given content and quickly:
1. Answer questions related to the content.
2. Provide explanations if needed.
3. Offer hints or summaries to assist with understanding.
"""

# Function to capture screenshot
def capture_screen():
    screens = get_monitors()
    print("Available Screens:")
    for i, screen in enumerate(screens):
        print(f"{i + 1}. {screen}")

    # Select a screen
    screen_index = int(input("Enter the screen number to capture: ")) - 1
    screen = screens[screen_index]

    # Capture screenshot
    screenshot = pyautogui.screenshot(region=(screen.x, screen.y, screen.width, screen.height))
    screenshot.save("screenshot.png")
    return "screenshot.png"

# Extract text from an image
def extract_text(image_path):
    try:
        image = Image.open(image_path)
        text = pytesseract.image_to_string(image)
        return text.strip()
    except Exception as e:
        print(f"Error extracting text: {e}")
        return ""

# Get AI suggestions
def get_ai_suggestions(prompt):
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": EXAM_PROMPT},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=300
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error getting AI suggestions: {e}")
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
        print(f"Error with text-to-speech: {e}")

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

# Main function
def main():
    try:
        # Capture screen
        image_path = capture_screen()

        # Extract text from the captured screenshot
        text = extract_text(image_path)
        print("Extracted Text:\n", text)

        # Continuous listening and feedback
        while True:
            # Listen to user's question
            query = listen_to_voice()

            # Generate AI response
            prompt = f"I am reading this content:\n{text}\nUser asked: {query}\nProvide an answer or explanation."
            suggestions = get_ai_suggestions(prompt)

            # Speak the response
            print("\nAI Suggestions:\n", suggestions)
            speak_text(suggestions)

            # Short delay before re-listening
            time.sleep(2)

    except KeyboardInterrupt:
        print("\nExiting program...")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
