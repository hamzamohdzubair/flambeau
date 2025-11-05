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

# Functions

---

### Basic Functions

```python
# simple function
def greet():
    print("Hello!")

greet()

# function with parameters
def greet_person(name):
    print(f"Hello, {name}!")

greet_person("Alice")

# function with return value
def add(a, b):
    return a + b

result = add(5, 3)  # 8
```

---

### Default Parameters

```python
# default parameter values
def greet(name="Guest"):
    print(f"Hello, {name}!")

greet()           # Hello, Guest!
greet("Alice")    # Hello, Alice!

# multiple defaults
def create_profile(name, age=0, country="Unknown"):
    return f"{name}, {age}, {country}"

create_profile("Alice")                    # Alice, 0, Unknown
create_profile("Bob", 25)                  # Bob, 25, Unknown
create_profile("Charlie", 30, "USA")       # Charlie, 30, USA
```

---

### Keyword Arguments

```python
# keyword arguments
def describe_pet(animal, name):
    print(f"I have a {animal} named {name}")

describe_pet(animal="dog", name="Rex")
describe_pet(name="Whiskers", animal="cat")

# mixing positional and keyword
describe_pet("hamster", name="Fluffy")
```

---

### Variable Arguments

```python
# *args - arbitrary positional arguments
def sum_all(*numbers):
    return sum(numbers)

sum_all(1, 2, 3)        # 6
sum_all(1, 2, 3, 4, 5)  # 15

# **kwargs - arbitrary keyword arguments
def print_info(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="NYC")

# combining all
def func(a, b, *args, key1="default", **kwargs):
    print(a, b)
    print(args)
    print(key1)
    print(kwargs)

func(1, 2, 3, 4, key1="value", x=10, y=20)
```

---

### Return Values

```python
# single return
def square(x):
    return x ** 2

# multiple return values
def divide(a, b):
    quotient = a // b
    remainder = a % b
    return quotient, remainder

q, r = divide(17, 5)  # q=3, r=2

# early return
def is_even(n):
    if n % 2 == 0:
        return True
    return False

# no return (returns None)
def print_message(msg):
    print(msg)

result = print_message("Hi")  # result is None
```

---

### Lambda Functions

```python
# basic lambda
square = lambda x: x ** 2
square(5)  # 25

# lambda with multiple parameters
add = lambda x, y: x + y
add(3, 4)  # 7

# lambda in sorted
pairs = [(1, 'one'), (3, 'three'), (2, 'two')]
sorted(pairs, key=lambda pair: pair[1])

# lambda in map
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))

# lambda in filter
evens = list(filter(lambda x: x % 2 == 0, numbers))
```

---

### Scope

```python
# global scope
x = 10

def func():
    # local scope
    y = 20
    print(x)  # can access global
    print(y)  # local variable

func()
# print(y)  # Error: y not defined

# global keyword
count = 0
def increment():
    global count
    count += 1

increment()
print(count)  # 1

# nonlocal keyword
def outer():
    x = 10
    def inner():
        nonlocal x
        x = 20
    inner()
    print(x)  # 20

outer()
```

---

### Docstrings

```python
# function documentation
def calculate_area(radius):
    """
    Calculate the area of a circle.

    Parameters:
        radius (float): The radius of the circle

    Returns:
        float: The area of the circle
    """
    return 3.14 * radius ** 2

# accessing docstring
print(calculate_area.__doc__)
help(calculate_area)
```

---

### Recursion

```python
# factorial
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

factorial(5)  # 120

# fibonacci
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

fibonacci(6)  # 8

# sum of list
def sum_list(lst):
    if not lst:
        return 0
    return lst[0] + sum_list(lst[1:])

sum_list([1, 2, 3, 4])  # 10
```

---

### Type Hints

```python
# basic type hints
def greet(name: str) -> str:
    return f"Hello, {name}!"

def add(a: int, b: int) -> int:
    return a + b

# multiple types
from typing import Union
def process(value: Union[int, str]) -> str:
    return str(value)

# list and dict types
from typing import List, Dict
def sum_list(numbers: List[int]) -> int:
    return sum(numbers)

def get_config() -> Dict[str, str]:
    return {"key": "value"}

# optional
from typing import Optional
def find_user(user_id: int) -> Optional[str]:
    return "Alice" if user_id == 1 else None
```
