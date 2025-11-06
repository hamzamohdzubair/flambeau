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

#ans: Lists Methods

---

### Append

```python
# add to end
fruits = ["apple", "banana"]
fruits.append("cherry")
#ans: ["apple", "banana", "cherry"]
```

---

### Insert

```python
# insert at index
fruits = ["apple", "cherry"]
fruits.insert(1, "banana")
#ans: ["apple", "banana", "cherry"]
```

---

### Extend

```python
# add multiple items
fruits = ["apple"]
fruits.extend(["banana", "cherry"])
#ans: ["apple", "banana", "cherry"]
```

---

### Remove

```python
# remove by value
fruits = ["apple", "banana", "cherry"]
fruits.remove("banana")
#ans: ["apple", "cherry"]
```

---

### Pop

```python
# remove and return
fruits = ["apple", "banana", "cherry"]
last = fruits.pop()
#ans: last is "cherry"
#ans: fruits is ["apple", "banana"]
first = fruits.pop(0)
#ans: first is "apple"
```

---

### Sort

```python
# sort in place
numbers = [3, 1, 4, 1, 5]
numbers.sort()
#ans: [1, 1, 3, 4, 5]
numbers.sort(reverse=True)
#ans: [5, 4, 3, 1, 1]
```

---

### Reverse

```python
# reverse in place
lst = [1, 2, 3]
lst.reverse()
#ans: [3, 2, 1]
```

---

### Count

```python
# count occurrences
numbers = [1, 2, 3, 2, 4, 2]
numbers.count(2)
#ans: 3
```

---

### Index

```python
# find index
fruits = ["apple", "banana", "cherry"]
fruits.index("banana")
#ans: 1
```

---

### Clear

```python
# remove all
fruits = ["apple", "banana"]
fruits.clear()
#ans: []
```

---

### Exercises - Part 1

```python
# what is lst after append?
lst = [1, 2]
lst.append(3)
#ans: [1, 2, 3]
```

---

### Exercises - Part 2

```python
# insert at position?
lst = [1, 3, 4]
lst.insert(1, 2)
#ans: [1, 2, 3, 4]
```

---

### Exercises - Part 3

```python
# extend vs append?
lst = [1, 2]
lst.extend([3, 4])
#ans: [1, 2, 3, 4]
lst = [1, 2]
lst.append([3, 4])
#ans: [1, 2, [3, 4]]
```

---

### Exercises - Part 4

```python
# pop without argument?
lst = [1, 2, 3]
lst.pop()
#ans: 3
#ans: lst is [1, 2]
```

---

### Exercises - Part 5

```python
# remove first occurrence?
lst = [1, 2, 2, 3]
lst.remove(2)
#ans: [1, 2, 3]
```

---

### Exercises - Part 6

```python
# sort return value?
lst = [3, 1, 2]
result = lst.sort()
#ans: result is None (sorts in place)
```

---

### Exercises - Part 7

```python
# index not found?
lst = [1, 2, 3]
lst.index(5)
#ans: ValueError
```

---

### Exercises - Part 8

```python
# count non-existent?
lst = [1, 2, 3]
lst.count(5)
#ans: 0
```

---

### Exercises - Part 9

```python
# reverse return?
lst = [1, 2, 3]
result = lst.reverse()
#ans: result is None (reverses in place)
```

---

### Exercises - Part 10

```python
# clear return?
lst = [1, 2, 3]
result = lst.clear()
#ans: result is None
#ans: lst is []
```
