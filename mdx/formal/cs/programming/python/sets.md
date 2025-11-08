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

# Sets

---

### Creating Sets

```python
# create set
fruits = {"apple", "banana", "cherry"}
numbers = {1, 2, 3, 4, 5}
empty = set()
#ans: not {} - that's a dict!
```

---

### Adding Elements

```python
# add single item
fruits = {"apple", "banana"}
fruits.add("cherry")
#ans: {"apple", "banana", "cherry"}
```

---

### Removing Elements

```python
# remove (raises error if not found)
fruits = {"apple", "banana"}
fruits.remove("apple")
#ans: {"banana"}
#ans: discard (no error if not found)
fruits.discard("cherry")
#ans: {"banana"}
```

---

### Set Operations - Union

```python
# union (combines all)
a = {1, 2, 3}
b = {3, 4, 5}
a | b
#ans: {1, 2, 3, 4, 5}
a.union(b)
#ans: {1, 2, 3, 4, 5}
```

---

### Set Operations - Intersection

```python
# intersection (common elements)
a = {1, 2, 3}
b = {2, 3, 4}
a & b
#ans: {2, 3}
a.intersection(b)
#ans: {2, 3}
```

---

### Set Operations - Difference

```python
# difference (in a but not b)
a = {1, 2, 3}
b = {2, 3, 4}
a - b
#ans: {1}
a.difference(b)
#ans: {1}
```

---

### Set Operations - Symmetric Difference

```python
# symmetric diff (in either but not both)
a = {1, 2, 3}
b = {2, 3, 4}
a ^ b
#ans: {1, 4}
a.symmetric_difference(b)
#ans: {1, 4}
```

---

### Exercises - Part 1

```python
# duplicates in set?
s = {1, 2, 2, 3}
#ans: {1, 2, 3}
```

---

### Exercises - Part 2

```python
# empty set?
s = {}
type(s)
#ans: <class 'dict'>
s = set()
type(s)
#ans: <class 'set'>
```

---

### Exercises - Part 3

```python
# add existing element?
s = {1, 2}
s.add(2)
#ans: {1, 2} (no change)
```

---

### Exercises - Part 4

```python
# remove non-existent?
s = {1, 2}
s.remove(3)
#ans: KeyError
s.discard(3)
#ans: no error
```

---

### Exercises - Part 5

```python
# union result?
a = {1, 2}
b = {2, 3}
a | b
#ans: {1, 2, 3}
```

---

### Exercises - Part 6

```python
# intersection empty?
a = {1, 2}
b = {3, 4}
a & b
#ans: set()
```

---

### Exercises - Part 7

```python
# subset check?
a = {1, 2}
b = {1, 2, 3}
a.issubset(b)
#ans: True
```

---

### Exercises - Part 8

```python
# set from list?
lst = [1, 2, 2, 3]
s = set(lst)
#ans: {1, 2, 3}
```

---

### Exercises - Part 9

```python
# set membership?
s = {1, 2, 3}
2 in s
#ans: True
```

---

### Exercises - Part 10

```python
# pop from set?
s = {1, 2, 3}
s.pop()
#ans: arbitrary element (unpredictable)
```
