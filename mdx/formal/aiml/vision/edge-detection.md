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

## Edge Detection

---

### What are Edges?

**Edge:** Significant local change in pixel intensity (boundary between regions)

**Types of edges:**
- **Step edge:** Sharp intensity change
- **Ramp edge:** Gradual intensity change
- **Roof edge:** Peak or valley

**Why detect edges?**
- Object boundaries
- Feature extraction
- Image segmentation
- Shape analysis

---

### Gradient-Based Edge Detection

**Image gradient:** Rate of change in intensity

**Gradient components:**
- **Gx:** Horizontal gradient (∂I/∂x)
- **Gy:** Vertical gradient (∂I/∂y)

**Gradient magnitude:** `G = √(Gx² + Gy²)`
**Gradient direction:** `θ = arctan(Gy/Gx)`

**Large gradient = edge!**

---

### Sobel Edge Detection

**Sobel kernels:** Approximate gradient with smoothing

```
Sobel X:            Sobel Y:
[-1  0  1]          [-1 -2 -1]
[-2  0  2]          [ 0  0  0]
[-1  0  1]          [ 1  2  1]
```

**Features:**
- Combines gradient + smoothing
- 3×3 kernels
- Good noise resistance

---

### Sobel in OpenCV

```python
import cv2
import numpy as np
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# compute sobel x (vertical edges)
sobelx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
#ans: dx=1, dy=0 means x-derivative (vertical edges)
# compute sobel y (horizontal edges)
sobely = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)
#ans: dx=0, dy=1 means y-derivative (horizontal edges)
# combine both gradients
#ans: magnitude = np.sqrt(sobelx**2 + sobely**2)
# convert to uint8 for display
#ans: magnitude = np.uint8(np.clip(magnitude, 0, 255))
```

---

### Sobel Parameters

```python
# cv2.Sobel(src, ddepth, dx, dy, ksize)
sobelx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=5)
# ddepth: output image depth
#ans: CV_64F to avoid negative values being clipped
# dx, dy: derivative order
#ans: (1,0)=x-direction, (0,1)=y-direction
# ksize: kernel size (1, 3, 5, 7)
#ans: larger kernel = more smoothing, less noise
```

---

### Scharr Edge Detection

**Scharr:** More accurate gradient than Sobel for small 3×3 kernels

```
Scharr X:           Scharr Y:
[-3   0   3]        [-3 -10  -3]
[-10  0  10]        [ 0   0   0]
[-3   0   3]        [ 3  10   3]
```

**When to use:** Need more accuracy with 3×3 kernel

---

### Scharr in OpenCV

```python
# scharr gradient (more accurate than sobel)
scharrx = cv2.Scharr(gray, cv2.CV_64F, 1, 0)
#ans: x-direction gradient
scharry = cv2.Scharr(gray, cv2.CV_64F, 0, 1)
#ans: y-direction gradient
# only works with 3x3 kernel
#ans: more accurate than 3x3 Sobel
# combine gradients
magnitude = np.sqrt(scharrx**2 + scharry**2)
#ans: same as Sobel combination
```

---

### Laplacian Edge Detection

**Laplacian:** Second derivative operator

```
Laplacian kernel:
[0   1  0]
[1  -4  1]
[0   1  0]
```

**Formula:** ∂²I/∂x² + ∂²I/∂y²

**Property:** Sensitive to noise (use after smoothing!)

---

### Laplacian in OpenCV

```python
# laplacian (2nd derivative)
laplacian = cv2.Laplacian(gray, cv2.CV_64F, ksize=3)
#ans: detects edges in all directions
# why second derivative?
#ans: zero-crossing = edge location
# laplacian is very noise-sensitive
blurred = cv2.GaussianBlur(gray, (3, 3), 0)
laplacian = cv2.Laplacian(blurred, cv2.CV_64F)
#ans: blur first to reduce noise
```

---

### Canny Edge Detection

**Canny:** Multi-stage algorithm (best edge detector!)

**Steps:**
1. Gaussian smoothing (noise reduction)
2. Gradient calculation (Sobel)
3. Non-maximum suppression (thin edges)
4. Double thresholding (strong/weak edges)
5. Edge tracking by hysteresis

**Output:** Binary edge map (0 or 255)

---

### Canny Parameters

```python
# canny edge detection
edges = cv2.Canny(gray, threshold1=50, threshold2=150)
#ans: threshold1=low, threshold2=high
# threshold1 (low threshold):
#ans: weak edges below this are discarded
# threshold2 (high threshold):
#ans: strong edges above this are kept
# ratio recommendation:
#ans: threshold2 = 2 × threshold1 or 3 × threshold1
# edges between thresholds:
#ans: kept if connected to strong edge (hysteresis)
```

---

### Canny in OpenCV

```python
# basic canny
edges = cv2.Canny(gray, 50, 150)
#ans: detects edges, outputs binary image
# canny with aperture size
edges = cv2.Canny(gray, 50, 150, apertureSize=3)
#ans: apertureSize for Sobel operator (3, 5, 7)
# canny with L2 gradient
edges = cv2.Canny(gray, 50, 150, L2gradient=True)
#ans: L2gradient=True uses √(Gx²+Gy²), more accurate
#ans: L2gradient=False uses |Gx|+|Gy|, faster
```

---

### Choosing Thresholds

**Low threshold:** Too low → noise edges
**High threshold:** Too high → missed edges

**Strategy:**
- Try ratio 2:1 or 3:1 (e.g., 50, 150)
- Adjust based on results
- High contrast images → higher thresholds
- Low contrast images → lower thresholds

---

### Exercises - Part 1 (Concepts)

```python
# what defines an edge?
#ans: significant change in pixel intensity
# what is gradient magnitude?
#ans: √(Gx² + Gy²), strength of intensity change
# sobel x detects which edges?
#ans: vertical edges (left-right transitions)
# why use CV_64F for sobel?
#ans: preserves negative values, prevents clipping
# what does canny output?
#ans: binary edge map (0 or 255)
```

---

### Exercises - Part 2 (Concepts)

```python
# difference between sobel and scharr?
#ans: scharr more accurate for 3x3 kernels
# why is laplacian noise-sensitive?
#ans: second derivative amplifies noise
# what is non-maximum suppression?
#ans: thins edges to single-pixel width
# what is hysteresis in canny?
#ans: connects weak edges to strong edges
# recommended canny threshold ratio?
#ans: high = 2×low or 3×low
```

---

### Exercises - Part 3 (Coding)

```python
# convert to grayscale
#ans: gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# compute sobel x
#ans: sobelx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
# compute sobel y
#ans: sobely = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)
# combine sobel x and y
#ans: magnitude = np.sqrt(sobelx**2 + sobely**2)
#ans: magnitude = np.uint8(np.clip(magnitude, 0, 255))
```

---

### Exercises - Part 4 (Coding)

```python
# apply canny with thresholds 100, 200
#ans: edges = cv2.Canny(gray, 100, 200)
# apply laplacian
#ans: laplacian = cv2.Laplacian(gray, cv2.CV_64F, ksize=3)
# apply scharr x
#ans: scharrx = cv2.Scharr(gray, cv2.CV_64F, 1, 0)
# apply scharr y
#ans: scharry = cv2.Scharr(gray, cv2.CV_64F, 0, 1)
```

---

### Exercises - Part 5 (Coding)

```python
# canny with different thresholds
edges1 = cv2.Canny(gray, 30, 90)
edges2 = cv2.Canny(gray, 100, 300)
#ans: edges1 detects more (lower thresholds)
#ans: edges2 detects fewer (higher thresholds)
# blur before canny
#ans: blurred = cv2.GaussianBlur(gray, (5, 5), 0)
#ans: edges = cv2.Canny(blurred, 50, 150)
#ans: reduces noise in edge detection
```

---

### Exercises - Part 6 (Mixed)

```python
# sobel with larger kernel
sobelx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=7)
#ans: more smoothing, less sensitive to noise
# absolute value of sobel
#ans: abs_sobelx = np.absolute(sobelx)
#ans: converts negative gradients to positive
# canny with L2 gradient
edges = cv2.Canny(gray, 50, 150, L2gradient=True)
#ans: more accurate gradient calculation
```

---

### Exercises - Part 7 (Mixed)

```python
# gradient direction from sobel
sobelx = cv2.Sobel(gray, cv2.CV_64F, 1, 0)
sobely = cv2.Sobel(gray, cv2.CV_64F, 0, 1)
#ans: direction = np.arctan2(sobely, sobelx)
#ans: direction in radians
# combine laplacian and gaussian
#ans: blurred = cv2.GaussianBlur(gray, (5, 5), 0)
#ans: laplacian = cv2.Laplacian(blurred, cv2.CV_64F)
# what is LoG?
#ans: Laplacian of Gaussian (blur + laplacian)
#ans: reduces noise sensitivity
```

---

### Exercises - Part 8 (Advanced)

```python
# automatic canny threshold (median-based)
median = np.median(gray)
#ans: lower = int(max(0, 0.7 * median))
#ans: upper = int(min(255, 1.3 * median))
#ans: edges = cv2.Canny(gray, lower, upper)
# combine canny with morphology
edges = cv2.Canny(gray, 50, 150)
kernel = np.ones((3, 3), dtype=np.uint8)
#ans: edges = cv2.dilate(edges, kernel, iterations=1)
#ans: thickens edges for better visibility
```
