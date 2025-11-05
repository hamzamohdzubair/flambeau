{{yaml}}

{{title}}

#ans: Properties

---

### Property Decorator

```python
#ans: @property for getter
class Circle:
    def __init__(self, radius):
        self._radius = radius
    @property
    def radius(self):
        return self._radius
Circle(5).radius
#ans: 5 (accessed like attribute)
```

---

### Property Setter

```python
#ans: @property.setter
class Circle:
    def __init__(self, radius):
        self._radius = radius
    @property
    def radius(self):
        return self._radius
    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Negative")
        self._radius = value
```

---

### Computed Property

```python
#ans: property with calculation
class Circle:
    def __init__(self, radius):
        self._radius = radius
    @property
    def area(self):
        return 3.14 * self._radius ** 2
Circle(5).area
#ans: 78.5
```

---

### Read-Only Property

```python
#ans: property without setter
class Person:
    def __init__(self, name):
        self._name = name
    @property
    def name(self):
        return self._name
person = Person("Alice")
#ans: person.name = "Bob"  # AttributeError
```

---

### Property Deleter

```python
#ans: @property.deleter
class Person:
    def __init__(self, name):
        self._name = name
    @property
    def name(self):
        return self._name
    @name.deleter
    def name(self):
        del self._name
person = Person("Alice")
del person.name
```

---

### Exercises - Part 1

```python
# property vs method?
class MyClass:
    @property
    def value(self):
        return 5
obj = MyClass()
obj.value
#ans: 5 (no parentheses)
```

---

### Exercises - Part 2

```python
# setter without getter?
class MyClass:
    @value.setter
    def value(self, x):
        pass
#ans: NameError (@property needed first)
```

---

### Exercises - Part 3

```python
# property assignment?
class MyClass:
    @property
    def value(self):
        return 5
obj = MyClass()
obj.value = 10
#ans: AttributeError (no setter)
```

---

### Exercises - Part 4

```python
# property caching?
class MyClass:
    @property
    def value(self):
        print("Computing")
        return 5
obj = MyClass()
obj.value
obj.value
#ans: prints "Computing" twice
```

---

### Exercises - Part 5

```python
# property validation?
class MyClass:
    @property
    def x(self):
        return self._x
    @x.setter
    def x(self, value):
        if value < 0:
            raise ValueError()
        self._x = value
```

---

### Exercises - Part 6

```python
# property in __init__?
class MyClass:
    def __init__(self, x):
        self.x = x  # calls setter
    @property
    def x(self):
        return self._x
    @x.setter
    def x(self, value):
        self._x = value
```

---

### Exercises - Part 7

```python
# delete without deleter?
class MyClass:
    @property
    def value(self):
        return 5
obj = MyClass()
del obj.value
#ans: AttributeError
```

---

### Exercises - Part 8

```python
# property inheritance?
class Base:
    @property
    def x(self):
        return 5
class Derived(Base):
    pass
Derived().x
#ans: 5
```

---

### Exercises - Part 9

```python
# override property?
class Base:
    @property
    def x(self):
        return 5
class Derived(Base):
    @property
    def x(self):
        return 10
Derived().x
#ans: 10
```

---

### Exercises - Part 10

```python
# property with args?
class MyClass:
    @property
    def value(self, arg):
        return arg
#ans: TypeError (property takes no args)
```
