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

## Morphological Operations

---

### What are Morphological Operations?

**Morphological operations:** Processing based on shapes

**Work on:** Binary images (black/white) or grayscale

**Structuring element (kernel):** Defines neighborhood shape
- Rectangle, ellipse, cross, custom

**Applications:**
- Noise removal
- Shape analysis
- Object extraction
- Skeletonization

---

### Basic Operations

**Erosion:** Shrinks bright regions
- Sets pixel to minimum in neighborhood
- Removes small white noise
- Disconnects objects

**Dilation:** Expands bright regions
- Sets pixel to maximum in neighborhood
- Fills small holes
- Connects nearby objects

**Formula:**
- Erosion: `min(neighborhood)`
- Dilation: `max(neighborhood)`

---

### Erosion

```python
import cv2
import numpy as np
# binary image
_, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
# create structuring element
#ans: kernel = np.ones((5, 5), np.uint8)
#ans: can also use cv2.getStructuringElement()
# erosion
#ans: eroded = cv2.erode(binary, kernel, iterations=1)
#ans: iterations: number of times to apply
# effect: shrinks white regions, removes small noise
#ans: larger kernel or more iterations = more erosion
```

---

### Dilation

```python
# dilation
#ans: dilated = cv2.dilate(binary, kernel, iterations=1)
# effect: expands white regions, fills small holes
#ans: larger kernel or more iterations = more dilation
# multiple iterations
dilated = cv2.dilate(binary, kernel, iterations=3)
#ans: equivalent to applying 3 times
```

---

### Opening

**Opening:** Erosion followed by dilation

**Effect:**
- Removes small white noise
- Preserves shape of large objects
- Breaks thin connections

**Use case:** Noise removal without shrinking objects

---

### Opening in OpenCV

```python
kernel = np.ones((5, 5), np.uint8)
# opening = erosion + dilation
#ans: opening = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)
# equivalent to:
#ans: eroded = cv2.erode(binary, kernel)
#ans: opening = cv2.dilate(eroded, kernel)
# removes small white noise, preserves large shapes
```

---

### Closing

**Closing:** Dilation followed by erosion

**Effect:**
- Fills small holes
- Connects nearby objects
- Closes gaps

**Use case:** Fill holes in objects, connect broken parts

---

### Closing in OpenCV

```python
# closing = dilation + erosion
#ans: closing = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)
# equivalent to:
#ans: dilated = cv2.dilate(binary, kernel)
#ans: closing = cv2.erode(dilated, kernel)
# fills small black holes in white regions
```

---

### Morphological Gradient

**Gradient:** Difference between dilation and erosion

**Effect:** Outlines edges of objects

**Formula:** `dilation(img) - erosion(img)`

```python
# morphological gradient
#ans: gradient = cv2.morphologyEx(binary, cv2.MORPH_GRADIENT, kernel)
# equivalent to:
#ans: dilated = cv2.dilate(binary, kernel)
#ans: eroded = cv2.erode(binary, kernel)
#ans: gradient = dilated - eroded
# highlights object boundaries
```

---

### Top Hat

**Top hat:** Difference between image and opening

**Effect:** Extracts small bright features

**Formula:** `img - opening(img)`

```python
# top hat
#ans: tophat = cv2.morphologyEx(gray, cv2.MORPH_TOPHAT, kernel)
# extracts bright regions smaller than kernel
#ans: useful for extracting bright objects on dark background
```

---

### Black Hat

**Black hat:** Difference between closing and image

**Effect:** Extracts small dark features

**Formula:** `closing(img) - img`

```python
# black hat
#ans: blackhat = cv2.morphologyEx(gray, cv2.MORPH_BLACKHAT, kernel)
# extracts dark regions smaller than kernel
#ans: useful for extracting dark objects on bright background
```

---

### Structuring Elements

```python
# rectangular kernel
#ans: rect = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
# elliptical kernel
#ans: ellipse = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
# cross-shaped kernel
#ans: cross = cv2.getStructuringElement(cv2.MORPH_CROSS, (5, 5))
# custom kernel
custom = np.array([[0, 1, 0],
                   [1, 1, 1],
                   [0, 1, 0]], np.uint8)
#ans: cross-shaped, equivalent to MORPH_CROSS
```

---

### Exercises - Part 1 (Concepts)

```python
# what is erosion?
#ans: shrinks bright regions, sets pixel to neighborhood minimum
# what is dilation?
#ans: expands bright regions, sets pixel to neighborhood maximum
# what is opening?
#ans: erosion then dilation, removes noise
# what is closing?
#ans: dilation then erosion, fills holes
# what is morphological gradient?
#ans: dilation minus erosion, outlines edges
```

---

### Exercises - Part 2 (Concepts)

```python
# when to use opening?
#ans: remove small white noise, preserve object shape
# when to use closing?
#ans: fill small holes, connect broken parts
# what is top hat?
#ans: img - opening, extracts small bright features
# what is black hat?
#ans: closing - img, extracts small dark features
# effect of larger kernel?
#ans: more aggressive operation, affects larger structures
```

---

### Exercises - Part 3 (Coding)

```python
# erosion with 3x3 kernel
kernel = np.ones((3, 3), np.uint8)
#ans: eroded = cv2.erode(binary, kernel, iterations=1)
# dilation with 5x5 kernel
kernel = np.ones((5, 5), np.uint8)
#ans: dilated = cv2.dilate(binary, kernel, iterations=1)
# opening
kernel = np.ones((5, 5), np.uint8)
#ans: opening = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)
```

---

### Exercises - Part 4 (Coding)

```python
# closing
kernel = np.ones((5, 5), np.uint8)
#ans: closing = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)
# morphological gradient
#ans: gradient = cv2.morphologyEx(binary, cv2.MORPH_GRADIENT, kernel)
# elliptical kernel
#ans: ellipse = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
#ans: result = cv2.morphologyEx(binary, cv2.MORPH_OPEN, ellipse)
```

---

### Exercises - Part 5 (Mixed)

```python
# top hat with 9x9 kernel
kernel = np.ones((9, 9), np.uint8)
#ans: tophat = cv2.morphologyEx(gray, cv2.MORPH_TOPHAT, kernel)
# black hat
#ans: blackhat = cv2.morphologyEx(gray, cv2.MORPH_BLACKHAT, kernel)
# multiple erosions
kernel = np.ones((3, 3), np.uint8)
#ans: eroded = cv2.erode(binary, kernel, iterations=3)
# cross-shaped structuring element
#ans: cross = cv2.getStructuringElement(cv2.MORPH_CROSS, (5, 5))
#ans: result = cv2.morphologyEx(binary, cv2.MORPH_OPEN, cross)
```
