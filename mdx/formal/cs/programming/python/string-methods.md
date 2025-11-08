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

# String Methods

---

### Case Methods

```python
# upper and lower
"hello".upper()
#ans: "HELLO"
"HELLO".lower()
#ans: "hello"
"hello world".title()
#ans: "Hello World"
"hello".capitalize()
#ans: "Hello"
```

---

### Strip Methods

```python
# remove whitespace
"  hello  ".strip()
#ans: "hello"
"  hello  ".lstrip()
#ans: "hello  "
"  hello  ".rstrip()
#ans: "  hello"
```

---

### Split

```python
# split string
"apple,banana,cherry".split(",")
#ans: ['apple', 'banana', 'cherry']
"one two three".split()
#ans: ['one', 'two', 'three']
```

---

### Join

```python
# join list to string
",".join(["a", "b", "c"])
#ans: "a,b,c"
" ".join(["Hello", "World"])
#ans: "Hello World"
```

---

### Find and Index

```python
# find substring
"hello world".find("world")
#ans: 6
"hello world".find("xyz")
#ans: -1
"hello world".index("world")
#ans: 6
```

---

### Replace

```python
# replace substring
"hello world".replace("world", "Python")
#ans: "hello Python"
"aaa".replace("a", "b", 2)
#ans: "bba" (replace first 2)
```

---

### Startswith/Endswith

```python
# check start and end
"hello".startswith("he")
#ans: True
"hello".endswith("lo")
#ans: True
```

---

### Count

```python
# count occurrences
"hello".count("l")
#ans: 2
"banana".count("a")
#ans: 3
```

---

### Exercises - Part 1

```python
# case methods?
"HeLLo".lower()
#ans: "hello"
"hello".upper()
#ans: "HELLO"
```

---

### Exercises - Part 2

```python
# strip only ends?
"  hello  ".strip()
#ans: "hello"
```

---

### Exercises - Part 3

```python
# split with limit?
"a-b-c-d".split("-", 2)
#ans: ['a', 'b', 'c-d']
```

---

### Exercises - Part 4

```python
# join with numbers?
"-".join([1, 2, 3])
#ans: TypeError (needs strings)
"-".join(["1", "2", "3"])
#ans: "1-2-3"
```

---

### Exercises - Part 5

```python
# find vs index?
"hello".find("x")
#ans: -1
"hello".index("x")
#ans: ValueError
```

---

### Exercises - Part 6

```python
# replace all?
"aaa".replace("a", "b")
#ans: "bbb"
```

---

### Exercises - Part 7

```python
# case sensitive?
"Hello".startswith("h")
#ans: False
"Hello".startswith("H")
#ans: True
```

---

### Exercises - Part 8

```python
# count overlapping?
"aaa".count("aa")
#ans: 1 (non-overlapping)
```

---

### Exercises - Part 9

```python
# empty split?
"".split()
#ans: []
"  ".split()
#ans: []
```

---

### Exercises - Part 10

```python
# join empty list?
",".join([])
#ans: ""
```
