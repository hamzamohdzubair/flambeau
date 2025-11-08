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

## Perspective Transform

---

### Document Scanning

**Problem:** Photo of document from angle

**Solution:** Perspective transform to frontal view

**Steps:**
1. Detect document corners (4 points)
2. Define output rectangle
3. Compute homography
4. Warp to frontal view

**Result:** Rectangular, readable document

---

### Finding Document Corners

```python
import cv2
import numpy as np
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# threshold to binary
_, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
# find contours
#ans: contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
# find largest contour
#ans: largest = max(contours, key=cv2.contourArea)
# approximate to polygon
epsilon = 0.02 * cv2.arcLength(largest, True)
#ans: approx = cv2.approxPolyDP(largest, epsilon, True)
#ans: if len(approx) == 4, it's a rectangle (document)
```

---

### Ordering Corner Points

```python
# corners may be in any order, need to order: TL, TR, BR, BL
def order_points(pts):
    rect = np.zeros((4, 2), dtype='float32')
    # sum: TL has smallest, BR has largest
    s = pts.sum(axis=1)
    rect[0] = pts[np.argmin(s)]  # top-left
    rect[2] = pts[np.argmax(s)]  # bottom-right
    # diff: TR has smallest, BL has largest
    diff = np.diff(pts, axis=1)
    rect[1] = pts[np.argmin(diff)]  # top-right
    rect[3] = pts[np.argmax(diff)]  # bottom-left
    return rect
#ans: ordered_pts = order_points(approx.reshape(4, 2))
```

---

### Computing Output Size

```python
# compute width and height of output
#ans: (tl, tr, br, bl) = ordered_pts
# width = max of top and bottom widths
#ans: widthA = np.sqrt((br[0] - bl[0])**2 + (br[1] - bl[1])**2)
#ans: widthB = np.sqrt((tr[0] - tl[0])**2 + (tr[1] - tl[1])**2)
#ans: maxWidth = int(max(widthA, widthB))
# height = max of left and right heights
#ans: heightA = np.sqrt((tr[0] - br[0])**2 + (tr[1] - br[1])**2)
#ans: heightB = np.sqrt((tl[0] - bl[0])**2 + (tl[1] - bl[1])**2)
#ans: maxHeight = int(max(heightA, heightB))
```

---

### Complete Document Scan

```python
# source points (detected corners)
src = ordered_pts
# destination points (rectangle)
#ans: dst = np.array([[0, 0],
#ans:                 [maxWidth - 1, 0],
#ans:                 [maxWidth - 1, maxHeight - 1],
#ans:                 [0, maxHeight - 1]], dtype='float32')
# compute perspective transform
#ans: M = cv2.getPerspectiveTransform(src, dst)
# apply transform
#ans: warped = cv2.warpPerspective(img, M, (maxWidth, maxHeight))
```

---

### Bird's Eye View

**Purpose:** Top-down view of scene

**Use case:** Lane detection, parking assistance, sports analysis

**Method:** Same as document scan
1. Define region of interest (trapezoid on road)
2. Map to rectangle (top-down view)

---

### Bird's Eye View Example

```python
# road region (trapezoid)
h, w = img.shape[:2]
#ans: src = np.float32([[w*0.45, h*0.6],
#ans:                   [w*0.55, h*0.6],
#ans:                   [w*0.9, h],
#ans:                   [w*0.1, h]])
# bird's eye view (rectangle)
#ans: dst = np.float32([[0, 0],
#ans:                   [w, 0],
#ans:                   [w, h],
#ans:                   [0, h]])
# transform
M = cv2.getPerspectiveTransform(src, dst)
#ans: birds_eye = cv2.warpPerspective(img, M, (w, h))
```

---

### Inverse Perspective

**Purpose:** Map bird's eye view back to original perspective

**Method:** Use inverse of homography matrix

```python
# forward transform
M = cv2.getPerspectiveTransform(src, dst)
birds_eye = cv2.warpPerspective(img, M, (w, h))
# inverse transform
#ans: M_inv = cv2.getPerspectiveTransform(dst, src)
#ans: original = cv2.warpPerspective(birds_eye, M_inv, (w, h))
# or use numpy inverse
#ans: M_inv = np.linalg.inv(M)
```

---

### Exercises - Part 1 (Concepts)

```python
# what is perspective transform used for?
#ans: document scanning, bird's eye view, rectification
# how many points needed?
#ans: 4 point pairs (source and destination)
# what is homography?
#ans: 3×3 perspective transformation matrix
# why order corner points?
#ans: ensure correct TL, TR, BR, BL correspondence
# what is bird's eye view?
#ans: top-down perspective of scene
```

---

### Exercises - Part 2 (Concepts)

```python
# how to compute output rectangle size?
#ans: measure distances in source, take max width/height
# what is inverse perspective?
#ans: transform back from warped to original view
# how to get inverse homography?
#ans: cv2.getPerspectiveTransform(dst, src) or np.linalg.inv(M)
# document scan steps?
#ans: detect corners, order points, compute homography, warp
```

---

### Exercises - Part 3 (Coding)

```python
# perspective transform with 4 points
pts1 = np.float32([[56, 65], [368, 52], [28, 387], [389, 390]])
pts2 = np.float32([[0, 0], [300, 0], [0, 300], [300, 300]])
#ans: M = cv2.getPerspectiveTransform(pts1, pts2)
#ans: result = cv2.warpPerspective(img, M, (300, 300))
```

---

### Exercises - Part 4 (Coding)

```python
# order points function
def order_points(pts):
    rect = np.zeros((4, 2), dtype='float32')
    s = pts.sum(axis=1)
#ans:     rect[0] = pts[np.argmin(s)]  # TL
#ans:     rect[2] = pts[np.argmax(s)]  # BR
    diff = np.diff(pts, axis=1)
#ans:     rect[1] = pts[np.argmin(diff)]  # TR
#ans:     rect[3] = pts[np.argmax(diff)]  # BL
    return rect
```

---

### Exercises - Part 5 (Mixed)

```python
# bird's eye view transform
h, w = img.shape[:2]
src = np.float32([[w*0.45, h*0.6], [w*0.55, h*0.6], [w*0.9, h], [w*0.1, h]])
dst = np.float32([[0, 0], [w, 0], [w, h], [0, h]])
#ans: M = cv2.getPerspectiveTransform(src, dst)
#ans: birds_eye = cv2.warpPerspective(img, M, (w, h))
# inverse transform
#ans: M_inv = cv2.getPerspectiveTransform(dst, src)
#ans: original = cv2.warpPerspective(birds_eye, M_inv, (w, h))
```
