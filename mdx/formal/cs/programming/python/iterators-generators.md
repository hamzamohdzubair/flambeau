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

# Iterators & Generators

---

### Iteration Basics

```python
# iterating over list
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    print(num)

# iterating over string
for char in "hello":
    print(char)

# iterating over dictionary
person = {"name": "Alice", "age": 25}
for key in person:
    print(key, person[key])

# iterating over file
with open("data.txt") as file:
    for line in file:
        print(line.strip())
```

---

### Iterator Protocol

```python
# getting iterator
numbers = [1, 2, 3]
iterator = iter(numbers)

# calling next
next(iterator)  # 1
next(iterator)  # 2
next(iterator)  # 3
# next(iterator)  # StopIteration error

# for loop uses iterator protocol
for num in numbers:
    print(num)

# equivalent to
iterator = iter(numbers)
while True:
    try:
        num = next(iterator)
        print(num)
    except StopIteration:
        break
```

---

### Creating Custom Iterator

```python
# iterator class
class Counter:
    def __init__(self, start, end):
        self.current = start
        self.end = end

    def __iter__(self):
        return self

    def __next__(self):
        if self.current >= self.end:
            raise StopIteration
        self.current += 1
        return self.current - 1

counter = Counter(0, 5)
for num in counter:
    print(num)  # 0, 1, 2, 3, 4

# manual iteration
counter = Counter(0, 3)
next(counter)  # 0
next(counter)  # 1
next(counter)  # 2
# next(counter)  # StopIteration
```

---

### Iterable vs Iterator

```python
# iterable: has __iter__()
# iterator: has __iter__() and __next__()

# list is iterable but not iterator
numbers = [1, 2, 3]
iter(numbers)        # creates iterator
# next(numbers)      # Error!

# iterator is both iterable and iterator
iterator = iter(numbers)
iter(iterator)       # returns itself
next(iterator)       # 1

# range is iterable
r = range(5)
iter(r)              # creates iterator
# next(r)            # Error!

# custom iterable
class MyRange:
    def __init__(self, start, end):
        self.start = start
        self.end = end

    def __iter__(self):
        return MyRangeIterator(self.start, self.end)

class MyRangeIterator:
    def __init__(self, start, end):
        self.current = start
        self.end = end

    def __iter__(self):
        return self

    def __next__(self):
        if self.current >= self.end:
            raise StopIteration
        self.current += 1
        return self.current - 1
```

---

### Generator Functions - Basics

```python
# generator function with yield
def count_up_to(n):
    count = 1
    while count <= n:
        yield count
        count += 1

# creates generator object
gen = count_up_to(5)
next(gen)  # 1
next(gen)  # 2

# iterate over generator
for num in count_up_to(5):
    print(num)  # 1, 2, 3, 4, 5

# simple generator
def simple_gen():
    yield 1
    yield 2
    yield 3

for value in simple_gen():
    print(value)  # 1, 2, 3
```

---

### Generator Functions - Advanced

```python
# generator with multiple yields
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

list(fibonacci(10))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# infinite generator
def infinite_counter():
    count = 0
    while True:
        yield count
        count += 1

# use with break or take first n
counter = infinite_counter()
for i, num in enumerate(counter):
    print(num)
    if i >= 4:
        break
# 0, 1, 2, 3, 4

# generator with condition
def even_numbers(n):
    for i in range(n):
        if i % 2 == 0:
            yield i

list(even_numbers(10))  # [0, 2, 4, 6, 8]
```

---

### Generator Expressions

```python
# generator expression (like list comprehension)
gen = (x**2 for x in range(10))
next(gen)  # 0
next(gen)  # 1

# vs list comprehension
list_comp = [x**2 for x in range(10)]  # creates list
gen_exp = (x**2 for x in range(10))    # creates generator

# memory efficiency
import sys
sys.getsizeof([x for x in range(1000)])   # ~9000 bytes
sys.getsizeof((x for x in range(1000)))   # ~200 bytes

# use in functions
sum(x**2 for x in range(10))
max(x for x in range(10) if x % 2 == 0)

# chaining generators
numbers = (x for x in range(10))
evens = (x for x in numbers if x % 2 == 0)
squares = (x**2 for x in evens)
list(squares)  # [0, 4, 16, 36, 64]
```

---

### yield from

```python
# yield from (Python 3.3+)
def generator1():
    yield 1
    yield 2

def generator2():
    yield 3
    yield 4

def combined():
    yield from generator1()
    yield from generator2()

list(combined())  # [1, 2, 3, 4]

# equivalent to
def combined():
    for value in generator1():
        yield value
    for value in generator2():
        yield value

# flatten nested structure
def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item

nested = [1, [2, [3, 4], 5], 6]
list(flatten(nested))  # [1, 2, 3, 4, 5, 6]
```

---

### Generator Methods - send()

```python
# send values to generator
def echo():
    while True:
        value = yield
        print(f"Received: {value}")

gen = echo()
next(gen)  # prime the generator
gen.send("Hello")   # Received: Hello
gen.send("World")   # Received: World

# generator that yields and receives
def running_average():
    total = 0
    count = 0
    average = None
    while True:
        value = yield average
        total += value
        count += 1
        average = total / count

avg = running_average()
next(avg)           # None
avg.send(10)        # 10.0
avg.send(20)        # 15.0
avg.send(30)        # 20.0
```

---

### Generator Methods - throw() and close()

```python
# throw exception to generator
def my_gen():
    try:
        yield 1
        yield 2
        yield 3
    except ValueError:
        yield "Error caught"
    yield 4

gen = my_gen()
next(gen)           # 1
gen.throw(ValueError)  # "Error caught"
next(gen)           # 4

# close generator
def count_forever():
    count = 0
    try:
        while True:
            yield count
            count += 1
    finally:
        print("Cleanup")

gen = count_forever()
next(gen)  # 0
next(gen)  # 1
gen.close()  # Cleanup
# next(gen)  # StopIteration
```

---

### itertools Module - Infinite Iterators

```python
from itertools import count, cycle, repeat

# count - infinite counting
for i in count(10, 2):  # start=10, step=2
    print(i)
    if i > 20:
        break
# 10, 12, 14, 16, 18, 20

# cycle - infinite cycling
colors = ['red', 'green', 'blue']
color_cycle = cycle(colors)
for i, color in enumerate(color_cycle):
    print(color)
    if i >= 5:
        break
# red, green, blue, red, green, blue

# repeat - repeat value
for x in repeat(10, 3):
    print(x)
# 10, 10, 10
```

---

### itertools Module - Combinatoric Iterators

```python
from itertools import product, permutations, combinations

# product - cartesian product
list(product([1, 2], ['a', 'b']))
# [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]

# permutations - all orderings
list(permutations([1, 2, 3], 2))
# [(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]

# combinations - unique selections
list(combinations([1, 2, 3, 4], 2))
# [(1, 2), (1, 3), (1, 4), (2, 3), (2, 4), (3, 4)]

# combinations_with_replacement
from itertools import combinations_with_replacement
list(combinations_with_replacement([1, 2, 3], 2))
# [(1, 1), (1, 2), (1, 3), (2, 2), (2, 3), (3, 3)]
```

---

### itertools Module - Other Utilities

```python
from itertools import chain, islice, zip_longest

# chain - combine iterables
list(chain([1, 2], [3, 4], [5, 6]))
# [1, 2, 3, 4, 5, 6]

# islice - slice iterator
list(islice(range(10), 2, 8, 2))
# [2, 4, 6]

# zip_longest - zip with fill value
list(zip_longest([1, 2], ['a', 'b', 'c'], fillvalue=0))
# [(1, 'a'), (2, 'b'), (0, 'c')]

# groupby - group consecutive items
from itertools import groupby
data = [1, 1, 2, 2, 2, 3, 1, 1]
for key, group in groupby(data):
    print(key, list(group))
# 1 [1, 1]
# 2 [2, 2, 2]
# 3 [3]
# 1 [1, 1]
```

---

### Practical Examples

```python
# read large file efficiently
def read_large_file(file_path):
    with open(file_path) as file:
        for line in file:
            yield line.strip()

for line in read_large_file("large_file.txt"):
    process(line)

# batch processing
def batch_iterator(iterable, batch_size):
    batch = []
    for item in iterable:
        batch.append(item)
        if len(batch) >= batch_size:
            yield batch
            batch = []
    if batch:
        yield batch

for batch in batch_iterator(range(10), 3):
    print(batch)
# [0, 1, 2]
# [3, 4, 5]
# [6, 7, 8]
# [9]

# pipeline pattern
def read_data():
    for i in range(100):
        yield i

def filter_evens(numbers):
    for num in numbers:
        if num % 2 == 0:
            yield num

def square(numbers):
    for num in numbers:
        yield num ** 2

pipeline = square(filter_evens(read_data()))
result = list(pipeline)
```

---

### Generator Performance

```python
# memory efficient
def read_numbers_list(n):
    return [i for i in range(n)]

def read_numbers_gen(n):
    for i in range(n):
        yield i

# memory usage
import sys
n = 1000000
list_size = sys.getsizeof(read_numbers_list(n))
gen_size = sys.getsizeof(read_numbers_gen(n))
# list_size: ~8MB
# gen_size: ~200 bytes

# lazy evaluation
def expensive_operation(x):
    # simulate expensive computation
    return x ** 2

# generator: operations done on demand
gen = (expensive_operation(x) for x in range(1000000))
first_five = list(islice(gen, 5))

# list: all operations done immediately
lst = [expensive_operation(x) for x in range(1000000)]
```

---

### Coroutines (Advanced)

```python
# simple coroutine
def grep(pattern):
    print(f"Searching for {pattern}")
    while True:
        line = yield
        if pattern in line:
            print(line)

search = grep("python")
next(search)  # prime the coroutine
search.send("I love python")    # I love python
search.send("Hello world")      # (no output)
search.send("python is great")  # python is great

# coroutine pipeline
def producer():
    for i in range(10):
        yield i

def filter_even(target):
    while True:
        num = yield
        if num % 2 == 0:
            target.send(num)

def printer():
    while True:
        value = yield
        print(value)

# setup pipeline
p = printer()
next(p)
f = filter_even(p)
next(f)

for num in producer():
    f.send(num)
# 0, 2, 4, 6, 8
```
