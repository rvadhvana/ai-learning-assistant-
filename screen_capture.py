import mss

def capture_screen():
    """
    Capture the screen and save it as a PNG file
    
    Returns:
        str: Path to the saved screenshot
    """
    with mss.mss() as sct:
        screenshot = sct.shot(output="screenshot.png")
    return "screenshot.png"

# Test the function
if __name__ == "__main__":
    capture_screen()
