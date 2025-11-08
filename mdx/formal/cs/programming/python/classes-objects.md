---
theme: blank2
paginate: true
transition: slide
class: lead
footer: '<span class="breadcrumb"></span>'
---
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<!-- Font imports for all three font options -->
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet">
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

# Classes & Objects

---

### Simple Class

```python
# define class
class Dog:
    pass
#ans: create object
my_dog = Dog()
```

---

### Class with __init__

```python
# constructor
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age
dog = Dog("Rex", 3)
#ans: dog.name is "Rex"
```

---

### Instance Attributes

```python
# access attributes
class Dog:
    def __init__(self, name):
        self.name = name
dog = Dog("Rex")
dog.name
#ans: "Rex"
dog.name = "Max"
#ans: "Max"
```

---

### Instance Methods

```python
# methods
class Dog:
    def __init__(self, name):
        self.name = name
    def bark(self):
        return f"{self.name} says Woof!"
dog = Dog("Rex")
dog.bark()
#ans: "Rex says Woof!"
```

---

### Class Variables

```python
# class variable (shared)
class Dog:
    species = "Canis familiaris"
    def __init__(self, name):
        self.name = name
Dog.species
#ans: "Canis familiaris"
Dog("Rex").species
#ans: "Canis familiaris"
```

---

### Exercises - Part 1

```python
# what is type?
class MyClass:
    pass
obj = MyClass()
type(obj)
#ans: <class 'MyClass'>
```

---

### Exercises - Part 2

```python
# __init__ return?
class MyClass:
    def __init__(self):
        return 5
#ans: TypeError (__init__ must return None)
```

---

### Exercises - Part 3

```python
# self parameter?
class MyClass:
    def method(self):
        return self
obj = MyClass()
obj.method() is obj
#ans: True
```

---

### Exercises - Part 4

```python
# class vs instance variable?
class MyClass:
    x = 5
obj = MyClass()
obj.x
#ans: 5 (from class)
obj.x = 10
obj.x
#ans: 10 (instance variable)
```

---

### Exercises - Part 5

```python
# forget self?
class MyClass:
    def method():
        pass
obj = MyClass()
obj.method()
#ans: TypeError (missing self)
```

---

### Exercises - Part 6

```python
# multiple instances?
class Counter:
    def __init__(self):
        self.count = 0
c1 = Counter()
c2 = Counter()
c1.count = 5
#ans: c2.count is still 0
```

---

### Exercises - Part 7

```python
# class variable modification?
class MyClass:
    x = []
obj1 = MyClass()
obj2 = MyClass()
obj1.x.append(1)
#ans: obj2.x is [1] (same list!)
```

---

### Exercises - Part 8

```python
# attribute not found?
class MyClass:
    pass
obj = MyClass()
obj.missing
#ans: AttributeError
```

---

### Exercises - Part 9

```python
# isinstance?
class MyClass:
    pass
obj = MyClass()
isinstance(obj, MyClass)
#ans: True
```

---

### Exercises - Part 10

```python
# __dict__?
class MyClass:
    def __init__(self):
        self.x = 5
obj = MyClass()
obj.__dict__
#ans: {'x': 5}
```
