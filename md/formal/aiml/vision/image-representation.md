{{yaml}}

{{title}}

## Image Representation

---

### What is a Digital Image?

A digital image is a 2D array (matrix) of pixels:
- **Grayscale**: 2D array, each pixel has intensity value (0-255)
- **Color (RGB)**: 3D array with 3 channels (Red, Green, Blue)
- **Data type**: Usually `uint8` (unsigned 8-bit integer, range 0-255)

**Image coordinates:**
- Origin (0,0) is top-left corner
- First index = row (y-axis), Second index = column (x-axis)
- Format: `image[row, col]` or `image[y, x]`

---

### Pixel Intensity Values

**Grayscale images:**
- 0 = pure black
- 255 = pure white
- 128 = middle gray

**Color images (BGR in OpenCV):**
- `[0, 0, 0]` = black
- `[255, 255, 255]` = white
- `[255, 0, 0]` = blue, `[0, 255, 0]` = green, `[0, 0, 255]` = red

---

### Image as NumPy Array

```python
import cv2
import numpy as np

# images are numpy arrays
img = np.array([[0, 50, 100],
                [150, 200, 255]], dtype=np.uint8)
#ans: 2x3 grayscale image
print(img.shape)
#ans: (2, 3) - 2 rows, 3 columns
print(img.dtype)
#ans: uint8 - values 0-255
```

---

### Loading Images

```python
# load a color image
img = cv2.imread('image.jpg')
#ans: loads as BGR format (not RGB!)
print(img.shape)
#ans: (height, width, channels)

height, width, channels = img.shape
#ans: height=rows, width=cols, channels=3

# load as grayscale
gray = cv2.imread('image.jpg', cv2.IMREAD_GRAYSCALE)
#ans: loads as grayscale
print(gray.shape)
#ans: (height, width) - no channel dimension
```

---

### Accessing Pixels

```python
# accessing individual pixels
img = cv2.imread('image.jpg')
pixel = img[100, 50]
#ans: pixel at row 100, col 50
print(pixel)
#ans: [B, G, R] values (3 numbers)

# modify a pixel
img[100, 50] = [255, 0, 0]
#ans: sets pixel to blue (BGR format)
```

---

### Creating Blank Images

```python
# create blank black image
black = np.zeros((480, 640, 3), dtype=np.uint8)
#ans: 480x640 black image (all zeros)

# create white image
white = np.ones((480, 640, 3), dtype=np.uint8) * 255
#ans: 480x640 white image (all 255s)

# create colored image
red = np.zeros((480, 640, 3), dtype=np.uint8)
red[:, :, 2] = 255
#ans: red image (3rd channel = red in BGR)
```

---

### Image Memory Size

**Formula:** `height × width × channels × bytes_per_pixel`

Example: 1920×1080 RGB image
- 1920 × 1080 × 3 × 1 = 6,220,800 bytes ≈ 6.2 MB

**Why uint8?**
- Saves memory (1 byte vs 4 bytes for int32)
- Human eye can't distinguish more than 256 intensity levels
- Standard for most image formats (JPEG, PNG)

---

### Exercises - Part 1 (Concepts)

```python
# what is the shape?
img = np.zeros((300, 400, 3))
#ans: (300, 400, 3) - 300 rows, 400 cols, 3 channels

# how many pixels total?
#ans: 300 × 400 = 120,000 pixels

# how many values in total?
#ans: 300 × 400 × 3 = 360,000 values

# what color is pixel [255, 255, 0] in BGR?
#ans: yellow (blue=255, green=255, red=0)
```

---

### Exercises - Part 2 (Concepts)

```python
# why use uint8 instead of int?
#ans: saves memory, 0-255 range sufficient for images

# what's the difference?
gray = np.zeros((100, 100))
color = np.zeros((100, 100, 3))
#ans: gray is 2D, color is 3D with 3 channels

# which is the height?
img.shape returns (480, 640, 3)
#ans: 480 is height (first dimension = rows)

# what happens with value 300 in uint8?
img = np.array([[300]], dtype=np.uint8)
#ans: overflow, 300 % 256 = 44
```

---

### Exercises - Part 3 (Coding)

```python
# create 100x100 grayscale image
gray = np.zeros((100, 100), dtype=np.uint8)
#ans: black grayscale image

# create 100x100 color image
color = np.zeros((100, 100, 3), dtype=np.uint8)
#ans: black color image with 3 channels

# access pixel at row 10, col 20
img = np.random.randint(0, 256, (50, 50, 3), dtype=np.uint8)
pixel = img[10, 20]
#ans: array with 3 BGR values
```

---

### Exercises - Part 4 (Coding)

```python
# create green image (BGR format)
green = np.zeros((100, 100, 3), dtype=np.uint8)
green[:, :, 1] = 255
#ans: green channel (index 1) set to 255

# create half-white half-black image
img = np.zeros((100, 100), dtype=np.uint8)
img[:50, :] = 255
#ans: top 50 rows white, bottom 50 rows black

# create solid cyan image (blue + green)
cyan = np.zeros((100, 100, 3), dtype=np.uint8)
cyan[:, :, 0] = 255  # blue
cyan[:, :, 1] = 255  # green
#ans: cyan image [255, 255, 0]
```

---

### Exercises - Part 5 (Mixed)

```python
# how to get image dimensions?
height = img.shape[0]
width = img.shape[1]
channels = img.shape[2]
#ans: shape gives (height, width, channels)

# what's the memory size of 1024x768 RGB image?
#ans: 1024 × 768 × 3 = 2,359,296 bytes ≈ 2.4 MB

# create image using np.full
img = np.full((100, 100, 3), [255, 0, 0], dtype=np.uint8)
#ans: blue image (all pixels [255, 0, 0])

# what is img.ndim for grayscale?
gray = np.zeros((100, 100))
#ans: 2 (2-dimensional array)
```
