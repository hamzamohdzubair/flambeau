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

# Inheritance

---

### Basic Inheritance

```python
# base class
class Animal:
    def speak(self):
        return "Some sound"
#ans: derived class
class Dog(Animal):
    def speak(self):
        return "Woof!"
Dog().speak()
#ans: "Woof!"
```

---

### Inheriting Attributes

```python
# inherit __init__
class Animal:
    def __init__(self, name):
        self.name = name
class Dog(Animal):
    pass
Dog("Rex").name
#ans: "Rex"
```

---

### Using super()

```python
# call parent __init__
class Animal:
    def __init__(self, name):
        self.name = name
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed
Dog("Rex", "Lab").name
#ans: "Rex"
```

---

### Override Methods

```python
# override parent method
class Animal:
    def speak(self):
        return "Sound"
class Dog(Animal):
    def speak(self):
        return "Woof!"
Dog().speak()
#ans: "Woof!"
```

---

### Call Parent Method

```python
# call parent from child
class Animal:
    def speak(self):
        return "Sound"
class Dog(Animal):
    def speak(self):
        parent = super().speak()
        return f"{parent} and Woof!"
Dog().speak()
#ans: "Sound and Woof!"
```

---

### Exercises - Part 1

```python
# isinstance with inheritance?
class Animal:
    pass
class Dog(Animal):
    pass
dog = Dog()
isinstance(dog, Animal)
#ans: True
```

---

### Exercises - Part 2

```python
# issubclass?
class Animal:
    pass
class Dog(Animal):
    pass
issubclass(Dog, Animal)
#ans: True
```

---

### Exercises - Part 3

```python
# method resolution order?
class Animal:
    def speak(self):
        return "A"
class Dog(Animal):
    pass
Dog().speak()
#ans: "A" (inherited)
```

---

### Exercises - Part 4

```python
# super() without override?
class Base:
    def method(self):
        return 1
class Derived(Base):
    def other(self):
        return super().method()
Derived().other()
#ans: 1
```

---

### Exercises - Part 5

```python
# multiple inheritance?
class A:
    def method(self):
        return "A"
class B:
    def method(self):
        return "B"
class C(A, B):
    pass
C().method()
#ans: "A" (left to right)
```

---

### Exercises - Part 6

```python
# __mro__?
class Animal:
    pass
class Dog(Animal):
    pass
Dog.__mro__
#ans: (Dog, Animal, object)
```

---

### Exercises - Part 7

```python
# override __init__ without super?
class Base:
    def __init__(self):
        self.x = 1
class Derived(Base):
    def __init__(self):
        self.y = 2
Derived().x
#ans: AttributeError (no super call)
```

---

### Exercises - Part 8

```python
# call grandparent?
class A:
    def method(self):
        return "A"
class B(A):
    def method(self):
        return "B"
class C(B):
    def method(self):
        return super(B, self).method()
C().method()
#ans: "A"
```

---

### Exercises - Part 9

```python
# inherit from object?
class MyClass:
    pass
#ans: implicitly inherits from object
isinstance(MyClass(), object)
#ans: True
```

---

### Exercises - Part 10

```python
# diamond problem?
class A:
    def method(self):
        return "A"
class B(A):
    pass
class C(A):
    pass
class D(B, C):
    pass
D().method()
#ans: "A" (MRO: D, B, C, A, object)
```
