{{yaml}}

###### AI/ML

<div class="dashboard-tiles">
  {{tile(History, history.html, /assets/2025-10-01-11-36-59.png)}}
  {{tile(ML Tasks, tasks/index.html, /assets/2025-10-10-11-57-17.png)}}
  {{tile(ML Algos, mlalgos/index.html, /assets/2025-10-10-12-04-42.png)}}
  {{tile(Limitations, limitations.html, /assets/2025-10-10-12-13-11.png )}}
</div>

---

<!-- _class: lead invert -->

# AI/ML

---

### Contents

1) Why learn AI/ML?
2) Terminology
3) How Computers Learn
4) Types of Learning
5) Types of Learning Tasks
6) Examples of Simple ML Models

---

### Resources

<div class="figrow">
  <figure data-marpit-fragment style="width:300px;">
    <img src="/assets/2025-10-05-09-49-36.png">
    <figcaption>Free access: https://mml-book.github.io/book/mml-book.pdf</figcaption>
  </figure>

  <figure data-marpit-fragment style="width:300px;">
    <img src="/assets/2025-10-05-09-08-25.png">
    <figcaption>Free access: d2l.ai</figcaption>
  </figure>
</div>

---

## Why Learn AI/ML?

---

### Is there any benefit in learning AI/ML?

1. Its not only beneficial but essential to learn AI/ML?
2. There is lot of benefit in learning latest technologies
3. What is the benefit of learning python if Chatgpt can write all code

---

### Why is knowledge of AI/ML essential?

<div class="figrow">
<figure data-marpit-fragment>
  <img src="/assets/2025-10-12-16-15-40.png">
  <figcaption>Source: https://cdn.bulbapp.io/frontend/images/d1c3fa1d-75c7-4432-bbb8-523495cd53ee/1</figcaption>
</figure>
</div>

---

### Checkpoint

1. Why Learn AI/ML?
2. **Terminology**
3. How Computers Learn
4. Types of Learning
5. Types of Learning Tasks
6. Examples of Simple ML Models

---

## Terminology

---

### What is Intelligence?

<div class="figrow">
<figure data-marpit-fragment>
  <img src="/assets/2025-10-08-16-14-52.png">
  <figcaption>source: https://image.slidesharecdn.com/lecture-18-201104045342/75/intelligence-meaning-types-factors-theories-3-2048.jpg</figcaption>
</figure>
<figure data-marpit-fragment>
  <img src="/assets/2025-10-08-16-15-51.png">
  <figcaption>source: https://richardyonck.com/wp-content/uploads/2020/11/Intelligence-Definition.jpg</figcaption>
</figure>
</div>

---

### What is Intelligence?

<div class="figrow">
<figure data-marpit-fragment>
  <img src="/assets/2025-10-08-15-05-35.png">
  <figcaption>source: https://www.verywellmind.com</figcaption>
</figure>
</div>

---

### What is AI?

<span data-marpit-fragment>Attempt at mimicry of Human Intelligence</span>

---

### Level of mimicry

<div class="figrow"><figure data-marpit-fragment>
  <img src="/assets/2025-10-03-14-20-49.png">
  <figcaption>Source: https://opentext.csu.edu.au/app/uploads/sites/6/2023/03/what_is_AI.jpg</figcaption>
</figure>
</div>


---


### Have we made ASI?

<div class="figrow">
<figure data-marpit-fragment>
  <img src="/assets/2025-10-08-16-25-07.png">
  <figcaption>source: https://prompt.16x.engineer/_next/static/media/wrong-answer.4536ac48.png</figcaption>
</figure>
<figure data-marpit-fragment>
  <img src="/assets/2025-10-08-16-27-19.png">
  <figcaption>source: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt0bmq5zyfHGIwL2zW5-idCtKCIFx_Hj9iJg&s</figcaption>
</figure>
</div>

---

### What is ML?

* A computer program is said to learn from experience **E** with respect to some class of tasks **T** and performance measure **P**, if its performance at tasks in **T**, as measured by **P**, improves with experience **E** &mdash; *Tom Mitchell (1997)*

* The field of study that gives computers the ability to learn without being explicitly programmed &mdash; *Arthur Samuel (1959)*

---

### ML vs Programming

<div class="figrow">
<figure data-marpit-fragment>
      <span>Traditional Programming</span>
  <img src="/assets/2025-10-13-12-45-47.png">
  <figcaption></figcaption>
</figure>
</div>

<div class="figrow">
<figure data-marpit-fragment>
    <span>Machine Learning</span>
  <img src="/assets/2025-10-13-12-47-56.png">
  <figcaption></figcaption>
</figure>
</div>

---

<iframe src = "https://drive.google.com/file/d/1UgWoz2tWh6--K_fQrzzvVCZDvhcJupa8/view?usp=sharing"></iframe>

---

### How are these terms related?

<div class="figrow"><figure data-marpit-fragment >
  <img src="/assets/2025-10-07-22-42-13.png">
  <figcaption>Source: https://aiotplaybook.org/index.php?title=Artificial_Intelligence_101 </figcaption>
</figure>

<figure data-marpit-fragment >
  <img src="/assets/2025-10-07-22-57-05.png">
  <figcaption>Source: https://community.aws/raw-post-images/posts/introduction-to-artificial-intelligence-and-machine-learning/images/fig_1.png?imgSize=1216x1174</figcaption>
</figure></div>

---

### What about DS?

<div class="figrow">
<figure data-marpit-fragment>
  <img src="/assets/2025-10-08-12-44-46.png">
  <figcaption></figcaption>
</figure>
<figure data-marpit-fragment>
  <img src="/assets/2025-10-08-12-45-11.png">
  <figcaption></figcaption>
</figure>
<figure data-marpit-fragment>
  <img src="/assets/2025-10-08-12-46-10.png">
  <figcaption></figcaption>
</figure>
</div>

---

### ML Foundations and Pillars

<div class="figrow">
<figure data-marpit-fragment>
  <img src="/assets/2025-10-08-13-03-46.png">
  <figcaption>Source: Deisenroth, M. P., Faisal, A. A., & Ong, C. S. (2020). Mathematics for machine learning. Cambridge University Press.</figcaption>
</figure>
</div>

---


### Checkpoint

1. Why Learn AI/ML?
2. Terminology
3. **How Computers Learn**
4. Types of Learning
5. Types of Learning Tasks
6. Examples of Simple ML Models



---

## How Computers Learn

---

### Checkpoint

1. Terminology
2. How Computers Learn
3. Types of Learning
4. Types of Learning Tasks
5. **Examples of Simple ML Models**

---

## Examples of ML Models

---

###### Machine Learning Algorithms

<div class="dashboard-tiles">
  <a class="tile-link" href="aiml/mlalgos/prob.html" style="--tile-bg-img:url('assets/2025-10-02-08-38-50.png');">Probabilistic</a>
</div>
