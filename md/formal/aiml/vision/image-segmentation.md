{{yaml}}

{{title}}

## Image Segmentation

---

### What is Image Segmentation?

**Segmentation:** Partitioning image into meaningful regions

**Goal:** Group pixels belonging to same object/region

**Types:**
- **Semantic segmentation:** Label each pixel by class
- **Instance segmentation:** Separate individual objects
- **Panoptic segmentation:** Combine semantic + instance

**Methods:** Thresholding, clustering, watershedding, deep learning

---

### Thresholding Methods

**Simple thresholding:** Fixed threshold

**Adaptive thresholding:** Local threshold per region

**Otsu's method:** Automatic optimal threshold

```python
import cv2
# simple threshold
_, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
# Otsu's automatic threshold
#ans: ret, binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
#ans: ret is the computed threshold value
```

---

### Adaptive Thresholding

**Why adaptive?** Handles varying illumination

**Methods:**
- Mean: Threshold = mean of neighborhood - C
- Gaussian: Threshold = weighted mean - C

```python
# adaptive mean thresholding
#ans: adaptive = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, blockSize=11, C=2)
# adaptive Gaussian thresholding
#ans: adaptive = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
# blockSize: neighborhood size (must be odd)
#ans: C: constant subtracted from mean
```

---

### Watershed Segmentation

**Watershed algorithm:** Treats image like topographic map

**Concept:**
- Image is topographic surface (intensity = height)
- Water fills basins from markers
- Watershed lines separate regions

**Steps:**
1. Find markers (sure foreground)
2. Find background
3. Apply watershed
4. Extract boundaries

---

### Watershed Implementation

```python
# binary threshold
_, binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
# noise removal (opening)
kernel = np.ones((3, 3), np.uint8)
opening = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel, iterations=2)
# sure background (dilation)
#ans: sure_bg = cv2.dilate(opening, kernel, iterations=3)
# sure foreground (distance transform + threshold)
#ans: dist_transform = cv2.distanceTransform(opening, cv2.DIST_L2, 5)
#ans: _, sure_fg = cv2.threshold(dist_transform, 0.7 * dist_transform.max(), 255, 0)
# unknown region
#ans: sure_fg = np.uint8(sure_fg)
#ans: unknown = cv2.subtract(sure_bg, sure_fg)
```

---

### Watershed Markers

```python
# label markers
#ans: _, markers = cv2.connectedComponents(sure_fg)
# add 1 to all labels (background becomes 1, not 0)
#ans: markers = markers + 1
# mark unknown region as 0
#ans: markers[unknown == 255] = 0
# apply watershed
#ans: markers = cv2.watershed(img, markers)
# mark boundaries (-1) in red
#ans: img[markers == -1] = [0, 0, 255]
```

---

### GrabCut

**GrabCut:** Iterative segmentation using graph cuts

**Input:** Rectangle around object

**Algorithm:**
- Iteratively estimates foreground/background
- Uses Gaussian Mixture Models (GMM)
- Refines boundary

**Advantage:** Semi-automatic, minimal user input

---

### GrabCut in OpenCV

```python
# define rectangle around object
#ans: rect = (50, 50, 450, 290)  # (x, y, width, height)
# initialize mask and models
mask = np.zeros(img.shape[:2], np.uint8)
bgdModel = np.zeros((1, 65), np.float64)
fgdModel = np.zeros((1, 65), np.float64)
# apply GrabCut
#ans: cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)
#ans: 5 iterations
# extract foreground
#ans: mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
#ans: result = img * mask2[:, :, np.newaxis]
```

---

### K-Means Clustering

**K-Means:** Cluster pixels by color similarity

**Steps:**
1. Reshape image to list of pixels
2. Apply k-means (k clusters)
3. Replace pixels with cluster centers
4. Reshape back

**Result:** Segmented regions with k colors

---

### K-Means in OpenCV

```python
# reshape to 2D array of pixels
#ans: pixels = img.reshape((-1, 3))
#ans: pixels = np.float32(pixels)
# define criteria and apply k-means
criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 0.2)
k = 3
#ans: _, labels, centers = cv2.kmeans(pixels, k, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
# convert centers to uint8
#ans: centers = np.uint8(centers)
# map labels to centers
#ans: segmented = centers[labels.flatten()]
#ans: segmented = segmented.reshape(img.shape)
```

---

### Contour-Based Segmentation

**Contours:** Boundaries of shapes

**findContours:** Detects all contours

```python
# threshold to binary
_, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
# find contours
#ans: contours, hierarchy = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
# draw contours
#ans: cv2.drawContours(img, contours, -1, (0, 255, 0), 2)
#ans: -1 draws all contours
# filter by area
#ans: large_contours = [c for c in contours if cv2.contourArea(c) > 1000]
```

---

### Exercises - Part 1 (Concepts)

```python
# what is image segmentation?
#ans: partitioning image into meaningful regions
# what is Otsu's method?
#ans: automatic optimal threshold computation
# why adaptive thresholding?
#ans: handles varying illumination
# what is watershed algorithm?
#ans: treats image as topographic map, fills basins
# what is GrabCut?
#ans: iterative segmentation using graph cuts and GMMs
```

---

### Exercises - Part 2 (Concepts)

```python
# k-means for segmentation?
#ans: clusters pixels by color similarity
# what are contours?
#ans: boundaries of shapes/objects
# semantic vs instance segmentation?
#ans: semantic labels pixels, instance separates objects
# advantage of GrabCut?
#ans: semi-automatic, needs only rectangle input
```

---

### Exercises - Part 3 (Coding)

```python
# Otsu's thresholding
#ans: ret, binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
# adaptive thresholding
#ans: adaptive = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
# find contours
_, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
#ans: contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
#ans: cv2.drawContours(img, contours, -1, (0, 255, 0), 2)
```

---

### Exercises - Part 4 (Coding)

```python
# k-means with 4 clusters
pixels = img.reshape((-1, 3))
pixels = np.float32(pixels)
criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 0.2)
#ans: _, labels, centers = cv2.kmeans(pixels, 4, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
#ans: centers = np.uint8(centers)
#ans: segmented = centers[labels.flatten()].reshape(img.shape)
```

---

### Exercises - Part 5 (Mixed)

```python
# GrabCut segmentation
rect = (50, 50, 450, 290)
mask = np.zeros(img.shape[:2], np.uint8)
bgdModel = np.zeros((1, 65), np.float64)
fgdModel = np.zeros((1, 65), np.float64)
#ans: cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)
#ans: mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
#ans: result = img * mask2[:, :, np.newaxis]
```
