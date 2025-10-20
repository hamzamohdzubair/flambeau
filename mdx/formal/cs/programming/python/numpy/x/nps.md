---
theme: gaia2
paginate: true
transition: slide
class: lead
footer: '[<i class="fa-regular fa-house"></i>](/index.html) [<i class="fa-regular fa-circle-up"></i>](../index.html) [<i class="fa-regular fa-circle-left"></i>](#1)'
---

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
