{{yaml}}

{{title}}

#ans: Lambda Functions

---

### Basic Lambda

```python
#ans: lambda syntax
square = lambda x: x ** 2
result = square(5)
#ans: 25
```

---

### Lambda with Multiple Parameters

```python
#ans: multiple parameters
add = lambda x, y: x + y
result = add(3, 4)
#ans: 7
```

---

### Lambda in Sorted

```python
#ans: lambda as key function
pairs = [(1, 'one'), (3, 'three'), (2, 'two')]
sorted_pairs = sorted(pairs, key=lambda pair: pair[1])
#ans: [(1, 'one'), (3, 'three'), (2, 'two')]
```

---

### Lambda in Map

```python
#ans: lambda with map
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
#ans: [1, 4, 9, 16, 25]
```

---

### Lambda in Filter

```python
#ans: lambda with filter
numbers = [1, 2, 3, 4, 5]
evens = list(filter(lambda x: x % 2 == 0, numbers))
#ans: [2, 4]
```

---

### Exercises - Part 1

```python
# what is result?
f = lambda x: x * 2
f(5)
#ans: 10
```

---

### Exercises - Part 2

```python
# lambda with two parameters?
multiply = lambda a, b: a * b
multiply(3, 4)
#ans: 12
```

---

### Exercises - Part 3

```python
# immediate invocation?
(lambda x: x + 1)(5)
#ans: 6
```

---

### Exercises - Part 4

```python
# lambda vs def?
f = lambda x: x ** 2
def g(x):
    return x ** 2
f(3) == g(3)
#ans: True
```

---

### Exercises - Part 5

```python
# lambda with conditional?
abs_val = lambda x: x if x >= 0 else -x
abs_val(-5)
#ans: 5
```

---

### Exercises - Part 6

```python
# can lambda have multiple lines?
f = lambda x: x + 1
              x + 2
#ans: SyntaxError (lambda is single expression)
```

---

### Exercises - Part 7

```python
# lambda in list?
funcs = [lambda x: x+1, lambda x: x*2]
funcs[0](5)
#ans: 6
```

---

### Exercises - Part 8

```python
# lambda with default argument?
f = lambda x=5: x * 2
f()
#ans: 10
```

---

### Exercises - Part 9

```python
# nested lambda?
f = lambda x: (lambda y: x + y)
f(5)(3)
#ans: 8
```

---

### Exercises - Part 10

```python
# lambda without parameter?
f = lambda: 42
f()
#ans: 42
```
