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

## Kernels & Convolution

---

### What is a Kernel?

A **kernel** (or filter) is a small matrix used to apply effects to an image.

**Examples:**
```
3x3 Identity    3x3 Blur       3x3 Sharpen
[0  0  0]       [1  1  1]      [ 0 -1  0]
[0  1  0]       [1  1  1]/9    [-1  5 -1]
[0  0  0]       [1  1  1]      [ 0 -1  0]
```

**Size:** Usually small (3×3, 5×5, 7×7) and odd-sized
**Purpose:** Define how to combine neighborhood pixels

---

### What is Convolution?

**Convolution** is sliding a kernel over an image and computing weighted sums.

**Process:**
1. Place kernel on image region
2. Multiply corresponding elements
3. Sum all products
4. Result = new pixel value
5. Slide kernel to next position

**Formula:** `Output(x,y) = Σ Kernel(i,j) × Image(x+i, y+j)`

---

### Convolution Example

```
Image patch:     Kernel:          Operation:
[10  20  30]     [1  0 -1]       10×1 + 20×0 + 30×(-1)
[40  50  60]  ×  [1  0 -1]   =   40×1 + 50×0 + 60×(-1)
[70  80  90]     [1  0 -1]       70×1 + 80×0 + 90×(-1)

Sum = (10-30) + (40-60) + (70-90) = -60
```

**Result:** One output pixel value = -60

---

### Edge Handling

**Problem:** Kernel extends beyond image border

**Solutions:**
- **Zero padding:** Add zeros around border
- **Border replication:** Repeat edge pixels
- **Reflection:** Mirror border pixels
- **Wrap around:** Opposite edge wraps

OpenCV default: Reflection (`cv2.BORDER_REFLECT_101`)

---

### Custom Convolution in OpenCV

```python
import cv2
import numpy as np
# define a 3x3 identity kernel
kernel = np.array([[0, 0, 0],
                   [0, 1, 0],
                   [0, 0, 0]], dtype=np.float32)
# apply convolution
result = cv2.filter2D(img, -1, kernel)
#ans: -1 means output same depth as input
# identity kernel returns original image
#ans: center weight=1, others=0, no change
```

---

### Box Blur Kernel

```python
# 3x3 averaging kernel
kernel = np.ones((3, 3), dtype=np.float32) / 9
#ans: all weights = 1/9, sums to 1
# apply box blur
blurred = cv2.filter2D(img, -1, kernel)
#ans: same as cv2.blur(img, (3, 3))
# 5x5 box blur kernel
kernel = np.ones((5, 5), dtype=np.float32) / 25
result = cv2.filter2D(img, -1, kernel)
#ans: averages 25 pixels, more blur
```

---

### Sharpening Kernel

```python
# sharpen kernel (enhances edges)
kernel = np.array([[ 0, -1,  0],
                   [-1,  5, -1],
                   [ 0, -1,  0]], dtype=np.float32)
#ans: center=5, neighbors=-1, enhances differences
sharpened = cv2.filter2D(img, -1, kernel)
#ans: edges become more pronounced
# why does this sharpen?
#ans: amplifies center, subtracts neighbors (enhances edges)
```

---

### Edge Detection Kernels

```python
# horizontal edge detection (Prewitt)
kernel_h = np.array([[-1, -1, -1],
                     [ 0,  0,  0],
                     [ 1,  1,  1]], dtype=np.float32)
#ans: detects horizontal edges (top-bottom transition)
# vertical edge detection
kernel_v = np.array([[-1,  0,  1],
                     [-1,  0,  1],
                     [-1,  0,  1]], dtype=np.float32)
#ans: detects vertical edges (left-right transition)
edges_h = cv2.filter2D(gray, -1, kernel_h)
edges_v = cv2.filter2D(gray, -1, kernel_v)
#ans: apply to grayscale for best results
```

---

### Gaussian Kernel

```python
# 5x5 gaussian kernel approximation
kernel = np.array([[1,  4,  6,  4, 1],
                   [4, 16, 24, 16, 4],
                   [6, 24, 36, 24, 6],
                   [4, 16, 24, 16, 4],
                   [1,  4,  6,  4, 1]], dtype=np.float32) / 256
#ans: weights decrease from center (gaussian distribution)
gaussian = cv2.filter2D(img, -1, kernel)
#ans: similar to cv2.GaussianBlur but custom kernel
```

---

### Kernel Normalization

**Why normalize?** Keep output in valid range (0-255)

**Formula:** Divide by sum of kernel weights

```python
# unnormalized kernel
kernel = np.array([[1, 2, 1],
                   [2, 4, 2],
                   [1, 2, 1]], dtype=np.float32)
# sum of weights
kernel_sum = kernel.sum()  # = 16
#ans: sum = 1+2+1+2+4+2+1+2+1 = 16
# normalize
kernel_norm = kernel / kernel_sum
#ans: ensures output stays in range
```

---

### Exercises - Part 1 (Concepts)

```python
# what does convolution do?
#ans: slides kernel over image, computes weighted sums
# why odd kernel sizes?
#ans: needs center pixel for symmetry
# what is identity kernel?
kernel = np.array([[0, 0, 0],
                   [0, 1, 0],
                   [0, 0, 0]])
#ans: returns original image (no change)
# what does sum of weights=1 ensure?
#ans: preserves brightness, no amplification
```

---

### Exercises - Part 2 (Concepts)

```python
# what detects vertical edges?
#ans: kernel with [-1, 0, 1] pattern horizontally
# what is cv2.filter2D ddepth parameter?
result = cv2.filter2D(img, -1, kernel)
#ans: -1 means same depth as source
# difference between blur and sharpen kernels?
#ans: blur averages (positive weights), sharpen enhances (negative neighbors)
# why apply edge detection on grayscale?
#ans: simpler, one channel, intensity changes are edges
```

---

### Exercises - Part 3 (Coding)

```python
# create 3x3 identity kernel
#ans: kernel = np.array([[0, 0, 0],
#ans:                    [0, 1, 0],
#ans:                    [0, 0, 0]], dtype=np.float32)
# apply identity kernel
#ans: result = cv2.filter2D(img, -1, kernel)
# create 3x3 box blur kernel
#ans: kernel = np.ones((3, 3), dtype=np.float32) / 9
#ans: result = cv2.filter2D(img, -1, kernel)
```

---

### Exercises - Part 4 (Coding)

```python
# create sharpen kernel
#ans: kernel = np.array([[ 0, -1,  0],
#ans:                    [-1,  5, -1],
#ans:                    [ 0, -1,  0]], dtype=np.float32)
# apply sharpen
#ans: sharpened = cv2.filter2D(img, -1, kernel)
# create horizontal edge kernel
#ans: kernel = np.array([[-1, -1, -1],
#ans:                    [ 0,  0,  0],
#ans:                    [ 1,  1,  1]], dtype=np.float32)
```

---

### Exercises - Part 5 (Coding)

```python
# create emboss kernel
#ans: kernel = np.array([[-2, -1,  0],
#ans:                    [-1,  1,  1],
#ans:                    [ 0,  1,  2]], dtype=np.float32)
#ans: embossed = cv2.filter2D(gray, -1, kernel)
# create outline kernel
#ans: kernel = np.array([[-1, -1, -1],
#ans:                    [-1,  8, -1],
#ans:                    [-1, -1, -1]], dtype=np.float32)
#ans: outline = cv2.filter2D(img, -1, kernel)
```

---

### Exercises - Part 6 (Mixed)

```python
# normalize a custom kernel
kernel = np.array([[1, 2, 1],
                   [2, 4, 2],
                   [1, 2, 1]], dtype=np.float32)
#ans: kernel_norm = kernel / kernel.sum()
#ans: sum = 16, so divide by 16
# what is the sum after normalization?
#ans: 1.0 (preserves brightness)
# create strong sharpen (center=9)
#ans: kernel = np.array([[ 0, -1,  0],
#ans:                    [-1,  9, -1],
#ans:                    [ 0, -1,  0]], dtype=np.float32)
```

---

### Exercises - Part 7 (Mixed)

```python
# 5x5 average kernel
#ans: kernel = np.ones((5, 5), dtype=np.float32) / 25
# left edge detection
#ans: kernel = np.array([[1,  0, -1],
#ans:                    [2,  0, -2],
#ans:                    [1,  0, -1]], dtype=np.float32)
#ans: this is Sobel-X kernel
# combine two edge detections
edges_h = cv2.filter2D(gray, -1, kernel_h)
edges_v = cv2.filter2D(gray, -1, kernel_v)
#ans: edges = cv2.addWeighted(edges_h, 0.5, edges_v, 0.5, 0)
#ans: combines horizontal and vertical edges
```

---

### Exercises - Part 8 (Advanced)

```python
# motion blur kernel (horizontal)
#ans: kernel = np.zeros((5, 5), dtype=np.float32)
#ans: kernel[2, :] = 1/5
#ans: horizontal motion blur effect
# apply convolution with border handling
#ans: result = cv2.filter2D(img, -1, kernel, borderType=cv2.BORDER_CONSTANT)
# create custom gaussian-like kernel
#ans: kernel = np.array([[1, 2, 1],
#ans:                    [2, 4, 2],
#ans:                    [1, 2, 1]], dtype=np.float32) / 16
```
