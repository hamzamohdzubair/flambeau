{{yaml}}

{{title}}

## ORB Features

---

### What is ORB?

**ORB:** Oriented FAST and Rotated BRIEF

**Combination:**
- **FAST:** Corner detection
- **BRIEF:** Binary descriptor
- **Additions:** Orientation, scale pyramid

**Advantages:**
- Very fast (real-time capable)
- Binary descriptor (fast matching)
- Free and open-source
- Good performance

**Use case:** Mobile devices, embedded systems, real-time applications

---

### ORB Algorithm

**Steps:**
1. **FAST keypoint detection:** Find corners quickly
2. **Harris corner measure:** Rank and keep top N
3. **Scale pyramid:** Multi-scale detection
4. **Orientation assignment:** Intensity centroid method
5. **Rotated BRIEF:** Compute binary descriptor aligned with orientation

---

### FAST Detector in ORB

**FAST:** Features from Accelerated Segment Test

**Method:**
- Check 16 pixels in circle around candidate
- If N consecutive pixels brighter/darker → corner
- Very fast (simple comparisons)

**ORB improvement:** Harris measure to rank corners

---

### Orientation Assignment

**Problem:** BRIEF not rotation invariant

**Solution:** Compute orientation, rotate BRIEF pattern

**Intensity centroid method:**
1. Compute moments: `m_pq = Σ x^p × y^q × I(x,y)`
2. Find centroid: `C = (m10/m00, m01/m00)`
3. Orientation: `θ = atan2(m01, m10)`

**Result:** Rotation-invariant descriptor

---

### BRIEF Descriptor

**BRIEF:** Binary Robust Independent Elementary Features

**Method:**
1. Select pairs of pixels in patch
2. Compare intensities: `I(p1) < I(p2)` → 0 or 1
3. Concatenate bits → binary string

**256 bits:** 256 pixel pairs → 256 comparisons

**Advantage:** Very fast to compute and match (XOR + bit count)

---

### ORB Parameters

```python
import cv2
# create ORB detector
#ans: orb = cv2.ORB_create()
# detailed parameters
#ans: orb = cv2.ORB_create(nfeatures=500, scaleFactor=1.2, nlevels=8, edgeThreshold=31, firstLevel=0, WTA_K=2, scoreType=cv2.ORB_HARRIS_SCORE, patchSize=31, fastThreshold=20)
# nfeatures: max keypoints to retain
#ans: 500 strongest features
# scaleFactor: pyramid scale factor
#ans: 1.2 means each level is 1/1.2 = 83% of previous
# nlevels: number of pyramid levels
#ans: 8 levels for multi-scale detection
```

---

### ORB Detection

```python
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
orb = cv2.ORB_create(nfeatures=1000)
# detect keypoints only
#ans: keypoints = orb.detect(gray, None)
# detect and compute descriptors
#ans: keypoints, descriptors = orb.detectAndCompute(gray, None)
# descriptor is binary
#ans: print(descriptors.shape)  # (N, 32) - 32 bytes = 256 bits
#ans: print(descriptors.dtype)  # uint8
```

---

### Drawing ORB Keypoints

```python
orb = cv2.ORB_create()
kp, des = orb.detectAndCompute(gray, None)
# simple keypoint drawing
#ans: img_kp = cv2.drawKeypoints(img, kp, None, color=(0, 255, 0))
# rich keypoints (with size and orientation)
#ans: img_kp = cv2.drawKeypoints(img, kp, None, flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
#ans: circles show scale, lines show orientation
```

---

### ORB Matching

**Distance metric:** Hamming distance (count differing bits)

**Fast matching:** XOR operation + bit count

```python
# create ORB matcher (Hamming distance)
#ans: bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
# detect in two images
orb = cv2.ORB_create()
kp1, des1 = orb.detectAndCompute(gray1, None)
kp2, des2 = orb.detectAndCompute(gray2, None)
# match
#ans: matches = bf.match(des1, des2)
#ans: matches = sorted(matches, key=lambda x: x.distance)
```

---

### ORB vs SIFT

**ORB advantages:**
- **Speed:** 10-100× faster
- **Binary:** Fast matching (Hamming)
- **Free:** No patent issues
- **Memory:** 32 bytes vs 512 bytes (SIFT)

**SIFT advantages:**
- **Accuracy:** More distinctive
- **Robustness:** Better invariance
- **Difficult scenes:** Performs better

**Choice:** ORB for speed, SIFT for accuracy

---

### Scale Pyramid

**Why pyramid?**
- Detect features at multiple scales
- Same feature may appear different sizes

**ORB pyramid:**
```
Level 0: Original image
Level 1: Scaled by 1/scaleFactor
Level 2: Scaled by 1/scaleFactor²
...
```

**nlevels=8, scaleFactor=1.2:** 8 scales from 100% to ~23%

---

### WTA_K Parameter

**WTA_K:** Number of points in BRIEF test

**Options:**
- **WTA_K=2:** Compare 2 points (default, 256 bits)
- **WTA_K=3:** Compare 3 points (more robust, 512 bits)
- **WTA_K=4:** Compare 4 points (even more robust, 512 bits)

**Trade-off:** Robustness vs speed/memory

---

### Exercises - Part 1 (Concepts)

```python
# what does ORB stand for?
#ans: Oriented FAST and Rotated BRIEF
# what detector does ORB use?
#ans: FAST corner detector
# what descriptor does ORB use?
#ans: BRIEF binary descriptor (rotated)
# how many bits in ORB descriptor?
#ans: 256 bits (32 bytes)
# what distance metric for ORB?
#ans: Hamming distance (count differing bits)
```

---

### Exercises - Part 2 (Concepts)

```python
# why ORB is fast?
#ans: binary descriptor, simple comparisons, fast matching
# how does ORB handle rotation?
#ans: assigns orientation using intensity centroid
# what is scaleFactor?
#ans: pyramid scale ratio between levels
# advantage of binary descriptors?
#ans: fast to compute and match (XOR + bit count)
# ORB vs SIFT trade-off?
#ans: ORB faster but less accurate, SIFT slower but more robust
```

---

### Exercises - Part 3 (Coding)

```python
# create ORB with 2000 features
#ans: orb = cv2.ORB_create(nfeatures=2000)
# detect and compute
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#ans: keypoints, descriptors = orb.detectAndCompute(gray, None)
# check descriptor shape
#ans: print(descriptors.shape)  # (N, 32)
# create Hamming matcher
#ans: bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
```

---

### Exercises - Part 4 (Coding)

```python
# match ORB features
orb = cv2.ORB_create()
kp1, des1 = orb.detectAndCompute(gray1, None)
kp2, des2 = orb.detectAndCompute(gray2, None)
bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
#ans: matches = bf.match(des1, des2)
#ans: matches = sorted(matches, key=lambda x: x.distance)
#ans: img_matches = cv2.drawMatches(img1, kp1, img2, kp2, matches[:50], None, flags=2)
```

---

### Exercises - Part 5 (Mixed)

```python
# ORB with more pyramid levels
#ans: orb = cv2.ORB_create(nlevels=12, scaleFactor=1.2)
#ans: 12 levels for wider scale range
# draw rich keypoints
orb = cv2.ORB_create()
kp, des = orb.detectAndCompute(gray, None)
#ans: img_kp = cv2.drawKeypoints(img, kp, None, flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
# ORB with WTA_K=3
#ans: orb = cv2.ORB_create(WTA_K=3)
#ans: more robust descriptor, larger size
```
