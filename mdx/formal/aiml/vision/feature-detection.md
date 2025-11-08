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

## Feature Detection

---

### What are Features?

**Feature:** Distinctive pattern in an image that can be reliably detected

**Good features:**
- **Corners:** Intersection of edges (high gradient in multiple directions)
- **Blobs:** Regions different from surroundings
- **Edges:** Boundaries between regions

**Why detect features?**
- Object recognition
- Image matching
- Tracking
- 3D reconstruction
- Image stitching

---

### Corner Detection

**Corner:** Point where two edges meet (intensity change in multiple directions)

**Properties:**
- High gradient in multiple directions
- Locally unique
- Repeatable (detected consistently)
- Invariant to rotation

**Use case:** Tracking, matching, calibration

---

### Harris Corner Detector

**Harris algorithm:** Measures corner-ness using gradient matrix

**Formula:** `R = det(M) - k × trace(M)²`

Where M is gradient matrix:
```
M = Σ [Ix²   IxIy]
    [IxIy  Iy²  ]
```

**R > threshold:** Corner detected

---

### Harris Corner in OpenCV

```python
import cv2
import numpy as np
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
gray = np.float32(gray)
# detect harris corners
#ans: corners = cv2.cornerHarris(gray, blockSize=2, ksize=3, k=0.04)
# blockSize: neighborhood size
#ans: size of window to compute gradient
# ksize: Sobel kernel size
#ans: for computing gradients (3, 5, 7)
# k: Harris parameter
#ans: typically 0.04-0.06, sensitivity parameter
# threshold to mark corners
corners = cv2.dilate(corners, None)
img[corners > 0.01 * corners.max()] = [0, 0, 255]
#ans: marks corners in red where response > threshold
```

---

### Shi-Tomasi Corner Detector

**Shi-Tomasi:** Improved Harris, better for tracking

**Formula:** `R = min(λ1, λ2)` where λ are eigenvalues

**Advantage:** More reliable corner selection

**Use case:** Optical flow, tracking

---

### Shi-Tomasi in OpenCV

```python
# detect good features to track
#ans: corners = cv2.goodFeaturesToTrack(gray, maxCorners=100, qualityLevel=0.01, minDistance=10)
# maxCorners: maximum number to return
#ans: 100 strongest corners
# qualityLevel: minimum quality (0-1)
#ans: 0.01 means keep corners > 1% of best
# minDistance: minimum pixel distance between corners
#ans: 10 pixels apart
# draw corners
#ans: for corner in corners:
#ans:     x, y = corner.ravel()
#ans:     cv2.circle(img, (int(x), int(y)), 3, (0, 255, 0), -1)
```

---

### FAST Corner Detector

**FAST:** Features from Accelerated Segment Test

**Algorithm:**
1. Pick pixel p, intensity Ip
2. Consider circle of 16 pixels around p
3. If N contiguous pixels all brighter/darker than Ip ± threshold → corner
4. N typically 12 (FAST-12)

**Advantage:** Very fast, real-time capable

---

### FAST in OpenCV

```python
# create FAST detector
#ans: fast = cv2.FastFeatureDetector_create()
# detect keypoints
#ans: keypoints = fast.detect(gray, None)
# draw keypoints
#ans: img_kp = cv2.drawKeypoints(img, keypoints, None, color=(0, 255, 0))
# adjust threshold
fast.setThreshold(30)
#ans: higher threshold = fewer keypoints, stronger corners
# control non-max suppression
fast.setNonmaxSuppression(True)
#ans: removes adjacent weak corners
```

---

### Blob Detection

**Blob:** Region significantly different from surroundings

**SimpleBlobDetector:** Detects bright/dark circular regions

**Parameters:**
- Color (bright/dark blobs)
- Size (min/max radius)
- Circularity
- Convexity
- Inertia

---

### Blob Detection in OpenCV

```python
# create blob detector with default params
#ans: detector = cv2.SimpleBlobDetector_create()
# detect blobs
#ans: keypoints = detector.detect(gray)
# draw blobs
#ans: img_blobs = cv2.drawKeypoints(img, keypoints, None, (0, 0, 255), cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
# custom parameters
params = cv2.SimpleBlobDetector_Params()
params.filterByArea = True
params.minArea = 100
params.maxArea = 5000
params.filterByCircularity = True
params.minCircularity = 0.8
#ans: detector = cv2.SimpleBlobDetector_create(params)
#ans: detects circular blobs 100-5000 pixels, circularity > 0.8
```

---

### Exercises - Part 1 (Concepts)

```python
# what is a corner?
#ans: point with high gradient in multiple directions
# why detect features?
#ans: object recognition, matching, tracking, stitching
# what does Harris detect?
#ans: corners using gradient matrix
# difference between Harris and Shi-Tomasi?
#ans: Shi-Tomasi uses min(λ1,λ2), better for tracking
# what is FAST?
#ans: fast corner detector using circle of pixels
```

---

### Exercises - Part 2 (Concepts)

```python
# what is a blob?
#ans: region significantly different from surroundings
# what is k parameter in Harris?
#ans: sensitivity, typically 0.04-0.06
# what is qualityLevel in goodFeaturesToTrack?
#ans: minimum quality as fraction of best corner (0-1)
# why FAST is fast?
#ans: simple comparison test, no gradient computation
# what does minDistance parameter do?
#ans: ensures corners are at least N pixels apart
```

---

### Exercises - Part 3 (Coding)

```python
# detect Harris corners
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
gray = np.float32(gray)
#ans: corners = cv2.cornerHarris(gray, 2, 3, 0.04)
# detect Shi-Tomasi corners
#ans: corners = cv2.goodFeaturesToTrack(gray, 100, 0.01, 10)
# create FAST detector
#ans: fast = cv2.FastFeatureDetector_create()
#ans: keypoints = fast.detect(gray, None)
```

---

### Exercises - Part 4 (Coding)

```python
# detect blobs
#ans: detector = cv2.SimpleBlobDetector_create()
#ans: keypoints = detector.detect(gray)
# draw Harris corners
corners = cv2.cornerHarris(gray, 2, 3, 0.04)
corners = cv2.dilate(corners, None)
#ans: img[corners > 0.01 * corners.max()] = [0, 0, 255]
# draw Shi-Tomasi corners
corners = cv2.goodFeaturesToTrack(gray, 100, 0.01, 10)
#ans: for corner in corners:
#ans:     x, y = corner.ravel()
#ans:     cv2.circle(img, (int(x), int(y)), 3, (255, 0, 0), -1)
```

---

### Exercises - Part 5 (Mixed)

```python
# adjust FAST threshold
fast = cv2.FastFeatureDetector_create()
#ans: fast.setThreshold(50)
#ans: keypoints = fast.detect(gray, None)
# detect top 50 Shi-Tomasi corners
#ans: corners = cv2.goodFeaturesToTrack(gray, 50, 0.01, 10)
# custom blob parameters
params = cv2.SimpleBlobDetector_Params()
#ans: params.filterByArea = True
#ans: params.minArea = 50
#ans: params.maxArea = 1000
#ans: detector = cv2.SimpleBlobDetector_create(params)
```
