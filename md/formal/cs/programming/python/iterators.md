{{yaml}}

{{title}}

#ans: Iterators

---

### Iterator Protocol

```python
#ans: get iterator
numbers = [1, 2, 3]
iterator = iter(numbers)
#ans: call next
next(iterator)
#ans: 1
next(iterator)
#ans: 2
next(iterator)
#ans: 3
#ans: next(iterator)  # StopIteration
```

---

### For Loop Uses Iterators

```python
#ans: for loop = iterator protocol
for num in [1, 2, 3]:
    print(num)
#ans: equivalent to:
iterator = iter([1, 2, 3])
while True:
    try:
        num = next(iterator)
        print(num)
    except StopIteration:
        break
```

---

### Custom Iterator

```python
#ans: iterator class
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
for num in Counter(0, 3):
    print(num)
#ans: 0, 1, 2
```

---

### Iterable vs Iterator

```python
#ans: iterable: has __iter__()
#ans: iterator: has __iter__() and __next__()
#ans: list is iterable but not iterator
numbers = [1, 2, 3]
iter(numbers)
#ans: works
#ans: next(numbers)  # TypeError
#ans: iterator is both
iterator = iter(numbers)
iter(iterator)
#ans: returns itself
next(iterator)
#ans: 1
```

---

### Exercises - Part 1

```python
# what is iter()?
lst = [1, 2, 3]
it = iter(lst)
type(it)
#ans: list_iterator
```

---

### Exercises - Part 2

```python
# next() on list?
lst = [1, 2, 3]
next(lst)
#ans: TypeError (list not iterator)
```

---

### Exercises - Part 3

```python
# StopIteration when?
it = iter([1, 2])
next(it)
#ans: 1
next(it)
#ans: 2
next(it)
#ans: StopIteration
```

---

### Exercises - Part 4

```python
# iterator exhaustion?
it = iter([1, 2])
list(it)
#ans: [1, 2]
list(it)
#ans: [] (exhausted)
```

---

### Exercises - Part 5

```python
# iter on iterator?
it = iter([1, 2, 3])
iter(it) is it
#ans: True (returns self)
```

---

### Exercises - Part 6

```python
# range is iterator?
r = range(3)
next(r)
#ans: TypeError (range is iterable not iterator)
iter(r)
#ans: works (creates iterator)
```

---

### Exercises - Part 7

```python
# string is iterable?
s = "abc"
for c in s:
    print(c)
#ans: a, b, c
```

---

### Exercises - Part 8

```python
# dict iterator?
d = {"a": 1, "b": 2}
it = iter(d)
next(it)
#ans: "a" (iterates keys)
```

---

### Exercises - Part 9

```python
# custom __iter__ only?
class MyIterable:
    def __iter__(self):
        return iter([1, 2, 3])
for x in MyIterable():
    print(x)
#ans: 1, 2, 3
```

---

### Exercises - Part 10

```python
# infinite iterator?
class InfiniteCounter:
    def __init__(self):
        self.count = 0
    def __iter__(self):
        return self
    def __next__(self):
        self.count += 1
        return self.count
#ans: never raises StopIteration
```
