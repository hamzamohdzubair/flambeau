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

#ans: Pass Statement

---

### Pass in If

```python
#ans: placeholder for empty block
if True:
    pass
#ans: nothing happens
```

---

### Pass in Function

```python
#ans: empty function
def my_function():
    pass
#ans: function does nothing
```

---

### Pass in Class

```python
#ans: empty class
class MyClass:
    pass
#ans: empty class definition
```

---

### Pass in Loop

```python
#ans: pass in loop
for i in range(3):
    pass
#ans: loop runs 3 times, does nothing
```

---

### Multiple Pass

```python
#ans: multiple pass statements
if True:
    pass
    pass
#ans: both do nothing
```

---

### Exercises - Part 1

```python
# what happens?
x = 5
if x > 3:
    pass
#ans: nothing (pass is a no-op)
```

---

### Exercises - Part 2

```python
# can you have empty if?
if True:
#ans: SyntaxError (needs at least pass)
```

---

### Exercises - Part 3

```python
# pass in loop?
for i in range(3):
    pass
#ans: loop runs 3 times, does nothing
```

---

### Exercises - Part 4

```python
# multiple pass?
if True:
    pass
    pass
#ans: valid, both do nothing
```

---

### Exercises - Part 5

```python
# pass vs continue?
for i in range(3):
    pass
    print(i)
#ans: 0, 1, 2 (pass doesn't skip)
```

---

### Exercises - Part 6

```python
# pass with else?
if False:
    pass
else:
    print("Else")
#ans: Else
```

---

### Exercises - Part 7

```python
# what is x?
x = 5
if x > 10:
    x = 10
else:
    pass
#ans: x is still 5
```

---

### Exercises - Part 8

```python
# pass in try?
try:
    x = 5
except:
    pass
#ans: valid, x is 5
```

---

### Exercises - Part 9

```python
# pass after return?
def func():
    return 5
    pass
#ans: valid but pass is unreachable
```

---

### Exercises - Part 10

```python
# empty except with pass?
try:
    x = 1 / 0
except:
    pass
#ans: error is silently caught
```
