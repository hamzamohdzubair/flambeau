{{yaml}}

{{title}}

## Image Filtering

---

### What is Image Filtering?

**Image filtering** applies a mathematical operation to each pixel based on its neighborhood.

**Purpose:**
- Noise reduction (smoothing)
- Edge enhancement (sharpening)
- Feature detection (gradients, edges)
- Preprocessing for other algorithms

**Key concept:** Output pixel = function of input pixel + neighbors

---

### Types of Filters

**Smoothing (Low-pass) Filters:**
- Blur/Average filter: Simple averaging
- Gaussian filter: Weighted averaging
- Median filter: Replaces with median value

**Sharpening (High-pass) Filters:**
- Enhances edges and details
- Opposite of smoothing

**Edge Detection Filters:**
- Sobel, Prewitt, Scharr
- Detect boundaries and gradients

---

### Averaging (Box) Filter

**Formula:** Each output pixel = average of neighborhood

```
1/9 * [1 1 1]
      [1 1 1]
      [1 1 1]
```

**Effect:** Smooths image, reduces noise, but also blurs edges

**Trade-off:** Larger kernel = more smoothing, more blur

---

### Blur Filter in OpenCV

```python
import cv2
import numpy as np
# simple averaging blur
blurred = cv2.blur(img, (5, 5))
#ans: 5x5 kernel, averages 25 pixels
# what does kernel size mean?
# (5, 5) means 5 rows x 5 columns
#ans: larger kernel = more blur
# blur with different kernel sizes
blur3 = cv2.blur(img, (3, 3))
blur7 = cv2.blur(img, (7, 7))
#ans: blur3 < blur7 (7x7 blurs more)
```

---

### Gaussian Blur

**Gaussian kernel:** Weights center pixel more than edges

```
1/16 * [1  2  1]
       [2  4  2]
       [1  2  1]
```

**Advantages over box filter:**
- More natural blur (mimics optical blur)
- Preserves edges better
- Reduced ringing artifacts

---

### Gaussian Blur in OpenCV

```python
# gaussian blur
gaussian = cv2.GaussianBlur(img, (5, 5), 0)
#ans: 5x5 kernel, sigma=0 (auto-calculated)
# what is sigma?
#ans: standard deviation, controls blur strength
#ans: larger sigma = more blur
# gaussian with specific sigma
gaussian = cv2.GaussianBlur(img, (5, 5), sigmaX=2.0)
#ans: sigma=2.0 controls spread of gaussian
# kernel size must be odd
gaussian = cv2.GaussianBlur(img, (4, 4), 0)
#ans: ERROR! kernel size must be odd (3, 5, 7, etc.)
```

---

### Median Filter

**Median filter:** Replaces pixel with median of neighborhood

**Algorithm:**
1. Sort all pixels in neighborhood
2. Pick middle value (median)
3. Replace center pixel

**Advantage:** Excellent for salt-and-pepper noise (removes outliers)
**Disadvantage:** Slower than linear filters

---

### Median Filter in OpenCV

```python
# median blur (good for salt-pepper noise)
median = cv2.medianBlur(img, 5)
#ans: 5x5 kernel, takes median of 25 pixels
# kernel size must be odd and single value
median = cv2.medianBlur(img, 7)
#ans: 7x7 kernel
# why median for noise?
#ans: outliers (noise) don't affect median
#ans: preserves edges while removing noise
```

---

### Bilateral Filter

**Bilateral filter:** Smooths while preserving edges

**How it works:**
- Considers both spatial distance AND intensity difference
- Pixels far away or very different intensity get less weight

**Formula:** Weight = spatial_weight × intensity_weight

**Use case:** Noise reduction while keeping sharp edges (e.g., portrait smoothing)

---

### Bilateral Filter in OpenCV

```python
# bilateral filter (edge-preserving)
bilateral = cv2.bilateralFilter(img, 9, 75, 75)
#ans: d=9 (diameter), sigmaColor=75, sigmaSpace=75
# what is d?
#ans: diameter of pixel neighborhood
# what is sigmaColor?
#ans: filter sigma in color space (intensity difference)
# what is sigmaSpace?
#ans: filter sigma in coordinate space (spatial distance)
# when to use bilateral?
#ans: noise reduction with edge preservation
```

---

### Exercises - Part 1 (Concepts)

```python
# what does smoothing do?
#ans: reduces noise, blurs image, averages neighborhood
# difference between blur and Gaussian blur?
#ans: Gaussian weights center more, more natural
# what filter for salt-pepper noise?
#ans: median filter (removes outliers)
# why bilateral filter special?
#ans: preserves edges while smoothing
# what is kernel size?
#ans: neighborhood size (e.g., 3x3, 5x5)
```

---

### Exercises - Part 2 (Concepts)

```python
# larger kernel means?
#ans: more smoothing, more blur, slower processing
# why must kernel size be odd?
#ans: needs center pixel (symmetric neighborhood)
# what is sigma in Gaussian?
#ans: standard deviation, controls blur strength
# trade-off of smoothing?
#ans: reduces noise but also blurs edges/details
```

---

### Exercises - Part 3 (Coding)

```python
# apply 3x3 averaging blur
#ans: blurred = cv2.blur(img, (3, 3))
# apply 7x7 gaussian blur
#ans: gaussian = cv2.GaussianBlur(img, (7, 7), 0)
# apply median filter with kernel 5
#ans: median = cv2.medianBlur(img, 5)
# apply bilateral filter
#ans: bilateral = cv2.bilateralFilter(img, 9, 75, 75)
```

---

### Exercises - Part 4 (Coding)

```python
# gaussian blur with sigma=3
#ans: gaussian = cv2.GaussianBlur(img, (0, 0), sigmaX=3)
#ans: kernel size auto-calculated from sigma
# compare blur strengths
blur_small = cv2.blur(img, (3, 3))
blur_large = cv2.blur(img, (9, 9))
#ans: blur_large is much more blurred
# apply median blur on grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#ans: median = cv2.medianBlur(gray, 5)
```

---

### Exercises - Part 5 (Mixed)

```python
# what happens with even kernel size?
blurred = cv2.blur(img, (4, 4))
#ans: works for blur, but not for GaussianBlur/medianBlur
# which is faster: median or gaussian?
#ans: gaussian (linear filter) faster than median
# bilateral with large sigmaColor?
bilateral = cv2.bilateralFilter(img, 9, 150, 75)
#ans: more aggressive smoothing of similar colors
# bilateral with large sigmaSpace?
bilateral = cv2.bilateralFilter(img, 9, 75, 150)
#ans: considers pixels farther away spatially
```

---

### Exercises - Part 6 (Mixed)

```python
# multiple blurs in sequence
blur1 = cv2.GaussianBlur(img, (5, 5), 0)
blur2 = cv2.GaussianBlur(blur1, (5, 5), 0)
#ans: double blur = more smoothing
# can you blur already blurred image?
#ans: yes, accumulates blur effect
# blur only one channel
img[:, :, 0] = cv2.blur(img[:, :, 0], (5, 5))
#ans: blurs blue channel only
```
