{{yaml}}

{{title}}

#ans: Generators

---

### Generator Function Basics

```python
#ans: generator with yield
def count_up_to(n):
    count = 1
    while count <= n:
        yield count
        count += 1
for num in count_up_to(3):
    print(num)
#ans: 1, 2, 3
```

---

### Yield vs Return

```python
#ans: yield pauses function
def simple_gen():
    yield 1
    yield 2
    yield 3
gen = simple_gen()
next(gen)
#ans: 1
next(gen)
#ans: 2
```

---

### Generator is Iterator

```python
#ans: generator is an iterator
def my_gen():
    yield 1
    yield 2
gen = my_gen()
next(gen)
#ans: 1
#ans: can only iterate once
list(gen)
#ans: [2]
list(gen)
#ans: []
```

---

### Infinite Generator

```python
#ans: infinite sequence
def infinite_counter():
    count = 0
    while True:
        yield count
        count += 1
#ans: use with break or take first n
counter = infinite_counter()
for i, num in enumerate(counter):
    if i >= 3:
        break
    print(num)
#ans: 0, 1, 2
```

---

### Generator with Condition

```python
#ans: filter in generator
def even_numbers(n):
    for i in range(n):
        if i % 2 == 0:
            yield i
list(even_numbers(10))
#ans: [0, 2, 4, 6, 8]
```

---

### Yield From

```python
#ans: delegate to another generator
def generator1():
    yield 1
    yield 2
def generator2():
    yield from generator1()
    yield 3
list(generator2())
#ans: [1, 2, 3]
```

---

### Exercises - Part 1

```python
# what is returned?
def gen():
    yield 1
result = gen()
type(result)
#ans: <class 'generator'>
```

---

### Exercises - Part 2

```python
# yield in loop?
def gen():
    for i in range(3):
        yield i
list(gen())
#ans: [0, 1, 2]
```

---

### Exercises - Part 3

```python
# generator exhaustion?
def gen():
    yield 1
    yield 2
g = gen()
next(g)
#ans: 1
next(g)
#ans: 2
next(g)
#ans: StopIteration
```

---

### Exercises - Part 4

```python
# multiple yields?
def gen():
    yield 1
    yield 2
    return 3
list(gen())
#ans: [1, 2] (return value ignored)
```

---

### Exercises - Part 5

```python
# generator vs list?
def gen():
    yield 1
list(gen())
#ans: [1]
gen()
#ans: <generator object>
```

---

### Exercises - Part 6

```python
# fibonacci generator?
def fib(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b
list(fib(5))
#ans: [0, 1, 1, 2, 3]
```

---

### Exercises - Part 7

```python
# yield from list?
def gen():
    yield from [1, 2, 3]
list(gen())
#ans: [1, 2, 3]
```

---

### Exercises - Part 8

```python
# generator with return?
def gen():
    yield 1
    return 2
g = gen()
next(g)
#ans: 1
next(g)
#ans: StopIteration (with value 2)
```

---

### Exercises - Part 9

```python
# send to generator?
def gen():
    value = yield
    print(value)
g = gen()
next(g)  # prime
g.send("Hello")
#ans: prints "Hello"
```

---

### Exercises - Part 10

```python
# generator memory?
def gen():
    for i in range(1000000):
        yield i
#ans: memory efficient (lazy)
lst = [i for i in range(1000000)]
#ans: all in memory at once
```
