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

# Lists Basics

---

### Creating Lists

```python
# create list
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "two", 3.0, True]
empty = []
```

---

### Accessing Elements

```python
# indexing
fruits = ["apple", "banana", "cherry"]
fruits[0]
#ans: "apple"
fruits[-1]
#ans: "cherry"
fruits[1]
#ans: "banana"
```

---

### Slicing

```python
# slice lists
numbers = [0, 1, 2, 3, 4, 5]
numbers[1:4]
#ans: [1, 2, 3]
numbers[:3]
#ans: [0, 1, 2]
numbers[3:]
#ans: [3, 4, 5]
```

---

### List Length

```python
# len() function
fruits = ["apple", "banana", "cherry"]
len(fruits)
#ans: 3
len([])
#ans: 0
```

---

### Modifying Elements

```python
# change element
fruits = ["apple", "banana", "cherry"]
fruits[1] = "blueberry"
#ans: fruits is ["apple", "blueberry", "cherry"]
```

---

### Exercises - Part 1

```python
# what is the first element?
lst = [10, 20, 30]
lst[0]
#ans: 10
```

---

### Exercises - Part 2

```python
# negative index?
lst = [10, 20, 30]
lst[-1]
#ans: 30
lst[-2]
#ans: 20
```

---

### Exercises - Part 3

```python
# slicing result?
lst = [1, 2, 3, 4, 5]
lst[1:4]
#ans: [2, 3, 4]
```

---

### Exercises - Part 4

```python
# what happens?
lst = [1, 2, 3]
lst[5]
#ans: IndexError
```

---

### Exercises - Part 5

```python
# empty slice?
lst = [1, 2, 3]
lst[5:10]
#ans: []
```

---

### Exercises - Part 6

```python
# step in slice?
lst = [0, 1, 2, 3, 4, 5]
lst[::2]
#ans: [0, 2, 4]
```

---

### Exercises - Part 7

```python
# reverse list?
lst = [1, 2, 3]
lst[::-1]
#ans: [3, 2, 1]
```

---

### Exercises - Part 8

```python
# modify with slice?
lst = [1, 2, 3, 4, 5]
lst[1:3] = [20, 30]
#ans: [1, 20, 30, 4, 5]
```

---

### Exercises - Part 9

```python
# nested list access?
matrix = [[1, 2], [3, 4]]
matrix[0][1]
#ans: 2
```

---

### Exercises - Part 10

```python
# list concatenation?
lst1 = [1, 2]
lst2 = [3, 4]
lst1 + lst2
#ans: [1, 2, 3, 4]
```
