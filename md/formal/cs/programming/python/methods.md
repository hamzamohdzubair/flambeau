{{yaml}}

{{title}}

#ans: Methods

---

### Instance Methods

```python
#ans: instance method
class Calculator:
    def add(self, a, b):
        return a + b
calc = Calculator()
calc.add(5, 3)
#ans: 8
```

---

### Class Methods

```python
#ans: class method
class Dog:
    count = 0
    def __init__(self):
        Dog.count += 1
    @classmethod
    def get_count(cls):
        return cls.count
Dog().get_count()
#ans: 1
```

---

### Static Methods

```python
#ans: static method
class MathUtils:
    @staticmethod
    def add(a, b):
        return a + b
MathUtils.add(5, 3)
#ans: 8 (no instance needed)
```

---

### Method with Self

```python
#ans: self accesses instance
class Person:
    def __init__(self, name):
        self.name = name
    def greet(self):
        return f"Hi, I'm {self.name}"
Person("Alice").greet()
#ans: "Hi, I'm Alice"
```

---

### Exercises - Part 1

```python
# classmethod vs instance?
class MyClass:
    @classmethod
    def method(cls):
        return cls
MyClass.method()
#ans: <class 'MyClass'>
```

---

### Exercises - Part 2

```python
# staticmethod access?
class MyClass:
    x = 5
    @staticmethod
    def method():
        return x
MyClass.method()
#ans: NameError (no self or cls)
```

---

### Exercises - Part 3

```python
# classmethod receives?
class MyClass:
    @classmethod
    def method(cls):
        return type(cls)
MyClass.method()
#ans: <class 'type'>
```

---

### Exercises - Part 4

```python
# call instance method on class?
class MyClass:
    def method(self):
        pass
MyClass.method()
#ans: TypeError (missing self)
```

---

### Exercises - Part 5

```python
# staticmethod with self?
class MyClass:
    @staticmethod
    def method(self):
        pass
obj = MyClass()
obj.method()
#ans: TypeError (no implicit self)
```

---

### Exercises - Part 6

```python
# classmethod inheritance?
class Base:
    @classmethod
    def who(cls):
        return cls.__name__
class Derived(Base):
    pass
Derived.who()
#ans: "Derived"
```

---

### Exercises - Part 7

```python
# method chaining?
class Builder:
    def set_x(self, x):
        self.x = x
        return self
    def set_y(self, y):
        self.y = y
        return self
Builder().set_x(1).set_y(2)
```

---

### Exercises - Part 8

```python
# private method?
class MyClass:
    def __private(self):
        pass
obj = MyClass()
obj.__private()
#ans: AttributeError (name mangling)
```

---

### Exercises - Part 9

```python
# method vs function?
class MyClass:
    def method(self):
        pass
type(MyClass.method)
#ans: <class 'function'>
type(MyClass().method)
#ans: <class 'method'>
```

---

### Exercises - Part 10

```python
# alternative constructor?
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    @classmethod
    def origin(cls):
        return cls(0, 0)
Point.origin()
```
