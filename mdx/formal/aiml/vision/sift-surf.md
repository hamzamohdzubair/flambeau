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

## SIFT & SURF

---

### SIFT Overview

**SIFT:** Scale-Invariant Feature Transform (Lowe, 1999)

**Key properties:**
- **Scale invariant:** Detects features at multiple scales
- **Rotation invariant:** Assigns orientation to keypoints
- **Illumination invariant:** Robust to lighting changes
- **Partial occlusion resistant**

**Patent expired:** 2020, now free to use commercially

---

### SIFT Algorithm Steps

**1. Scale-space extrema detection**
- Build Gaussian pyramid (multiple scales)
- Compute Difference of Gaussians (DoG)
- Find local maxima/minima across scales

**2. Keypoint localization**
- Reject low-contrast points
- Eliminate edge responses

**3. Orientation assignment**
- Compute gradient histogram
- Assign dominant orientation(s)

**4. Descriptor generation**
- 16×16 neighborhood → 4×4 grid
- 8-bin histogram per cell → 128 values

---

### Scale-Space Detection

**Why multiple scales?**
- Features appear at different sizes
- Same feature in different images may have different scales

**Gaussian pyramid:**
```
Original → Blur → Downsample → Blur → Downsample ...
```

**DoG:** Difference of Gaussians approximates Laplacian
```
DoG = G(k×σ) - G(σ)
```

---

### SIFT Parameters

```python
import cv2
# create SIFT with default parameters
#ans: sift = cv2.SIFT_create()
# custom parameters
#ans: sift = cv2.SIFT_create(nfeatures=500, nOctaveLayers=3, contrastThreshold=0.04, edgeThreshold=10, sigma=1.6)
# nfeatures: max features to retain (0=all)
#ans: keeps 500 best features
# nOctaveLayers: layers per octave
#ans: more layers = more scales, slower
# contrastThreshold: filter low-contrast
#ans: higher = fewer features, stronger ones
# edgeThreshold: filter edge responses
#ans: higher = more edge features accepted
# sigma: initial gaussian blur
#ans: 1.6 is standard value
```

---

### SIFT Detection & Computation

```python
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
sift = cv2.SIFT_create()
# detect keypoints only
#ans: keypoints = sift.detect(gray, None)
# detect and compute descriptors
#ans: keypoints, descriptors = sift.detectAndCompute(gray, None)
# keypoint properties
#ans: kp = keypoints[0]
#ans: x, y = kp.pt  # position
#ans: size = kp.size  # scale
#ans: angle = kp.angle  # orientation (degrees)
#ans: response = kp.response  # corner strength
```

---

### SIFT Descriptor

**128-dimensional vector:**
- 4×4 grid of cells
- 8-bin gradient histogram per cell
- 4×4×8 = 128 values

**Normalization:** Makes descriptor illumination invariant

**Matching:** Use L2 (Euclidean) distance

---

### SURF Overview

**SURF:** Speeded-Up Robust Features (Bay, 2006)

**Key improvements over SIFT:**
- **3-5× faster:** Uses integral images
- **Comparable performance**
- **64 or 128 dimensions**

**Caveat:** Still patented, requires opencv-contrib

---

### SURF Algorithm

**Speed optimizations:**
1. **Integral images:** Fast box filter computation
2. **Hessian matrix approximation:** Box filters instead of Gaussian
3. **Wavelet responses:** Simplified gradient computation

**Steps similar to SIFT:**
- Scale-space detection (using Hessian)
- Orientation assignment
- Descriptor generation

---

### SURF in OpenCV

```python
# requires opencv-contrib-python
# create SURF detector
#ans: surf = cv2.xfeatures2d.SURF_create()
# set Hessian threshold
#ans: surf.setHessianThreshold(400)
#ans: lower = more features, weaker ones
# detect and compute
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#ans: keypoints, descriptors = surf.detectAndCompute(gray, None)
# use extended descriptor (128-dim instead of 64)
#ans: surf.setExtended(True)
#ans: 128 dimensions for more distinctiveness
```

---

### SIFT vs SURF

**SIFT:**
- More accurate, distinctive
- Better for difficult matching
- Slower (Gaussian filters)
- 128 dimensions
- Patent expired (free)

**SURF:**
- Faster (integral images)
- Good for real-time
- 64/128 dimensions
- Still patented
- Good SIFT alternative

**Both:** Scale + rotation invariant, robust descriptors

---

### Matching SIFT Features

```python
# detect SIFT in two images
sift = cv2.SIFT_create()
kp1, des1 = sift.detectAndCompute(gray1, None)
kp2, des2 = sift.detectAndCompute(gray2, None)
# brute-force matcher with L2 norm
#ans: bf = cv2.BFMatcher(cv2.NORM_L2, crossCheck=True)
#ans: matches = bf.match(des1, des2)
#ans: matches = sorted(matches, key=lambda x: x.distance)
# draw matches
#ans: img_matches = cv2.drawMatches(img1, kp1, img2, kp2, matches[:30], None, flags=2)
```

---

### Ratio Test (Lowe's Ratio)

**Problem:** Ambiguous matches (multiple similar descriptors)

**Solution:** Compare best match to second-best match

**Ratio test:**
```python
if distance(1st) < 0.75 × distance(2nd):
    accept match
else:
    reject (ambiguous)
```

**0.75:** Standard threshold, adjust for stricter/looser matching

---

### Ratio Test Implementation

```python
# BFMatcher with kNN (k=2)
bf = cv2.BFMatcher(cv2.NORM_L2)
#ans: matches = bf.knnMatch(des1, des2, k=2)
#ans: returns 2 best matches for each descriptor
# apply ratio test
good_matches = []
#ans: for m, n in matches:
#ans:     if m.distance < 0.75 * n.distance:
#ans:         good_matches.append(m)
# draw good matches
img_matches = cv2.drawMatches(img1, kp1, img2, kp2, good_matches, None, flags=2)
```

---

### Exercises - Part 1 (Concepts)

```python
# what does SIFT stand for?
#ans: Scale-Invariant Feature Transform
# how many dimensions in SIFT descriptor?
#ans: 128 dimensions
# what is DoG?
#ans: Difference of Gaussians, approximates Laplacian
# why multiple scales in SIFT?
#ans: features appear at different sizes across images
# main advantage of SURF over SIFT?
#ans: 3-5× faster using integral images
```

---

### Exercises - Part 2 (Concepts)

```python
# what is Lowe's ratio test?
#ans: compare 1st best match to 2nd best, reject if ratio > 0.75
# why ratio test?
#ans: filters ambiguous matches (multiple similar descriptors)
# SIFT descriptor grid structure?
#ans: 4×4 cells, 8-bin histogram each = 128 values
# what distance metric for SIFT?
#ans: L2 (Euclidean) distance
# is SIFT rotation invariant?
#ans: yes, assigns orientation to each keypoint
```

---

### Exercises - Part 3 (Coding)

```python
# create SIFT with 1000 features
#ans: sift = cv2.SIFT_create(nfeatures=1000)
# detect and compute SIFT
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#ans: keypoints, descriptors = sift.detectAndCompute(gray, None)
# get first keypoint properties
#ans: kp = keypoints[0]
#ans: x, y = kp.pt
#ans: size = kp.size
#ans: angle = kp.angle
```

---

### Exercises - Part 4 (Coding)

```python
# match SIFT features
sift = cv2.SIFT_create()
kp1, des1 = sift.detectAndCompute(gray1, None)
kp2, des2 = sift.detectAndCompute(gray2, None)
#ans: bf = cv2.BFMatcher(cv2.NORM_L2, crossCheck=True)
#ans: matches = bf.match(des1, des2)
#ans: matches = sorted(matches, key=lambda x: x.distance)
# apply ratio test
bf = cv2.BFMatcher(cv2.NORM_L2)
#ans: matches = bf.knnMatch(des1, des2, k=2)
#ans: good = [m for m, n in matches if m.distance < 0.75 * n.distance]
```

---

### Exercises - Part 5 (Mixed)

```python
# SIFT with higher contrast threshold
#ans: sift = cv2.SIFT_create(contrastThreshold=0.08)
#ans: fewer features, higher quality
# draw SIFT keypoints with rich info
sift = cv2.SIFT_create()
kp, des = sift.detectAndCompute(gray, None)
#ans: img_kp = cv2.drawKeypoints(img, kp, None, flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
#ans: shows size and orientation
# stricter ratio test
bf = cv2.BFMatcher(cv2.NORM_L2)
matches = bf.knnMatch(des1, des2, k=2)
#ans: good = [m for m, n in matches if m.distance < 0.6 * n.distance]
#ans: 0.6 is stricter than 0.75, fewer but better matches
```
