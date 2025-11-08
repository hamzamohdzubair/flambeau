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

## Region Processing

---

### Connected Components

**Connected component:** Group of connected pixels with same value

**Connectivity:**
- **4-connectivity:** Up, down, left, right
- **8-connectivity:** 4-connected + diagonals

**Use case:** Count objects, label regions, extract features

---

### Connected Components Labeling

```python
import cv2
import numpy as np
# binary image
_, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
# label connected components
#ans: num_labels, labels = cv2.connectedComponents(binary)
#ans: num_labels includes background (label 0)
#ans: actual objects = num_labels - 1
# labels is same size as binary
#ans: each pixel has label (0=background, 1,2,3...=objects)
# visualize labels
#ans: labels_vis = np.uint8(255 * labels / labels.max())
```

---

### Connected Components with Stats

```python
# get statistics for each component
#ans: num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(binary, connectivity=8)
# stats: [x, y, width, height, area] for each label
#ans: for i in range(1, num_labels):
#ans:     x, y, w, h, area = stats[i]
#ans:     cx, cy = centroids[i]
#ans:     print(f"Object {i}: area={area}, center=({cx}, {cy})")
# filter by area
#ans: min_area = 100
#ans: large_components = [i for i in range(1, num_labels) if stats[i, cv2.CC_STAT_AREA] > min_area]
```

---

### Contour Properties

**Contour:** Boundary of region

**Properties:**
- Area
- Perimeter
- Bounding rectangle
- Centroid
- Convex hull
- Moments

---

### Contour Area & Perimeter

```python
contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
#ans: for cnt in contours:
# area
#ans:     area = cv2.contourArea(cnt)
# perimeter
#ans:     perimeter = cv2.arcLength(cnt, True)
#ans:     True means closed contour
# aspect ratio
#ans:     x, y, w, h = cv2.boundingRect(cnt)
#ans:     aspect_ratio = float(w) / h
```

---

### Bounding Rectangle

```python
# straight bounding rectangle
#ans: x, y, w, h = cv2.boundingRect(cnt)
#ans: cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
# minimum area rectangle (can be rotated)
#ans: rect = cv2.minAreaRect(cnt)
#ans: box = cv2.boxPoints(rect)
#ans: box = np.int0(box)
#ans: cv2.drawContours(img, [box], 0, (0, 0, 255), 2)
```

---

### Centroid

**Centroid:** Center of mass of region

**Using moments:**
```python
# compute moments
#ans: M = cv2.moments(cnt)
# centroid coordinates
#ans: if M['m00'] != 0:
#ans:     cx = int(M['m10'] / M['m00'])
#ans:     cy = int(M['m01'] / M['m00'])
#ans: else:
#ans:     cx, cy = 0, 0
# draw centroid
#ans: cv2.circle(img, (cx, cy), 5, (255, 0, 0), -1)
```

---

### Convex Hull

**Convex hull:** Smallest convex polygon containing contour

**Convexity defects:** Gaps between contour and hull

```python
# compute convex hull
#ans: hull = cv2.convexHull(cnt)
#ans: cv2.drawContours(img, [hull], 0, (0, 255, 0), 2)
# check if contour is convex
#ans: is_convex = cv2.isContourConvex(cnt)
# convexity defects
#ans: hull = cv2.convexHull(cnt, returnPoints=False)
#ans: defects = cv2.convexityDefects(cnt, hull)
```

---

### Shape Matching

**matchShapes:** Compare two contours

**Methods:**
- Hu moments (rotation/scale invariant)
- Shape distance metrics

```python
# compare two contours
cnt1 = contours[0]
cnt2 = contours[1]
#ans: distance = cv2.matchShapes(cnt1, cnt2, cv2.CONTOURS_MATCH_I1, 0)
#ans: lower distance = more similar shapes
#ans: 0 means identical, larger = more different
```

---

### Approximating Contours

**approxPolyDP:** Simplify contour to polygon

**Douglas-Peucker algorithm:** Reduces number of points

```python
# approximate contour
epsilon = 0.01 * cv2.arcLength(cnt, True)
#ans: approx = cv2.approxPolyDP(cnt, epsilon, True)
#ans: epsilon: approximation accuracy (smaller = more accurate)
# detect shapes by number of vertices
#ans: if len(approx) == 3:
#ans:     shape = "Triangle"
#ans: elif len(approx) == 4:
#ans:     shape = "Rectangle"
#ans: elif len(approx) > 4:
#ans:     shape = "Circle"
```

---

### Exercises - Part 1 (Concepts)

```python
# what is connected component?
#ans: group of connected pixels with same value
# 4 vs 8 connectivity?
#ans: 4 uses up/down/left/right, 8 adds diagonals
# what is contour?
#ans: boundary of shape/region
# what is centroid?
#ans: center of mass of region
# what is convex hull?
#ans: smallest convex polygon containing contour
```

---

### Exercises - Part 2 (Concepts)

```python
# what are moments?
#ans: mathematical properties describing shape
# how to compute centroid from moments?
#ans: cx = M10/M00, cy = M01/M00
# what is approxPolyDP?
#ans: simplifies contour to polygon with fewer points
# what is shape matching?
#ans: comparing similarity of two contours
```

---

### Exercises - Part 3 (Coding)

```python
# label connected components
_, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
#ans: num_labels, labels = cv2.connectedComponents(binary)
#ans: print(f"Found {num_labels - 1} objects")
# connected components with stats
#ans: num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(binary)
#ans: for i in range(1, num_labels):
#ans:     area = stats[i, cv2.CC_STAT_AREA]
#ans:     cx, cy = centroids[i]
```

---

### Exercises - Part 4 (Coding)

```python
# find and draw contours
contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
#ans: for cnt in contours:
#ans:     area = cv2.contourArea(cnt)
#ans:     if area > 100:
#ans:         x, y, w, h = cv2.boundingRect(cnt)
#ans:         cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)
```

---

### Exercises - Part 5 (Mixed)

```python
# compute centroid
M = cv2.moments(cnt)
#ans: cx = int(M['m10'] / M['m00'])
#ans: cy = int(M['m01'] / M['m00'])
#ans: cv2.circle(img, (cx, cy), 5, (255, 0, 0), -1)
# convex hull
#ans: hull = cv2.convexHull(cnt)
#ans: cv2.drawContours(img, [hull], 0, (0, 255, 0), 2)
# approximate contour
epsilon = 0.02 * cv2.arcLength(cnt, True)
#ans: approx = cv2.approxPolyDP(cnt, epsilon, True)
#ans: print(f"Vertices: {len(approx)}")
```
