{{yaml}}

{{title}}

#ans: Tuples

---

### Creating Tuples

```python
#ans: create tuple
point = (3, 5)
rgb = (255, 128, 0)
single = (42,)
#ans: note comma for single element
empty = ()
```

---

### Accessing Elements

```python
#ans: indexing tuples
point = (3, 5)
point[0]
#ans: 3
point[-1]
#ans: 5
```

---

### Tuple Unpacking

```python
#ans: unpack values
x, y = (3, 5)
#ans: x=3, y=5
r, g, b = (255, 128, 0)
#ans: r=255, g=128, b=0
```

---

### Tuples are Immutable

```python
#ans: cannot modify
point = (3, 5)
#ans: point[0] = 10  # TypeError
```

---

### Tuple Operations

```python
#ans: concatenation
tuple1 = (1, 2)
tuple2 = (3, 4)
tuple1 + tuple2
#ans: (1, 2, 3, 4)
#ans: repetition
(1, 2) * 3
#ans: (1, 2, 1, 2, 1, 2)
```

---

### Tuple Methods

```python
#ans: count
numbers = (1, 2, 3, 2, 4)
numbers.count(2)
#ans: 2
#ans: index
numbers.index(3)
#ans: 2
```

---

### Exercises - Part 1

```python
# single element tuple?
x = (5)
type(x)
#ans: <class 'int'>
y = (5,)
type(y)
#ans: <class 'tuple'>
```

---

### Exercises - Part 2

```python
# tuple unpacking?
a, b = (10, 20)
#ans: a=10, b=20
```

---

### Exercises - Part 3

```python
# can you modify?
t = (1, 2, 3)
t[0] = 10
#ans: TypeError (tuples are immutable)
```

---

### Exercises - Part 4

```python
# tuple slicing?
t = (1, 2, 3, 4, 5)
t[1:4]
#ans: (2, 3, 4)
```

---

### Exercises - Part 5

```python
# nested tuple?
t = ((1, 2), (3, 4))
t[0][1]
#ans: 2
```

---

### Exercises - Part 6

```python
# tuple with list?
t = (1, [2, 3], 4)
t[1].append(5)
#ans: t is (1, [2, 3, 5], 4)
```

---

### Exercises - Part 7

```python
# empty tuple length?
t = ()
len(t)
#ans: 0
```

---

### Exercises - Part 8

```python
# tuple from string?
t = tuple("abc")
#ans: ('a', 'b', 'c')
```

---

### Exercises - Part 9

```python
# comparing tuples?
(1, 2) == (1, 2)
#ans: True
(1, 2) < (1, 3)
#ans: True
```

---

### Exercises - Part 10

```python
# tuple membership?
3 in (1, 2, 3)
#ans: True
```
