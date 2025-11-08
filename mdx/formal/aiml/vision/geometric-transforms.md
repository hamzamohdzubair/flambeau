---
theme: blank2
paginate: true
transition: slide
class: lead
footer: '<span class="breadcrumb"></span>'
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

## Geometric Transforms

---

### Affine Transformations

**Affine transform:** Linear mapping preserving points, straight lines, and planes

**Properties preserved:**
- Parallelism (parallel lines stay parallel)
- Ratios of distances along lines
- Barycenters of weighted points

**Not preserved:**
- Angles
- Distances (except along parallel lines)

**Examples:** Translation, rotation, scaling, shearing

---

### Affine Transform Matrix

**2×3 matrix format:**
```
M = [a  b  tx]
    [c  d  ty]
```

**Transformation:**
```
[x']   [a  b] [x]   [tx]
[y'] = [c  d] [y] + [ty]
```

**Components:**
- [a b; c d]: Linear transformation (rotation, scale, shear)
- [tx; ty]: Translation

---

### Affine Transform in OpenCV

```python
import cv2
import numpy as np
# define 3 points in source
#ans: pts1 = np.float32([[50, 50], [200, 50], [50, 200]])
# define 3 points in destination
#ans: pts2 = np.float32([[10, 100], [200, 50], [100, 250]])
# compute affine matrix
#ans: M = cv2.getAffineTransform(pts1, pts2)
#ans: M is 2x3 matrix
# apply transform
h, w = img.shape[:2]
#ans: result = cv2.warpAffine(img, M, (w, h))
```

---

### Perspective Transform

**Perspective:** Simulates 3D viewing angle

**Properties:**
- Straight lines remain straight
- Parallel lines may converge (vanishing point)
- Preserves collinearity

**Use case:** Document scanning, bird's eye view, rectification

**Matrix:** 3×3 homography matrix

---

### Perspective Transform Matrix

**3×3 homogeneous matrix:**
```
H = [h11  h12  h13]
    [h21  h22  h23]
    [h31  h32  h33]
```

**Transformation:**
```
[x']       [h11  h12  h13] [x]
[y'] = 1/w [h21  h22  h23] [y]
[w ]       [h31  h32  h33] [1]
```

**Need 4 point pairs to solve**

---

### Perspective Transform in OpenCV

```python
# define 4 points in source (corners of document)
#ans: pts1 = np.float32([[56, 65], [368, 52], [28, 387], [389, 390]])
# define 4 points in destination (rectangle)
#ans: pts2 = np.float32([[0, 0], [300, 0], [0, 300], [300, 300]])
# compute perspective matrix
#ans: M = cv2.getPerspectiveTransform(pts1, pts2)
#ans: M is 3x3 homography matrix
# apply transform
#ans: result = cv2.warpPerspective(img, M, (300, 300))
```

---

### Affine vs Perspective

**Affine:**
- 2×3 matrix (6 parameters)
- Need 3 point pairs
- Preserves parallelism
- Faster to compute

**Perspective:**
- 3×3 matrix (8 parameters)
- Need 4 point pairs
- Allows vanishing points
- More general

**Rule:** Use affine if parallelism preserved, perspective otherwise

---

### Shearing

**Shear:** Slants shape of image

**Horizontal shear:**
```
M = [1  sx  0]
    [0   1  0]
```

**Vertical shear:**
```
M = [1   0  0]
    [sy  1  0]
```

---

### Shearing in OpenCV

```python
# horizontal shear
#ans: M = np.float32([[1, 0.5, 0],
#ans:                 [0, 1,   0]])
#ans: sheared = cv2.warpAffine(img, M, (w + int(h*0.5), h))
# vertical shear
M = np.float32([[1,   0, 0],
                [0.5, 1, 0]])
#ans: sheared = cv2.warpAffine(img, M, (w, h + int(w*0.5)))
# combined shear
M = np.float32([[1,  0.3, 0],
                [0.2, 1,  0]])
#ans: sheared = cv2.warpAffine(img, M, (int(w*1.3), int(h*1.2)))
```

---

### Exercises - Part 1 (Concepts)

```python
# what is affine transform?
#ans: linear mapping preserving parallelism and ratios
# affine matrix size?
#ans: 2×3 matrix (6 parameters)
# how many points to define affine?
#ans: 3 point pairs
# what is perspective transform?
#ans: 3D projection, allows vanishing points
# how many points for perspective?
#ans: 4 point pairs
```

---

### Exercises - Part 2 (Concepts)

```python
# what does affine preserve?
#ans: parallelism, ratios of distances, straight lines
# what does perspective NOT preserve?
#ans: parallelism (parallel lines can converge)
# when to use affine vs perspective?
#ans: affine if parallelism kept, perspective for 3D effects
# what is shearing?
#ans: slanting transformation
# perspective matrix size?
#ans: 3×3 homography matrix (8 parameters)
```

---

### Exercises - Part 3 (Coding)

```python
# affine transform from 3 points
pts1 = np.float32([[50, 50], [200, 50], [50, 200]])
pts2 = np.float32([[10, 100], [200, 50], [100, 250]])
#ans: M = cv2.getAffineTransform(pts1, pts2)
h, w = img.shape[:2]
#ans: result = cv2.warpAffine(img, M, (w, h))
```

---

### Exercises - Part 4 (Coding)

```python
# perspective transform (document scan)
pts1 = np.float32([[56, 65], [368, 52], [28, 387], [389, 390]])
pts2 = np.float32([[0, 0], [300, 0], [0, 300], [300, 300]])
#ans: M = cv2.getPerspectiveTransform(pts1, pts2)
#ans: result = cv2.warpPerspective(img, M, (300, 300))
```

---

### Exercises - Part 5 (Mixed)

```python
# horizontal shear by 0.3
#ans: M = np.float32([[1, 0.3, 0],
#ans:                 [0, 1,   0]])
h, w = img.shape[:2]
#ans: sheared = cv2.warpAffine(img, M, (int(w + h*0.3), h))
# combine rotation and scaling in affine
center = (w // 2, h // 2)
#ans: M = cv2.getRotationMatrix2D(center, 45, 1.5)
#ans: result = cv2.warpAffine(img, M, (w, h))
```
