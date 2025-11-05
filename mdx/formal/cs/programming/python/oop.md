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

# Object-Oriented Programming

---

### Classes and Objects - Basics

```python
# define a class
class Dog:
    pass

# create an object
my_dog = Dog()

# simple class with attributes
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# create instances
dog1 = Dog("Rex", 3)
dog2 = Dog("Max", 5)

# access attributes
print(dog1.name)  # "Rex"
print(dog2.age)   # 5
```

---

### Methods

```python
# instance methods
class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        return f"{self.name} says Woof!"

    def birthday(self):
        self.age += 1

dog = Dog("Rex")
dog.bark()  # "Rex says Woof!"

# methods with parameters
class Calculator:
    def add(self, a, b):
        return a + b

    def multiply(self, a, b):
        return a * b

calc = Calculator()
calc.add(5, 3)      # 8
calc.multiply(4, 2) # 8
```

---

### Class Variables vs Instance Variables

```python
# class variables (shared by all instances)
class Dog:
    species = "Canis familiaris"  # class variable

    def __init__(self, name):
        self.name = name  # instance variable

dog1 = Dog("Rex")
dog2 = Dog("Max")

dog1.species  # "Canis familiaris"
dog2.species  # "Canis familiaris"
Dog.species   # "Canis familiaris"

# modifying class variable
Dog.species = "Canis lupus"
dog1.species  # "Canis lupus"
dog2.species  # "Canis lupus"

# instance variable shadows class variable
dog1.species = "Different"
dog1.species  # "Different"
dog2.species  # "Canis lupus"
```

---

### Class Methods and Static Methods

```python
# class methods
class Dog:
    count = 0

    def __init__(self, name):
        self.name = name
        Dog.count += 1

    @classmethod
    def get_count(cls):
        return cls.count

    @classmethod
    def from_string(cls, dog_str):
        name, age = dog_str.split(",")
        return cls(name, int(age))

Dog.get_count()  # 0
dog1 = Dog("Rex")
Dog.get_count()  # 1

# static methods
class MathUtils:
    @staticmethod
    def add(a, b):
        return a + b

    @staticmethod
    def is_even(n):
        return n % 2 == 0

MathUtils.add(5, 3)    # 8
MathUtils.is_even(4)   # True
```

---

### Inheritance - Basics

```python
# base class
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "Some sound"

# derived class
class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

dog = Dog("Rex")
cat = Cat("Whiskers")
dog.speak()  # "Woof!"
cat.speak()  # "Meow!"

# access parent attributes
dog.name  # "Rex"
```

---

### Inheritance - super()

```python
# calling parent constructor
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed

dog = Dog("Rex", "Labrador")
dog.name   # "Rex"
dog.breed  # "Labrador"

# calling parent methods
class Animal:
    def speak(self):
        return "Some sound"

class Dog(Animal):
    def speak(self):
        parent_sound = super().speak()
        return f"{parent_sound} and Woof!"

dog = Dog()
dog.speak()  # "Some sound and Woof!"
```

---

### Multiple Inheritance

```python
# multiple inheritance
class Flyer:
    def fly(self):
        return "Flying"

class Swimmer:
    def swim(self):
        return "Swimming"

class Duck(Flyer, Swimmer):
    def quack(self):
        return "Quack"

duck = Duck()
duck.fly()    # "Flying"
duck.swim()   # "Swimming"
duck.quack()  # "Quack"

# method resolution order (MRO)
Duck.__mro__
# (<class 'Duck'>, <class 'Flyer'>, <class 'Swimmer'>, <class 'object'>)

# diamond problem
class A:
    def method(self):
        return "A"

class B(A):
    def method(self):
        return "B"

class C(A):
    def method(self):
        return "C"

class D(B, C):
    pass

D().method()  # "B" (left-to-right in inheritance list)
```

---

### Properties

```python
# using @property
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

    @property
    def area(self):
        return 3.14 * self._radius ** 2

circle = Circle(5)
circle.radius  # 5
circle.area    # 78.5
circle.radius = 10  # setter called
circle.area    # 314.0

# deleter
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

### Magic Methods - String Representation

```python
# __str__ and __repr__
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Point({self.x}, {self.y})"

    def __repr__(self):
        return f"Point(x={self.x}, y={self.y})"

p = Point(3, 4)
str(p)   # "Point(3, 4)"
repr(p)  # "Point(x=3, y=4)"
print(p) # uses __str__

# __format__
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __format__(self, format_spec):
        return f"({self.x}, {self.y})"

p = Point(3, 4)
f"{p}"  # "(3, 4)"
```

---

### Magic Methods - Operators

```python
# arithmetic operators
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

v1 = Vector(1, 2)
v2 = Vector(3, 4)
v3 = v1 + v2  # Vector(4, 6)
v4 = v1 * 2   # Vector(2, 4)

# comparison operators
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __lt__(self, other):
        return (self.x**2 + self.y**2) < (other.x**2 + other.y**2)

p1 = Point(1, 2)
p2 = Point(1, 2)
p1 == p2  # True
```

---

### Magic Methods - Collections

```python
# __len__, __getitem__, __setitem__
class MyList:
    def __init__(self):
        self.items = []

    def __len__(self):
        return len(self.items)

    def __getitem__(self, index):
        return self.items[index]

    def __setitem__(self, index, value):
        self.items[index] = value

    def append(self, value):
        self.items.append(value)

ml = MyList()
ml.append(1)
ml.append(2)
len(ml)   # 2
ml[0]     # 1
ml[1] = 5 # 5

# __contains__
class MySet:
    def __init__(self, items):
        self.items = set(items)

    def __contains__(self, item):
        return item in self.items

s = MySet([1, 2, 3])
2 in s  # True
5 in s  # False
```

---

### Magic Methods - Context Manager

```python
# __enter__ and __exit__
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None

    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
        return False

with FileManager("data.txt", "r") as file:
    data = file.read()

# database connection example
class DatabaseConnection:
    def __enter__(self):
        self.conn = connect_to_db()
        return self.conn

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.close()
        if exc_type:
            self.conn.rollback()
        else:
            self.conn.commit()
```

---

### Abstract Classes

```python
from abc import ABC, abstractmethod

# abstract base class
class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

# cannot instantiate abstract class
# shape = Shape()  # Error!

# concrete class
class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

rect = Rectangle(5, 3)
rect.area()       # 15
rect.perimeter()  # 16
```

---

### Encapsulation

```python
# private attributes (by convention)
class BankAccount:
    def __init__(self, balance):
        self._balance = balance  # protected (single underscore)
        self.__pin = "1234"      # private (double underscore)

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount

    def get_balance(self):
        return self._balance

account = BankAccount(1000)
account._balance    # accessible but discouraged
# account.__pin     # Error! Name mangled to _BankAccount__pin
account._BankAccount__pin  # can still access (not truly private)

# read-only property
class Person:
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name

person = Person("Alice")
person.name  # "Alice"
# person.name = "Bob"  # Error! no setter
```

---

### Dataclasses (Python 3.7+)

```python
from dataclasses import dataclass

# simple dataclass
@dataclass
class Point:
    x: int
    y: int

p = Point(3, 4)
print(p)  # Point(x=3, y=4)

# with defaults
@dataclass
class Person:
    name: str
    age: int = 0
    city: str = "Unknown"

# immutable dataclass
@dataclass(frozen=True)
class ImmutablePoint:
    x: int
    y: int

# with methods
@dataclass
class Rectangle:
    width: float
    height: float

    def area(self):
        return self.width * self.height

# with post-init
@dataclass
class Circle:
    radius: float
    area: float = 0.0

    def __post_init__(self):
        self.area = 3.14 * self.radius ** 2
```
