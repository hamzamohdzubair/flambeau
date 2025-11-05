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

# Decorators

---

### Functions as First-Class Objects

```python
# assign function to variable
def greet():
    return "Hello!"

say_hello = greet
say_hello()  # "Hello!"

# pass function as argument
def execute(func):
    return func()

execute(greet)  # "Hello!"

# return function from function
def create_multiplier(n):
    def multiply(x):
        return x * n
    return multiply

double = create_multiplier(2)
double(5)  # 10
```

---

### Basic Decorator

```python
# simple decorator
def my_decorator(func):
    def wrapper():
        print("Before function")
        func()
        print("After function")
    return wrapper

def say_hello():
    print("Hello!")

# manual decoration
say_hello = my_decorator(say_hello)
say_hello()
# Before function
# Hello!
# After function

# using @ syntax
@my_decorator
def say_goodbye():
    print("Goodbye!")

say_goodbye()
# Before function
# Goodbye!
# After function
```

---

### Decorator with Arguments

```python
# decorator for functions with arguments
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        result = func(*args, **kwargs)
        print(f"Finished {func.__name__}")
        return result
    return wrapper

@my_decorator
def add(a, b):
    return a + b

add(5, 3)
# Calling add
# Finished add
# Returns: 8

@my_decorator
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice", greeting="Hi")
```

---

### Preserving Function Metadata

```python
from functools import wraps

# without @wraps
def bad_decorator(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@bad_decorator
def my_func():
    """My function docstring"""
    pass

my_func.__name__  # "wrapper"
my_func.__doc__   # None

# with @wraps
def good_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@good_decorator
def my_func():
    """My function docstring"""
    pass

my_func.__name__  # "my_func"
my_func.__doc__   # "My function docstring"
```

---

### Practical Decorators - Timing

```python
import time
from functools import wraps

# timing decorator
def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Done"

slow_function()
# slow_function took 1.0012 seconds
# Returns: "Done"
```

---

### Practical Decorators - Logging

```python
from functools import wraps
import logging

# logging decorator
def log_calls(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        logging.info(f"Calling {func.__name__} with {args} {kwargs}")
        result = func(*args, **kwargs)
        logging.info(f"{func.__name__} returned {result}")
        return result
    return wrapper

@log_calls
def add(a, b):
    return a + b

add(5, 3)
# INFO: Calling add with (5, 3) {}
# INFO: add returned 8
```

---

### Practical Decorators - Caching

```python
from functools import wraps

# simple cache decorator
def cache(func):
    cached_results = {}

    @wraps(func)
    def wrapper(*args):
        if args in cached_results:
            print(f"Cache hit for {args}")
            return cached_results[args]
        print(f"Cache miss for {args}")
        result = func(*args)
        cached_results[args] = result
        return result
    return wrapper

@cache
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# built-in cache (Python 3.9+)
from functools import cache

@cache
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# lru_cache (Python 3.2+)
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

---

### Decorators with Parameters

```python
# decorator factory
def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(times=3)
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
# Hello, Alice!
# Hello, Alice!
# Hello, Alice!

# decorator with optional arguments
def repeat(times=1):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat()
def say_hi():
    print("Hi!")
```

---

### Multiple Decorators

```python
# stacking decorators
def bold(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return f"<b>{func(*args, **kwargs)}</b>"
    return wrapper

def italic(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return f"<i>{func(*args, **kwargs)}</i>"
    return wrapper

@bold
@italic
def greet(name):
    return f"Hello, {name}!"

greet("Alice")
# "<b><i>Hello, Alice!</i></b>"

# execution order: bottom to top
# equivalent to: bold(italic(greet))
```

---

### Class Decorators

```python
# decorator as a class
class CountCalls:
    def __init__(self, func):
        self.func = func
        self.count = 0

    def __call__(self, *args, **kwargs):
        self.count += 1
        print(f"Call {self.count} to {self.func.__name__}")
        return self.func(*args, **kwargs)

@CountCalls
def greet(name):
    return f"Hello, {name}!"

greet("Alice")  # Call 1 to greet
greet("Bob")    # Call 2 to greet
greet.count     # 2
```

---

### Decorating Classes

```python
# class decorator
def add_str(cls):
    cls.__str__ = lambda self: f"{cls.__name__} instance"
    return cls

@add_str
class MyClass:
    pass

obj = MyClass()
str(obj)  # "MyClass instance"

# singleton pattern
def singleton(cls):
    instances = {}
    @wraps(cls)
    def wrapper(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return wrapper

@singleton
class Database:
    pass

db1 = Database()
db2 = Database()
db1 is db2  # True
```

---

### Method Decorators

```python
# decorating instance methods
def method_decorator(func):
    @wraps(func)
    def wrapper(self, *args, **kwargs):
        print(f"Calling {func.__name__} on {self}")
        return func(self, *args, **kwargs)
    return wrapper

class MyClass:
    @method_decorator
    def my_method(self):
        return "Hello!"

# property with decorator
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius must be positive")
        self._radius = value
```

---

### Built-in Decorators

```python
# @staticmethod
class MathUtils:
    @staticmethod
    def add(a, b):
        return a + b

MathUtils.add(5, 3)  # 8

# @classmethod
class Person:
    count = 0

    def __init__(self, name):
        self.name = name
        Person.count += 1

    @classmethod
    def get_count(cls):
        return cls.count

# @property (getter)
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def area(self):
        return 3.14 * self._radius ** 2

circle = Circle(5)
circle.area  # 78.5
```

---

### Authentication Decorator

```python
from functools import wraps

# authentication check
def require_auth(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not is_authenticated():
            raise PermissionError("Authentication required")
        return func(*args, **kwargs)
    return wrapper

@require_auth
def sensitive_operation():
    return "Secret data"

# role-based decorator
def require_role(role):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if not has_role(role):
                raise PermissionError(f"Role {role} required")
            return func(*args, **kwargs)
        return wrapper
    return decorator

@require_role("admin")
def delete_user(user_id):
    # delete user
    pass
```

---

### Validation Decorator

```python
from functools import wraps

# type checking decorator
def validate_types(**expected_types):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            # check kwargs
            for key, expected_type in expected_types.items():
                if key in kwargs:
                    if not isinstance(kwargs[key], expected_type):
                        raise TypeError(
                            f"{key} must be {expected_type.__name__}"
                        )
            return func(*args, **kwargs)
        return wrapper
    return decorator

@validate_types(name=str, age=int)
def create_user(name, age):
    return {"name": name, "age": age}

create_user(name="Alice", age=25)  # OK
# create_user(name="Alice", age="25")  # TypeError
```

---

### Retry Decorator

```python
from functools import wraps
import time

# retry on failure
def retry(max_attempts=3, delay=1):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            attempts = 0
            while attempts < max_attempts:
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    attempts += 1
                    if attempts >= max_attempts:
                        raise
                    print(f"Attempt {attempts} failed: {e}")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=3, delay=2)
def unreliable_api_call():
    # might fail
    return make_request()
```
