#!/usr/bin/env python3

"""
Generate a stylized profile-with-dental-overlay illustration similar in spirit to the provided reference.
Output image size: 630x410 pixels.
"""

from __future__ import annotations

from math import hypot
from typing import Tuple

from PIL import Image, ImageDraw, ImageFilter


WIDTH, HEIGHT = 630, 410


def draw_radial_gradient(img: Image.Image, inner: Tuple[int, int, int], outer: Tuple[int, int, int]) -> None:
    """Fill the background with a smooth radial gradient."""
    cx, cy = int(WIDTH * 0.25), int(HEIGHT * 0.35)
    max_r = hypot(max(cx, WIDTH - cx), max(cy, HEIGHT - cy))
    px = img.load()
    for y in range(HEIGHT):
        for x in range(WIDTH):
            d = hypot(x - cx, y - cy) / max_r
            t = max(0.0, min(1.0, d))
            r = int(inner[0] * (1 - t) + outer[0] * t)
            g = int(inner[1] * (1 - t) + outer[1] * t)
            b = int(inner[2] * (1 - t) + outer[2] * t)
            px[x, y] = (r, g, b, 255)


def draw_profile(draw: ImageDraw.ImageDraw) -> None:
    """Draw a simple side-profile silhouette."""
    skin = (32, 28, 25, 255)
    # Head silhouette (stylized)
    draw.ellipse([60, 50, 330, 360], fill=skin)  # head
    # Trim back of head to flatten
    draw.rectangle([260, 50, 400, 360], fill=(0, 0, 0, 0))

    # Neck
    draw.polygon([(240, 250), (300, 280), (300, 410), (180, 410)], fill=skin)

    # Nose bridge and lips using overlays to cut shapes from face with darker shade
    shadow = (20, 18, 16, 255)
    draw.polygon([(220, 150), (260, 165), (250, 180), (235, 178)], fill=shadow)
    draw.polygon([(230, 210), (265, 220), (245, 232), (235, 228)], fill=shadow)

    # Eye brow and eye
    brow = (18, 16, 15, 200)
    draw.rounded_rectangle([160, 120, 220, 128], radius=4, fill=brow)
    draw.ellipse([178, 132, 198, 144], fill=(235, 235, 235, 255))
    draw.ellipse([186, 135, 194, 143], fill=(40, 70, 90, 255))


def draw_jaw_cutaway(base: Image.Image) -> None:
    """Overlay a translucent cutaway of the jaw and teeth region."""
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    glass = (210, 210, 220, 70)

    # Simple jaw window
    od.rounded_rectangle([210, 150, 600, 300], radius=28, fill=glass, outline=(230, 230, 240, 110), width=2)

    # Mandible line
    od.line([(230, 265), (590, 265)], fill=(230, 230, 240, 120), width=3)
    # Maxilla line
    od.line([(230, 185), (590, 185)], fill=(230, 230, 240, 120), width=3)

    base.alpha_composite(overlay)


def draw_teeth(base: Image.Image) -> None:
    """Draw two dental arches as rounded rectangles; highlight one lower molar."""
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)

    tooth_color = (245, 245, 250, 235)
    gum_shadow = (200, 200, 220, 90)

    # Upper and lower rows placement
    start_x, end_x = 250, 580
    upper_y, lower_y = 175, 255

    num_teeth = 12
    gap = (end_x - start_x) / (num_teeth + 2)
    tooth_w = gap * 0.75
    tooth_h_upper = 26
    tooth_h_lower = 30

    # Draw subtle gum shading
    d.rounded_rectangle([start_x - 10, upper_y - 8, end_x + 10, upper_y + tooth_h_upper + 8], radius=18, fill=gum_shadow)
    d.rounded_rectangle([start_x - 10, lower_y - 8, end_x + 10, lower_y + tooth_h_lower + 8], radius=18, fill=gum_shadow)

    teeth_positions_lower = []

    for i in range(num_teeth):
        x = start_x + (i + 1) * gap - tooth_w / 2
        # upper
        d.rounded_rectangle([x, upper_y, x + tooth_w, upper_y + tooth_h_upper], radius=6, fill=tooth_color)
        # lower
        rect = [x, lower_y, x + tooth_w, lower_y + tooth_h_lower]
        d.rounded_rectangle(rect, radius=7, fill=tooth_color)
        teeth_positions_lower.append(rect)

    # Highlight a posterior lower molar (e.g., the 9th tooth)
    highlight_idx = min(9, len(teeth_positions_lower) - 1)
    hx0, hy0, hx1, hy1 = teeth_positions_lower[highlight_idx]

    glow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    cx = (hx0 + hx1) / 2
    cy = (hy0 + hy1) / 2
    r = 36
    gd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 205, 60, 75))
    glow = glow.filter(ImageFilter.GaussianBlur(12))
    base.alpha_composite(glow)

    # Paint the highlighted tooth on top with warm tint
    d.rounded_rectangle([hx0, hy0, hx1, hy1], radius=7, fill=(255, 225, 100, 255))

    base.alpha_composite(overlay)


def add_vignette(base: Image.Image) -> None:
    vignette = Image.new("RGBA", base.size, (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette)
    # Outer dark frame
    vd.rectangle([0, 0, WIDTH, HEIGHT], fill=(0, 0, 0, 0))
    # Inner transparent ellipse to keep center brighter
    vd.ellipse([-150, -100, WIDTH + 150, HEIGHT + 100], fill=(0, 0, 0, 210))
    vignette = vignette.filter(ImageFilter.GaussianBlur(60))
    base.alpha_composite(vignette)


def main() -> None:
    img = Image.new("RGBA", (WIDTH, HEIGHT))
    draw_radial_gradient(img, inner=(12, 40, 60), outer=(6, 18, 28))

    d = ImageDraw.Draw(img)
    draw_profile(d)
    draw_jaw_cutaway(img)
    draw_teeth(img)
    add_vignette(img)

    # Slight overall soften
    out = img.filter(ImageFilter.GaussianBlur(0.4))
    out = out.convert("RGB")

    from pathlib import Path

    out_dir = Path("/workspace/output")
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / "dental_overlay_630x410.png"
    out.save(out_path, format="PNG", optimize=True)
    print(f"Saved: {out_path}")


if __name__ == "__main__":
    main()

