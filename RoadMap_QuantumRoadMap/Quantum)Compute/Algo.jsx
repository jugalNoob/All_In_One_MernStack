
1. Foundational Quantum Algorithms
A. Deutsch-Jozsa Algorithm (1992)
Purpose: Determines if a function is constant (always same output) or balanced (50-50 outputs).

Significance: First proof that quantum computers could solve problems faster than classical ones.

Speedup: Exponential (1 query vs. 2ⁿ⁻¹+1 classically).

B. Bernstein-Vazirani Algorithm (1993)
Purpose: Finds a hidden bitstring s in a function f(x) = s·x (mod 2).

Speedup: Exponential (1 query vs. O(n) classically).

C. Simon’s Algorithm (1994)
Purpose: Solves the hidden subgroup problem for XOR-masking.

Significance: Inspired Shor’s algorithm.

Speedup: Exponential (O(n) vs. O(2ⁿ/²) classically).



2. Quantum Search & Optimization
A. Grover’s Algorithm (1996)
Purpose: Searches an unsorted database quadratically faster.

Speedup: O(√N) vs. O(N) classically.

Applications:

Database search

Cryptanalysis (brute-force attacks)

Optimization problems

📌 Example:




# Qiskit implementation of Grover's search
from qiskit.algorithms import Grover
from qiskit import QuantumCircuit
oracle = QuantumCircuit(2)
oracle.cz(0, 1)  # Marks |11> as solution
grover = Grover(iterations=1)
result = grover.amplify(oracle)
print(result.top_measurement)  # Output: '11'



B. Quantum Approximate Optimization Algorithm (QAOA)
Purpose: Solves combinatorial optimization (e.g., MaxCut, TSP).

Hybrid Approach: Combines quantum and classical computing.

Used in: Finance, logistics, drug discovery.



3. Quantum Fourier Transform (QFT)-Based Algorithms
A. Shor’s Algorithm (1994)
Purpose: Factorizes large integers exponentially faster.

Breaks: RSA encryption.

Speedup: O((log N)³) vs. O(e^(1.9 (log N)^(1/3))) classically.

📌 How it works:

Uses QFT to find the period of a function.

Applies modular exponentiation.

B. Quantum Phase Estimation (QPE)
Purpose: Estimates the eigenvalue of a unitary operator.

Key Subroutine: Used in Shor’s, HHL, and chemistry simulations.

4. Quantum Machine Learning (QML)
A. Quantum Support Vector Machine (QSVM)
Purpose: Classifies data using quantum kernels.

Speedup: Exponential for certain datasets.

B. Quantum Neural Networks (QNNs)
Purpose: Trains neural networks using quantum circuits.

Frameworks:

PennyLane

TensorFlow Quantum (TFQ)


import pennylane as qml
dev = qml.device("default.qubit", wires=2)
@qml.qnode(dev)
def circuit(params):
    qml.RX(params[0], wires=0)
    qml.RY(params[1], wires=1)
    qml.CNOT(wires=[0, 1])
    return qml.expval(qml.PauliZ(0))
print(circuit([0.1, 0.2]))



5. Quantum Simulation Algorithms
A. Variational Quantum Eigensolver (VQE)
Purpose: Finds the ground state energy of molecules.

Used in: Quantum chemistry, material science.

B. Quantum Monte Carlo (QMC)
Purpose: Estimates integrals and financial derivatives.



6. Quantum Walks
Purpose: Generalization of classical random walks.

Applications:

Graph traversal

Quantum search enhancement




7. Error Correction & Fault-Tolerant Algorithms
A. Surface Code
Purpose: Corrects quantum errors in hardware.

Key to: Large-scale quantum computing.

B. Topological Quantum Computing (Anyons)
Purpose: Uses non-Abelian anyons for error-resistant qubits.



8. Post-Quantum Cryptography (Defensive Algorithms)
A. Lattice-Based Cryptography
Purpose: Resistant to Shor’s attacks.

Example: NIST’s CRYSTALS-Kyber (Key Exchange).

B. Hash-Based Signatures (e.g., SPHINCS+)
Purpose: Quantum-secure digital signatures.


Summary Table of Quantum Algorithms



| **Category**                     | **Algorithm(s)**          | **Speedup**              | **Applications**                               |
| -------------------------------- | ------------------------- | ------------------------ | ---------------------------------------------- |
| 🔹 **Foundational**              | Deutsch–Jozsa             | **Exponential**          | Oracle problems, theoretical efficiency        |
| 🔍 **Search / Optimization**     | Grover’s, QAOA            | **Quadratic**            | Unstructured search, optimization, scheduling  |
| 🔁 **QFT-Based**                 | Shor’s, QPE               | **Exponential**          | Integer factoring, quantum chemistry           |
| 🤖 **Quantum Machine Learning**  | QSVM, QNN                 | Polynomial / Exponential | AI, pattern recognition, classification        |
| ⚗️ **Simulation**                | VQE, QMC                  | **Exponential**          | Molecular modeling, materials science, finance |
| 🛡️ **Error Correction**         | Surface Code, Steane Code | N/A                      | Fault-tolerant quantum computing               |
| 🔐 **Post-Quantum Cryptography** | Lattice-based, SPHINCS+   | N/A                      | Classical cryptography resistant to quantum    |



📘 Glossary:
QFT = Quantum Fourier Transform

QAOA = Quantum Approximate Optimization Algorithm

QPE = Quantum Phase Estimation

VQE = Variational Quantum Eigensolver

QMC = Quantum Monte Carlo

QSVM = Quantum Support Vector Machine

QNN = Quantum Neural Network

Let me know if you want:

A cheat sheet PDF version of this

Code examples of any algorithm (e.g., Grover’s, VQE) in Qiskit

A React-based visual demo of one of them









