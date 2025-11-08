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

## Feature Descriptors

---

### What are Feature Descriptors?

**Descriptor:** Numerical representation of feature's local appearance

**Purpose:**
- Describe feature neighborhood
- Enable matching between images
- Invariant to transformations (rotation, scale, illumination)

**Process:**
1. Detect keypoints (location)
2. Compute descriptors (appearance)
3. Match descriptors across images

---

### Descriptor Properties

**Good descriptor should be:**
- **Distinctive:** Different features have different descriptors
- **Invariant:** Robust to rotation, scale, illumination
- **Compact:** Small memory footprint
- **Fast:** Quick to compute and match

**Trade-off:** Invariance vs distinctiveness vs speed

---

### Types of Descriptors

**Classical descriptors:**
- **SIFT:** Scale-Invariant Feature Transform
- **SURF:** Speeded-Up Robust Features
- **ORB:** Oriented FAST and Rotated BRIEF
- **BRIEF:** Binary Robust Independent Elementary Features

**Deep learning descriptors:**
- CNN-based (covered in advanced topics)

---

### Descriptor Vector

**Descriptor:** Fixed-length vector of numbers

Examples:
- SIFT: 128-dimensional float vector
- SURF: 64 or 128 dimensions
- ORB: 256-bit binary vector (32 bytes)
- BRIEF: 128, 256, or 512 bits

**Matching:** Compare vectors using distance metric

---

### ORB Descriptor

**ORB:** Oriented FAST + Rotated BRIEF

**Features:**
- Binary descriptor (fast to compute and match)
- Rotation invariant
- Scale invariant (using pyramid)
- Free to use (no patents)

**Use case:** Real-time applications, mobile devices

---

### ORB in OpenCV

```python
import cv2
# create ORB detector
#ans: orb = cv2.ORB_create()
# detect and compute descriptors
#ans: keypoints, descriptors = orb.detectAndCompute(gray, None)
# keypoints: list of cv2.KeyPoint objects
#ans: contains x, y, size, angle, response
# descriptors: numpy array
#ans: shape (N, 32) for N keypoints, 256-bit each
# draw keypoints
#ans: img_kp = cv2.drawKeypoints(img, keypoints, None, (0, 255, 0), cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
```

---

### ORB Parameters

```python
# create ORB with custom parameters
#ans: orb = cv2.ORB_create(nfeatures=500, scaleFactor=1.2, nlevels=8)
# nfeatures: maximum number of features
#ans: 500 strongest features retained
# scaleFactor: pyramid decimation ratio
#ans: 1.2 means each level is 1.2x smaller
# nlevels: number of pyramid levels
#ans: 8 levels for multi-scale detection
# set edge threshold
orb = cv2.ORB_create()
#ans: orb.setEdgeThreshold(15)
#ans: ignores features near edges (15 pixels)
```

---

### SIFT Descriptor

**SIFT:** Scale-Invariant Feature Transform

**Properties:**
- 128-dimensional float vector
- Histogram of gradient orientations
- Highly distinctive
- Invariant to scale, rotation, illumination

**Disadvantage:** Slower, patented (expired 2020)

---

### SIFT in OpenCV

```python
# create SIFT detector
#ans: sift = cv2.SIFT_create()
# detect and compute
#ans: keypoints, descriptors = sift.detectAndCompute(gray, None)
# descriptors shape
#ans: (N, 128) for N keypoints
# custom parameters
#ans: sift = cv2.SIFT_create(nfeatures=0, nOctaveLayers=3, contrastThreshold=0.04)
# nfeatures: 0 means no limit
#ans: all features above threshold retained
# contrastThreshold: filters low-contrast features
#ans: higher value = fewer, stronger features
```

---

### SURF Descriptor

**SURF:** Speeded-Up Robust Features

**Properties:**
- Faster than SIFT
- 64 or 128 dimensions
- Uses integral images for speed
- Similar performance to SIFT

**Note:** Patented, not available in OpenCV by default

---

### Descriptor Matching

**Matching:** Find similar descriptors across images

**Distance metrics:**
- **L2 (Euclidean):** For float descriptors (SIFT, SURF)
  - `distance = √(Σ(d1[i] - d2[i])²)`
- **Hamming:** For binary descriptors (ORB, BRIEF)
  - `distance = count of differing bits`

**Lower distance = better match**

---

### Brute-Force Matcher

```python
# create BF matcher for ORB (Hamming distance)
#ans: bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
# detect features in both images
orb = cv2.ORB_create()
kp1, des1 = orb.detectAndCompute(img1_gray, None)
kp2, des2 = orb.detectAndCompute(img2_gray, None)
# match descriptors
#ans: matches = bf.match(des1, des2)
# sort by distance
#ans: matches = sorted(matches, key=lambda x: x.distance)
# draw matches
#ans: img_matches = cv2.drawMatches(img1, kp1, img2, kp2, matches[:50], None, flags=2)
```

---

### FLANN Matcher

**FLANN:** Fast Library for Approximate Nearest Neighbors

**Advantage:** Much faster for large datasets (approximate)

**Trade-off:** Speed vs accuracy

---

### FLANN in OpenCV

```python
# FLANN parameters for ORB
FLANN_INDEX_LSH = 6
index_params = dict(algorithm=FLANN_INDEX_LSH, table_number=6, key_size=12, multi_probe_level=1)
search_params = dict(checks=50)
#ans: flann = cv2.FlannBasedMatcher(index_params, search_params)
# match descriptors
orb = cv2.ORB_create()
kp1, des1 = orb.detectAndCompute(img1_gray, None)
kp2, des2 = orb.detectAndCompute(img2_gray, None)
#ans: matches = flann.knnMatch(des1, des2, k=2)
# k=2 returns 2 best matches per descriptor
```

---

### Exercises - Part 1 (Concepts)

```python
# what is a descriptor?
#ans: numerical representation of feature's local appearance
# why need descriptors?
#ans: to match features across images
# what makes a good descriptor?
#ans: distinctive, invariant, compact, fast
# SIFT descriptor size?
#ans: 128 dimensions (float)
# ORB descriptor size?
#ans: 256 bits (32 bytes)
```

---

### Exercises - Part 2 (Concepts)

```python
# what distance for binary descriptors?
#ans: Hamming distance (count differing bits)
# what distance for SIFT?
#ans: L2 (Euclidean) distance
# advantage of ORB over SIFT?
#ans: faster, binary, free (no patent)
# what is FLANN?
#ans: fast approximate nearest neighbor matcher
# what does crossCheck do in BFMatcher?
#ans: ensures mutual best match (A→B and B→A)
```

---

### Exercises - Part 3 (Coding)

```python
# create ORB and detect features
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#ans: orb = cv2.ORB_create()
#ans: keypoints, descriptors = orb.detectAndCompute(gray, None)
# create SIFT and detect
#ans: sift = cv2.SIFT_create()
#ans: keypoints, descriptors = sift.detectAndCompute(gray, None)
# create BF matcher for ORB
#ans: bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
```

---

### Exercises - Part 4 (Coding)

```python
# match ORB features between two images
orb = cv2.ORB_create()
kp1, des1 = orb.detectAndCompute(gray1, None)
kp2, des2 = orb.detectAndCompute(gray2, None)
bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
#ans: matches = bf.match(des1, des2)
#ans: matches = sorted(matches, key=lambda x: x.distance)
# draw top 20 matches
#ans: img_matches = cv2.drawMatches(img1, kp1, img2, kp2, matches[:20], None, flags=2)
```

---

### Exercises - Part 5 (Mixed)

```python
# ORB with 1000 features
#ans: orb = cv2.ORB_create(nfeatures=1000)
#ans: kp, des = orb.detectAndCompute(gray, None)
# BF matcher for SIFT
#ans: bf = cv2.BFMatcher(cv2.NORM_L2, crossCheck=True)
# FLANN for ORB with kNN
FLANN_INDEX_LSH = 6
index_params = dict(algorithm=FLANN_INDEX_LSH, table_number=6, key_size=12, multi_probe_level=1)
search_params = dict(checks=50)
flann = cv2.FlannBasedMatcher(index_params, search_params)
#ans: matches = flann.knnMatch(des1, des2, k=2)
```
