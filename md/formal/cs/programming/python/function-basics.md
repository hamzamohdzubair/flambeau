{{yaml}}

{{title}}

#ans: Function Basics

---

### Simple Function

```python
# define and call function
def greet():
    print("Hello!")
greet()
#ans: Hello!
```

---

### Function with Parameter

```python
# function with one parameter
def greet_person(name):
    print(f"Hello, {name}!")
greet_person("Alice")
#ans: Hello, Alice!
```

---

### Function with Multiple Parameters

```python
# multiple parameters
def add(a, b):
    return a + b
result = add(5, 3)
#ans: result is 8
```

---

### Function with Return

```python
# return value
def square(x):
    return x ** 2
result = square(5)
#ans: result is 25
```

---

### Function Without Return

```python
# no return (returns None)
def print_message(msg):
    print(msg)
result = print_message("Hi")
#ans: Hi (printed)
#ans: result is None
```

---

### Exercises - Part 1

```python
# what is returned?
def func():
    x = 5
func()
#ans: None (no return statement)
```

---

### Exercises - Part 2

```python
# what is result?
def add(a, b):
    return a + b
result = add(10, 20)
#ans: 30
```

---

### Exercises - Part 3

```python
# function call without ()?
def greet():
    return "Hello"
x = greet
#ans: x is the function object, not "Hello"
```

---

### Exercises - Part 4

```python
# what happens?
def multiply(x, y):
    return x * y
multiply(5, 3)
#ans: 15 (but not stored)
```

---

### Exercises - Part 5

```python
# can you call before defining?
result = add(1, 2)
def add(a, b):
    return a + b
#ans: NameError (function not defined yet)
```

---

### Exercises - Part 6

```python
# function with print vs return?
def func1():
    print(5)
def func2():
    return 5
x = func1()
y = func2()
#ans: 5 (printed)
#ans: x is None, y is 5
```

---

### Exercises - Part 7

```python
# nested function call?
def double(x):
    return x * 2
result = double(double(5))
#ans: 20
```

---

### Exercises - Part 8

```python
# what is printed?
def test():
    return 5
    print("After return")
test()
#ans: 5 (return exits function, print never runs)
```

---

### Exercises - Part 9

```python
# function name case?
def MyFunction():
    return 1
myfunction()
#ans: NameError (names are case-sensitive)
```

---

### Exercises - Part 10

```python
# redefining function?
def func():
    return 1
def func():
    return 2
func()
#ans: 2 (second definition overwrites first)
```
