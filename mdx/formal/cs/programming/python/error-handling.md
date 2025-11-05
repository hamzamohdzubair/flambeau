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

# Error Handling

---

### Try-Except Basics

```python
# basic try-except
try:
    result = 10 / 0
except:
    print("An error occurred")

# catch specific exception
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")

# access exception object
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
```

---

### Multiple Exceptions

```python
# multiple except blocks
try:
    value = int(input("Enter a number: "))
    result = 10 / value
except ValueError:
    print("Invalid number")
except ZeroDivisionError:
    print("Cannot divide by zero")

# catch multiple exceptions
try:
    # some operation
    pass
except (ValueError, TypeError, KeyError):
    print("One of multiple errors occurred")

# catch multiple with different handling
try:
    # some operation
    pass
except ValueError as e:
    print(f"Value error: {e}")
except TypeError as e:
    print(f"Type error: {e}")
```

---

### Try-Except-Else-Finally

```python
# else - runs if no exception
try:
    result = 10 / 2
except ZeroDivisionError:
    print("Error")
else:
    print(f"Success! Result: {result}")

# finally - always runs
try:
    file = open("data.txt", "r")
    data = file.read()
except FileNotFoundError:
    print("File not found")
finally:
    file.close()  # always close file

# complete structure
try:
    # risky code
    result = 10 / 2
except ZeroDivisionError:
    # handle error
    print("Error")
else:
    # runs if no error
    print("Success")
finally:
    # always runs
    print("Cleanup")
```

---

### Common Exceptions

```python
# ValueError - invalid value
try:
    int("abc")
except ValueError:
    print("Invalid integer")

# TypeError - wrong type
try:
    "2" + 2
except TypeError:
    print("Type mismatch")

# KeyError - missing dictionary key
try:
    d = {"a": 1}
    value = d["b"]
except KeyError:
    print("Key not found")

# IndexError - invalid index
try:
    lst = [1, 2, 3]
    value = lst[10]
except IndexError:
    print("Index out of range")

# AttributeError - missing attribute
try:
    x = 5
    x.append(1)
except AttributeError:
    print("Attribute not found")
```

---

### File and I/O Exceptions

```python
# FileNotFoundError
try:
    with open("missing.txt", "r") as file:
        data = file.read()
except FileNotFoundError:
    print("File does not exist")

# PermissionError
try:
    with open("/root/file.txt", "w") as file:
        file.write("data")
except PermissionError:
    print("Permission denied")

# IsADirectoryError
try:
    with open("folder", "r") as file:
        data = file.read()
except IsADirectoryError:
    print("Expected file, got directory")

# OSError - general OS error
try:
    os.remove("file.txt")
except OSError as e:
    print(f"OS error: {e}")
```

---

### Raising Exceptions

```python
# raise exception
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# raise with custom message
def validate_age(age):
    if age < 0:
        raise ValueError(f"Age cannot be negative: {age}")
    if age > 150:
        raise ValueError(f"Invalid age: {age}")

# re-raise exception
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Logging error...")
    raise  # re-raise the same exception

# raise different exception
try:
    value = int("abc")
except ValueError:
    raise TypeError("Expected valid integer")
```

---

### Custom Exceptions

```python
# simple custom exception
class CustomError(Exception):
    pass

raise CustomError("Something went wrong")

# exception with attributes
class ValidationError(Exception):
    def __init__(self, field, message):
        self.field = field
        self.message = message
        super().__init__(f"{field}: {message}")

try:
    raise ValidationError("email", "Invalid format")
except ValidationError as e:
    print(e.field)    # "email"
    print(e.message)  # "Invalid format"

# exception hierarchy
class DatabaseError(Exception):
    pass

class ConnectionError(DatabaseError):
    pass

class QueryError(DatabaseError):
    pass
```

---

### Exception Chaining

```python
# implicit chaining (Python 3)
try:
    try:
        result = 10 / 0
    except ZeroDivisionError:
        raise ValueError("Invalid operation")
except ValueError as e:
    print(e.__cause__)  # original exception

# explicit chaining
try:
    result = 10 / 0
except ZeroDivisionError as e:
    raise ValueError("Invalid operation") from e

# suppress chaining
try:
    result = 10 / 0
except ZeroDivisionError:
    raise ValueError("Invalid operation") from None
```

---

### Assertions

```python
# basic assertion
x = 5
assert x > 0
assert x > 0, "x must be positive"

# assertions for debugging
def calculate_average(numbers):
    assert len(numbers) > 0, "List cannot be empty"
    return sum(numbers) / len(numbers)

# disable assertions with -O flag
# python -O script.py

# checking types
def process(value):
    assert isinstance(value, int), "Value must be integer"
    return value * 2
```

---

### Context Managers for Error Handling

```python
# custom context manager
class FileHandler:
    def __init__(self, filename):
        self.filename = filename
        self.file = None

    def __enter__(self):
        self.file = open(self.filename, "r")
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
        if exc_type is not None:
            print(f"Error occurred: {exc_val}")
        return False  # don't suppress exception

with FileHandler("data.txt") as file:
    data = file.read()

# contextlib
from contextlib import contextmanager

@contextmanager
def managed_resource():
    # setup
    resource = acquire_resource()
    try:
        yield resource
    finally:
        # cleanup
        release_resource(resource)
```

---

### Exception Best Practices

```python
# specific exceptions first
try:
    # code
    pass
except ValueError:
    # handle ValueError
    pass
except Exception:
    # handle all other exceptions
    pass

# don't catch everything silently
try:
    # code
    pass
except Exception:
    pass  # BAD: silent failure

# use finally for cleanup
file = None
try:
    file = open("data.txt", "r")
    data = file.read()
except FileNotFoundError:
    print("File not found")
finally:
    if file:
        file.close()

# or use context managers
with open("data.txt", "r") as file:
    data = file.read()
```

---

### Warnings

```python
import warnings

# issue warning
warnings.warn("This is deprecated", DeprecationWarning)

# filter warnings
warnings.filterwarnings("ignore")
warnings.filterwarnings("error")  # treat as errors
warnings.filterwarnings("default")

# custom warning
class CustomWarning(UserWarning):
    pass

warnings.warn("Custom message", CustomWarning)

# context manager for warnings
with warnings.catch_warnings():
    warnings.simplefilter("ignore")
    # warnings suppressed in this block
    pass
```
