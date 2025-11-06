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

#ans: Decorators Basics

---

### Basic Decorator

```python
# simple decorator
def my_decorator(func):
    def wrapper():
        print("Before")
        func()
        print("After")
    return wrapper
@my_decorator
def say_hello():
    print("Hello!")
say_hello()
#ans: Before
#ans: Hello!
#ans: After
```

---

### Decorator with Arguments

```python
# decorator for functions with args
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before")
        result = func(*args, **kwargs)
        print("After")
        return result
    return wrapper
@my_decorator
def add(a, b):
    return a + b
add(5, 3)
#ans: Before, After, returns 8
```

---

### Manual Decoration

```python
# without @ syntax
def greet():
    print("Hello")
greet = my_decorator(greet)
#ans: equivalent to @my_decorator
```

---

### Preserving Metadata

```python
from functools import wraps
# preserve function info
def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper
@my_decorator
def my_func():
    """Docstring"""
    pass
my_func.__name__
#ans: "my_func" (not "wrapper")
```

---

### Exercises - Part 1

```python
# what is returned?
def decorator(func):
    def wrapper():
        return func()
    return wrapper
@decorator
def func():
    return 5
func()
#ans: 5
```

---

### Exercises - Part 2

```python
# decorator execution?
def decorator(func):
    print("Decorating")
    return func
@decorator
def func():
    pass
#ans: "Decorating" (at definition time)
```

---

### Exercises - Part 3

```python
# nested decorators?
def dec1(func):
    def wrapper():
        print("1")
        return func()
    return wrapper
def dec2(func):
    def wrapper():
        print("2")
        return func()
    return wrapper
@dec1
@dec2
def func():
    pass
func()
#ans: 1, 2 (bottom to top)
```

---

### Exercises - Part 4

```python
# decorator without wrapper?
def decorator(func):
    return func
@decorator
def func():
    pass
#ans: valid (identity decorator)
```

---

### Exercises - Part 5

```python
# accessing original?
def decorator(func):
    def wrapper():
        return func()
    wrapper.original = func
    return wrapper
@decorator
def func():
    pass
func.original
```

---

### Exercises - Part 6

```python
# decorator modifying return?
def double(func):
    def wrapper(*args):
        return func(*args) * 2
    return wrapper
@double
def add(a, b):
    return a + b
add(2, 3)
#ans: 10
```

---

### Exercises - Part 7

```python
# decorator with closure?
def make_bold(func):
    def wrapper():
        return f"<b>{func()}</b>"
    return wrapper
@make_bold
def get_text():
    return "Hello"
get_text()
#ans: "<b>Hello</b>"
```

---

### Exercises - Part 8

```python
# class as decorator?
class Decorator:
    def __init__(self, func):
        self.func = func
    def __call__(self, *args):
        return self.func(*args)
@Decorator
def func():
    pass
```

---

### Exercises - Part 9

```python
# without @wraps?
def decorator(func):
    def wrapper():
        return func()
    return wrapper
@decorator
def func():
    pass
func.__name__
#ans: "wrapper"
```

---

### Exercises - Part 10

```python
# decorator return None?
def decorator(func):
    def wrapper():
        func()
    return wrapper
@decorator
def func():
    return 5
func()
#ans: None (wrapper doesn't return)
```
