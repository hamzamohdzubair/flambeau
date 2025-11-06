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

# Break & Continue

---

### Break Statement

```python
# break exits the loop
for i in range(10):
    if i == 5:
        break
    print(i)
#ans: 0, 1, 2, 3, 4
```

---

### Continue Statement

```python
# continue skips current iteration
for i in range(5):
    if i == 2:
        continue
    print(i)
#ans: 0, 1, 3, 4
```

---

### Break in While

```python
# break in while loop
count = 0
while True:
    count += 1
    if count == 3:
        break
#ans: count is 3
```

---

### Continue in While

```python
# continue in while
x = 0
while x < 5:
    x += 1
    if x == 3:
        continue
    print(x)
#ans: 1, 2, 4, 5 (skips 3)
```

---

### Break in Nested Loop

```python
# break only exits inner loop
for i in range(3):
    for j in range(3):
        if j == 1:
            break
        print(f"i={i}, j={j}")
#ans: i=0,j=0 then i=1,j=0 then i=2,j=0
```

---

### Exercises - Part 1

```python
# what prints?
for i in range(5):
    if i == 3:
        break
    print(i)
#ans: 0, 1, 2
```

---

### Exercises - Part 2

```python
# continue effect?
for i in range(5):
    if i % 2 == 0:
        continue
    print(i)
#ans: 1, 3 (skips even numbers)
```

---

### Exercises - Part 3

```python
# multiple breaks?
for i in range(10):
    if i == 3:
        break
    if i == 5:
        break
    print(i)
#ans: 0, 1, 2 (first break stops it)
```

---

### Exercises - Part 4

```python
# what is i?
for i in range(10):
    if i == 5:
        break
#ans: i is 5
```

---

### Exercises - Part 5

```python
# nested break?
for i in range(3):
    for j in range(3):
        if i == j == 1:
            break
        print(i, j)
#ans: (0,0) (0,1) (0,2) (1,0) (2,0) (2,1) (2,2)
```

---

### Exercises - Part 6

```python
# what happens?
for i in range(5):
    continue
    print(i)
#ans: nothing (continue skips print)
```

---

### Exercises - Part 7

```python
# tricky continue?
for i in range(3):
    if i == 1:
        i = 10
        continue
    print(i)
#ans: 0, 2 (i=10 doesn't affect next iteration)
```

---

### Exercises - Part 8

```python
# what prints?
for i in range(5):
    if i < 2:
        continue
    if i > 3:
        break
    print(i)
#ans: 2, 3
```

---

### Exercises - Part 9

```python
# break immediately?
for i in range(5):
    break
    print(i)
#ans: nothing (breaks before print)
```

---

### Exercises - Part 10

```python
# continue then break?
for i in range(10):
    if i % 2 == 0:
        continue
    if i == 5:
        break
    print(i)
#ans: 1, 3
```
