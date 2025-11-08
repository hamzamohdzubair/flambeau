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

## Noise & Blurring

---

### What is Image Noise?

**Noise:** Random variation in pixel intensity (unwanted signal)

**Sources:**
- Sensor imperfections
- Low light conditions
- Electrical interference
- Transmission errors
- Compression artifacts

**Impact:** Degrades image quality, affects processing algorithms

---

### Types of Noise

**Gaussian noise:** Random values from normal distribution
- Most common type
- Additive: `noisy = clean + noise`
- Looks like grainy texture

**Salt-and-pepper noise:** Random black/white pixels
- Also called impulse noise
- Pixels are either 0 or 255
- Looks like random dots

**Poisson noise:** Varies with signal intensity
- Common in low-light imaging
- Variance proportional to intensity

---

### Adding Gaussian Noise

```python
import cv2
import numpy as np
# generate gaussian noise
mean = 0
sigma = 25
gaussian_noise = np.random.normal(mean, sigma, img.shape)
#ans: mean=0, sigma=25 controls noise strength
# add noise to image
#ans: noisy = img + gaussian_noise
#ans: noisy = np.clip(noisy, 0, 255).astype(np.uint8)
#ans: clip to valid range [0, 255]
```

---

### Adding Salt-and-Pepper Noise

```python
# add salt-and-pepper noise
def add_salt_pepper(img, prob=0.01):
    noisy = img.copy()
    # salt (white pixels)
    num_salt = int(prob * img.size * 0.5)
    coords = [np.random.randint(0, i, num_salt) for i in img.shape[:2]]
    noisy[coords[0], coords[1]] = 255
    # pepper (black pixels)
    num_pepper = int(prob * img.size * 0.5)
    coords = [np.random.randint(0, i, num_pepper) for i in img.shape[:2]]
    noisy[coords[0], coords[1]] = 0
    return noisy
#ans: prob controls percentage of noisy pixels
```

---

### Gaussian Blur for Noise Reduction

**Why Gaussian blur?**
- Effective for Gaussian noise
- Weighted averaging (preserves features better)
- Smooth, natural-looking results

**Trade-off:** Reduces noise but also blurs edges

---

### Gaussian Blur Parameters

```python
# gaussian blur for noise reduction
#ans: denoised = cv2.GaussianBlur(noisy, (5, 5), 0)
#ans: 5x5 kernel, sigma auto-calculated
# larger kernel for more smoothing
denoised = cv2.GaussianBlur(noisy, (9, 9), 0)
#ans: 9x9 kernel removes more noise, more blur
# specific sigma value
denoised = cv2.GaussianBlur(noisy, (0, 0), sigmaX=2.0)
#ans: kernel auto-calculated from sigma=2.0
# different sigma for x and y
denoised = cv2.GaussianBlur(noisy, (0, 0), sigmaX=2.0, sigmaY=1.0)
#ans: anisotropic blur (different in x and y)
```

---

### Median Filter for Salt-Pepper

**Why median for salt-pepper?**
- Not affected by outliers
- Picks middle value, ignores extreme noise
- Preserves edges better than averaging

**Algorithm:** Sort neighborhood, pick median

---

### Median Blur in OpenCV

```python
# median blur (best for salt-pepper)
#ans: denoised = cv2.medianBlur(noisy, 5)
#ans: 5x5 kernel, takes median of 25 pixels
# larger kernel for heavy noise
denoised = cv2.medianBlur(noisy, 9)
#ans: 9x9 kernel for strong salt-pepper noise
# why median works for salt-pepper?
#ans: median ignores extreme values (0 or 255)
#ans: preserves original pixel values better
```

---

### Bilateral Filter (Edge-Preserving)

**Bilateral filter:** Smooths noise while keeping edges sharp

**How it works:**
- Two weights: spatial + intensity
- Close pixels + similar intensity → high weight
- Far pixels OR different intensity → low weight

**Best for:** Natural images, portrait smoothing

---

### Bilateral Filter in OpenCV

```python
# bilateral filter (edge-preserving denoising)
#ans: denoised = cv2.bilateralFilter(noisy, d=9, sigmaColor=75, sigmaSpace=75)
# d: diameter of pixel neighborhood
#ans: larger d = considers more neighbors, slower
# sigmaColor: intensity difference threshold
#ans: larger value = more colors averaged (more blur)
# sigmaSpace: spatial distance threshold
#ans: larger value = farther pixels considered
# when to use bilateral?
#ans: preserve edges while removing noise
#ans: better than Gaussian for natural images
```

---

### Non-Local Means Denoising

**NLM denoising:** Compares patches (not just neighborhoods)

**Concept:** Similar patches anywhere in image are averaged

**Advantage:** Better noise reduction, preserves texture

**Disadvantage:** Computationally expensive

---

### NLM Denoising in OpenCV

```python
# non-local means denoising (grayscale)
gray_noisy = cv2.cvtColor(noisy, cv2.COLOR_BGR2GRAY)
#ans: denoised = cv2.fastNlMeansDenoising(gray_noisy, None, h=10, templateWindowSize=7, searchWindowSize=21)
# for color images
#ans: denoised = cv2.fastNlMeansDenoisingColored(noisy, None, h=10, hColor=10, templateWindowSize=7, searchWindowSize=21)
# h: filter strength
#ans: higher h = more denoising, more blur
# templateWindowSize: patch size
#ans: usually 7x7
# searchWindowSize: search area
#ans: usually 21x21
```

---

### Comparing Denoising Methods

**Gaussian blur:**
- Fast, simple
- Blurs edges
- Good for light Gaussian noise

**Median filter:**
- Excellent for salt-pepper
- Preserves edges
- Slower than Gaussian

**Bilateral filter:**
- Edge-preserving
- Good for natural images
- Moderate speed

**NLM denoising:**
- Best quality
- Preserves texture
- Slowest

---

### Exercises - Part 1 (Concepts)

```python
# what causes image noise?
#ans: sensor issues, low light, interference, compression
# most common noise type?
#ans: Gaussian noise
# what noise looks like random dots?
#ans: salt-and-pepper (impulse) noise
# best filter for salt-pepper?
#ans: median filter
# what does bilateral preserve?
#ans: edges while smoothing noise
```

---

### Exercises - Part 2 (Concepts)

```python
# trade-off of denoising?
#ans: removes noise but also blurs details/edges
# why median ignores salt-pepper?
#ans: median not affected by outliers (extreme values)
# what is NLM?
#ans: non-local means, compares similar patches
# fastest denoising method?
#ans: Gaussian blur
# what is sigmaColor in bilateral?
#ans: intensity difference threshold for averaging
```

---

### Exercises - Part 3 (Coding)

```python
# add gaussian noise (sigma=20)
mean = 0
sigma = 20
noise = np.random.normal(mean, sigma, img.shape)
#ans: noisy = np.clip(img + noise, 0, 255).astype(np.uint8)
# denoise with gaussian blur
#ans: denoised = cv2.GaussianBlur(noisy, (5, 5), 0)
# denoise with median filter
#ans: denoised = cv2.medianBlur(noisy, 5)
```

---

### Exercises - Part 4 (Coding)

```python
# bilateral denoising
#ans: denoised = cv2.bilateralFilter(noisy, 9, 75, 75)
# NLM denoising on grayscale
#ans: denoised = cv2.fastNlMeansDenoising(gray_noisy, None, h=10, templateWindowSize=7, searchWindowSize=21)
# NLM denoising on color image
#ans: denoised = cv2.fastNlMeansDenoisingColored(noisy, None, h=10, hColor=10, templateWindowSize=7, searchWindowSize=21)
```

---

### Exercises - Part 5 (Coding)

```python
# strong gaussian blur (11x11)
#ans: denoised = cv2.GaussianBlur(noisy, (11, 11), 0)
# median with large kernel
#ans: denoised = cv2.medianBlur(noisy, 11)
# bilateral with strong smoothing
#ans: denoised = cv2.bilateralFilter(noisy, 15, 150, 150)
# compare sizes before and after
print(noisy.shape, denoised.shape)
#ans: same shape, only pixel values change
```

---

### Exercises - Part 6 (Mixed)

```python
# apply gaussian blur twice
blur1 = cv2.GaussianBlur(noisy, (5, 5), 0)
#ans: blur2 = cv2.GaussianBlur(blur1, (5, 5), 0)
#ans: double blur = stronger smoothing
# denoise each channel separately
b, g, r = cv2.split(noisy)
#ans: b_denoised = cv2.GaussianBlur(b, (5, 5), 0)
#ans: g_denoised = cv2.GaussianBlur(g, (5, 5), 0)
#ans: r_denoised = cv2.GaussianBlur(r, (5, 5), 0)
#ans: denoised = cv2.merge([b_denoised, g_denoised, r_denoised])
```

---

### Exercises - Part 7 (Mixed)

```python
# NLM with higher h value
#ans: denoised = cv2.fastNlMeansDenoising(gray_noisy, None, h=20, templateWindowSize=7, searchWindowSize=21)
#ans: h=20 removes more noise, more blur
# bilateral with different sigmas
denoised = cv2.bilateralFilter(noisy, 9, 50, 100)
#ans: sigmaColor=50 (less color smoothing)
#ans: sigmaSpace=100 (larger spatial range)
# combine median and gaussian
median = cv2.medianBlur(noisy, 5)
#ans: final = cv2.GaussianBlur(median, (3, 3), 0)
#ans: median removes salt-pepper, gaussian smooths
```

---

### Exercises - Part 8 (Advanced)

```python
# create noisy image with both types
gaussian_noise = np.random.normal(0, 15, img.shape)
noisy = np.clip(img + gaussian_noise, 0, 255).astype(np.uint8)
# add salt-pepper on top
prob = 0.02
num_salt = int(prob * noisy.size * 0.5)
coords = [np.random.randint(0, i, num_salt) for i in noisy.shape[:2]]
noisy[coords[0], coords[1]] = 255
num_pepper = int(prob * noisy.size * 0.5)
coords = [np.random.randint(0, i, num_pepper) for i in noisy.shape[:2]]
noisy[coords[0], coords[1]] = 0
#ans: combined gaussian and salt-pepper noise
# denoise strategy
median = cv2.medianBlur(noisy, 5)
#ans: denoised = cv2.bilateralFilter(median, 9, 75, 75)
#ans: median first removes salt-pepper, then bilateral smooths
```
