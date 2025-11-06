{{yaml}}

{{title}}

# Custom Exceptions

---

### Simple Custom Exception

```python
# define custom exception
class CustomError(Exception):
    pass
#ans: raise it
raise CustomError("Something went wrong")
```

---

### Exception with Attributes

```python
# exception with data
class ValidationError(Exception):
    def __init__(self, field, message):
        self.field = field
        self.message = message
        super().__init__(f"{field}: {message}")
```

---

### Using Custom Exception

```python
# raise custom exception
try:
    raise ValidationError("email", "Invalid format")
except ValidationError as e:
    print(e.field)
    print(e.message)
```

---

### Exception Hierarchy

```python
# base exception
class DatabaseError(Exception):
    pass
#ans: specific exceptions
class ConnectionError(DatabaseError):
    pass
class QueryError(DatabaseError):
    pass
```

---

### Exercises - Part 1

```python
# inherit from what?
class MyError(Exception):
    pass
#ans: inherits from Exception
```

---

### Exercises - Part 2

```python
# can inherit from BaseException?
class MyError(BaseException):
    pass
#ans: yes, but use Exception instead
```

---

### Exercises - Part 3

```python
# custom message?
class MyError(Exception):
    pass
raise MyError("Custom message")
#ans: works!
```

---

### Exercises - Part 4

```python
# catch custom exception?
try:
    raise CustomError()
except CustomError:
    print("Caught")
#ans: "Caught"
```

---

### Exercises - Part 5

```python
# exception with default message?
class MyError(Exception):
    def __init__(self):
        super().__init__("Default message")
```

---

### Exercises - Part 6

```python
# multiple custom exceptions?
class Error1(Exception):
    pass
class Error2(Exception):
    pass
try:
    pass
except (Error1, Error2):
    pass
```

---

### Exercises - Part 7

```python
# exception hierarchy catch?
class Base(Exception):
    pass
class Derived(Base):
    pass
try:
    raise Derived()
except Base:
    print("Caught")
#ans: "Caught"
```

---

### Exercises - Part 8

```python
# custom exception attributes?
class MyError(Exception):
    def __init__(self, code):
        self.code = code
```

---

### Exercises - Part 9

```python
# exception with __str__?
class MyError(Exception):
    def __str__(self):
        return "Custom string"
```

---

### Exercises - Part 10

```python
# empty custom exception?
class MyError(Exception):
    pass
#ans: valid minimal exception
```
