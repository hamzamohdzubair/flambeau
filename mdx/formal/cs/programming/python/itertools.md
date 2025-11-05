---
theme: gaia2
paginate: true
transition: slide
class: lead
footer: '[<iconify-icon icon="hugeicons:home-11" title="Home"></iconify-icon>](/index.html) [<iconify-icon icon="si:left-up-line" title="Back"></iconify-icon>](../index.html) [<iconify-icon icon="octicon:move-to-start-24" title="Start"></iconify-icon>](#1)'
---
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
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

#ans: Itertools

---

### Count

```python
from itertools import count
#ans: infinite counting
for i in count(10, 2):
    print(i)
    if i > 20:
        break
#ans: 10, 12, 14, 16, 18, 20
```

---

### Cycle

```python
from itertools import cycle
#ans: infinite cycling
colors = ['red', 'green', 'blue']
color_cycle = cycle(colors)
for i, color in enumerate(color_cycle):
    print(color)
    if i >= 5:
        break
#ans: red, green, blue, red, green, blue
```

---

### Repeat

```python
from itertools import repeat
#ans: repeat value
list(repeat(10, 3))
#ans: [10, 10, 10]
```

---

### Chain

```python
from itertools import chain
#ans: combine iterables
list(chain([1, 2], [3, 4], [5, 6]))
#ans: [1, 2, 3, 4, 5, 6]
```

---

### Islice

```python
from itertools import islice
#ans: slice iterator
list(islice(range(10), 2, 8, 2))
#ans: [2, 4, 6]
#ans: take first n
list(islice(count(), 5))
#ans: [0, 1, 2, 3, 4]
```

---

### Product

```python
from itertools import product
#ans: cartesian product
list(product([1, 2], ['a', 'b']))
#ans: [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]
```

---

### Permutations

```python
from itertools import permutations
#ans: all orderings
list(permutations([1, 2, 3], 2))
#ans: [(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]
```

---

### Combinations

```python
from itertools import combinations
#ans: unique selections
list(combinations([1, 2, 3, 4], 2))
#ans: [(1, 2), (1, 3), (1, 4), (2, 3), (2, 4), (3, 4)]
```

---

### Exercises - Part 1

```python
from itertools import count
# count is infinite?
c = count()
next(c)
#ans: 0
next(c)
#ans: 1
#ans: never stops
```

---

### Exercises - Part 2

```python
from itertools import cycle
# cycle repeats?
c = cycle([1, 2])
[next(c) for _ in range(5)]
#ans: [1, 2, 1, 2, 1]
```

---

### Exercises - Part 3

```python
from itertools import repeat
# repeat without count?
r = repeat(5)
#ans: infinite
list(islice(r, 3))
#ans: [5, 5, 5]
```

---

### Exercises - Part 4

```python
from itertools import chain
# chain vs +?
chain([1], [2], [3])
#ans: iterator
[1] + [2] + [3]
#ans: [1, 2, 3] (list)
```

---

### Exercises - Part 5

```python
from itertools import islice
# islice with step?
list(islice(range(20), 0, 10, 2))
#ans: [0, 2, 4, 6, 8]
```

---

### Exercises - Part 6

```python
from itertools import product
# product with repeat?
list(product([0, 1], repeat=3))
#ans: [(0,0,0), (0,0,1), (0,1,0), (0,1,1),
#ans:  (1,0,0), (1,0,1), (1,1,0), (1,1,1)]
```

---

### Exercises - Part 7

```python
from itertools import permutations
# permutations vs combinations?
list(permutations([1, 2], 2))
#ans: [(1, 2), (2, 1)]
list(combinations([1, 2], 2))
#ans: [(1, 2)]
```

---

### Exercises - Part 8

```python
from itertools import combinations
# combinations order?
list(combinations([3, 1, 2], 2))
#ans: [(3, 1), (3, 2), (1, 2)]
#ans: maintains input order
```

---

### Exercises - Part 9

```python
from itertools import groupby
#ans: group consecutive
data = [1, 1, 2, 2, 2, 3]
[(k, list(g)) for k, g in groupby(data)]
#ans: [(1, [1, 1]), (2, [2, 2, 2]), (3, [3])]
```

---

### Exercises - Part 10

```python
from itertools import zip_longest
#ans: zip with fillvalue
list(zip_longest([1, 2], ['a', 'b', 'c'], fillvalue=0))
#ans: [(1, 'a'), (2, 'b'), (0, 'c')]
```
