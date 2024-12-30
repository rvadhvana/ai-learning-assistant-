import pytesseract
from PIL import Image

def extract_text_from_image(image_path):
    """
    Extract text from an image using Tesseract OCR
    
    Args:
        image_path (str): Path to the image file
        
    Returns:
        str: Extracted text from the image
    """
    image = Image.open(image_path)
    text = pytesseract.image_to_string(image)
    return text.strip()

