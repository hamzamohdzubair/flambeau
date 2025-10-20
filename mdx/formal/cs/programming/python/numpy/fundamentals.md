---
theme: gaia2
paginate: true
transition: slide
class: lead
footer: '[<i class="fa-regular fa-house"></i>](/index.html) [<i class="fa-regular fa-circle-up"></i>](../index.html) [<i class="fa-regular fa-circle-left"></i>](#1)'
---

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
