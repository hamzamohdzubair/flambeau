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

#ans: File Reading

---

### Open and Read

```python
# open and read file
file = open("data.txt", "r")
content = file.read()
file.close()
```

---

### Context Manager (Best Practice)

```python
# with statement
with open("data.txt", "r") as file:
    content = file.read()
#ans: file automatically closed
```

---

### Read Lines

```python
# read all lines
with open("data.txt", "r") as file:
    lines = file.readlines()
#ans: returns list of lines
```

---

### Read Line by Line

```python
# iterate over lines
with open("data.txt", "r") as file:
    for line in file:
        print(line.strip())
```

---

### Readline Method

```python
# read one line at a time
with open("data.txt", "r") as file:
    line1 = file.readline()
    line2 = file.readline()
```

---

### Read with Limit

```python
# read n characters
with open("data.txt", "r") as file:
    content = file.read(10)
#ans: first 10 characters
```

---

### Exercises - Part 1

```python
# what happens without close?
file = open("data.txt", "r")
content = file.read()
#ans: file remains open (bad practice)
```

---

### Exercises - Part 2

```python
# read() returns what type?
with open("data.txt", "r") as f:
    content = f.read()
#ans: str (string)
```

---

### Exercises - Part 3

```python
# readlines() returns?
with open("data.txt", "r") as f:
    lines = f.readlines()
#ans: list of strings
```

---

### Exercises - Part 4

```python
# strip() in loop?
for line in file:
    print(line.strip())
#ans: removes \n at end
```

---

### Exercises - Part 5

```python
# read empty file?
with open("empty.txt", "r") as f:
    content = f.read()
#ans: "" (empty string)
```

---

### Exercises - Part 6

```python
# file not found?
with open("missing.txt", "r") as f:
    pass
#ans: FileNotFoundError
```

---

### Exercises - Part 7

```python
# read twice?
with open("data.txt", "r") as f:
    c1 = f.read()
    c2 = f.read()
#ans: c2 is "" (already at end)
```

---

### Exercises - Part 8

```python
# readline at end?
with open("data.txt", "r") as f:
    f.read()
    line = f.readline()
#ans: "" (empty string)
```

---

### Exercises - Part 9

```python
# iterate multiple times?
with open("data.txt", "r") as f:
    for line in f:
        pass
    for line in f:
        pass
#ans: second loop doesn't run
```

---

### Exercises - Part 10

```python
# read with encoding?
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()
#ans: specify encoding explicitly
```
