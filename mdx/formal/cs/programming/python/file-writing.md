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

# File Writing

---

### Write Mode

```python
# write to file (overwrites)
with open("output.txt", "w") as file:
    file.write("Hello, World!")
```

---

### Write Multiple Lines

```python
# write several lines
with open("output.txt", "w") as file:
    file.write("Line 1\n")
    file.write("Line 2\n")
    file.write("Line 3\n")
```

---

### Writelines

```python
# write list of lines
lines = ["Line 1\n", "Line 2\n", "Line 3\n"]
with open("output.txt", "w") as file:
    file.writelines(lines)
```

---

### Append Mode

```python
# append to existing file
with open("output.txt", "a") as file:
    file.write("Appended line\n")
```

---

### Write Returns Count

```python
# write returns character count
with open("output.txt", "w") as file:
    count = file.write("Hello")
#ans: count is 5
```

---

### Exercises - Part 1

```python
# write mode behavior?
with open("file.txt", "w") as f:
    f.write("New content")
#ans: overwrites existing file
```

---

### Exercises - Part 2

```python
# write adds newline?
with open("file.txt", "w") as f:
    f.write("Line 1")
    f.write("Line 2")
#ans: "Line 1Line 2" (no newline)
```

---

### Exercises - Part 3

```python
# writelines adds newlines?
lines = ["A", "B", "C"]
with open("file.txt", "w") as f:
    f.writelines(lines)
#ans: "ABC" (no newlines)
```

---

### Exercises - Part 4

```python
# append to non-existent?
with open("new.txt", "a") as f:
    f.write("Text")
#ans: creates new file
```

---

### Exercises - Part 5

```python
# write empty string?
with open("file.txt", "w") as f:
    f.write("")
#ans: creates empty file
```

---

### Exercises - Part 6

```python
# write number?
with open("file.txt", "w") as f:
    f.write(42)
#ans: TypeError (must be string)
```

---

### Exercises - Part 7

```python
# write return value?
with open("file.txt", "w") as f:
    n = f.write("Hi")
#ans: n is 2
```

---

### Exercises - Part 8

```python
# write in read mode?
with open("file.txt", "r") as f:
    f.write("Text")
#ans: io.UnsupportedOperation
```

---

### Exercises - Part 9

```python
# append vs write?
#ans: "w" overwrites
#ans: "a" adds to end
```

---

### Exercises - Part 10

```python
# write binary?
with open("file.bin", "wb") as f:
    f.write(b"data")
#ans: writes bytes
```
