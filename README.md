# DEPRECATED - no longer actively maintained or updated

Feel free to fork the project or visit our actively maintained [main anchors repository](https://github.com/viadee/javaAnchorExplainer) for updates. 

---

# javaAnchorFrontend

[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

A friendly frontend to provide Anchor-Explanations for machine learning models in conjunction with [javaAnchorServer](https://github.com/viadee/javaAnchorServer), [javaAnchorAdapters](https://github.com/viadee/javaAnchorAdapters) and [javaAnchorExplainer](https://github.com/viadee/javaAnchorExplainer).

Global explanations are viewed like the following image. It explains a modell trained from the titanic dataset. 0 denotes persons who could not be rescued and 1 denotes persons who could.

![Titanic Explanation](https://user-images.githubusercontent.com/5667523/51996301-bde31580-24b4-11e9-9c75-6205546d1463.png)

### Interpretation of the table:

- Each row is an explanation (Except the last row coverage)
- Each column is a predicate
- The Coverage and Precision columns indicate the estimated coverage (how many of the records match this explanation) and the estimated accuracy (how many of the matching records have the same prediction).
- The Coverage line indicates the exact coverage per predicate. 
- The cell in the Coverage row and Coverage column specifies the proportion of all data records that matches at least one explanation.

### What is a predicate?
It is comparable to a where-clause in SQL. A feature either has a concrete category or a range of numbers is specified (the values are included).

### Why are numbers given in ranges?
Anchors is a method that explains an exact point in multi-dimensional space. But to recognize learned patterns of the model, metric data are discretized (1 => a value between 0 and 40; 2 => 41-80; etc.). The server tries to divide metric features into 5 similarly sized ranges (percentiles).

### What do the red numbers stand for?
It stands for "added precision" and gives a hint about the importance of this predicate.

### What is added precision:
Anchors is round-based. This means that only one predicate is selected per round. For each feature, an analysis of the precision is performed if the values of all other features change. The features with the highest precision are then determined. This process continues until the minimum precision is exceeded (configurable via "Min-precision").
The added precision therefore indicates the order in which the predicates were accepted.

## Collaboration
The project is operated and further developed by the viadee Consulting AG in Münster, Westphalia. Results from theses at the FH Münster have been incorporated.

- Further theses are planned: Contact person is Dr. Frank Köhne from viadee. Community contributions to the project are welcome: Please open Github-Issues with suggestions (or PR), which we can then edit in the team.
- We are looking for further partners who have interesting process data to refine our tooling as well as partners that are simply interested in a discussion about AI in the context of business process automation and explainability.
