import os
from dotenv import load_dotenv
from openai import OpenAI
import pytesseract
from PIL import Image
import speech_recognition as sr

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def extract_text_from_image(image_path):
    image = Image.open(image_path)
    text = pytesseract.image_to_string(image)
    return text

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

def listen_to_voice():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening... Speak now!")
        # Adjust for ambient noise
        recognizer.adjust_for_ambient_noise(source, duration=1)
        audio = recognizer.listen(source)

    try:
        print("Processing speech...")
        query = recognizer.recognize_google(audio)
        print(f"You said: {query}")
        return query
    except sr.UnknownValueError:
        print("Sorry, I could not understand the audio.")
        return ""
    except sr.RequestError as e:
        print(f"Could not request results; {e}")
        return ""

def main():
    # Extract text from image
    text = extract_text_from_image("sample.png")
    print("Extracted Text:\n", text)

    # Get voice input for the next step
    print("\nPlease speak your question or request...")
    query = listen_to_voice()

    if query:
        # Combine extracted text and voice query
        prompt = f"I am working on the following content:\n{text}\nUser asked: {query}\nWhat should I do next?"
        suggestions = get_ai_suggestions(prompt)
        print("\nAI Suggestions:\n", suggestions)
    else:
        print("No voice input received. Please try again.")

if __name__ == "__main__":
    main()
