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

# While Loops

---

### Basic While Loop

```python
# while condition is True
count = 0
while count < 5:
    print(count)
    count += 1
#ans: 0, 1, 2, 3, 4
```

---

### While with Countdown

```python
# countdown
x = 3
while x > 0:
    print(x)
    x -= 1
#ans: 3, 2, 1
```

---

### While with Break

```python
# infinite loop with break
x = 0
while True:
    x += 1
    if x > 5:
        break
#ans: x is 6
```

---

### While with Increment

```python
# increment by different values
x = 0
while x < 10:
    x += 2
#ans: x is 10 (after last iteration)
```

---

### Exercises - Part 1

```python
# what is count after?
count = 0
while count < 5:
    count += 1
#ans: count is 5
```

---

### Exercises - Part 2

```python
# how many prints?
x = 3
while x > 0:
    print(x)
    x -= 1
#ans: 3 prints (3, 2, 1)
```

---

### Exercises - Part 3

```python
# what happens?
x = 0
while x < 5:
    x += 2
#ans: x is 6 (after last iteration)
```

---

### Exercises - Part 4

```python
# infinite loop?
x = 0
while x >= 0:
    x += 1
    if x > 5:
        break
#ans: x is 6 (breaks when x becomes 6)
```

---

### Exercises - Part 5

```python
# what is x?
x = 10
while x > 0:
    x -= 3
#ans: x is -2 (10, 7, 4, 1, -2)
```

---

### Exercises - Part 6

```python
# condition never true?
x = 0
while x > 0:
    x += 1
#ans: loop never runs, x is 0
```

---

### Exercises - Part 7

```python
# what prints?
x = 1
while x <= 4:
    print(x)
    x *= 2
#ans: 1, 2, 4
```

---

### Exercises - Part 8

```python
# tricky: what is x?
x = 0
while x < 3:
    x += 1
else:
    x += 10
#ans: x is 13 (3 + 10)
```

---

### Exercises - Part 9

```python
# what is final value?
x = 100
while x > 1:
    x = x // 2
#ans: x is 0 (100, 50, 25, 12, 6, 3, 1, 0)
```

---

### Exercises - Part 10

```python
# condition check?
x = 5
while x:
    x -= 1
#ans: x is 0 (5, 4, 3, 2, 1, 0)
```
