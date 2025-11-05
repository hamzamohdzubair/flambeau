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

#ans: Dict & Set Comprehensions

---

### Dict Comprehension Basic

```python
#ans: basic dict comprehension
squares = {x: x**2 for x in range(5)}
#ans: {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```

---

### Dict from Two Lists

```python
#ans: zip two lists
keys = ["a", "b", "c"]
values = [1, 2, 3]
d = {k: v for k, v in zip(keys, values)}
#ans: {'a': 1, 'b': 2, 'c': 3}
```

---

### Dict with Condition

```python
#ans: filter dict
numbers = range(10)
even_squares = {x: x**2 for x in numbers
                        if x % 2 == 0}
#ans: {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}
```

---

### Swap Keys and Values

```python
#ans: swap dict
original = {"a": 1, "b": 2}
swapped = {v: k for k, v in original.items()}
#ans: {1: 'a', 2: 'b'}
```

---

### Set Comprehension Basic

```python
#ans: basic set comprehension
squares = {x**2 for x in range(5)}
#ans: {0, 1, 4, 9, 16}
```

---

### Set Removes Duplicates

```python
#ans: auto-removes duplicates
numbers = [1, 2, 2, 3, 3, 3]
unique = {x for x in numbers}
#ans: {1, 2, 3}
```

---

### Set with Condition

```python
#ans: filter set
evens = {x for x in range(10) if x % 2 == 0}
#ans: {0, 2, 4, 6, 8}
```

---

### Exercises - Part 1

```python
# dict comprehension?
{x: x*2 for x in range(3)}
#ans: {0: 0, 1: 2, 2: 4}
```

---

### Exercises - Part 2

```python
# dict from pairs?
pairs = [("a", 1), ("b", 2)]
{k: v for k, v in pairs}
#ans: {'a': 1, 'b': 2}
```

---

### Exercises - Part 3

```python
# dict with if-else?
{x: "even" if x % 2 == 0 else "odd"
 for x in range(3)}
#ans: {0: 'even', 1: 'odd', 2: 'even'}
```

---

### Exercises - Part 4

```python
# nested dict?
{i: {j: i*j for j in range(2)}
    for i in range(2)}
#ans: {0: {0: 0, 1: 0}, 1: {0: 0, 1: 1}}
```

---

### Exercises - Part 5

```python
# set comprehension duplicates?
{x % 3 for x in range(10)}
#ans: {0, 1, 2} (only unique values)
```

---

### Exercises - Part 6

```python
# set vs list comprehension?
[x for x in [1,2,2,3]]
#ans: [1, 2, 2, 3]
{x for x in [1,2,2,3]}
#ans: {1, 2, 3}
```

---

### Exercises - Part 7

```python
# dict filter values?
d = {"a": 1, "b": 2, "c": 3}
{k: v for k, v in d.items() if v > 1}
#ans: {'b': 2, 'c': 3}
```

---

### Exercises - Part 8

```python
# dict transform values?
d = {"a": 1, "b": 2}
{k: v*2 for k, v in d.items()}
#ans: {'a': 2, 'b': 4}
```

---

### Exercises - Part 9

```python
# set from string?
{c for c in "hello"}
#ans: {'h', 'e', 'l', 'o'}
```

---

### Exercises - Part 10

```python
# empty dict vs set?
{}  # dict
{x for x in []}  # set()
```
