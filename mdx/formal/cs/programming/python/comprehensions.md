---
theme: gaia2
paginate: true
transition: slide
class: lead
footer: '[<iconify-icon icon="hugeicons:home-11" title="Home"></iconify-icon>](/index.html) [<iconify-icon icon="si:left-up-line" title="Back"></iconify-icon>](../index.html) [<iconify-icon icon="octicon:move-to-start-24" title="Start"></iconify-icon>](#1)'
---
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
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

# Comprehensions

---

### List Comprehensions - Basics

```python
# basic list comprehension
squares = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# equivalent to
squares = []
for x in range(10):
    squares.append(x**2)

# with transformation
words = ["hello", "world", "python"]
upper = [word.upper() for word in words]
# ['HELLO', 'WORLD', 'PYTHON']

# with calculation
prices = [19.99, 29.99, 39.99]
with_tax = [price * 1.1 for price in prices]
```

---

### List Comprehensions - Filtering

```python
# with condition (filter)
evens = [x for x in range(10) if x % 2 == 0]
# [0, 2, 4, 6, 8]

# multiple conditions
numbers = [x for x in range(20) if x % 2 == 0 if x % 3 == 0]
# [0, 6, 12, 18]

# condition with transformation
numbers = [1, -2, 3, -4, 5]
positive_squares = [x**2 for x in numbers if x > 0]
# [1, 9, 25]

# filtering strings
words = ["hello", "world", "python", "hi"]
long_words = [word for word in words if len(word) > 3]
# ['hello', 'world', 'python']
```

---

### List Comprehensions - Advanced

```python
# if-else expression (not filter)
numbers = [1, 2, 3, 4, 5]
result = ["even" if x % 2 == 0 else "odd" for x in numbers]
# ['odd', 'even', 'odd', 'even', 'odd']

# nested loops
matrix = [[i*j for j in range(3)] for i in range(3)]
# [[0, 0, 0], [0, 1, 2], [0, 2, 4]]

# flatten nested list
nested = [[1, 2], [3, 4], [5, 6]]
flat = [item for sublist in nested for item in sublist]
# [1, 2, 3, 4, 5, 6]

# cartesian product
colors = ["red", "blue"]
sizes = ["S", "M", "L"]
combinations = [(color, size) for color in colors for size in sizes]
# [('red', 'S'), ('red', 'M'), ('red', 'L'), ('blue', 'S'), ('blue', 'M'), ('blue', 'L')]
```

---

### Dictionary Comprehensions

```python
# basic dict comprehension
squares = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# from two lists
keys = ["a", "b", "c"]
values = [1, 2, 3]
d = {k: v for k, v in zip(keys, values)}
# {'a': 1, 'b': 2, 'c': 3}

# with condition
numbers = range(10)
even_squares = {x: x**2 for x in numbers if x % 2 == 0}
# {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}

# swap keys and values
original = {"a": 1, "b": 2, "c": 3}
swapped = {v: k for k, v in original.items()}
# {1: 'a', 2: 'b', 3: 'c'}
```

---

### Dictionary Comprehensions - Advanced

```python
# filter dictionary
prices = {"apple": 0.5, "banana": 0.3, "cherry": 2.5}
expensive = {k: v for k, v in prices.items() if v > 1.0}
# {'cherry': 2.5}

# transform values
prices = {"apple": 0.5, "banana": 0.3}
with_tax = {k: v * 1.1 for k, v in prices.items()}
# {'apple': 0.55, 'banana': 0.33}

# transform keys
data = {"name": "Alice", "age": 25}
upper_keys = {k.upper(): v for k, v in data.items()}
# {'NAME': 'Alice', 'AGE': 25}

# nested comprehension
matrix = {i: {j: i*j for j in range(3)} for i in range(3)}
# {0: {0: 0, 1: 0, 2: 0}, 1: {0: 0, 1: 1, 2: 2}, 2: {0: 0, 1: 2, 2: 4}}
```

---

### Set Comprehensions

```python
# basic set comprehension
squares = {x**2 for x in range(10)}
# {0, 1, 4, 9, 16, 25, 36, 49, 64, 81}

# removes duplicates automatically
numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
unique = {x for x in numbers}
# {1, 2, 3, 4}

# with condition
evens = {x for x in range(10) if x % 2 == 0}
# {0, 2, 4, 6, 8}

# from string
text = "hello world"
unique_chars = {char for char in text if char != ' '}
# {'h', 'e', 'l', 'o', 'w', 'r', 'd'}

# set operations
set1 = {x for x in range(5)}
set2 = {x for x in range(3, 8)}
intersection = {x for x in set1 if x in set2}
# {3, 4}
```

---

### Generator Expressions

```python
# generator expression (lazy evaluation)
gen = (x**2 for x in range(10))
# <generator object>

# iterate over generator
for value in gen:
    print(value)

# convert to list
squares = list(x**2 for x in range(10))

# memory efficient
import sys
list_comp = [x**2 for x in range(1000)]
gen_exp = (x**2 for x in range(1000))
sys.getsizeof(list_comp)  # ~9000 bytes
sys.getsizeof(gen_exp)    # ~200 bytes

# use in functions
sum(x**2 for x in range(10))
max(x for x in range(10) if x % 2 == 0)
```

---

### Generators vs Lists

```python
# list comprehension - all values in memory
squares_list = [x**2 for x in range(1000000)]

# generator - values created on demand
squares_gen = (x**2 for x in range(1000000))

# generators can only be iterated once
gen = (x for x in range(3))
list(gen)  # [0, 1, 2]
list(gen)  # [] (exhausted)

# chaining generators
numbers = (x for x in range(10))
evens = (x for x in numbers if x % 2 == 0)
squares = (x**2 for x in evens)
result = list(squares)  # [0, 4, 16, 36, 64]
```

---

### Practical Examples

```python
# read file and process lines
lines = [line.strip() for line in open("file.txt")]

# extract data from dictionaries
users = [
    {"name": "Alice", "age": 25},
    {"name": "Bob", "age": 30}
]
names = [user["name"] for user in users]
adults = [user for user in users if user["age"] >= 18]

# matrix operations
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
transpose = [[row[i] for row in matrix] for i in range(3)]
# [[1, 4, 7], [2, 5, 8], [3, 6, 9]]

# word frequency
text = "hello world hello python"
words = text.split()
freq = {word: words.count(word) for word in set(words)}
# {'hello': 2, 'world': 1, 'python': 1}
```

---

### Nested Comprehensions

```python
# 2D list
matrix = [[i+j for j in range(3)] for i in range(3)]
# [[0, 1, 2], [1, 2, 3], [2, 3, 4]]

# flatten with condition
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
evens = [x for row in matrix for x in row if x % 2 == 0]
# [2, 4, 6, 8]

# nested dict comprehension
data = {
    "user1": {"name": "Alice", "age": 25},
    "user2": {"name": "Bob", "age": 30}
}
names = {k: v["name"] for k, v in data.items()}
# {'user1': 'Alice', 'user2': 'Bob'}

# complex nesting
result = [
    [i*j for j in range(3) if j % 2 == 0]
    for i in range(3)
    if i > 0
]
# [[0, 0], [0, 2]]
```

---

### When to Use Comprehensions

```python
# good: simple transformation
squares = [x**2 for x in numbers]

# good: simple filter
evens = [x for x in numbers if x % 2 == 0]

# acceptable: moderate complexity
result = [x**2 for x in numbers if x > 0 and x < 100]

# bad: too complex (use regular loop)
# result = [
#     process(x, y, z)
#     for x in list1
#     for y in list2
#     if condition1(x)
#     for z in list3
#     if condition2(y, z)
# ]

# use regular loop for readability
result = []
for x in list1:
    if condition1(x):
        for y in list2:
            if condition2(y):
                result.append(process(x, y))
```
