{{yaml}}

{{title}}

## Keypoint Matching

---

### What is Keypoint Matching?

**Matching:** Find corresponding features between images

**Applications:**
- **Image stitching:** Panoramas
- **Object recognition:** Find object in scene
- **3D reconstruction:** Stereo vision
- **Visual tracking:** Follow objects
- **Image registration:** Align images

**Process:** Detect → Describe → Match → Filter

---

### Matching Approaches

**Brute-Force (BF) Matching:**
- Compare each descriptor in set1 with all in set2
- Find closest match
- Simple but slow for large sets

**FLANN Matching:**
- Fast Library for Approximate Nearest Neighbors
- Tree-based search (KD-tree, LSH)
- Much faster, slightly less accurate

---

### Distance Metrics

**For float descriptors (SIFT, SURF):**
- **L1 (Manhattan):** `Σ|d1[i] - d2[i]|`
- **L2 (Euclidean):** `√(Σ(d1[i] - d2[i])²)`

**For binary descriptors (ORB, BRIEF):**
- **Hamming:** Count of differing bits
- **Hamming2:** Hamming for multi-byte

**Lower distance = better match**

---

### Brute-Force Matcher

```python
import cv2
# BF matcher for ORB (binary)
#ans: bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
# BF matcher for SIFT (float)
#ans: bf = cv2.BFMatcher(cv2.NORM_L2, crossCheck=True)
# crossCheck: mutual best match
#ans: ensures A's best match is B AND B's best match is A
# match descriptors
#ans: matches = bf.match(des1, des2)
# returns DMatch objects
#ans: each has .distance, .queryIdx, .trainIdx
```

---

### DMatch Object

```python
matches = bf.match(des1, des2)
#ans: m = matches[0]
# properties
#ans: distance = m.distance  # lower is better
#ans: queryIdx = m.queryIdx  # index in des1
#ans: trainIdx = m.trainIdx  # index in des2
# sort by distance
#ans: matches = sorted(matches, key=lambda x: x.distance)
#ans: best matches first (lowest distance)
```

---

### Drawing Matches

```python
# simple match drawing
orb = cv2.ORB_create()
kp1, des1 = orb.detectAndCompute(gray1, None)
kp2, des2 = orb.detectAndCompute(gray2, None)
bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
matches = bf.match(des1, des2)
matches = sorted(matches, key=lambda x: x.distance)
# draw top 30 matches
#ans: img_matches = cv2.drawMatches(img1, kp1, img2, kp2, matches[:30], None, flags=2)
#ans: flags=2 means cv2.DrawMatchesFlags_NOT_DRAW_SINGLE_POINTS
```

---

### kNN Matching

**k-Nearest Neighbors:** Find k best matches for each descriptor

**Purpose:** Enable ratio test (Lowe's method)

```python
# kNN with k=2 (2 best matches)
bf = cv2.BFMatcher(cv2.NORM_HAMMING)
#ans: matches = bf.knnMatch(des1, des2, k=2)
#ans: returns list of lists: [[best, 2nd_best], ...]
# each descriptor gets 2 matches
#ans: for matches_for_one in matches:
#ans:     m, n = matches_for_one  # best and 2nd best
```

---

### Ratio Test (Lowe's Test)

**Purpose:** Filter ambiguous matches

**Method:**
- If best match much closer than 2nd best → good match
- If similar distances → ambiguous, reject

**Threshold:** Typically 0.7-0.8

```python
bf = cv2.BFMatcher(cv2.NORM_HAMMING)
matches = bf.knnMatch(des1, des2, k=2)
# apply ratio test
good_matches = []
#ans: for m, n in matches:
#ans:     if m.distance < 0.75 * n.distance:
#ans:         good_matches.append(m)
#ans: keeps only distinctive matches
```

---

### FLANN Matcher

**Advantages:**
- Much faster for large descriptor sets
- Approximate search (trade accuracy for speed)
- Different algorithms for different descriptor types

**Algorithms:**
- **KD-tree:** For SIFT, SURF (float)
- **LSH:** For ORB, BRIEF (binary)

---

### FLANN for SIFT

```python
# FLANN parameters for SIFT (KD-tree)
FLANN_INDEX_KDTREE = 1
index_params = dict(algorithm=FLANN_INDEX_KDTREE, trees=5)
search_params = dict(checks=50)
#ans: flann = cv2.FlannBasedMatcher(index_params, search_params)
# trees: number of KD-trees
#ans: more trees = better accuracy, slower
# checks: number of leaf nodes to search
#ans: higher = better accuracy, slower
# match
#ans: matches = flann.knnMatch(des1, des2, k=2)
```

---

### FLANN for ORB

```python
# FLANN parameters for ORB (LSH)
FLANN_INDEX_LSH = 6
index_params = dict(algorithm=FLANN_INDEX_LSH, table_number=6, key_size=12, multi_probe_level=1)
search_params = dict(checks=50)
#ans: flann = cv2.FlannBasedMatcher(index_params, search_params)
# convert descriptors to float32 (FLANN requirement)
#ans: des1 = np.float32(des1)
#ans: des2 = np.float32(des2)
# match
matches = flann.knnMatch(des1, des2, k=2)
```

---

### Homography Filtering

**Homography:** Perspective transformation matrix

**RANSAC:** Random Sample Consensus
- Iteratively find transformation
- Identify inliers (good matches) vs outliers

**Use case:** Filter geometric outliers after matching

---

### Finding Homography

```python
# need at least 4 matches
# extract matched point coordinates
src_pts = np.float32([kp1[m.queryIdx].pt for m in good_matches]).reshape(-1, 1, 2)
dst_pts = np.float32([kp2[m.trainIdx].pt for m in good_matches]).reshape(-1, 1, 2)
# find homography with RANSAC
#ans: M, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
# M: 3x3 transformation matrix
#ans: mask: inliers (1) vs outliers (0)
# filter matches using mask
#ans: inliers = [m for m, msk in zip(good_matches, mask.ravel()) if msk == 1]
```

---

### Exercises - Part 1 (Concepts)

```python
# what is keypoint matching?
#ans: finding corresponding features between images
# what distance for binary descriptors?
#ans: Hamming distance
# what is crossCheck in BFMatcher?
#ans: ensures mutual best match (bidirectional)
# what is ratio test?
#ans: compare 1st and 2nd best match, reject if similar
# typical ratio test threshold?
#ans: 0.75 (or 0.7-0.8 range)
```

---

### Exercises - Part 2 (Concepts)

```python
# BF vs FLANN?
#ans: BF exact but slow, FLANN approximate but fast
# what is kNN matching?
#ans: find k nearest neighbors for each descriptor
# why k=2 for ratio test?
#ans: need 2nd best match to compare with best
# what is RANSAC?
#ans: random sampling to find inliers, filter outliers
# what is homography?
#ans: perspective transformation matrix (3x3)
```

---

### Exercises - Part 3 (Coding)

```python
# BF matcher for ORB
#ans: bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
#ans: matches = bf.match(des1, des2)
#ans: matches = sorted(matches, key=lambda x: x.distance)
# kNN matching
bf = cv2.BFMatcher(cv2.NORM_HAMMING)
#ans: matches = bf.knnMatch(des1, des2, k=2)
# ratio test
good = []
#ans: for m, n in matches:
#ans:     if m.distance < 0.75 * n.distance:
#ans:         good.append(m)
```

---

### Exercises - Part 4 (Coding)

```python
# FLANN for SIFT
FLANN_INDEX_KDTREE = 1
index_params = dict(algorithm=FLANN_INDEX_KDTREE, trees=5)
search_params = dict(checks=50)
#ans: flann = cv2.FlannBasedMatcher(index_params, search_params)
#ans: matches = flann.knnMatch(des1, des2, k=2)
# FLANN for ORB
FLANN_INDEX_LSH = 6
index_params = dict(algorithm=FLANN_INDEX_LSH, table_number=6, key_size=12, multi_probe_level=1)
#ans: flann = cv2.FlannBasedMatcher(index_params, search_params)
#ans: matches = flann.knnMatch(np.float32(des1), np.float32(des2), k=2)
```

---

### Exercises - Part 5 (Mixed)

```python
# complete matching pipeline
orb = cv2.ORB_create()
kp1, des1 = orb.detectAndCompute(gray1, None)
kp2, des2 = orb.detectAndCompute(gray2, None)
bf = cv2.BFMatcher(cv2.NORM_HAMMING)
matches = bf.knnMatch(des1, des2, k=2)
#ans: good = [m for m, n in matches if m.distance < 0.75 * n.distance]
#ans: img_matches = cv2.drawMatches(img1, kp1, img2, kp2, good, None, flags=2)
```

---

### Exercises - Part 6 (Advanced)

```python
# homography filtering
good_matches = []  # from ratio test
src_pts = np.float32([kp1[m.queryIdx].pt for m in good_matches]).reshape(-1, 1, 2)
dst_pts = np.float32([kp2[m.trainIdx].pt for m in good_matches]).reshape(-1, 1, 2)
#ans: M, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
#ans: inliers = [m for m, msk in zip(good_matches, mask.ravel()) if msk == 1]
#ans: print(f"Inliers: {len(inliers)}/{len(good_matches)}")
```
