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

## Variables & Assignment

---

### Basic Assignment

```python
#variable assignment
x = 5
#ans: x is 5
name = "Alice"
#ans: name is "Alice"
pi = 3.14
#ans: pi is 3.14
```

---

### Multiple Assignment

```python
#assign multiple variables
a, b, c = 1, 2, 3
#ans: a=1, b=2, c=3
# what are the values?
x, y = 10, 20
#ans: x=10, y=20
```

---

### Swapping Values

```python
# traditional swap needs temp variable
x, y = 5, 10
temp = x
x = y
y = temp
#ans: x=10, y=5
#ans: python swap
x, y = 5, 10
x, y = y, x
#ans: x=10, y=5
```

---

### Chained Assignment

```python
# assign same value to multiple variables
x = y = z = 0
#ans: x=0, y=0, z=0
a = b = c = "same"
#ans: all are "same"
```

---

### Exercises - Part 1

```python
# what is the value of x?
x = 10
#ans: 10
# what happens after this swap?
a, b = 5, 15
a, b = b, a
#ans: a=15, b=5
# what is z after this?
x, y, z = 1, 2, 3
z = x + y
#ans: 3
# can you assign like this?
x = y = z = 0
#ans: yes, all are 0
```

---

### Exercises - Part 2

```python
# what is the value of b?
a = 5
b = a
a = 10
#ans: 5
# what does this produce?
x, y = 1, 2, 3
#ans: Error: too many values to unpack
# what is y?
x = y = 5
x = x + 1
#ans: 5
```

---

### Exercises - Part 3

```python
# multiple assignment with calculation?
a, b = 10, 20
a, b = a+b, a-b
#ans: a=30, b=-10
# what happens here?
x = 1
x = x
#ans: x is still 1
#ans: tricky swap
x, y = 5, 10
x, y = y, x+y
#ans: x=10, y=15
```

---

### Exercises - Part 4

```python
# assignment from right to left?
a = b = 3
b = 5
#ans: a=3, b=5
# what is x?
x = 10
#ans: 10
# unpacking with extra values?
x, y = [1, 2, 3]
#ans: Error: too many values
```

---

### Exercises - Part 5

```python
# what about this?
a, b, c = "abc"
#ans: a='a', b='b', c='c'
# swap three variables?
x, y, z = 1, 2, 3
x, y, z = z, x, y
#ans: x=3, y=1, z=2
# empty assignment?
x, y = [], []
#ans: x=[], y=[]
```
