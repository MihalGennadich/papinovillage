"""Generate labeled placeholder JPGs for the Papino Village site.

Each image is a flat Nordic-Warm-tinted rectangle with its path and a
human description centered on it, so the unstyled site still reads
correctly and the owner can drop a real photo over the same filename.
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent / "images"
BG = (245, 237, 224)      # #f5ede0 cream
FG = (122, 92, 58)        # #7a5c3a warm brown

# (relative path, width, height, caption)
SPECS: list[tuple[str, int, int, str]] = [
    ("hero/summer.jpg", 1920, 1080, "HERO - LETO (obyazatelno)"),
    ("hero/winter.jpg", 1920, 1080, "HERO - ZIMA (opcionalno)"),
    ("hero/spring.jpg", 1920, 1080, "HERO - VESNA (opcionalno)"),
    ("hero/autumn.jpg", 1920, 1080, "HERO - OSEN (opcionalno)"),
    *[(f"blue-house/{i}.jpg", 1200, 800, f"SINIY DOMIK - foto {i}") for i in (1, 2, 3)],
    *[(f"green-house/{i}.jpg", 1200, 800, f"ZELYONIY DOMIK - foto {i}") for i in (1, 2, 3)],
    *[(f"gallery/{i}.jpg", 1000, 1000, f"GALEREYA - foto {i}") for i in range(1, 13)],
    *[(f"sauna/{i}.jpg", 1200, 800, f"BANYA - foto {i}") for i in (1, 2)],
]


def _font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for name in ("arial.ttf", "DejaVuSans.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def make(path: str, w: int, h: int, caption: str) -> None:
    img = Image.new("RGB", (w, h), BG)
    draw = ImageDraw.Draw(img)
    draw.rectangle([8, 8, w - 8, h - 8], outline=FG, width=3)
    lines = [caption, f"/images/{path}", f"{w}x{h}px", "PLACEHOLDER - zamenit"]
    font = _font(max(20, w // 28))
    fsize = getattr(font, "size", 28)
    total = len(lines) * (fsize + 12)
    y = (h - total) // 2
    for line in lines:
        box = draw.textbbox((0, 0), line, font=font)
        draw.text(((w - (box[2] - box[0])) // 2, y), line, fill=FG, font=font)
        y += fsize + 12
    out = ROOT / path
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, "JPEG", quality=70)
    print(f"wrote {out}")


if __name__ == "__main__":
    for spec in SPECS:
        make(*spec)
