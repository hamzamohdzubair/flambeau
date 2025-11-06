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

#ans: Dictionaries Methods

---

### Update

```python
# update multiple items
person = {"name": "Alice"}
person.update({"age": 25, "city": "NYC"})
#ans: {"name": "Alice", "age": 25, "city": "NYC"}
```

---

### Pop

```python
# remove and return value
person = {"name": "Alice", "age": 25}
age = person.pop("age")
#ans: age is 25
#ans: person is {"name": "Alice"}
```

---

### Popitem

```python
# remove and return last item
person = {"name": "Alice", "age": 25}
item = person.popitem()
#ans: item is ("age", 25)
```

---

### Setdefault

```python
# get or set default
person = {"name": "Alice"}
age = person.setdefault("age", 0)
#ans: age is 0
#ans: person is {"name": "Alice", "age": 0}
```

---

### Clear

```python
# remove all items
person = {"name": "Alice", "age": 25}
person.clear()
#ans: {}
```

---

### Copy

```python
# shallow copy
person = {"name": "Alice"}
person_copy = person.copy()
#ans: person_copy is {"name": "Alice"}
```

---

### Fromkeys

```python
# create dict from keys
keys = ["a", "b", "c"]
d = dict.fromkeys(keys, 0)
#ans: {"a": 0, "b": 0, "c": 0}
```

---

### Exercises - Part 1

```python
# update behavior?
d = {"a": 1}
d.update({"b": 2, "a": 10})
#ans: {"a": 10, "b": 2}
```

---

### Exercises - Part 2

```python
# pop with default?
d = {"a": 1}
d.pop("b", 0)
#ans: 0
```

---

### Exercises - Part 3

```python
# pop without default?
d = {"a": 1}
d.pop("b")
#ans: KeyError
```

---

### Exercises - Part 4

```python
# setdefault existing key?
d = {"a": 1}
d.setdefault("a", 10)
#ans: 1 (doesn't change existing)
```

---

### Exercises - Part 5

```python
# popitem on empty?
d = {}
d.popitem()
#ans: KeyError
```

---

### Exercises - Part 6

```python
# fromkeys default?
keys = ["a", "b"]
d = dict.fromkeys(keys)
#ans: {"a": None, "b": None}
```

---

### Exercises - Part 7

```python
# copy is shallow?
d = {"a": [1, 2]}
d2 = d.copy()
d2["a"].append(3)
#ans: d is {"a": [1, 2, 3]}
```

---

### Exercises - Part 8

```python
# clear return?
d = {"a": 1}
result = d.clear()
#ans: result is None
#ans: d is {}
```

---

### Exercises - Part 9

```python
# update from pairs?
d = {"a": 1}
d.update([("b", 2), ("c", 3)])
#ans: {"a": 1, "b": 2, "c": 3}
```

---

### Exercises - Part 10

```python
# multiple setdefault?
d = {}
d.setdefault("a", []).append(1)
d.setdefault("a", []).append(2)
#ans: {"a": [1, 2]}
```
