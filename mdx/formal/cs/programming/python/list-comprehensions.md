---
theme: blank2
paginate: true
transition: slide
class: lead
footer: '[<iconify-icon icon="hugeicons:home-11" title="Home"></iconify-icon>](/index.html) [<iconify-icon icon="si:left-up-line" title="Back"></iconify-icon>](../index.html) [<iconify-icon icon="octicon:move-to-start-24" title="Start"></iconify-icon>](#1)'
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

# List Comprehensions

---

### Basic List Comprehension

```python
# basic comprehension
squares = [x**2 for x in range(5)]
#ans: [0, 1, 4, 9, 16]
```

---

### With Transformation

```python
# transform items
words = ["hello", "world"]
upper = [word.upper() for word in words]
#ans: ['HELLO', 'WORLD']
```

---

### With Condition (Filter)

```python
# filter with condition
evens = [x for x in range(10) if x % 2 == 0]
#ans: [0, 2, 4, 6, 8]
```

---

### Multiple Conditions

```python
# multiple filters
numbers = [x for x in range(20)
           if x % 2 == 0
           if x % 3 == 0]
#ans: [0, 6, 12, 18]
```

---

### If-Else Expression

```python
# if-else (not filter)
result = ["even" if x % 2 == 0 else "odd"
          for x in range(5)]
#ans: ['even', 'odd', 'even', 'odd', 'even']
```

---

### Nested Loops

```python
# nested loops
pairs = [(x, y) for x in range(3)
                for y in range(2)]
#ans: [(0,0), (0,1), (1,0), (1,1), (2,0), (2,1)]
```

---

### Flatten Nested List

```python
# flatten
nested = [[1, 2], [3, 4], [5, 6]]
flat = [item for sublist in nested
             for item in sublist]
#ans: [1, 2, 3, 4, 5, 6]
```

---

### Exercises - Part 1

```python
# basic comprehension?
[x*2 for x in range(3)]
#ans: [0, 2, 4]
```

---

### Exercises - Part 2

```python
# with filter?
[x for x in range(10) if x > 5]
#ans: [6, 7, 8, 9]
```

---

### Exercises - Part 3

```python
# if-else position?
[x if x > 0 else 0 for x in [-1, 1, -2, 2]]
#ans: [0, 1, 0, 2]
```

---

### Exercises - Part 4

```python
# nested comprehension?
[[i*j for j in range(3)] for i in range(2)]
#ans: [[0, 0, 0], [0, 1, 2]]
```

---

### Exercises - Part 5

```python
# string comprehension?
[c.upper() for c in "abc"]
#ans: ['A', 'B', 'C']
```

---

### Exercises - Part 6

```python
# multiple filters?
[x for x in range(20) if x % 2 == 0 if x % 5 == 0]
#ans: [0, 10]
```

---

### Exercises - Part 7

```python
# comprehension vs loop?
#ans: [x**2 for x in range(3)]
#ans: vs
#ans: result = []
#ans: for x in range(3):
#ans:     result.append(x**2)
#ans: same result
```

---

### Exercises - Part 8

```python
# empty comprehension?
[x for x in range(0)]
#ans: []
```

---

### Exercises - Part 9

```python
# tuple in comprehension?
[(x, x**2) for x in range(3)]
#ans: [(0, 0), (1, 1), (2, 4)]
```

---

### Exercises - Part 10

```python
# flatten with condition?
nested = [[1,2,3], [4,5,6]]
[x for sublist in nested
   for x in sublist if x % 2 == 0]
#ans: [2, 4, 6]
```
