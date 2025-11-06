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

#ans: Function Scope

---

### Global Scope

```python
# global variable
x = 10
def func():
    print(x)
func()
#ans: 10
```

---

### Local Scope

```python
# local variable
def func():
    y = 20
    print(y)
func()
#ans: print(y)  # NameError
```

---

### Global Keyword

```python
# modify global variable
count = 0
def increment():
    global count
    count += 1
increment()
#ans: count is 1
```

---

### Nonlocal Keyword

```python
# modify enclosing scope
def outer():
    x = 10
    def inner():
        nonlocal x
        x = 20
    inner()
    return x
result = outer()
#ans: 20
```

---

### Shadowing

```python
# local shadows global
x = 10
def func():
    x = 5
    print(x)
func()
#ans: 5
print(x)
#ans: 10
```

---

### Exercises - Part 1

```python
# what is printed?
x = 5
def func():
    print(x)
func()
#ans: 5
```

---

### Exercises - Part 2

```python
# what happens?
x = 5
def func():
    x = 10
func()
print(x)
#ans: 5 (local x doesn't affect global)
```

---

### Exercises - Part 3

```python
# global keyword?
x = 5
def func():
    global x
    x = 10
func()
print(x)
#ans: 10
```

---

### Exercises - Part 4

```python
# can you do this?
def func():
    print(x)
    x = 5
func()
#ans: UnboundLocalError
```

---

### Exercises - Part 5

```python
# nonlocal?
def outer():
    x = 5
    def inner():
        nonlocal x
        x = 10
    inner()
    return x
outer()
#ans: 10
```

---

### Exercises - Part 6

```python
# nested functions?
def outer():
    x = 5
    def inner():
        return x
    return inner()
outer()
#ans: 5
```

---

### Exercises - Part 7

```python
# what is x?
x = 1
def func():
    x = x + 1
func()
#ans: UnboundLocalError
```

---

### Exercises - Part 8

```python
# parameter scope?
def func(x):
    x = 10
x = 5
func(x)
print(x)
#ans: 5
```

---

### Exercises - Part 9

```python
# global in nested?
x = 5
def outer():
    def inner():
        global x
        x = 10
    inner()
outer()
print(x)
#ans: 10
```

---

### Exercises - Part 10

```python
# closure?
def outer(x):
    def inner(y):
        return x + y
    return inner
f = outer(10)
f(5)
#ans: 15
```
