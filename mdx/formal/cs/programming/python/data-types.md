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

#ans: Data Types

---

### Integer Type

```python
# integer
age = 25
type(age)
#ans: <class 'int'>
count = -10
#ans: negative integer
big_num = 1000000
#ans: large integer
```

---

### Float Type

```python
# float
price = 19.99
type(price)
#ans: <class 'float'>
pi = 3.14159
#ans: float value
negative = -5.5
#ans: negative float
```

---

### String Type

```python
# string
message = "Hello"
type(message)
#ans: <class 'str'>
name = 'Alice'
#ans: single quotes
text = """multi
line"""
#ans: multiline string
```

---

### Boolean Type

```python
# boolean
is_valid = True
type(is_valid)
#ans: <class 'bool'>
is_empty = False
#ans: False value
```

---

### NoneType

```python
# None type
x = None
type(x)
#ans: <class 'NoneType'>
#ans: represents absence of value
result = None
#ans: no value yet
```

---

### Checking Types

```python
# type() function
x = 5
type(x)
#ans: <class 'int'>
y = "hello"
type(y)
#ans: <class 'str'>
z = 3.14
type(z)
#ans: <class 'float'>
```

---

### Exercises - Part 1

```python
# what type is this?
x = 5.0
#ans: <class 'float'>
# what type is this?
y = "123"
#ans: <class 'str'>
# what type results?
result = 10 / 2
#ans: <class 'float'>
# what type is this?
z = True + False
#ans: <class 'int'> (True=1, False=0)
```

---

### Exercises - Part 2

```python
# what type?
a = 5
b = 2
c = a / b
#ans: <class 'float'>
# what type?
x = 10
y = 3
z = x // y
#ans: <class 'int'>
```

---

### Exercises - Part 3

```python
# tricky: what type?
value = "5" + "3"
#ans: <class 'str'> (result is "53")
# what is the type?
x = None
#ans: <class 'NoneType'>
# what type is this expression?
result = 5 > 3
#ans: <class 'bool'>
```

---

### Exercises - Part 4

```python
# what happens?
x = int(True)
#ans: 1, type is <class 'int'>
# mixing types?
x = 5 + 2.5
#ans: 7.5, type is <class 'float'>
# edge case?
x = bool([])
#ans: False, type is <class 'bool'>
```

---

### Exercises - Part 5

```python
# what type?
x = 0
#ans: <class 'int'>
# empty string type?
s = ""
#ans: <class 'str'>
# what type?
x = float(5)
#ans: 5.0, <class 'float'>
```
