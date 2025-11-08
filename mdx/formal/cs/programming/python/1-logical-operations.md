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

# Logical Operations

---

### AND Operator

```python
# and - both must be True
True and True
#ans: True
True and False
#ans: False
False and True
#ans: False
False and False
#ans: False
```

---

### OR Operator

```python
# or - at least one True
True or False
#ans: True
False or True
#ans: True
False or False
#ans: False
True or True
#ans: True
```

---

### NOT Operator

```python
# not - inverts boolean
not True
#ans: False
not False
#ans: True
not (5 > 3)
#ans: False
```

---

### Combining Conditions

```python
# combining with and
x = 10
x > 5 and x < 15
#ans: True
#ans: combining with or
x < 5 or x > 8
#ans: True
```

---

### Short Circuit Evaluation

```python
# and stops at first False
False and (1/0)
#ans: False (no error, doesn't evaluate 1/0)
#ans: or stops at first True
True or (1/0)
#ans: True (no error)
```

---

### Exercises - Part 1

```python
# what is the result?
True and True
#ans: True
# short circuit evaluation?
False and (1/0)
#ans: False (no error, doesn't evaluate second part)
```

---

### Exercises - Part 2

```python
# short circuit with or?
True or (1/0)
#ans: True (no error)
# what about this?
not False
#ans: True
```

---

### Exercises - Part 3

```python
# chaining and/or?
True or False and False
#ans: True (and has higher precedence)
# boolean with comparison?
5 > 3 and 10 < 20
#ans: True
```

---

### Exercises - Part 4

```python
# tricky: what is this?
bool([]) and bool([1])
#ans: False
# what evaluates?
0 or 5
#ans: 5 (returns last truthy value)
```

---

### Exercises - Part 5

```python
# and returns?
5 and 10
#ans: 10 (returns last value if all truthy)
# mixed types?
"hello" and ""
#ans: "" (returns last value or first falsy)
```

---

### Exercises - Part 6

```python
# what about this?
not not True
#ans: True
# De Morgan's law?
not (True and False)
#ans: True
not True or not False
#ans: True
```

---

### Exercises - Part 7

```python
# order of precedence?
True and False or True
#ans: True (and first, then or)
# empty values?
[] or [1, 2]
#ans: [1, 2]
```
