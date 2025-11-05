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

#ans: Type Conversion

---

### Converting to Integer

```python
#ans: string to int
int("42")
#ans: 42
int("100")
#ans: 100
#ans: float to int (truncates)
int(3.14)
#ans: 3
int(9.99)
#ans: 9
```

---

### Converting to Float

```python
#ans: string to float
float("3.14")
#ans: 3.14
#ans: int to float
float(42)
#ans: 42.0
float(0)
#ans: 0.0
```

---

### Converting to String

```python
#ans: int to string
str(42)
#ans: "42"
#ans: float to string
str(3.14)
#ans: "3.14"
#ans: bool to string
str(True)
#ans: "True"
```

---

### Converting to Boolean

```python
#ans: number to bool
bool(1)
#ans: True
bool(0)
#ans: False
bool(-5)
#ans: True
#ans: string to bool
bool("")
#ans: False
bool("text")
#ans: True
```

---

### Boolean from Other Types

```python
#ans: list to bool
bool([])
#ans: False
bool([1, 2])
#ans: True
#ans: None to bool
bool(None)
#ans: False
```

---

### Exercises - Part 1

```python
# what is the result?
int("100")
#ans: 100
# what happens?
int("3.14")
#ans: ValueError
```

---

### Exercises - Part 2

```python
# float from string?
float("3.14")
#ans: 3.14
# bool from number?
bool(0)
#ans: False
bool(1)
#ans: True
bool(-1)
#ans: True
```

---

### Exercises - Part 3

```python
# bool from string?
bool("")
#ans: False
bool("False")
#ans: True (any non-empty string is True)
```

---

### Exercises - Part 4

```python
# string from bool?
str(True)
#ans: "True"
# int from bool?
int(False)
#ans: 0
int(True)
#ans: 1
```

---

### Exercises - Part 5

```python
# what about this?
int("  42  ")
#ans: 42 (whitespace is stripped)
# edge case?
int("0b101", 2)
#ans: 5 (binary to int)
```

---

### Exercises - Part 6

```python
# what happens?
float("inf")
#ans: inf (infinity)
# string to int base?
int("FF", 16)
#ans: 255 (hex to int)
```

---

### Exercises - Part 7

```python
# float to int?
int(3.9)
#ans: 3 (truncates, doesn't round)
# bool from empty?
bool({})
#ans: False
```
