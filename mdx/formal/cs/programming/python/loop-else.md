---
theme: blank2
paginate: true
transition: slide
class: lead
footer: '<span class="breadcrumb"></span>'
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

# Loop Else

---

### For-Else Basics

```python
# else runs if no break
for i in range(5):
    if i == 10:
        break
else:
    print("Loop completed")
#ans: Loop completed
```

---

### While-Else Basics

```python
# else runs after while completes
count = 0
while count < 3:
    print(count)
    count += 1
else:
    print("Done")
#ans: 0, 1, 2, Done
```

---

### Break Prevents Else

```python
# break prevents else from running
for i in range(5):
    if i == 3:
        break
else:
    print("This won't print")
#ans: (nothing - break prevents else)
```

---

### Empty Loop with Else

```python
# else runs even if loop is empty
for i in range(0):
    pass
else:
    print("Runs")
#ans: Runs
```

---

### Exercises - Part 1

```python
# does else run?
for i in range(5):
    pass
else:
    print("Done")
#ans: Done (no break)
```

---

### Exercises - Part 2

```python
# what about this?
for i in range(5):
    if i == 2:
        break
else:
    print("Done")
#ans: nothing (break prevents else)
```

---

### Exercises - Part 3

```python
# while-else?
x = 0
while x < 0:
    x += 1
else:
    print("Else runs")
#ans: Else runs (loop body never executes but no break)
```

---

### Exercises - Part 4

```python
# tricky: does else run?
for i in range(0):
    pass
else:
    print("Yes")
#ans: Yes (empty range, no break)
```

---

### Exercises - Part 5

```python
# what prints?
for i in range(3):
    if i == 5:
        break
else:
    print("Complete")
#ans: Complete (condition never True, no break)
```

---

### Exercises - Part 6

```python
# while-else with break?
x = 0
while x < 3:
    if x == 2:
        break
    x += 1
else:
    print("Done")
#ans: nothing (break prevents else)
```

---

### Exercises - Part 7

```python
# nested loop else?
for i in range(2):
    for j in range(2):
        if j == 1:
            break
else:
    print("Outer else")
#ans: Outer else (inner break doesn't affect outer)
```

---

### Exercises - Part 8

```python
# what happens?
for i in range(3):
    if i == 3:
        break
else:
    print("Runs")
#ans: Runs (condition never True)
```

---

### Exercises - Part 9

```python
# while-else execution?
x = 5
while x < 3:
    x += 1
else:
    print("Else")
#ans: Else (condition False from start)
```

---

### Exercises - Part 10

```python
# tricky break?
for i in range(3):
    if False:
        break
else:
    print("Complete")
#ans: Complete (break never executes)
```
