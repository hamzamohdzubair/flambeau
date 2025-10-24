---
theme: gaia2
paginate: true
transition: slide
class: lead
footer: '[<i class="hgi hgi-stroke hgi-home-09"></i>](/index.html) [<i class="hgi hgi-stroke hgi-arrow-turn-up"></i>](../index.html) [<i class="hgi hgi-stroke hgi-arrow-left-05"></i>](#1)'
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.hugeicons.com/font/hgi-stroke-rounded.css" />
<link href="/styles/zoom.css" rel="stylesheet">

<script src="/scripts/zoom.js"></script>
<script src="/scripts/navigation.js"></script>

<!-- _class: lead invert -->

# Array Fundamentals

---

### Indexing

```python
import numpy as np
one = np.array([10, 20, 30, 40, 50, 60, 70, 80])
# basic indexing
one[2]
# slicing
one[1:6:2]
# fancy indexing
one[[4,0,3,0]]
# masking
one[(one < 30) & (one > 60)]
# newaxis / none-indexing
one[:, np.newaxis]
one[:, None]
# higher dimensional array
two = np.arange(27).reshape(3,3,3)
# ellipsis indexing
two[1, ...]
```
