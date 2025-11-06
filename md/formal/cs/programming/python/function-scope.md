{{yaml}}

{{title}}

# Function Scope

---

### Global Scope

```python
# global variable
x = 10
def func():
    print(x)
func()
#ans: 10
```

---

### Local Scope

```python
# local variable
def func():
    y = 20
    print(y)
func()
#ans: print(y)  # NameError
```

---

### Global Keyword

```python
# modify global variable
count = 0
def increment():
    global count
    count += 1
increment()
#ans: count is 1
```

---

### Nonlocal Keyword

```python
# modify enclosing scope
def outer():
    x = 10
    def inner():
        nonlocal x
        x = 20
    inner()
    return x
result = outer()
#ans: 20
```

---

### Shadowing

```python
# local shadows global
x = 10
def func():
    x = 5
    print(x)
func()
#ans: 5
print(x)
#ans: 10
```

---

### Exercises - Part 1

```python
# what is printed?
x = 5
def func():
    print(x)
func()
#ans: 5
```

---

### Exercises - Part 2

```python
# what happens?
x = 5
def func():
    x = 10
func()
print(x)
#ans: 5 (local x doesn't affect global)
```

---

### Exercises - Part 3

```python
# global keyword?
x = 5
def func():
    global x
    x = 10
func()
print(x)
#ans: 10
```

---

### Exercises - Part 4

```python
# can you do this?
def func():
    print(x)
    x = 5
func()
#ans: UnboundLocalError
```

---

### Exercises - Part 5

```python
# nonlocal?
def outer():
    x = 5
    def inner():
        nonlocal x
        x = 10
    inner()
    return x
outer()
#ans: 10
```

---

### Exercises - Part 6

```python
# nested functions?
def outer():
    x = 5
    def inner():
        return x
    return inner()
outer()
#ans: 5
```

---

### Exercises - Part 7

```python
# what is x?
x = 1
def func():
    x = x + 1
func()
#ans: UnboundLocalError
```

---

### Exercises - Part 8

```python
# parameter scope?
def func(x):
    x = 10
x = 5
func(x)
print(x)
#ans: 5
```

---

### Exercises - Part 9

```python
# global in nested?
x = 5
def outer():
    def inner():
        global x
        x = 10
    inner()
outer()
print(x)
#ans: 10
```

---

### Exercises - Part 10

```python
# closure?
def outer(x):
    def inner(y):
        return x + y
    return inner
f = outer(10)
f(5)
#ans: 15
```
