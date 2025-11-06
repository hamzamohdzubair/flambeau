{{yaml}}

{{title}}

#ans: Function Parameters

---

### Default Parameters

```python
# parameter with default value
def greet(name="Guest"):
    print(f"Hello, {name}!")
greet()
#ans: Hello, Guest!
greet("Alice")
#ans: Hello, Alice!
```

---

### Multiple Defaults

```python
# multiple default parameters
def create_user(name, age=0, city="Unknown"):
    return f"{name}, {age}, {city}"
result = create_user("Alice")
#ans: "Alice, 0, Unknown"
```

---

### Keyword Arguments

```python
# call with keyword arguments
def describe(animal, name):
    print(f"{animal} named {name}")
describe(name="Rex", animal="dog")
#ans: dog named Rex
```

---

### Variable Arguments (*args)

```python
# accept any number of arguments
def sum_all(*numbers):
    return sum(numbers)
result = sum_all(1, 2, 3, 4)
#ans: 10
```

---

### Keyword Variable Arguments (**kwargs)

```python
# accept any keyword arguments
def print_info(**info):
    for key, value in info.items():
        print(f"{key}: {value}")
print_info(name="Alice", age=25)
#ans: name: Alice
#ans: age: 25
```

---

### Exercises - Part 1

```python
# what is printed?
def func(x=5):
    print(x)
func()
#ans: 5
func(10)
#ans: 10
```

---

### Exercises - Part 2

```python
# default parameter order?
def func(a, b=10):
    return a + b
func(5)
#ans: 15
```

---

### Exercises - Part 3

```python
# can you do this?
def func(a=5, b):
    return a + b
#ans: SyntaxError (non-default after default)
```

---

### Exercises - Part 4

```python
# keyword arguments?
def func(a, b):
    return a - b
func(b=10, a=5)
#ans: -5 (5 - 10)
```

---

### Exercises - Part 5

```python
# mixing positional and keyword?
def func(a, b, c):
    return a + b + c
func(1, c=3, b=2)
#ans: 6
```

---

### Exercises - Part 6

```python
# *args type?
def func(*args):
    return type(args)
func(1, 2, 3)
#ans: <class 'tuple'>
```

---

### Exercises - Part 7

```python
# **kwargs type?
def func(**kwargs):
    return type(kwargs)
func(a=1, b=2)
#ans: <class 'dict'>
```

---

### Exercises - Part 8

```python
# combining parameters?
def func(a, b=5, *args):
    return a + b + sum(args)
func(1, 2, 3, 4)
#ans: 10 (1+2+3+4)
```

---

### Exercises - Part 9

```python
# empty *args?
def func(*args):
    return len(args)
func()
#ans: 0
```

---

### Exercises - Part 10

```python
# mutable default parameter?
def func(x=[]):
    x.append(1)
    return x
func()
func()
#ans: [1, 1] (same list object!)
```
