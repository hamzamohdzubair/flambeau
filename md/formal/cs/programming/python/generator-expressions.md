{{yaml}}

{{title}}

#ans: Generator Expressions

---

### Basic Generator Expression

```python
# generator expression (lazy)
gen = (x**2 for x in range(5))
#ans: <generator object>
list(gen)
#ans: [0, 1, 4, 9, 16]
```

---

### Generator vs List

```python
# list - all in memory
lst = [x**2 for x in range(1000)]
#ans: generator - on demand
gen = (x**2 for x in range(1000))
```

---

### Iterating Generator

```python
# iterate once
gen = (x for x in range(3))
for val in gen:
    print(val)
#ans: 0, 1, 2
#ans: exhausted after iteration
for val in gen:
    print(val)
#ans: (nothing)
```

---

### Generator in Functions

```python
# use in sum
sum(x**2 for x in range(10))
#ans: 285
#ans: use in max
max(x for x in range(10) if x % 2 == 0)
#ans: 8
```

---

### Generator with Condition

```python
# filter with generator
gen = (x for x in range(10) if x % 2 == 0)
list(gen)
#ans: [0, 2, 4, 6, 8]
```

---

### Exercises - Part 1

```python
# generator type?
gen = (x for x in range(3))
type(gen)
#ans: <class 'generator'>
```

---

### Exercises - Part 2

```python
# can iterate twice?
gen = (x for x in range(3))
list(gen)
#ans: [0, 1, 2]
list(gen)
#ans: [] (exhausted)
```

---

### Exercises - Part 3

```python
# memory efficiency?
import sys
lst = [x for x in range(1000)]
gen = (x for x in range(1000))
sys.getsizeof(lst)
#ans: ~9000 bytes
sys.getsizeof(gen)
#ans: ~200 bytes
```

---

### Exercises - Part 4

```python
# next() on generator?
gen = (x for x in range(3))
next(gen)
#ans: 0
next(gen)
#ans: 1
```

---

### Exercises - Part 5

```python
# generator with if-else?
gen = (x if x > 0 else 0 for x in [-1, 1, 2])
list(gen)
#ans: [0, 1, 2]
```

---

### Exercises - Part 6

```python
# chaining generators?
gen1 = (x for x in range(5))
gen2 = (x*2 for x in gen1)
list(gen2)
#ans: [0, 2, 4, 6, 8]
```

---

### Exercises - Part 7

```python
# generator in sum?
sum(x for x in range(101))
#ans: 5050
```

---

### Exercises - Part 8

```python
# empty generator?
gen = (x for x in [])
list(gen)
#ans: []
```

---

### Exercises - Part 9

```python
# generator vs range?
#ans: both are lazy
range(10)  # range object
(x for x in range(10))  # generator
```

---

### Exercises - Part 10

```python
# convert to list?
gen = (x**2 for x in range(3))
lst = list(gen)
#ans: [0, 1, 4]
#ans: gen is now exhausted
```
