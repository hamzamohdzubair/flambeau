{{yaml}}

{{title}}

## Pixel Operations

---

### What are Pixel Operations?

**Pixel operations** modify pixel values directly:
- **Point operations**: Each output pixel depends only on corresponding input pixel
- **Local operations**: Output depends on neighborhood (covered in filtering)

**Common pixel operations:**
- Arithmetic: add, subtract, multiply, divide
- Logical: AND, OR, XOR, NOT
- Thresholding: binary, adaptive
- Normalization: rescaling pixel values

---

### Image Arithmetic

**Addition:** Brightens image (careful of overflow!)
```
result = img1 + img2
```

**Subtraction:** Finds differences, motion detection
```
result = img1 - img2
```

**Multiplication:** Contrast adjustment, masking
```
result = img * scalar
```

**Important:** Use `cv2.add()` instead of `+` to prevent overflow

---

### NumPy vs OpenCV Arithmetic

**NumPy (modulo arithmetic):**
```python
255 + 10 = 9  # wraps around
```

**OpenCV (saturated arithmetic):**
```python
cv2.add(255, 10) = 255  # clips to max
```

**When to use:**
- NumPy `+`: Fast, but beware overflow
- `cv2.add()`: Safe, prevents overflow (saturates)

---

### Image Addition

```python
import cv2
import numpy as np
# numpy addition (overflow)
img = np.array([[250]], dtype=np.uint8)
result = img + np.array([[10]], dtype=np.uint8)
#ans: (250 + 10) % 256 = 4 (overflow!)
# opencv addition (saturation)
result = cv2.add(img, np.array([[10]], dtype=np.uint8))
#ans: min(250 + 10, 255) = 255 (clips to max)
```

---

### Brightening & Darkening

```python
# brighten image (add constant)
#ans: bright = cv2.add(img, np.array([50]))
#ans: adds 50 to all pixels (saturates at 255)
# darken image (subtract constant)
#ans: dark = cv2.subtract(img, np.array([50]))
#ans: subtracts 50 (saturates at 0)
# alternative using numpy (watch overflow!)
bright = np.clip(img + 50, 0, 255).astype(np.uint8)
#ans: clip prevents overflow
```

---

### Image Blending

```python
# weighted sum of two images
img1 = cv2.imread('image1.jpg')
img2 = cv2.imread('image2.jpg')
# alpha blending: result = α*img1 + β*img2 + γ
#ans: blended = cv2.addWeighted(img1, 0.7, img2, 0.3, 0)
#ans: 70% img1 + 30% img2
# must satisfy: α + β = 1 for proper blending
#ans: ensures output stays in valid range
```

---

### Bitwise Operations

```python
# bitwise AND (intersection)
result = cv2.bitwise_and(img1, img2)
#ans: keeps pixels where both are non-zero
# bitwise OR (union)
result = cv2.bitwise_or(img1, img2)
#ans: combines regions from both images
# bitwise NOT (invert)
result = cv2.bitwise_not(img)
#ans: inverts all bits (negative image)
# bitwise XOR (difference)
result = cv2.bitwise_xor(img1, img2)
#ans: highlights differences
```

---

### Binary Thresholding

```python
# simple thresholding
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
ret, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
#ans: pixels > 127 become 255, others become 0
# inverse threshold
ret, inv = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)
#ans: pixels > 127 become 0, others become 255
# ret is the threshold value used
#ans: useful for automatic thresholding methods
```

---

### Image Masking

```python
# create circular mask
mask = np.zeros(img.shape[:2], dtype=np.uint8)
cv2.circle(mask, (center_x, center_y), radius, 255, -1)
#ans: circular region is 255, rest is 0
# apply mask to image
result = cv2.bitwise_and(img, img, mask=mask)
#ans: keeps only circular region, rest black
# inverse masking
inv_mask = cv2.bitwise_not(mask)
background = cv2.bitwise_and(img, img, mask=inv_mask)
#ans: keeps everything except circle
```

---

### Normalization

```python
# normalize to 0-255 range
normalized = cv2.normalize(img, None, 0, 255, cv2.NORM_MINMAX)
#ans: scales min value to 0, max to 255
# why normalize?
#ans: improves contrast, standardizes range
#ans: useful before visualization or further processing
# manual normalization
#ans: norm = ((img - img.min()) / (img.max() - img.min()) * 255).astype(np.uint8)
#ans: same effect as cv2.normalize
```

---

### Exercises - Part 1 (Concepts)

```python
# what's the difference?
result1 = img + 10
result2 = cv2.add(img, 10)
#ans: result1 wraps (modulo), result2 saturates
# when does overflow occur?
img = np.array([[250]], dtype=np.uint8)
result = img + np.array([[20]])
#ans: (250+20)%256 = 14, overflow!
# what is alpha blending formula?
result = cv2.addWeighted(img1, 0.7, img2, 0.3, 0)
#ans: result = 0.7*img1 + 0.3*img2 + 0
# what should α + β equal?
#ans: 1.0 for proper blending (preserves intensity)
```

---

### Exercises - Part 2 (Concepts)

```python
# what does bitwise_and do with masks?
result = cv2.bitwise_and(img, img, mask=mask)
#ans: keeps pixels where mask=255, others=0
# what does thresholding do?
ret, binary = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
#ans: converts to binary (only 0 or 255)
# why normalize images?
#ans: improves contrast, standardizes range
# what is image inversion?
inv = cv2.bitwise_not(img)
#ans: dark becomes light, light becomes dark
```

---

### Exercises - Part 3 (Coding)

```python
# brighten image by 30
#ans: bright = cv2.add(img, np.array([30]))
#ans: adds 30, saturates at 255
# darken image by 50
#ans: dark = cv2.subtract(img, np.array([50]))
#ans: subtracts 50, saturates at 0
# blend two images 50-50
#ans: blended = cv2.addWeighted(img1, 0.5, img2, 0.5, 0)
#ans: equal mix of both images
```

---

### Exercises - Part 4 (Coding)

```python
# create negative image
#ans: negative = cv2.bitwise_not(img)
#ans: 255 - pixel_value for all pixels
# threshold at 100
#ans: ret, binary = cv2.threshold(gray, 100, 255, cv2.THRESH_BINARY)
#ans: > 100 becomes 255, ≤ 100 becomes 0
# create rectangular mask
#ans: mask = np.zeros((480, 640), dtype=np.uint8)
#ans: mask[100:300, 200:400] = 255
#ans: rectangle from (100,200) to (300,400) is white
```

---

### Exercises - Part 5 (Coding)

```python
# what is the output?
img = np.array([[200]], dtype=np.uint8)
result = cv2.add(img, np.array([[100]]))
#ans: 255 (saturates at max)
# XOR of image with itself?
result = cv2.bitwise_xor(img, img)
#ans: all zeros (anything XOR itself = 0)
# normalize image to 0-1 range
#ans: norm = img.astype(float) / 255.0
#ans: scales to [0.0, 1.0] range
# apply mask to extract ROI
#ans: roi = cv2.bitwise_and(img, img, mask=mask)
#ans: region of interest extracted, rest black
```

---

### Exercises - Part 6 (Mixed)

```python
# what happens here?
img = np.array([[100, 200]], dtype=np.uint8)
result = img * 2
#ans: [200, 400%256] = [200, 144] (overflow on 2nd)
# using cv2.multiply instead?
result = cv2.multiply(img, np.array([[2]]))
#ans: [200, 255] (saturates at 255)
# blend with different gamma
blended = cv2.addWeighted(img1, 0.6, img2, 0.4, 10)
#ans: 0.6*img1 + 0.4*img2 + 10 (adds 10 to all pixels)
```

---

### Exercises - Part 7 (Mixed)

```python
# invert only specific channel
img = cv2.imread('img.jpg')
img[:, :, 0] = cv2.bitwise_not(img[:, :, 0])
#ans: inverts blue channel only
# threshold with different max value
ret, binary = cv2.threshold(gray, 127, 200, cv2.THRESH_BINARY)
#ans: pixels > 127 become 200 (not 255)
# combine two masks
mask3 = cv2.bitwise_or(mask1, mask2)
#ans: union of both masks
```
