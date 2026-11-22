#!/usr/bin/env python3
"""
Arma las imágenes del carrusel del Hero de passo-landing.

Toma un pantallazo web (laptop) y uno de la app (celular) y los mete dentro de
los marcos de dispositivo de frames/. Exporta, por slide:
  public/images/hero/slide-N-laptop.{webp,png}
  public/images/hero/slide-N-phone.{webp,png}

Uso:
  python3 compose.py --config shots.config.json            # todos los slides
  python3 compose.py --config shots.config.json --slide 2  # solo uno

Dependencias: pip3 install pillow numpy
"""
import argparse, json, os, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
FRAMES = os.path.join(HERE, "frames")

# Lienzo de la pantalla del celular (proporción iPhone 15 Pro, 3x)
PHONE_W, PHONE_H = 1179, 2556
STATUS_H = 162  # alto de la barra de estado iOS a 3x

FONT_CANDIDATES = [
    "/System/Library/Fonts/SFNS.ttf",
    "/System/Library/Fonts/SFNSText.ttf",
    "/Library/Fonts/Inter-SemiBold.otf",
    "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]


def load_font(size):
    for f in FONT_CANDIDATES:
        if os.path.exists(f):
            try:
                return ImageFont.truetype(f, size)
            except OSError:
                continue
    return ImageFont.load_default()


def perspective_coeffs(dst_quad, src_size):
    """Coeficientes para Image.transform(PERSPECTIVE): mapean cada punto del
    destino (quad del marco) al rectángulo de origen (pantallazo)."""
    w, h = src_size
    src = [(0, 0), (w, 0), (w, h), (0, h)]
    A, B = [], []
    for (x, y), (u, v) in zip(dst_quad, src):
        A.append([x, y, 1, 0, 0, 0, -u * x, -u * y]); B.append(u)
        A.append([0, 0, 0, x, y, 1, -v * x, -v * y]); B.append(v)
    return np.linalg.solve(np.array(A, float), np.array(B, float)).tolist()


def cover(img, w, h, align_top=True):
    """Escala y recorta la imagen para llenar w x h (como object-fit: cover)."""
    s = max(w / img.width, h / img.height)
    r = img.resize((round(img.width * s), round(img.height * s)), Image.LANCZOS)
    left = (r.width - w) // 2
    top = 0 if align_top else (r.height - h) // 2
    return r.crop((left, top, left + w, top + h))


def is_dark(rgb):
    r, g, b = rgb[:3]
    return (0.299 * r + 0.587 * g + 0.114 * b) < 140


def draw_ios_status_bar(canvas, color):
    d = ImageDraw.Draw(canvas)
    f = load_font(51)
    d.text((150, STATUS_H // 2 + 4), "9:41", font=f, fill=color, anchor="mm")
    y = STATUS_H // 2 + 4
    # señal: 4 barras
    x = 830
    for i, bh in enumerate([12, 18, 25, 32]):
        d.rounded_rectangle((x + i * 17, y + 16 - bh, x + i * 17 + 11, y + 16), 3, fill=color)
    # wifi: 3 arcos
    cx, cy = 937, y + 16
    for r in (40, 27):
        d.arc((cx - r, cy - r, cx + r, cy + r), 225, 315, fill=color, width=7)
    d.pieslice((cx - 13, cy - 13, cx + 13, cy + 13), 225, 315, fill=color)
    # batería
    bx = 985
    d.rounded_rectangle((bx, y - 17, bx + 75, y + 17), 9, outline=color, width=3)
    d.rounded_rectangle((bx + 5, y - 12, bx + 70, y + 12), 6, fill=color)
    d.rounded_rectangle((bx + 79, y - 6, bx + 84, y + 6), 2, fill=color)


def phone_screen(app_png, crop_top, crop_bottom):
    src = Image.open(app_png).convert("RGB")
    src = src.crop((0, crop_top, src.width, src.height - crop_bottom))
    body = cover(src, PHONE_W, PHONE_H - STATUS_H)
    canvas = Image.new("RGB", (PHONE_W, PHONE_H), body.getpixel((PHONE_W // 2, 2)))
    canvas.paste(body, (0, STATUS_H))
    color = (255, 255, 255) if is_dark(canvas.getpixel((60, 20))) else (0, 0, 0)
    draw_ios_status_bar(canvas, color)
    return canvas


def compose_phone(app_png, cfg, out_base, crop_top, crop_bottom):
    meta = cfg["phone"]
    frame = Image.open(os.path.join(FRAMES, meta["frame"])).convert("RGBA")
    mask = Image.open(os.path.join(FRAMES, meta["mask"])).convert("L")
    screen = phone_screen(app_png, crop_top, crop_bottom)
    coeffs = perspective_coeffs(meta["quad"], screen.size)
    warped = screen.transform(frame.size, Image.PERSPECTIVE, coeffs, Image.BICUBIC)
    out = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    out.paste(warped, (0, 0), mask)
    out.alpha_composite(frame)
    save(out, out_base)


def spotlight(img, w, h, width_ratio=0.86, top_ratio=0.1, pad_px=0):
    """Un elemento suelto (p. ej. una notificación) sobre el color de fondo de la
    app: ancho fijo, centrado y arriba, donde el celular del Hero no lo tapa."""
    # Color de fondo = el más frecuente en el borde del recorte (una esquina sola
    # puede caer sobre otro panel y dar un tono distinto)
    px = np.asarray(img)
    borde = np.concatenate([px[0], px[-1], px[:, 0], px[:, -1]])
    colores, cuentas = np.unique(borde.reshape(-1, 3), axis=0, return_counts=True)
    bg = tuple(int(v) for v in colores[cuentas.argmax()])
    # El margen alrededor del elemento puede traer bordes de la app (sidebar, paneles):
    # se pinta con el fondo para que el elemento quede limpio
    if pad_px:
        band = max(1, int(pad_px * 0.75))
        img = img.copy()
        d = ImageDraw.Draw(img)
        W, H = img.size
        for box in ((0, 0, W, band), (0, H - band, W, H), (0, 0, band, H), (W - band, 0, W, H)):
            d.rectangle(box, fill=bg)
    canvas = Image.new("RGB", (w, h), bg)
    s = min(w * width_ratio / img.width, h * (1 - 2 * top_ratio) / img.height)
    r = img.resize((round(img.width * s), round(img.height * s)), Image.LANCZOS)
    canvas.paste(r, ((w - r.width) // 2, round(h * top_ratio)))
    return canvas


def compose_laptop(web_png, cfg, out_base, element=None, dsf=2):
    meta = cfg["laptop"]
    frame = Image.open(os.path.join(FRAMES, meta["frame"])).convert("RGBA")
    mask = Image.open(os.path.join(FRAMES, meta["mask"])).convert("L")
    x0, y0, x1, y1 = meta["rect"]
    img = Image.open(web_png).convert("RGB")
    if element:
        shot = spotlight(img, x1 - x0, y1 - y0, element.get("widthRatio", 0.86), element.get("topRatio", 0.1),
                         element.get("padding", 24) * dsf)
    else:
        shot = cover(img, x1 - x0, y1 - y0)
    out = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    layer = Image.new("RGB", frame.size)
    layer.paste(shot, (x0, y0))
    out.paste(layer, (0, 0), mask)
    out.alpha_composite(frame)
    save(out, out_base)


def save(img, base):
    os.makedirs(os.path.dirname(base), exist_ok=True)
    img.save(base + ".png", optimize=True)
    img.save(base + ".webp", quality=86, method=6)
    print("  ->", base + ".{png,webp}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--config", default=os.path.join(HERE, "shots.config.json"))
    ap.add_argument("--slide", type=int)
    args = ap.parse_args()

    conf = json.load(open(args.config))
    frames = json.load(open(os.path.join(FRAMES, "frames.json")))
    root = os.path.normpath(os.path.join(HERE, conf.get("projectRoot", "../..")))
    raw = os.path.join(HERE, conf.get("rawDir", "raw"))
    out_dir = os.path.join(root, conf.get("outDir", "public/images/hero"))
    crop = conf.get("android", {})

    faltantes = []
    for i, s in enumerate(conf["slides"], 1):
        if args.slide and args.slide != i:
            continue
        print(f"Slide {i}: {s['id']}")
        web = os.path.join(raw, s["web"]["file"])
        app = os.path.join(raw, s["app"]["file"])
        # Cada dispositivo se arma por separado: falta uno, se avisa y se sigue con el resto
        if os.path.exists(web):
            compose_laptop(web, frames, os.path.join(out_dir, f"slide-{i}-laptop"), s["web"].get("element"),
                           conf.get("web", {}).get("deviceScaleFactor", 2))
        else:
            faltantes.append(os.path.relpath(web, HERE))
        if os.path.exists(app):
            top = s["app"].get("cropTop", crop.get("cropTop", 0))
            bottom = s["app"].get("cropBottom", crop.get("cropBottom", 0))
            compose_phone(app, frames, os.path.join(out_dir, f"slide-{i}-phone"), top, bottom)
        else:
            faltantes.append(os.path.relpath(app, HERE))

    if faltantes:
        print("\nFaltan estos pantallazos (se omitieron):")
        for f in faltantes:
            print("  -", f)
        print("Web: npm run shots:web · Celular: npm run shots:app · Landing de academia: exportar del mockup.")


if __name__ == "__main__":
    main()
