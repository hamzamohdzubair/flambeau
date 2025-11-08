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

# Computer Vision

---

### Fundamentals - Basics

<div class="tiles">
  <a class="tile-link" href="image-representation.html" style="--tile-bg-img:url('$3');">Image Representation</a>
  <a class="tile-link" href="color-spaces.html" style="--tile-bg-img:url('$3');">Color Spaces</a>
  <a class="tile-link" href="pixel-operations.html" style="--tile-bg-img:url('$3');">Pixel Operations</a>
  <a class="tile-link" href="image-filtering.html" style="--tile-bg-img:url('$3');">Image Filtering</a>
  <a class="tile-link" href="kernels-convolution.html" style="--tile-bg-img:url('$3');">Kernels & Convolution</a>
  <a class="tile-link" href="edge-detection.html" style="--tile-bg-img:url('$3');">Edge Detection</a>
  <a class="tile-link" href="image-transforms.html" style="--tile-bg-img:url('$3');">Image Transforms</a>
  <a class="tile-link" href="noise-blurring.html" style="--tile-bg-img:url('$3');">Noise & Blurring</a>
</div>

---

### Fundamentals - Features

<div class="tiles">
  <a class="tile-link" href="feature-detection.html" style="--tile-bg-img:url('$3');">Feature Detection</a>
  <a class="tile-link" href="feature-descriptors.html" style="--tile-bg-img:url('$3');">Feature Descriptors</a>
  <a class="tile-link" href="sift-surf.html" style="--tile-bg-img:url('$3');">SIFT & SURF</a>
  <a class="tile-link" href="orb-features.html" style="--tile-bg-img:url('$3');">ORB Features</a>
  <a class="tile-link" href="keypoint-matching.html" style="--tile-bg-img:url('$3');">Keypoint Matching</a>
  <a class="tile-link" href="feature-extraction.html" style="--tile-bg-img:url('$3');">Feature Extraction</a>
</div>

---

### Intermediate - Transforms

<div class="tiles">
  <a class="tile-link" href="geometric-transforms.html" style="--tile-bg-img:url('$3');">Geometric Transforms</a>
  <a class="tile-link" href="perspective-transform.html" style="--tile-bg-img:url('$3');">Perspective Transform</a>
  <a class="tile-link" href="morphological-operations.html" style="--tile-bg-img:url('$3');">Morphological Operations</a>
  <a class="tile-link" href="image-segmentation.html" style="--tile-bg-img:url('$3');">Image Segmentation</a>
  <a class="tile-link" href="region-processing.html" style="--tile-bg-img:url('$3');">Region Processing</a>
</div>

---

### Intermediate - Advanced Filters

<div class="tiles">
  <a class="tile-link" href="bilateral-filtering.html" style="--tile-bg-img:url('$3');">Bilateral Filtering</a>
  <a class="tile-link" href="median-filtering.html" style="--tile-bg-img:url('$3');">Median Filtering</a>
  <a class="tile-link" href="guided-filtering.html" style="--tile-bg-img:url('$3');">Guided Filtering</a>
  <a class="tile-link" href="adaptive-filters.html" style="--tile-bg-img:url('$3');">Adaptive Filters</a>
</div>

---

### Advanced - Object Detection

<div class="tiles">
  <a class="tile-link" href="sliding-window.html" style="--tile-bg-img:url('$3');">Sliding Window</a>
  <a class="tile-link" href="cascade-classifiers.html" style="--tile-bg-img:url('$3');">Cascade Classifiers</a>
  <a class="tile-link" href="region-proposals.html" style="--tile-bg-img:url('$3');">Region Proposals</a>
  <a class="tile-link" href="yolo-basics.html" style="--tile-bg-img:url('$3');">YOLO Basics</a>
  <a class="tile-link" href="rcnn-family.html" style="--tile-bg-img:url('$3');">R-CNN Family</a>
</div>

---

### Advanced - Segmentation

<div class="tiles">
  <a class="tile-link" href="fcn-networks.html" style="--tile-bg-img:url('$3');">FCN Networks</a>
  <a class="tile-link" href="unet-architecture.html" style="--tile-bg-img:url('$3');">U-Net Architecture</a>
  <a class="tile-link" href="deeplab.html" style="--tile-bg-img:url('$3');">DeepLab</a>
  <a class="tile-link" href="mask-rcnn.html" style="--tile-bg-img:url('$3');">Mask R-CNN</a>
</div>

---

### Applications

<div class="tiles">
  <a class="tile-link" href="face-detection.html" style="--tile-bg-img:url('$3');">Face Detection</a>
  <a class="tile-link" href="pose-estimation.html" style="--tile-bg-img:url('$3');">Pose Estimation</a>
  <a class="tile-link" href="3d-vision.html" style="--tile-bg-img:url('$3');">3D Vision</a>
</div>

---

### Resources

<div class="figrow">
  <figure class="portrait" style="width:370px;">
  <img src="/assets/2025-10-12-13-06-55.png">
  <figcaption><a class="underlined-link" href="https://szeliski.org/Book/">Free Access</a></figcaption>
</figure>
</div>
