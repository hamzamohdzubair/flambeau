---
theme: blank2
paginate: true
transition: slide
class: lead
footer: '<span class="breadcrumb"></span>'
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

## Feature Extraction

---

### Feature Extraction Overview

**Feature extraction:** Converting raw image into meaningful measurements

**Types:**
- **Low-level features:** Edges, corners, colors, textures
- **Mid-level features:** SIFT, SURF, ORB descriptors
- **High-level features:** Object parts, semantic concepts (CNN)

**Purpose:** Reduce dimensionality while preserving important information

---

### Histogram of Oriented Gradients (HOG)

**HOG:** Describes local object appearance using gradient orientations

**Algorithm:**
1. Compute gradients (magnitude + direction)
2. Divide image into cells (e.g., 8×8 pixels)
3. Compute histogram of gradients per cell (9 bins)
4. Group cells into blocks (e.g., 2×2 cells)
5. Normalize histograms within blocks
6. Concatenate all histograms → feature vector

**Use case:** Pedestrian detection, object recognition

---

### HOG Parameters

**Key parameters:**
- **Cell size:** 8×8 or 16×16 pixels
- **Block size:** 2×2 or 3×3 cells
- **Orientations:** 9 bins (0-180° for unsigned gradient)
- **Block stride:** Overlap between blocks

**Feature vector size:**
- Example: 64×128 image, 8×8 cells, 2×2 blocks, 9 bins
- = 7 blocks × 15 blocks × 4 cells × 9 bins = 3780 dimensions

---

### HOG in Python

```python
from skimage.feature import hog
from skimage import exposure
import cv2
# load image
img = cv2.imread('person.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# compute HOG features
#ans: features, hog_image = hog(gray, orientations=9, pixels_per_cell=(8, 8), cells_per_block=(2, 2), visualize=True)
# features: HOG descriptor vector
#ans: print(features.shape)  # (N,) 1D array
# hog_image: visualization of gradients
#ans: hog_image = exposure.rescale_intensity(hog_image, out_range=(0, 255))
#ans: hog_image = np.uint8(hog_image)
```

---

### Local Binary Patterns (LBP)

**LBP:** Texture descriptor

**Algorithm:**
1. For each pixel, compare with 8 neighbors
2. If neighbor ≥ center: 1, else: 0
3. Read clockwise → 8-bit binary number
4. Convert to decimal (0-255)

**Properties:**
- Rotation invariant (optional)
- Grayscale invariant
- Fast to compute

**Use case:** Texture classification, face recognition

---

### LBP Implementation

```python
from skimage.feature import local_binary_pattern
# compute LBP
radius = 3
n_points = 8 * radius
#ans: lbp = local_binary_pattern(gray, n_points, radius, method='uniform')
# method options:
#ans: 'default': original LBP
#ans: 'uniform': rotation invariant (most common)
#ans: 'var': variance-based
# create histogram
#ans: hist, _ = np.histogram(lbp.ravel(), bins=np.arange(0, n_points + 3), range=(0, n_points + 2))
#ans: hist = hist.astype('float')
#ans: hist /= (hist.sum() + 1e-7)  # normalize
```

---

### Color Histograms

**Color histogram:** Distribution of colors in image

**Process:**
1. Choose color space (RGB, HSV, LAB)
2. Divide each channel into bins
3. Count pixels in each bin
4. Normalize (make sum = 1)

**Use case:** Image retrieval, color-based matching

---

### Color Histogram in OpenCV

```python
# compute histogram for each channel
#ans: hist_b = cv2.calcHist([img], [0], None, [256], [0, 256])
#ans: hist_g = cv2.calcHist([img], [1], None, [256], [0, 256])
#ans: hist_r = cv2.calcHist([img], [2], None, [256], [0, 256])
# parameters:
#ans: [img]: source image
#ans: [0]: channel index (0=B, 1=G, 2=R)
#ans: None: no mask
#ans: [256]: number of bins
#ans: [0, 256]: range
# normalize
#ans: hist_b = cv2.normalize(hist_b, hist_b).flatten()
```

---

### HSV Histogram

```python
# convert to HSV
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
# compute 2D histogram (Hue vs Saturation)
#ans: hist = cv2.calcHist([hsv], [0, 1], None, [180, 256], [0, 180, 0, 256])
#ans: channels [0,1] = Hue and Saturation
#ans: bins [180, 256] = 180 for H, 256 for S
# normalize
#ans: cv2.normalize(hist, hist, 0, 255, cv2.NORM_MINMAX)
```

---

### Haar Cascades

**Haar cascades:** Pre-trained classifiers for object detection

**Based on:**
- Haar-like features (rectangular patterns)
- Cascade of weak classifiers
- AdaBoost training

**Pre-trained models:** Face, eyes, smile, full body, etc.

**Advantage:** Fast, real-time detection

---

### Haar Cascade in OpenCV

```python
# load pre-trained face detector
#ans: face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
# detect faces
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#ans: faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
# faces: array of [x, y, w, h]
#ans: for (x, y, w, h) in faces:
#ans:     cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
```

---

### Template Matching

**Template matching:** Find template image in larger image

**Methods:**
- **TM_CCOEFF_NORMED:** Correlation coefficient (best)
- **TM_SQDIFF_NORMED:** Squared difference
- **TM_CCORR_NORMED:** Cross-correlation

**Limitation:** Not scale or rotation invariant

---

### Template Matching in OpenCV

```python
# load template
template = cv2.imread('template.jpg', 0)
w, h = template.shape[::-1]
# template matching
#ans: result = cv2.matchTemplate(gray, template, cv2.TM_CCOEFF_NORMED)
# find location of best match
#ans: min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
# for CCOEFF_NORMED, higher is better
#ans: top_left = max_loc
#ans: bottom_right = (top_left[0] + w, top_left[1] + h)
#ans: cv2.rectangle(img, top_left, bottom_right, (0, 255, 0), 2)
```

---

### Exercises - Part 1 (Concepts)

```python
# what is HOG?
#ans: Histogram of Oriented Gradients, describes object appearance
# what does LBP encode?
#ans: texture pattern by comparing pixel with neighbors
# what is color histogram?
#ans: distribution of colors in image
# what are Haar cascades?
#ans: pre-trained classifiers using Haar-like features
# template matching limitation?
#ans: not scale or rotation invariant
```

---

### Exercises - Part 2 (Concepts)

```python
# HOG typical cell size?
#ans: 8×8 or 16×16 pixels
# LBP output range?
#ans: 0-255 (8-bit patterns from 8 neighbors)
# why normalize histograms?
#ans: make scale-invariant, sum to 1
# what is cascade in Haar cascades?
#ans: series of weak classifiers, fast rejection
# best template matching method?
#ans: TM_CCOEFF_NORMED (normalized correlation coefficient)
```

---

### Exercises - Part 3 (Coding)

```python
# compute HOG features
from skimage.feature import hog
#ans: features, hog_img = hog(gray, orientations=9, pixels_per_cell=(8, 8), cells_per_block=(2, 2), visualize=True)
# compute LBP
from skimage.feature import local_binary_pattern
#ans: lbp = local_binary_pattern(gray, 24, 3, method='uniform')
# color histogram
#ans: hist_b = cv2.calcHist([img], [0], None, [256], [0, 256])
#ans: hist_b = cv2.normalize(hist_b, hist_b).flatten()
```

---

### Exercises - Part 4 (Coding)

```python
# face detection with Haar cascade
#ans: face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#ans: faces = face_cascade.detectMultiScale(gray, 1.1, 5, minSize=(30, 30))
#ans: for (x, y, w, h) in faces:
#ans:     cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
```

---

### Exercises - Part 5 (Mixed)

```python
# template matching
template = cv2.imread('template.jpg', 0)
w, h = template.shape[::-1]
#ans: result = cv2.matchTemplate(gray, template, cv2.TM_CCOEFF_NORMED)
#ans: min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
#ans: top_left = max_loc
#ans: cv2.rectangle(img, top_left, (top_left[0]+w, top_left[1]+h), (0, 255, 0), 2)
# HSV histogram
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
#ans: hist = cv2.calcHist([hsv], [0, 1], None, [180, 256], [0, 180, 0, 256])
```
