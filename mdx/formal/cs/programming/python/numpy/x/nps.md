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

### Problem

<span data-marpit-fragment>Find out the Net Promoter Score of this company</span>

<br>
<div class="figrow">
<figure data-marpit-fragment style="width:500px;">
  <img src="/assets/2025-10-19-01-20-08.png">
  <figcaption></figcaption>
</figure>
</div>

```python
import numpy as np
url = "https://raw.githubusercontent.com/hamzamohdzubair/small-data/refs/heads/main/nps.txt"
data = np.loadtxt(url)
```

---

### Solution

```python
total = data.shape[0]
detractors = data[data<7].shape[0]
promoters = data[data>8].shape[0]
perc_promoters = (promoters/total)*100
perc_detractors = (detractors/total)*100
nps = perc_promoters - perc_detractors
```
