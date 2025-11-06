{{yaml}}

{{title}}

# Decorators Advanced

---

### Decorator with Parameters

```python
# decorator factory
def repeat(times):
    def decorator(func):
        def wrapper(*args):
            for _ in range(times):
                result = func(*args)
            return result
        return wrapper
    return decorator
@repeat(times=3)
def greet():
    print("Hello")
greet()
#ans: Hello (3 times)
```

---

### Timing Decorator

```python
import time
# measure execution time
def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__}: {end-start}s")
        return result
    return wrapper
@timer
def slow():
    time.sleep(1)
```

---

### Caching Decorator

```python
from functools import wraps
# simple cache
def cache(func):
    cached = {}
    @wraps(func)
    def wrapper(*args):
        if args in cached:
            return cached[args]
        result = func(*args)
        cached[args] = result
        return result
    return wrapper
@cache
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

---

### Authentication Decorator

```python
# check permission
def require_auth(func):
    def wrapper(*args, **kwargs):
        if not is_authenticated():
            raise PermissionError()
        return func(*args, **kwargs)
    return wrapper
@require_auth
def sensitive_operation():
    return "Secret"
```

---

### Exercises - Part 1

```python
# decorator with args?
def repeat(n):
    def decorator(func):
        def wrapper():
            for _ in range(n):
                func()
        return wrapper
    return decorator
@repeat(2)
def func():
    print("Hi")
func()
#ans: Hi (twice)
```

---

### Exercises - Part 2

```python
# lru_cache?
from functools import lru_cache
@lru_cache(maxsize=128)
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)
#ans: built-in caching
```

---

### Exercises - Part 3

```python
# multiple decorators with args?
@decorator1(arg1)
@decorator2(arg2)
def func():
    pass
#ans: both decorators get args
```

---

### Exercises - Part 4

```python
# decorator counting calls?
def count_calls(func):
    def wrapper(*args):
        wrapper.calls += 1
        return func(*args)
    wrapper.calls = 0
    return wrapper
@count_calls
def func():
    pass
func()
func.calls
#ans: 1
```

---

### Exercises - Part 5

```python
# retry decorator?
def retry(max_attempts):
    def decorator(func):
        def wrapper(*args):
            for attempt in range(max_attempts):
                try:
                    return func(*args)
                except:
                    if attempt == max_attempts-1:
                        raise
        return wrapper
    return decorator
```

---

### Exercises - Part 6

```python
# validation decorator?
def validate(type_):
    def decorator(func):
        def wrapper(arg):
            if not isinstance(arg, type_):
                raise TypeError()
            return func(arg)
        return wrapper
    return decorator
@validate(int)
def double(x):
    return x * 2
```

---

### Exercises - Part 7

```python
# property as decorator?
class MyClass:
    @property
    def value(self):
        return 5
#ans: property is a decorator
```

---

### Exercises - Part 8

```python
# classmethod as decorator?
class MyClass:
    @classmethod
    def method(cls):
        pass
#ans: classmethod is a decorator
```

---

### Exercises - Part 9

```python
# staticmethod as decorator?
class MyClass:
    @staticmethod
    def method():
        pass
#ans: staticmethod is a decorator
```

---

### Exercises - Part 10

```python
# decorator preserving signature?
from functools import wraps
def decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper
#ans: preserves func signature
```
