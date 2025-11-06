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

#ans: Dictionaries Basics

---

### Creating Dictionaries

```python
# create dict
person = {"name": "Alice", "age": 25}
empty = {}
scores = {"math": 90, "english": 85}
```

---

### Accessing Values

```python
# access by key
person = {"name": "Alice", "age": 25}
person["name"]
#ans: "Alice"
person["age"]
#ans: 25
```

---

### Get Method

```python
# get with default
person = {"name": "Alice"}
person.get("age")
#ans: None
person.get("age", 0)
#ans: 0
```

---

### Adding/Updating

```python
# add new key
person = {"name": "Alice"}
person["age"] = 25
#ans: {"name": "Alice", "age": 25}
#ans: update existing
person["age"] = 26
#ans: {"name": "Alice", "age": 26}
```

---

### Deleting Items

```python
# delete key
person = {"name": "Alice", "age": 25}
del person["age"]
#ans: {"name": "Alice"}
```

---

### Keys, Values, Items

```python
# get keys, values, items
person = {"name": "Alice", "age": 25}
person.keys()
#ans: dict_keys(['name', 'age'])
person.values()
#ans: dict_values(['Alice', 25])
person.items()
#ans: dict_items([('name', 'Alice'), ('age', 25)])
```

---

### Exercises - Part 1

```python
# what is the value?
d = {"a": 1, "b": 2}
d["a"]
#ans: 1
```

---

### Exercises - Part 2

```python
# key not found?
d = {"a": 1}
d["b"]
#ans: KeyError
```

---

### Exercises - Part 3

```python
# get vs brackets?
d = {"a": 1}
d.get("b")
#ans: None
d["b"]
#ans: KeyError
```

---

### Exercises - Part 4

```python
# adding new key?
d = {"a": 1}
d["b"] = 2
#ans: {"a": 1, "b": 2}
```

---

### Exercises - Part 5

```python
# updating value?
d = {"a": 1}
d["a"] = 10
#ans: {"a": 10}
```

---

### Exercises - Part 6

```python
# membership test?
d = {"a": 1, "b": 2}
"a" in d
#ans: True
1 in d
#ans: False (checks keys, not values)
```

---

### Exercises - Part 7

```python
# dict length?
d = {"a": 1, "b": 2, "c": 3}
len(d)
#ans: 3
```

---

### Exercises - Part 8

```python
# empty dict check?
d = {}
bool(d)
#ans: False
```

---

### Exercises - Part 9

```python
# nested dict?
d = {"user": {"name": "Alice", "age": 25}}
d["user"]["name"]
#ans: "Alice"
```

---

### Exercises - Part 10

```python
# dict from pairs?
pairs = [("a", 1), ("b", 2)]
d = dict(pairs)
#ans: {"a": 1, "b": 2}
```
