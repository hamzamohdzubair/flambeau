---
theme: blank2
paginate: true
transition: slide
class: lead
footer: '[<iconify-icon icon="hugeicons:home-11" title="Home"></iconify-icon>](/index.html) [<iconify-icon icon="si:left-up-line" title="Back"></iconify-icon>](../index.html) [<iconify-icon icon="octicon:move-to-start-24" title="Start"></iconify-icon>](#1)'
---
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<!-- Font imports for all three font options -->
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet">
<link href="/styles/zoom.css" rel="stylesheet">

<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
<script src="/scripts/zoom.js"></script>
<script src="/scripts/navigation.js"></script>
<script src="/scripts/backbutton.js"></script>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-NLV7GHEJDK"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NLV7GHEJDK');
</script>

<!-- _class: lead invert -->

## Image Transforms

---

### Types of Transforms

**Geometric transforms** change pixel positions without changing content:

**Common transforms:**
- **Translation:** Shift image position
- **Rotation:** Rotate around a point
- **Scaling:** Resize image
- **Flipping:** Mirror horizontally/vertically
- **Affine:** Combination of above (preserves parallelism)
- **Perspective:** 3D-like transformation

---

### Translation

**Translation:** Shift image by (tx, ty) pixels

**Transformation matrix:**
```
M = [1  0  tx]
    [0  1  ty]
```

**Formula:** `new_x = x + tx`, `new_y = y + ty`

**Use case:** Positioning, augmentation, registration

---

### Translation in OpenCV

```python
import cv2
import numpy as np
# translation matrix (shift right 100, down 50)
#ans: M = np.float32([[1, 0, 100],
#ans:                 [0, 1, 50]])
# apply translation
height, width = img.shape[:2]
#ans: translated = cv2.warpAffine(img, M, (width, height))
# shift left (negative tx)
M = np.float32([[1, 0, -50],
                [0, 1,  0]])
#ans: shifts 50 pixels left
```

---

### Rotation

**Rotation:** Rotate image around center by angle θ

**Transformation matrix:**
```
M = [cos(θ)  -sin(θ)  cx(1-cos(θ))+cy·sin(θ)]
    [sin(θ)   cos(θ)  cy(1-cos(θ))-cx·sin(θ)]
```

**OpenCV function:** `cv2.getRotationMatrix2D(center, angle, scale)`

---

### Rotation in OpenCV

```python
# get image center
height, width = img.shape[:2]
center = (width // 2, height // 2)
# rotation matrix (45 degrees, no scaling)
#ans: M = cv2.getRotationMatrix2D(center, 45, 1.0)
#ans: angle=45°, scale=1.0 (no resize)
# apply rotation
#ans: rotated = cv2.warpAffine(img, M, (width, height))
# rotate 90 degrees
M = cv2.getRotationMatrix2D(center, 90, 1.0)
rotated = cv2.warpAffine(img, M, (width, height))
#ans: 90° clockwise rotation
```

---

### Scaling (Resizing)

**Scaling:** Change image size

**Methods:**
- **Nearest neighbor:** Fast, blocky
- **Bilinear:** Smooth, fast
- **Bicubic:** Smoother, slower
- **Lanczos:** Best quality, slowest

**OpenCV flags:** `INTER_NEAREST`, `INTER_LINEAR`, `INTER_CUBIC`, `INTER_LANCZOS4`

---

### Resizing in OpenCV

```python
# resize to specific dimensions
#ans: resized = cv2.resize(img, (640, 480))
#ans: width=640, height=480 (exact size)
# resize by scale factor
#ans: scaled = cv2.resize(img, None, fx=0.5, fy=0.5)
#ans: fx=fy=0.5 means 50% of original size
# resize with interpolation
#ans: resized = cv2.resize(img, (320, 240), interpolation=cv2.INTER_CUBIC)
#ans: INTER_CUBIC for smooth downscaling
# upscale 2x
scaled = cv2.resize(img, None, fx=2, fy=2, interpolation=cv2.INTER_LINEAR)
#ans: doubles size with bilinear interpolation
```

---

### Flipping

**Flipping:** Mirror image across axis

**Types:**
- **Horizontal flip:** `flipCode = 1` (left ↔ right)
- **Vertical flip:** `flipCode = 0` (top ↔ bottom)
- **Both:** `flipCode = -1` (180° rotation)

**Use case:** Data augmentation, mirror effects

---

### Flipping in OpenCV

```python
# horizontal flip (left-right)
#ans: flipped_h = cv2.flip(img, 1)
#ans: flipCode=1 for horizontal
# vertical flip (up-down)
#ans: flipped_v = cv2.flip(img, 0)
#ans: flipCode=0 for vertical
# both axes (180° rotation)
#ans: flipped_both = cv2.flip(img, -1)
#ans: flipCode=-1 for both axes
```

---

### Transpose

**Transpose:** Swap rows and columns (reflect across diagonal)

**Effect:** Width becomes height, height becomes width

**Difference from rotation:** 90° rotation + flip

---

### Transpose in OpenCV

```python
# transpose (swap width and height)
#ans: transposed = cv2.transpose(img)
height, width = img.shape[:2]
#ans: new shape = (width, height, channels)
# transpose vs rotate 90°
transposed = cv2.transpose(img)
rotated = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
#ans: different results! transpose reflects across diagonal
# convenient rotation functions
#ans: rot_90 = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
#ans: rot_180 = cv2.rotate(img, cv2.ROTATE_180)
#ans: rot_270 = cv2.rotate(img, cv2.ROTATE_90_COUNTERCLOCKWISE)
```

---

### Cropping

**Cropping:** Extract region of interest (ROI)

**NumPy slicing:** `img[y1:y2, x1:x2]`

**Note:** No special OpenCV function needed!

---

### Cropping in OpenCV

```python
# crop region [y1:y2, x1:x2]
#ans: cropped = img[100:300, 50:250]
#ans: rows 100-300, columns 50-250
# crop center region
height, width = img.shape[:2]
x = width // 4
y = height // 4
w = width // 2
h = height // 2
#ans: cropped = img[y:y+h, x:x+w]
#ans: center half of image
```

---

### Exercises - Part 1 (Concepts)

```python
# what does translation do?
#ans: shifts image position by (tx, ty)
# what is rotation center?
#ans: point around which image rotates
# what interpolation for downscaling?
#ans: INTER_AREA or INTER_CUBIC (best quality)
# what is flipCode=1?
#ans: horizontal flip (left ↔ right)
# difference between transpose and rotate?
#ans: transpose reflects across diagonal
```

---

### Exercises - Part 2 (Concepts)

```python
# what happens to size during rotation?
#ans: content may be clipped at edges
# what is fx and fy in resize?
#ans: scale factors for x and y directions
# fastest interpolation method?
#ans: INTER_NEAREST (nearest neighbor)
# best quality interpolation?
#ans: INTER_LANCZOS4 (slowest but best)
# what is warpAffine used for?
#ans: apply affine transformations (translation, rotation, etc.)
```

---

### Exercises - Part 3 (Coding)

```python
# translate right 50, down 30
#ans: M = np.float32([[1, 0, 50],
#ans:                 [0, 1, 30]])
#ans: h, w = img.shape[:2]
#ans: translated = cv2.warpAffine(img, M, (w, h))
# rotate 30 degrees around center
h, w = img.shape[:2]
center = (w // 2, h // 2)
#ans: M = cv2.getRotationMatrix2D(center, 30, 1.0)
#ans: rotated = cv2.warpAffine(img, M, (w, h))
```

---

### Exercises - Part 4 (Coding)

```python
# resize to 800x600
#ans: resized = cv2.resize(img, (800, 600))
# scale down to 25%
#ans: scaled = cv2.resize(img, None, fx=0.25, fy=0.25)
# flip horizontally
#ans: flipped = cv2.flip(img, 1)
# flip vertically
#ans: flipped = cv2.flip(img, 0)
```

---

### Exercises - Part 5 (Coding)

```python
# rotate 90 degrees clockwise
#ans: rotated = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)
# rotate 180 degrees
#ans: rotated = cv2.rotate(img, cv2.ROTATE_180)
# transpose image
#ans: transposed = cv2.transpose(img)
# crop top-left 100x100 region
#ans: cropped = img[0:100, 0:100]
```

---

### Exercises - Part 6 (Mixed)

```python
# upscale 3x with cubic interpolation
#ans: scaled = cv2.resize(img, None, fx=3, fy=3, interpolation=cv2.INTER_CUBIC)
# rotate with scale
h, w = img.shape[:2]
M = cv2.getRotationMatrix2D((w//2, h//2), 45, 0.8)
#ans: 45° rotation + 80% scale
#ans: rotated = cv2.warpAffine(img, M, (w, h))
# combine flip and rotate
flipped = cv2.flip(img, 1)
#ans: rotated = cv2.rotate(flipped, cv2.ROTATE_90_CLOCKWISE)
```

---

### Exercises - Part 7 (Mixed)

```python
# resize maintaining aspect ratio
h, w = img.shape[:2]
new_w = 640
new_h = int(h * (new_w / w))
#ans: resized = cv2.resize(img, (new_w, new_h))
# crop center square
h, w = img.shape[:2]
size = min(h, w)
start_y = (h - size) // 2
start_x = (w - size) // 2
#ans: cropped = img[start_y:start_y+size, start_x:start_x+size]
```

---

### Exercises - Part 8 (Advanced)

```python
# translate with border handling
M = np.float32([[1, 0, 100],
                [0, 1, 50]])
h, w = img.shape[:2]
#ans: translated = cv2.warpAffine(img, M, (w, h), borderMode=cv2.BORDER_CONSTANT, borderValue=(0,0,0))
# rotate and expand canvas
angle = 45
h, w = img.shape[:2]
center = (w//2, h//2)
M = cv2.getRotationMatrix2D(center, angle, 1.0)
cos = np.abs(M[0, 0])
sin = np.abs(M[0, 1])
new_w = int(h * sin + w * cos)
new_h = int(h * cos + w * sin)
M[0, 2] += (new_w - w) / 2
M[1, 2] += (new_h - h) / 2
#ans: rotated = cv2.warpAffine(img, M, (new_w, new_h))
#ans: expands canvas to fit rotated image
```
