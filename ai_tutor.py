import os
from dotenv import load_dotenv
from openai import OpenAI
import pytesseract
from PIL import Image
import speech_recognition as sr
import mss
import time

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Extract text from an image
def extract_text_from_image(image_path):
    image = Image.open(image_path)
    text = pytesseract.image_to_string(image)
    return text.strip()

# Get AI suggestions
def get_ai_suggestions(prompt):
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=200
    )
    return response.choices[0].message.content

# Capture screen and save it
def capture_screen():
    with mss.mss() as sct:
        screenshot = sct.shot(output="screenshot.png")
    return "screenshot.png"

# Get voice input
def listen_to_voice():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening... Speak now!")
        audio = recognizer.listen(source)

    try:
        query = recognizer.recognize_google(audio)
        print(f"You said: {query}")
        return query
    except sr.UnknownValueError:
        print("Sorry, I could not understand the audio.")
        return ""
    except sr.RequestError:
        print("Could not request results, please check your internet connection.")
        return ""

def main():
    last_text = ""  # Store the last extracted text to detect changes

    while True:
        # Capture screen
        image_path = capture_screen()
        text = extract_text_from_image(image_path)

        # Process only if text has changed
        if text and text != last_text:
            print("Extracted Text:\n", text)

            # Get voice input
            query = listen_to_voice()

            # Create AI prompt
            prompt = f"I am working on the following content:\n{text}\nUser asked: {query}\nWhat should I do next?"
            suggestions = get_ai_suggestions(prompt)
            print("\nAI Suggestions:\n", suggestions)

            # Update last_text
            last_text = text

        # Wait before taking the next screenshot
        time.sleep(5)  # Adjust interval based on preference

if __name__ == "__main__":
    main()
