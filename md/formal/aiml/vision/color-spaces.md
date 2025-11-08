{{yaml}}

{{title}}

## Color Spaces

---

### What are Color Spaces?

A **color space** is a mathematical model for representing colors as numbers.

**Why multiple color spaces?**
- Different tasks need different representations
- Some spaces better for color segmentation (HSV)
- Some better for perceptual uniformity (LAB)
- Some better for storage/transmission (RGB/BGR)

**Common color spaces:**
- **RGB/BGR**: Red, Green, Blue (device-dependent)
- **HSV**: Hue, Saturation, Value (perceptually intuitive)
- **LAB**: Lightness, A (green-red), B (blue-yellow) (perceptually uniform)

---

### RGB vs BGR

**RGB**: Red, Green, Blue (standard in most libraries)
**BGR**: Blue, Green, Red (OpenCV's default)

Why OpenCV uses BGR?
- Historical reasons (early camera manufacturers)
- Legacy from older image processing libraries

**Important:** Always convert BGR to RGB for display with matplotlib!

---

### HSV Color Space

**HSV = Hue, Saturation, Value**
- **Hue**: Color type (0-179 in OpenCV, represents 0-360°)
  - Red: 0°, Green: 120°, Blue: 240°
- **Saturation**: Color intensity (0-255)
  - 0 = grayscale, 255 = pure color
- **Value**: Brightness (0-255)
  - 0 = black, 255 = brightest

**When to use:** Color-based object detection, skin detection, color segmentation

---

### BGR to RGB Conversion

```python
import cv2

# opencv uses BGR by default
img_bgr = cv2.imread('image.jpg')
#ans: blue, green, red order

# convert to RGB
img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
#ans: red, green, blue order

# channels are swapped
print(img_bgr[0, 0])  # [B, G, R]
print(img_rgb[0, 0])  # [R, G, B]
#ans: values are in different order
```

---

### RGB to Grayscale

```python
# convert to grayscale
img = cv2.imread('image.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#ans: single channel intensity

print(gray.shape)
#ans: (height, width) - no channel dimension

# grayscale formula (weighted average)
# Gray = 0.299*R + 0.587*G + 0.114*B
#ans: green weighted more (human eye sensitivity)
```

---

### Converting to HSV

```python
# convert to HSV
img = cv2.imread('image.jpg')
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
#ans: hue, saturation, value

# split HSV channels
h, s, v = cv2.split(hsv)
#ans: separate channels
print(h.shape)
#ans: (height, width)

# HSV ranges in OpenCV
#ans: H: 0-179, S: 0-255, V: 0-255
```

---

### Color Thresholding in HSV

```python
# detect red objects using HSV
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# define red color range (hue wraps around)
lower_red = np.array([0, 100, 100])
upper_red = np.array([10, 255, 255])
#ans: hue 0-10 is red, high saturation/value

mask = cv2.inRange(hsv, lower_red, upper_red)
#ans: binary mask where red regions are 255

# apply mask to extract red objects
result = cv2.bitwise_and(img, img, mask=mask)
#ans: keeps only red regions
```

---

### Split & Merge Channels

```python
# split BGR channels
b, g, r = cv2.split(img)
#ans: separate B, G, R channels (each is grayscale)

# merge channels back
merged = cv2.merge([b, g, r])
#ans: reconstructs original image

# swap red and blue channels
swapped = cv2.merge([r, g, b])
#ans: BGR becomes RGR (looks different!)
```

---

### LAB Color Space

```python
# convert to LAB
img = cv2.imread('image.jpg')
lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
#ans: L (lightness), a, b (color opponents)

l, a, b = cv2.split(lab)
#ans: L is grayscale-like luminance

# LAB advantages
#ans: perceptually uniform (distance = perceived difference)
#ans: useful for color correction, white balance
```

---

### Exercises - Part 1 (Concepts)

```python
# what does cvtColor do?
rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#ans: converts between color spaces

# why use HSV for color detection?
#ans: separates color (H) from lighting (V), easier thresholding

# what is the output dimensions?
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
print(gray.ndim)
#ans: 2 (2D array, loses channel dimension)

# what color space does OpenCV use by default?
img = cv2.imread('image.jpg')
#ans: BGR (blue, green, red)
```

---

### Exercises - Part 2 (Concepts)

```python
# which channel is most important for grayscale?
# Gray = 0.299*R + 0.587*G + 0.114*B
#ans: green (0.587 = highest weight)

# what is hue range in OpenCV?
#ans: 0-179 (represents 0-360°, divided by 2)

# when to use LAB color space?
#ans: color correction, perceptual uniformity, white balance

# what does inRange return?
mask = cv2.inRange(hsv, lower, upper)
#ans: binary mask (0 or 255) where values in range
```

---

### Exercises - Part 3 (Coding)

```python
# convert BGR to RGB
img_bgr = cv2.imread('img.jpg')
img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
#ans: swaps red and blue channels

# extract red channel from RGB
r = img_rgb[:, :, 0]
#ans: red channel (first in RGB)

# create red-only image
red_only = img_rgb.copy()
red_only[:, :, 1:] = 0
#ans: green and blue set to 0, keeps red
```

---

### Exercises - Part 4 (Coding)

```python
# detect blue color in HSV
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
lower_blue = np.array([100, 50, 50])
upper_blue = np.array([130, 255, 255])
mask = cv2.inRange(hsv, lower_blue, upper_blue)
#ans: binary mask of blue regions

# apply mask to image
result = cv2.bitwise_and(img, img, mask=mask)
#ans: extracts blue regions only

# invert mask
inv_mask = cv2.bitwise_not(mask)
#ans: inverts binary mask (0→255, 255→0)
```

---

### Exercises - Part 5 (Mixed)

```python
# swap red and blue channels
b, g, r = cv2.split(img)
swapped = cv2.merge([r, g, b])
#ans: creates RGB from BGR

# extract hue channel
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
hue = hsv[:, :, 0]
#ans: hue values (0-179 in OpenCV)

# what happens here?
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
back = cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)
#ans: grayscale image with 3 identical channels

# are original and back the same?
#ans: no, back lost color information (all channels same)
```
