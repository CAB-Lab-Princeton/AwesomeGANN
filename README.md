<p align="right"><a href="https://cablab.scholar.princeton.edu/"><img src="assets/cablab-logo.png" alt="CAB Lab, Princeton University" width="190"></a></p>

# Awesome Geometric Algebra Neural Networks

[![Project page](https://img.shields.io/badge/project%20page-live-E77500)](https://cab-lab-princeton.github.io/AwesomeGANN/)
[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Works](https://img.shields.io/badge/works-168-2A9D8F)](#contents)

A curated list of geometric algebra (Clifford algebra) neural networks, companion to the survey

> **Geometric Algebra for Neural Networks: A Survey**<br>
> [Tao Zhong](https://taozhong.info/), [Kaison Fong](https://www.linkedin.com/in/kaison-fong-153a51350/), [Keqin Wang](https://www.linkedin.com/in/wang-keqin-1b284618a/), [Christine Allen-Blanchette](https://cablab.scholar.princeton.edu/people)<br>
> Princeton University, Stanford University<br>
> arXiv: coming soon

**Interactive version: [https://cab-lab-princeton.github.io/AwesomeGANN/](https://cab-lab-princeton.github.io/AwesomeGANN/)**. Filter the literature by survey section, algebra (EGA, PGA, CGA, STA) and year; read the sentence the survey uses to place each work; pick an algebra for your task; browse architecture families, the empirical evidence map and software libraries.

Each work is listed once, under the survey subsection that discusses it most; the project page shows every place a work is cited. Algebra tags (`EGA`, `PGA`, `CGA`, `STA`, `Clifford`) appear only where the survey text or tables state the algebra.

<!-- AUTO-GENERATED: edit data/*.json and run scripts/build_readme.py -->

## Contents

- [I. Introduction](#i-introduction) (20)
- [II. Foundations](#ii-foundations) (12)
- [III. Equivariance](#iii-equivariance) (27)
- [IV. Layers & architectures](#iv-layers--architectures) (33)
- [V. Applications](#v-applications) (55)
- [VI. Empirical evidence](#vi-empirical-evidence) (5)
- [VII. Software](#vii-software) (16)

## I. Introduction

*Survey section: Introduction.*

- [Deep learning](https://scholar.google.com/scholar?q=Deep+learning). Ian Goodfellow, Yoshua Bengio, Aaron Courville et al. *MIT press Cambridge, 2016*
- [Deep learning](https://scholar.google.com/scholar?q=Deep+learning). Yann LeCun, Yoshua Bengio, Geoffrey Hinton. *Nature, 2015*
- [Imagenet classification with deep convolutional neural networks](https://scholar.google.com/scholar?q=Imagenet+classification+with+deep+convolutional+neural+networks). Alex Krizhevsky, Ilya Sutskever, Geoffrey E Hinton. *Advances in neural information processing systems, 2012*
- [A comprehensive survey on graph neural networks](https://scholar.google.com/scholar?q=A+comprehensive+survey+on+graph+neural+networks). Zonghan Wu, Shirui Pan, Fengwen Chen et al. *IEEE transactions on neural networks and learning systems, 2020*
- [A survey on image data augmentation for deep learning](https://scholar.google.com/scholar?q=A+survey+on+image+data+augmentation+for+deep+learning). Connor Shorten, Taghi M Khoshgoftaar. *Journal of big data, 2019*
- [Understanding deep learning requires rethinking generalization](https://arxiv.org/abs/1611.03530). Chiyuan Zhang, Samy Bengio, Moritz Hardt et al. *arXiv preprint, 2016*
- [Learning so (3) equivariant representations with spherical cnns](https://scholar.google.com/scholar?q=Learning+so+%283%29+equivariant+representations+with+spherical+cnns). Carlos Esteves, Christine Allen-Blanchette, Ameesh Makadia et al. *Proceedings of the european conference on computer vision (ECCV), 2018*
- [Network dissection: Quantifying interpretability of deep visual representations](https://scholar.google.com/scholar?q=Network+dissection%3A+Quantifying+interpretability+of+deep+visual+representations). David Bau, Bolei Zhou, Aditya Khosla et al. *Proceedings of the IEEE conference on computer vision and pattern recognition, 2017*
- [Preliminary sketch of biquaternions](https://scholar.google.com/scholar?q=Preliminary+sketch+of+biquaternions). Clifford. *Proceedings of the London Mathematical Society, 1871*
- [Machine learning clifford invariants of ADE coxeter elements](https://scholar.google.com/scholar?q=Machine+learning+clifford+invariants+of+ADE+coxeter+elements). Siqi Chen, Pierre-Philippe Dechant, Yang-Hui He et al. *Advances in Applied Clifford Algebras, 2024*
- [Geometric neural operators (gnps) for data-driven deep learning in non-euclidean settings](https://scholar.google.com/scholar?q=Geometric+neural+operators+%28gnps%29+for+data-driven+deep+learning+in+non-euclidean+settings). Blaine Quackenbush, PJ Atzberger. *Machine Learning: Science and Technology, 2024*
- [Current survey of Clifford geometric algebra applications](https://scholar.google.com/scholar?q=Current+survey+of+Clifford+geometric+algebra+applications). Eckhard Hitzer, Carlile Lavor, Dietmar Hildenbrand. *Mathematical Methods in the Applied Sciences, 2024*
- [Survey of new applications of geometric algebra](https://scholar.google.com/scholar?q=Survey+of+new+applications+of+geometric+algebra). Eckhard Hitzer, Manos Kamarianakis, George Papagiannakis et al. *Mathematical Methods in the Applied Sciences, 2024*
- [Applications of Clifford’s geometric algebra](https://scholar.google.com/scholar?q=Applications+of+Clifford%E2%80%99s+geometric+algebra). Eckhard Hitzer, Tohru Nitta, Yasuaki Kuroe. *Advances in Applied Clifford Algebras, 2013*
- [Geometric algebra in signal and image processing: A survey](https://scholar.google.com/scholar?q=Geometric+algebra+in+signal+and+image+processing%3A+A+survey). Rui Wang, Kaili Wang, Wenming Cao et al. *IEEE Access, 2019*
- [A survey of geometric algebra and geometric calculus](https://scholar.google.com/scholar?q=A+survey+of+geometric+algebra+and+geometric+calculus). Alan Macdonald. *Advances in Applied Clifford Algebras, 2017*
- [Geometric deep learning for computer-aided design: A survey](https://arxiv.org/abs/2402.17695). Negar Heidari, Alexandros Iosifidis. *arXiv preprint, 2024*
- [A systematic survey in geometric deep learning for structure-based drug design](https://arxiv.org/abs/2306.11768). Zaixi Zhang, Jiaxian Yan, Qi Liu et al. *arXiv preprint, 2023*
- [Beyond euclid: An illustrated guide to modern machine learning with geometric, topological, and algebraic structures](https://arxiv.org/abs/2407.09468). Sophia Sanborn, Johan Mathe, Mathilde Papillon et al. *arXiv preprint, 2024*
- [Symmetry group equivariant convolutions for representation learning: a survey](https://scholar.google.com/scholar?q=Symmetry+group+equivariant+convolutions+for+representation+learning%3A+a+survey). Ramzan Basheer, Deepak Mishra. *International Journal of Data Science and Analytics, 2026*

## II. Foundations

*Survey section: Foundational Concepts: GA for NNs.*

### II-A GA Fundamentals

- [Graded symmetry groups: plane and simple](https://scholar.google.com/scholar?q=Graded+symmetry+groups%3A+plane+and+simple). Martin Roelfs, Steven De Keninck. *Advances in Applied Clifford Algebras, 2023*

### II-B Key Algebras

- [Geometric algebra for computer science (revised edition): An object-oriented approach to geometry](https://scholar.google.com/scholar?q=Geometric+algebra+for+computer+science+%28revised+edition%29%3A+An+object-oriented+approach+to+geometry). Leo Dorst, Daniel Fontijne, Stephen Mann. *Morgan Kaufmann, 2009*
- [Geometric algebra for physicists](https://scholar.google.com/scholar?q=Geometric+algebra+for+physicists). Chris Doran, Anthony Lasenby. *Cambridge University Press, 2003*
- [Space-time algebra](https://scholar.google.com/scholar?q=Space-time+algebra). David Hestenes, Anthony Lasenby. *Springer, 2015*
- [Correspondence free multivector cloud registration using conformal geometric algebra](https://arxiv.org/abs/2406.11732). Francisco Xavier Vasconcelos, Jacinto C Nascimento. *arXiv preprint, 2024*
- [Geometric algebra: An introduction with applications in Euclidean and conformal geometry](https://scholar.google.com/scholar?q=Geometric+algebra%3A+An+introduction+with+applications+in+Euclidean+and+conformal+geometry). Richard A Miller. *San Jose State University, 2013*
- [Projective geometric algebra: A new framework for doing euclidean geometry](https://arxiv.org/abs/1901.05873). Charles G Gunn. *arXiv preprint, 2019*
- [A guided tour to the plane-based geometric algebra PGA](https://scholar.google.com/scholar?q=A+guided+tour+to+the+plane-based+geometric+algebra+PGA). Leo Dorst, Steven De Keninck. *URL https://bivector. net/PGA4CS. html, 2022*
- [Conformal geometry, Euclidean space and geometric algebra](https://scholar.google.com/scholar?q=Conformal+geometry%2C+Euclidean+space+and+geometric+algebra). Chris Doran, Anthony Lasenby, Joan Lasenby. *Uncertainty in Geometric Computations, 2002*
- [Spacetime physics with geometric algebra](https://doi.org/10.1119/1.1571836). David Hestenes. *American Journal of Physics, 2003*
- [Spacetime algebra as a powerful tool for electromagnetism](https://scholar.google.com/scholar?q=Spacetime+algebra+as+a+powerful+tool+for+electromagnetism). Justin Dressel, Konstantin Y Bliokh, Franco Nori. *Physics Reports, 2015*
- [Quantum spacetime and algebraic quantum field theory](https://scholar.google.com/scholar?q=Quantum+spacetime+and+algebraic+quantum+field+theory). Dorothea Bahns, Sergio Doplicher, Gerardo Morsella et al. *Advances in algebraic quantum field theory, 2015*

## III. Equivariance

*Survey section: GDL Principles: Equivariance and Symmetries.*

### III-A Leveraging Symmetries in Deep Learning

- [Deep residual learning for image recognition](https://scholar.google.com/scholar?q=Deep+residual+learning+for+image+recognition). Kaiming He, Xiangyu Zhang, Shaoqing Ren et al. *Proceedings of the IEEE conference on computer vision and pattern recognition, 2016*
- [Geometric deep learning: Grids, groups, graphs, geodesics, and gauges](https://arxiv.org/abs/2104.13478). Michael M Bronstein, Joan Bruna, Taco Cohen et al. *arXiv preprint, 2021*
- [GAGrasp: Geometric algebra diffusion for dexterous grasping](https://scholar.google.com/scholar?q=GAGrasp%3A+Geometric+algebra+diffusion+for+dexterous+grasping). **GAGrasp** Tao Zhong, Christine Allen-Blanchette. *2025 IEEE International Conference on Robotics and Automation (ICRA), 2025* `PGA`
- [Convolutional networks for images, speech, and time series](https://scholar.google.com/scholar?q=Convolutional+networks+for+images%2C+speech%2C+and+time+series). Yann LeCun, Yoshua Bengio, et al. *The handbook of brain theory and neural networks, 1995*
- [Highly accurate protein structure prediction with AlphaFold](https://scholar.google.com/scholar?q=Highly+accurate+protein+structure+prediction+with+AlphaFold). **AlphaFold2** John Jumper, Richard Evans, Alexander Pritzel et al. *Nature, 2021*
- [Pointnet: Deep learning on point sets for 3d classification and segmentation](https://scholar.google.com/scholar?q=Pointnet%3A+Deep+learning+on+point+sets+for+3d+classification+and+segmentation). Charles R Qi, Hao Su, Kaichun Mo et al. *Proceedings of the IEEE conference on computer vision and pattern recognition, 2017*
- [Deep sets](https://scholar.google.com/scholar?q=Deep+sets). Manzil Zaheer, Satwik Kottur, Siamak Ravanbakhsh et al. *Advances in neural information processing systems, 2017*
- [Clifford-steerable convolutional neural networks](https://scholar.google.com/scholar?q=Clifford-steerable+convolutional+neural+networks). **CS-CNN** Maksim Zhdanov, David Ruhe, Maurice Weiler et al. *International Conference on Machine Learning, 2024* `Clifford`
- [A clifford algebraic approach to e (n)-equivariant high-order graph neural networks](https://arxiv.org/abs/2410.04692). **CG-EGNN** Viet-Hoang Tran, Thieu N Vo, Tho Tran Huu et al. *arXiv preprint, 2024*
- [Does equivariance matter at scale?](https://scholar.google.com/scholar?q=Does+equivariance+matter+at+scale%3F). Johann Brehmer, Sönke Behrends, Pim De Haan et al. *Transactions on Machine Learning Research, 2025*

### III-C Achieving Equivariance with Geometric Algebra

- [Group equivariant convolutional networks](https://scholar.google.com/scholar?q=Group+equivariant+convolutional+networks). Taco Cohen, Max Welling. *International conference on machine learning, 2016*
- [Steerable cnns](https://arxiv.org/abs/1612.08498). Taco S Cohen, Max Welling. *arXiv preprint, 2016*
- [Lorentz-equivariant geometric algebra transformers for high-energy physics](https://scholar.google.com/scholar?q=Lorentz-equivariant+geometric+algebra+transformers+for+high-energy+physics). **L-GATr** Jonas Spinner, Victor Bresó, Pim De Haan et al. *Advances in neural information processing systems, 2024* `STA`
- [Clifford algebras, clifford groups, and a generalization of the quaternions](https://arxiv.org/abs/0805.0311). Jean Gallier. *arXiv preprint, 2008*
- [E3nn: Euclidean neural networks](https://arxiv.org/abs/2207.09453). Mario Geiger, Tess Smidt. *arXiv preprint, 2022*
- [LaB-GATr: geometric algebra transformers for large biomedical surface and volume meshes](https://scholar.google.com/scholar?q=LaB-GATr%3A+geometric+algebra+transformers+for+large+biomedical+surface+and+volume+meshes). **LaB-GATr** Julian Suk, Baris Imre, Jelmer M Wolterink. *International Conference on Medical Image Computing and Computer-Assisted Intervention, 2024* `PGA`
- [Hybrid Diffusion Policies with Projective Geometric Algebra for Efficient Robot Manipulation Learning](https://scholar.google.com/scholar?q=Hybrid+Diffusion+Policies+with+Projective+Geometric+Algebra+for+Efficient+Robot+Manipulation+Learning). **hPGA-DP** Xiatao Sun, Yuxuan Wang, Shuo Yang et al. *2026 IEEE International Conference on Robotics and Automation (ICRA), 2026* `PGA`
- [A Lorentz-equivariant transformer for all of the LHC](https://scholar.google.com/scholar?q=A+Lorentz-equivariant+transformer+for+all+of+the+LHC). **L-GATr** Johann Brehmer, Víctor Bresó, Pim de Haan et al. *SciPost Physics, 2025* `STA`
- [Tensor field networks: Rotation-and translation-equivariant neural networks for 3d point clouds](https://arxiv.org/abs/1802.08219). **TFN** Nathaniel Thomas, Tess Smidt, Steven Kearnes et al. *arXiv preprint, 2018*
- [E (n) equivariant graph neural networks](https://scholar.google.com/scholar?q=E+%28n%29+equivariant+graph+neural+networks). **EGNN** Victor Garcia Satorras, Emiel Hoogeboom, Max Welling. *International conference on machine learning, 2021*

### III-D Comparison with Non-GA Equivariant Approaches

- [Lorentz Local Canonicalization: How to make any Network Lorentz-Equivariant](https://scholar.google.com/scholar?q=Lorentz+Local+Canonicalization%3A+How+to+make+any+Network+Lorentz-Equivariant). **LLoCa** Jonas Spinner, Luigi Favaro, Peter Lippmann et al. *Advances in Neural Information Processing Systems, 2025*

### III-E The Clifford Group and its Action in Equivariant Networks

- [Clifford neural layers for PDE modeling](https://scholar.google.com/scholar?q=Clifford+neural+layers+for+PDE+modeling). **Clifford layers** Johannes Brandstetter, Rianne van den Berg, Max Welling et al. *The Eleventh International Conference on Learning Representations, 2023* `EGA`
- [An introduction to Clifford algebras and spinors](https://scholar.google.com/scholar?q=An+introduction+to+Clifford+algebras+and+spinors). Jayme Vaz Jr, Roldão da Rocha Jr. *Oxford University Press, 2016*
- [Clifford algebras and spinors](https://scholar.google.com/scholar?q=Clifford+algebras+and+spinors). Pertti Lounesto. *Clifford algebras and their applications in mathematical physics, 2001*
- [Metric Learning for Clifford Group Equivariant Neural Networks](https://scholar.google.com/scholar?q=Metric+Learning+for+Clifford+Group+Equivariant+Neural+Networks). Riccardo Ali, Paulina Kulytė, Haitz Sáez de Ocáriz Borde et al. *ICML 2024 Workshop on Geometry-grounded Representation Learning and Generative Modeling, 2024* `Clifford`
- [Gradient of Clifford Neural Networks](https://scholar.google.com/scholar?q=Gradient+of+Clifford+Neural+Networks). Takashi Maruyama, Francesco Alesiani. *NeurIPS 2024 Workshop on Data-driven and Differentiable Simulations, Surrogates, and Solvers, 2024*
- [GLGENN: A Novel Parameter-Light Equivariant Neural Networks Architecture Based on Clifford Geometric Algebras](https://scholar.google.com/scholar?q=GLGENN%3A+A+Novel+Parameter-Light+Equivariant+Neural+Networks+Architecture+Based+on+Clifford+Geometric+Algebras). **GLGENN** Ekaterina Filimoshina, Dmitry Shirokov. *Proceedings of the 42nd International Conference on Machine Learning, 2025* `Clifford`

## IV. Layers & architectures

*Survey section: GA NN Layers.*

### IV-A Multivector Representations

- [Graph Geometric Algebra networks for graph representation learning](https://scholar.google.com/scholar?q=Graph+Geometric+Algebra+networks+for+graph+representation+learning). **GGAN** Jianqi Zhong, Wenming Cao. *Scientific Reports, 2025*
- [Object detection in point clouds using conformal geometric algebra](https://scholar.google.com/scholar?q=Object+detection+in+point+clouds+using+conformal+geometric+algebra). Aksel Sveier, Adam Leon Kleppe, Lars Tingelstad et al. *Advances in Applied Clifford Algebras, 2017* `CGA`

### IV-B GA-Parametrized Linear and Bilinear Layers

- [Geometric algebra transformer](https://scholar.google.com/scholar?q=Geometric+algebra+transformer). **GATr** Johann Brehmer, Pim De Haan, Sönke Behrends et al. *Advances in Neural Information Processing Systems, 2023* `PGA`
- [Clifford group equivariant neural networks](https://scholar.google.com/scholar?q=Clifford+group+equivariant+neural+networks). **CGENN** David Ruhe, Johannes Brandstetter, Patrick Forré. *Advances in Neural Information Processing Systems, 2023* `EGA`

### IV-C Transformation-based Layers

- [Composing Linear Layers from Irreducibles](https://scholar.google.com/scholar?q=Composing+Linear+Layers+from+Irreducibles). Travis Pence, Daisuke Yamada, Vikas Singh. *Advances in Neural Information Processing Systems, 2025*

### IV-D Activations and Normalizations

- [Geometric clifford algebra networks](https://scholar.google.com/scholar?q=Geometric+clifford+algebra+networks). **GCAN** David Ruhe, Jayesh K Gupta, Steven De Keninck et al. *International Conference on Machine Learning, 2023* `EGA` `PGA`
- [Gaussian error linear units (gelus)](https://arxiv.org/abs/1606.08415). **GELU** Dan Hendrycks, Kevin Gimpel. *arXiv preprint, 2016*
- [GA-reLU: an activation function for geometric algebra networks applied to 2d navier-stokes PDEs](https://scholar.google.com/scholar?q=GA-reLU%3A+an+activation+function+for+geometric+algebra+networks+applied+to+2d+navier-stokes+PDEs). **GA-ReLU** Alberto Pepe, Sven Buchholz, Joan Lasenby. *ICLR 2024 Workshop on AI4DifferentialEquations In Science, 2024*
- [Kan: Kolmogorov-arnold networks](https://arxiv.org/abs/2404.19756). Ziming Liu, Yixuan Wang, Sachin Vaidya et al. *arXiv preprint, 2024*
- [Clifford Kolmogorov-Arnold Networks](https://arxiv.org/abs/2602.05977). **ClKAN** Matthias Wolff, Francesco Alesiani, Christof Duhme et al. *arXiv preprint, 2026*
- [Batch normalization: Accelerating deep network training by reducing internal covariate shift](https://scholar.google.com/scholar?q=Batch+normalization%3A+Accelerating+deep+network+training+by+reducing+internal+covariate+shift). **BatchNorm** Sergey Ioffe, Christian Szegedy. *International conference on machine learning, 2015*
- [Group normalization](https://scholar.google.com/scholar?q=Group+normalization). **GroupNorm** Yuxin Wu, Kaiming He. *Proceedings of the European conference on computer vision (ECCV), 2018*
- [Layer normalization](https://arxiv.org/abs/1607.06450). **LayerNorm** Jimmy Lei Ba, Jamie Ryan Kiros, Geoffrey E Hinton. *arXiv preprint, 2016*

### IV-E GA-based Attention Mechanisms

- [Generating Highly Designable Proteins with Geometric Algebra Flow Matching](https://scholar.google.com/scholar?q=Generating+Highly+Designable+Proteins+with+Geometric+Algebra+Flow+Matching). **GAFL, CFA** Simon Wagner, Leif Seute, Vsevolod Viliuga et al. *Advances in Neural Information Processing Systems, 2024* `PGA`
- [Attention is all you need](https://scholar.google.com/scholar?q=Attention+is+all+you+need). Ashish Vaswani, Noam Shazeer, Niki Parmar et al. *Advances in neural information processing systems, 2017*
- [An image is worth 16x16 words: Transformers for image recognition at scale](https://arxiv.org/abs/2010.11929). Alexey Dosovitskiy, Lucas Beyer, Alexander Kolesnikov et al. *arXiv preprint, 2020*

### IV-F Building GA-NN Architectures

- [Complex-valued neural networks](https://scholar.google.com/scholar?q=Complex-valued+neural+networks). Akira Hirose. *Springer, 2006*
- [A multiexpert framework for character recognition: a novel application of Clifford networks](https://scholar.google.com/scholar?q=A+multiexpert+framework+for+character+recognition%3A+a+novel+application+of+Clifford+networks). Ahmad Fuad Rezaur Rahman, W Gareth J Howells, Michael C Fairhurst. *IEEE Transactions on neural networks, 2001*
- [Clifford networks](https://scholar.google.com/scholar?q=Clifford+networks). **Clifford MLP** Justin Pearson. *Complex-Valued Neural Networks: Theories and Applications, 2003*
- [Learning rules for low-dimensional clifford neural networks](https://scholar.google.com/scholar?q=Learning+rules+for+low-dimensional+clifford+neural+networks). Qing Yi. *Thesis, Portland State University, 2006*
- [Polarized signal classification by complex and quaternionic multi-layer perceptrons](https://scholar.google.com/scholar?q=Polarized+signal+classification+by+complex+and+quaternionic+multi-layer+perceptrons). Sven Buchholz, Nicolas Le Bihan. *International journal of neural systems, 2008*
- [An Extended Multilayer Perceptron Model Using Reduced Geometric Algebra](https://doi.org/10.1109/ACCESS.2019.2940217). Yanping Li, Cao Wenming. *IEEE Access, 2019*
- [Neural networks in the Clifford domain](https://scholar.google.com/scholar?q=Neural+networks+in+the+Clifford+domain). JK Pearson, DL Bisset. *Proceedings of 1994 IEEE International Conference on Neural Networks (ICNN'94), 1994*
- [On Clifford neurons and Clifford multi-layer perceptrons](https://scholar.google.com/scholar?q=On+Clifford+neurons+and+Clifford+multi-layer+perceptrons). Sven Buchholz, Gerald Sommer. *Neural Networks, 2008*
- [Clifford algebra multilayer perceptrons](https://scholar.google.com/scholar?q=Clifford+algebra+multilayer+perceptrons). Sven Buchholz, Gerald Sommer. *Geometric computing with Clifford algebras: Theoretical foundations and applications in computer vision and robotics, 2001*
- [Introduction to Neural Computation in Clifford Algebra](https://doi.org/10.1007/978-3-662-04621-0_12). Sven Buchholz, Gerald Sommer. *Geometric Computing with Clifford Algebras: Theoretical Foundations and Applications in Computer Vision and Robotics, 2001*
- [Geometric Algebra Meets Large Language Models: Instruction-Based Transformations of Separate Meshes in 3D, Interactive and Controllable Scenes](https://doi.org/10.1109/ISEMV67326.2025.00018). Prodromos Kolyvakis, Manos Kamarianakis, George Papagiannakis. *2025 IEEE International Symposium on Emerging Metaverse (ISEMV), 2025* `CGA`
- [GA-CNN: Convolutional neural network based on geometric algebra for hyperspectral image classification](https://scholar.google.com/scholar?q=GA-CNN%3A+Convolutional+neural+network+based+on+geometric+algebra+for+hyperspectral+image+classification). **GA-CNN** Yanping Li, Yue Wang, Rui Wang et al. *IEEE Transactions on Geoscience and Remote Sensing, 2022*
- [Clifford neural operators on atmospheric data influenced partial differential equations](https://scholar.google.com/scholar?q=Clifford+neural+operators+on+atmospheric+data+influenced+partial+differential+equations). Sujit Roy, Rajat Shinde, Christopher E Phillips et al. *Workshop on AI4Differential Equations In Science, 12th International Conference on Learning Representations, 2024*
- [Conditional Clifford-Steerable CNNs for PDE Modeling](https://scholar.google.com/scholar?q=Conditional+Clifford-Steerable+CNNs+for+PDE+Modeling). **C-CSCNN** Bálint László Szarvas, Maksim Zhdanov. *Proceedings of the 43rd International Conference on Machine Learning, 2026*
- [ViNE-GATr: scaling geometric algebra transformers with virtual nodes embeddings](https://scholar.google.com/scholar?q=ViNE-GATr%3A+scaling+geometric+algebra+transformers+with+virtual+nodes+embeddings). **ViNE-GATr** Julian Suk, Thomas Hehn, Arash Behboodi et al. *ICLR 2025 Workshop on Machine Learning Multiscale Processes, 2025*
- [Versor: A Geometric Sequence Architecture](https://arxiv.org/abs/2602.10195). **Versor** Truong Minh Huy, Edward Hirst. *arXiv preprint, 2026* `CGA`
- [Geometric Algebra Planes: Convex Implicit Neural Volumes](https://scholar.google.com/scholar?q=Geometric+Algebra+Planes%3A+Convex+Implicit+Neural+Volumes). **GA-Planes** Irmak Sivgin, Sara Fridovich-Keil, Gordon Wetzstein et al. *International Conference on Machine Learning, 2025*

## V. Applications

*Survey section: Applications.*

### V-A Computer Vision and Graphics

- [Point Cloud Upsampling with Geometric Algebra Driven Inverse Heat Dissipation](https://scholar.google.com/scholar?q=Point+Cloud+Upsampling+with+Geometric+Algebra+Driven+Inverse+Heat+Dissipation). Wenqiang Xu, Wenrui Dai, Ziyang Zheng et al. *Proceedings of the 32nd ACM International Conference on Multimedia, 2024*
- [Cgaposenet+ gcan: A geometric clifford algebra network for geometry-aware camera pose regression](https://scholar.google.com/scholar?q=Cgaposenet%2B+gcan%3A+A+geometric+clifford+algebra+network+for+geometry-aware+camera+pose+regression). **CGA-PoseNet, CGAPoseNet+GCAN** Alberto Pepe, Joan Lasenby, Sven Buchholz. *Proceedings of the IEEE/CVF Winter Conference on Applications of Computer Vision, 2024* `CGA`
- [Applications of conformal geometric algebra in computer vision and graphics](https://scholar.google.com/scholar?q=Applications+of+conformal+geometric+algebra+in+computer+vision+and+graphics). Rich Wareham, Jonathan Cameron, Joan Lasenby. *International workshop on mathematics mechanization, 2004*
- [Geometric algebra applications vol. I: Computer vision, graphics and neurocomputing](https://scholar.google.com/scholar?q=Geometric+algebra+applications+vol.+I%3A+Computer+vision%2C+graphics+and+neurocomputing). Eduardo Bayro-Corrochano. *Springer, 2018*
- [Cga-posenet: Camera pose regression via a 1d-up approach to conformal geometric algebra](https://arxiv.org/abs/2302.05211). Alberto Pepe, Joan Lasenby. *arXiv preprint, 2023* `CGA`
- [An interactive indoor 3D reconstruction method based on conformal geometry algebra](https://scholar.google.com/scholar?q=An+interactive+indoor+3D+reconstruction+method+based+on+conformal+geometry+algebra). Niantao Liu, Bingxian Lin, Linwang Yuan et al. *Advances in Applied Clifford Algebras, 2018*
- [Clifford geometric algebra-based approach for 3D modeling of agricultural images acquired by UAVs](https://scholar.google.com/scholar?q=Clifford+geometric+algebra-based+approach+for+3D+modeling+of+agricultural+images+acquired+by+UAVs). Prince Waqas Khan, Yung-Cheol Byun, Muhammad Ahsan Latif. *IEEE Access, 2020*
- [Course notes geometric algebra for computer graphics, SIGGRAPH 2019](https://scholar.google.com/scholar?q=Course+notes+geometric+algebra+for+computer+graphics%2C+SIGGRAPH+2019). Charles G Gunn. *ACM SIGGRAPH, 2019*
- [Understanding geometric algebra: Hamilton, Grassmann, and Clifford for computer vision and graphics](https://scholar.google.com/scholar?q=Understanding+geometric+algebra%3A+Hamilton%2C+Grassmann%2C+and+Clifford+for+computer+vision+and+graphics). Kenichi Kanatani. *CRC Press, 2015* `CGA`
- [Modeling 3D geometry in the Clifford algebra R (4, 4)](https://scholar.google.com/scholar?q=Modeling+3D+geometry+in+the+Clifford+algebra+R+%284%2C+4%29). Juan Du, Ron Goldman, Stephen Mann. *Advances in Applied Clifford Algebras, 2017* `CGA`
- [Geometric Inductive Priors in Diffusion-Based Optical Flow Estimation](https://scholar.google.com/scholar?q=Geometric+Inductive+Priors+in+Diffusion-Based+Optical+Flow+Estimation). **GA-DDVM** Alberto Pepe, Paulo dos Santos Mendonca, Joan Lasenby. *Proceedings of the IEEE/CVF International Conference on Computer Vision Workshops, 2025*
- [CliffordNet: All You Need is Geometric Algebra](https://arxiv.org/abs/2601.06793). **CliffordNet** Zhongping Ji. *arXiv preprint, 2026*
- [A Geometric Algebra-Based Model for Enhanced Hyperspectral Anomaly Detection](https://scholar.google.com/scholar?q=A+Geometric+Algebra-Based+Model+for+Enhanced+Hyperspectral+Anomaly+Detection). Yilin Liu, Yong Luo, Rui Wang et al. *IEEE Transactions on Geoscience and Remote Sensing, 2025*
- [Rga-cnns: Convolutional neural networks based on reduced geometric algebra](https://scholar.google.com/scholar?q=Rga-cnns%3A+Convolutional+neural+networks+based+on+reduced+geometric+algebra). **RGA-CNNs** Rui Wang, Miaomiao Shen, Xiangyang Wang et al. *Sci. China Inf. Sci, 2021*

### V-B Computational Biology and Chemistry

- [Clifford Group Equivariant Diffusion Models for 3D Molecular Generation](https://scholar.google.com/scholar?q=Clifford+Group+Equivariant+Diffusion+Models+for+3D+Molecular+Generation). **CDM** Cong Liu, Sharvaree Vadgama, David Ruhe et al. *ICLR 2025 Workshop on Frontiers in Probabilistic Inference: Learning meets Sampling, 2025*
- [Euclidean, projective, conformal: Choosing a geometric algebra for equivariant transformers](https://scholar.google.com/scholar?q=Euclidean%2C+projective%2C+conformal%3A+Choosing+a+geometric+algebra+for+equivariant+transformers). **C-GATr, iP-/C-GATr** Pim De Haan, Taco Cohen, Johann Brehmer. *International Conference on Artificial Intelligence and Statistics, 2024* `EGA` `PGA` `CGA`
- [Clifford group equivariant neural network layers for protein structure prediction](https://scholar.google.com/scholar?q=Clifford+group+equivariant+neural+network+layers+for+protein+structure+prediction). Alberto Pepe, Sven Buchholz, Joan Lasenby. *Northern Lights Deep Learning Conference, 2024* `EGA`
- [Multivector neurons: Better and faster o (n)-equivariant clifford graph neural networks](https://arxiv.org/abs/2406.04052). **MVN / MVP, Clifford-EGNNs** Cong Liu, David Ruhe, Patrick Forré. *arXiv preprint, 2024* `Clifford`
- [Geometric algebra transformers for large 3d meshes via cross-attention](https://scholar.google.com/scholar?q=Geometric+algebra+transformers+for+large+3d+meshes+via+cross-attention). **LaB-GATr++, LaB-GATr** Julian Suk, Pim De Haan, Baris Imre et al. *ICML 2024 Workshop on Geometry-grounded Representation Learning and Generative Modeling, 2024* `PGA`
- [Geometric algebra attention networks for small point clouds](https://arxiv.org/abs/2110.02393). **GAAN** Matthew Spellings. *arXiv preprint, 2021*
- [Geometric algebra generation of molecular surfaces](https://scholar.google.com/scholar?q=Geometric+algebra+generation+of+molecular+surfaces). Azzam Alfarraj, Guo-Wei Wei. *Journal of the Royal Society Interface, 2022*
- [Geometric deep learning for local growth prediction on abdominal aortic aneurysm surfaces](https://scholar.google.com/scholar?q=Geometric+deep+learning+for+local+growth+prediction+on+abdominal+aortic+aneurysm+surfaces). **AAA model** Dieuwertje Alblas, Patryk Rygiel, Julian Suk et al. *Artificial Intelligence in Medicine, 2026* `PGA`
- [Mesh neural networks for SE (3)-equivariant hemodynamics estimation on the artery wall](https://scholar.google.com/scholar?q=Mesh+neural+networks+for+SE+%283%29-equivariant+hemodynamics+estimation+on+the+artery+wall). Julian Suk, Pim de Haan, Phillip Lippe et al. *Computers in biology and medicine, 2024*
- [When Does Equivariance Help? Canonical Alignment in Neural Fluid Surrogates](https://arxiv.org/abs/2605.18816). **AB-GATr** Patryk Rygiel, Julian Suk, Kak Khee Yeung et al. *arXiv preprint, 2026* `PGA`
- [Enhanced Multiclass Brain Tumor Detection in MRI Using Similarity-Navigated Graph Neural Networks with Banyan Tree Growth Optimization](https://doi.org/10.1109/ICUIS64676.2024.10866799). **SNGNN-BTGO** Babu Rao K, Pallavi Singh, Gargi Shankar Verma et al. *2024 4th International Conference on Ubiquitous Computing and Intelligent Information Systems (ICUIS), 2024*
- [Machine learning of accurate energy-conserving molecular force fields](https://scholar.google.com/scholar?q=Machine+learning+of+accurate+energy-conserving+molecular+force+fields). Stefan Chmiela, Alexandre Tkatchenko, Huziel E Sauceda et al. *Science advances, 2017*
- [Higher-order graph convolutional network with flower-petals laplacians on simplicial complexes](https://scholar.google.com/scholar?q=Higher-order+graph+convolutional+network+with+flower-petals+laplacians+on+simplicial+complexes). Yiming Huang, Yujie Zeng, Qiang Wu et al. *Proceedings of the AAAI conference on artificial intelligence, 2024*
- [Design and Evaluation of a Geometric Algebra-Based Graph Neural Network for Molecular Property Prediction](https://scholar.google.com/scholar?q=Design+and+Evaluation+of+a+Geometric+Algebra-Based+Graph+Neural+Network+for+Molecular+Property+Prediction). **GA-GNN** Kasper Helverskov Petersen, Mikkel N Schmidt. *Northern Lights Deep Learning Conference 2026, 2026*
- [CliffordIP: Clifford algebra equivariant interatomic potentials for heterogeneous catalysis](https://scholar.google.com/scholar?q=CliffordIP%3A+Clifford+algebra+equivariant+interatomic+potentials+for+heterogeneous+catalysis). **CliffordIP** Can Polat, Erchin Serpedin, Mustafa Kurban et al. *Npj Computational Materials, 2026* `EGA`
- [Multivector differential calculus](https://scholar.google.com/scholar?q=Multivector+differential+calculus). Eckhard MS Hitzer. *Advances in Applied Clifford Algebras, 2002*
- [Geometric Algebra Models of Proteins for Three-Dimensional Structure Prediction: A Detailed Analysis](https://scholar.google.com/scholar?q=Geometric+Algebra+Models+of+Proteins+for+Three-Dimensional+Structure+Prediction%3A+A+Detailed+Analysis). Alberto Pepe, Joan Lasenby, Pablo Chacon. *Advanced Computational Applications of Geometric Algebra, 2024* `CGA`
- [Simplifying and Generalising Equivariant Geometric Algebra Networks](https://staff.science.uva.nl/l.dorst/AGACSE2024/programme/Yao.pdf). **CGA Transformer** Christian Hockey, Yuxin Yao, Joan Lasenby. *Proceedings of the Applied Geometric Algebras in Computer Science and Engineering (AGACSE 2024), 2024* `CGA`
- [Perspective on the Martini model](https://scholar.google.com/scholar?q=Perspective+on+the+Martini+model). Siewert J Marrink, D Peter Tieleman. *Chemical Society Reviews, 2013*
- [Geometric Algebra Approaches to Protein-Protein Docking](https://users.math.msu.edu/users/weig/Docking_poster_icerm2023.pdf). Azzam Alfarraj, Guo-Wei Wei. *Poster presented at ICERM 2023, Providence, Rhode Island, 2023*
- [Protein-protein docking: From interaction to interactome](https://scholar.google.com/scholar?q=Protein-protein+docking%3A+From+interaction+to+interactome). Ilya A Vakser. *Biophysical journal, 2014*
- [Geometric Algebra-Enhanced Bayesian Flow Network for RNA Inverse Design](https://scholar.google.com/scholar?q=Geometric+Algebra-Enhanced+Bayesian+Flow+Network+for+RNA+Inverse+Design). **RBFN** Rubo Wang, Xingyu Gao, Peilin Zhao. *The Thirty-ninth Annual Conference on Neural Information Processing Systems, 2025*
- [Grnade: A geometric deep learning pipeline for 3d rna inverse design](https://scholar.google.com/scholar?q=Grnade%3A+A+geometric+deep+learning+pipeline+for+3d+rna+inverse+design). **gRNAde** Chaitanya K Joshi, Pietro Lio. *RNA Design: Methods and Protocols, 2024*
- [Macromolecular modeling with rosetta](https://scholar.google.com/scholar?q=Macromolecular+modeling+with+rosetta). Rhiju Das, David Baker. *Annu. Rev. Biochem., 2008*

### V-C Physics-Informed Machine Learning

- [Fengbo: a Clifford Neural Operator pipeline for 3D PDEs in Computational Fluid Dynamics](https://scholar.google.com/scholar?q=Fengbo%3A+a+Clifford+Neural+Operator+pipeline+for+3D+PDEs+in+Computational+Fluid+Dynamics). **Fengbo** Alberto Pepe, Mattia Montanari, Joan Lasenby. *The Thirteenth International Conference on Learning Representations, 2025*
- [STAResNet: a Network in Spacetime Algebra to solve Maxwell's PDEs](https://arxiv.org/abs/2408.13619). **STAResNet** Alberto Pepe, Sven Buchholz, Joan Lasenby. *arXiv preprint, 2024* `STA`
- [Physics-informed machine learning](https://scholar.google.com/scholar?q=Physics-informed+machine+learning). George Em Karniadakis, Ioannis G Kevrekidis, Lu Lu et al. *Nature Reviews Physics, 2021*
- [Physics-informed machine learning: A survey on problems, methods and applications](https://arxiv.org/abs/2211.08064). Zhongkai Hao, Songming Liu, Yichi Zhang et al. *arXiv preprint, 2022*

### V-D Robotics

- [Closed-form solutions for the inverse kinematics of serial robots using conformal geometric algebra](https://scholar.google.com/scholar?q=Closed-form+solutions+for+the+inverse+kinematics+of+serial+robots+using+conformal+geometric+algebra). Isiah Zaplana, Hugo Hadfield, Joan Lasenby. *Mechanism and Machine Theory, 2022* `CGA`
- [Solution of inverse kinematics for 6R robot manipulators with offset wrist based on geometric algebra](https://scholar.google.com/scholar?q=Solution+of+inverse+kinematics+for+6R+robot+manipulators+with+offset+wrist+based+on+geometric+algebra). Zhongtao Fu, Wenyu Yang, Zhen Yang. *Journal of mechanisms and robotics, 2013* `CGA`
- [A Conformal Geometric Algebra Method for Inverse Kinematics Analysis of 6R Robotic Arm](https://scholar.google.com/scholar?q=A+Conformal+Geometric+Algebra+Method+for+Inverse+Kinematics+Analysis+of+6R+Robotic+Arm). Dongyang Zhu, Zhonghai Zhang, Duanling Li. *Journal of Mechanisms and Robotics, 2025* `CGA`
- [Geometric Algebra for Optimal Control with Applications in Manipulation Tasks](https://doi.org/10.1109/TRO.2023.3277282). Tobias Löw, Sylvain Calinon. *IEEE Transactions on Robotics, 2023*
- [Modeling and pose control of robotic manipulators and legs using conformal geometric algebra](https://scholar.google.com/scholar?q=Modeling+and+pose+control+of+robotic+manipulators+and+legs+using+conformal+geometric+algebra). Oscar Carbajal-Espinosa, Luis González-Jiménez, Jose Oviedo-Barriga et al. *Computación y Sistemas, 2015*
- [Efficient Equivariant Transformer for Self-Driving Agent Modeling](https://scholar.google.com/scholar?q=Efficient+Equivariant+Transformer+for+Self-Driving+Agent+Modeling). **DriveGATr** Scott Xu, Dian Chen, Kelvin Wong et al. *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition, 2026* `PGA`

### V-E Other Notable Applications

- [Geometric algebra graph neural network for cross-domain few-shot classification](https://scholar.google.com/scholar?q=Geometric+algebra+graph+neural+network+for+cross-domain+few-shot+classification). Qifan Liu, Wenming Cao. *Applied Intelligence, 2022*
- [Geometric algebra based recurrent neural network for multi-dimensional time-series prediction](https://scholar.google.com/scholar?q=Geometric+algebra+based+recurrent+neural+network+for+multi-dimensional+time-series+prediction). **GA-LSTNet** Yanping Li, Yi Wang, Yue Wang et al. *Frontiers in Computational Neuroscience, 2022*
- [PHNNs: Lightweight neural networks via parameterized hypercomplex convolutions](https://scholar.google.com/scholar?q=PHNNs%3A+Lightweight+neural+networks+via+parameterized+hypercomplex+convolutions). **PHNN** Eleonora Grassucci, Aston Zhang, Danilo Comminiello. *IEEE Transactions on Neural Networks and Learning Systems, 2022*
- [Differentiable and Learnable Wireless Simulation with Geometric Transformers](https://scholar.google.com/scholar?q=Differentiable+and+Learnable+Wireless+Simulation+with+Geometric+Transformers). **Wi-GATr** Thomas Hehn, Markus Peschl, Tribhuvanesh Orekondy et al. *The Thirteenth International Conference on Learning Representations, 2025*
- [Representing words in a geometric algebra](https://scholar.google.com/scholar?q=Representing+words+in+a+geometric+algebra). Arjun Mani. *Princeton University, 2023*
- [Randomized geometric algebra methods for convex neural networks](https://arxiv.org/abs/2406.02806). Yifei Wang, Sungyoon Kim, Paul Chu et al. *arXiv preprint, 2024*
- [Embedded implementation of the hypersphere neural network for energy consumption monitoring](https://scholar.google.com/scholar?q=Embedded+implementation+of+the+hypersphere+neural+network+for+energy+consumption+monitoring). Jesús Alfredo García-Limón, Juan Pablo Serrano Rubio, Rafael Herrera-Guzmán et al. *Mexican International Conference on Artificial Intelligence, 2022*

## VI. Empirical evidence

*Survey section: Empirical Studies.*

### VI-A What transfers across the literature

- [Clifford group equivariant simplicial message passing networks](https://scholar.google.com/scholar?q=Clifford+group+equivariant+simplicial+message+passing+networks). **CSMPN** Cong Liu, David Ruhe, Floor Eijkelboom et al. *The Twelfth International Conference on Learning Representations, 2024* `Clifford`

### VI-B Comparative evidence by application family

- [Virtues and Vices of Equivariant Transformers](https://arxiv.org/abs/2608.02735). Luigi Favaro, Tilman Plehn, Huilin Qu et al. *arXiv preprint, 2026* `STA`
- [Encoding physics at the precision frontier](https://scholar.google.com/scholar?q=Encoding+physics+at+the+precision+frontier). Victor Bresó-Pla, Kevin Greif, Vinicius Mikuni et al. *Physical Review D, 2026* `STA`

### VI-D Failure modes and limitations

- [Geometric Algebra Meets Cartesian Tensors: Higher-Order Equivariance for Interatomic Potentials](https://arxiv.org/abs/2606.29584). Can Polat, Erchin Serpedin, Mustafa Kurban et al. *arXiv preprint, 2026* `EGA`
- [Economical Jet Taggers – Equivariant, Slim, and Quantized](https://arxiv.org/abs/2512.17011). Antoine Petitjean, Tilman Plehn, Jonas Spinner et al. *arXiv preprint, 2025* `STA`

## VII. Software

*Survey section: Software Libraries and Implementation.*

- [Lgatr: Lorentz-Equivariant Geometric Algebra Transformer](https://github.com/heidelberg-hepml/lgatr). **lgatr** Jonas Spinner, Víctor Bresó-Pla. *GitHub* `STA`

### VII-A ML Libraries: PyTorch, TensorFlow, and JAX

- [PyTorch Geometric Algebra](https://github.com/falesiani/torch_ga). **torch_ga** Francesco Alesiani. *Github*
- [TensorFlow Geometric Algebra](https://doi.org/10.5281/zenodo.3902404). **tfga** Robin Kahlow. *Zenodo*
- [Numga](https://github.com/EelcoHoogendoorn/numga). **numga** Eelco Hoogendoorn. *GitHub*

### VII-B General Purpose Libraries

- [Pygae/clifford](https://doi.org/10.5281/zenodo.1453978). **clifford** Hugo Hadfield, Eric Wieser, Alex Arsenovic et al. *Zenodo*
- [The Willing Kingdon Clifford Algebra Library](https://arxiv.org/abs/2503.10451). **Kingdon** Martin Roelfs. *Online, 2025*
- [Ganja.js](https://doi.org/10.5281/ZENODO.3635774). **ganja.js** Steven De Keninck. *Zenodo. https://doi.org/10.5281/ZENODO.3635774, 2020*
- [Versor: Spatial Computing with Conformal Geometric Algebra](http://versor.mat.ucsb.edu). **Versor (C++)** Pablo Colapinto. *Thesis, University of California at Santa Barbara, 2011* `EGA` `PGA` `CGA` `STA`
- [Exploring lazy evaluation and compile-time simplifications for efficient geometric algebra computations](https://doi.org/10.1007/978-3-030-74486-1_6). **GATL** Leandro A. F. Fernandes. *Systems, Patterns and Data Engineering with Geometric Calculi, 2021* [[Code]](https://github.com/laffernandes/gatl)
- [Klein](https://github.com/jeremyong/Klein). **Klein** Jeremy Yong. *GitHub* `PGA`
- [Gaalop](https://github.com/CallForSanity/Gaalop). **Gaalop** Dietmar Hildenbrand. *GitHub*
- [Garamon: A Geometric Algebra Library Generator](https://doi.org/10.1007/s00006-019-0987-7). **Garamon** Stéphane Breuils, Vincent Nozick, Laurent Fuchs. *Advances in Applied Clifford Algebras, 2019*
- [TbGAL: a tensor-based library for geometric algebra](https://scholar.google.com/scholar?q=TbGAL%3A+a+tensor-based+library+for+geometric+algebra). **TbGAL** Eduardo Vera Sousa, Leandro AF Fernandes. *Advances in Applied Clifford Algebras, 2020*
- [Gaalop—high performance parallel computing based on conformal geometric algebra](https://scholar.google.com/scholar?q=Gaalop%E2%80%94high+performance+parallel+computing+based+on+conformal+geometric+algebra). Dietmar Hildenbrand, Joachim Pitt, Andreas Koch. *Geometric Algebra Computing: in Engineering and Computer Science, 2010*
- [Exploring lazy evaluation and compile-time simplifications for efficient geometric algebra computations](https://scholar.google.com/scholar?q=Exploring+lazy+evaluation+and+compile-time+simplifications+for+efficient+geometric+algebra+computations). Leandro AF Fernandes. *Systems, Patterns and Data Engineering with Geometric Calculi, 2021*

### VII-C Challenges and Future Needs for Software Support

- [GluCat](https://github.com/penguian/glucat). **GluCat** Paul Leopardi. *GitHub*

<!-- END AUTO-GENERATED -->

## Contributing

Pull requests are welcome, especially for new GA-native networks (models whose learnable forward map acts directly on multivectors).

1. Add an entry to [`data/community.json`](data/community.json):

   ```json
   {
     "title": "Paper title",
     "authors": ["First Author", "Second Author"],
     "year": 2026,
     "venue": "Conference or journal",
     "links": [{"kind": "arXiv", "url": "https://arxiv.org/abs/XXXX.XXXXX"},
               {"kind": "Code", "url": "https://github.com/..."}],
     "algebras": ["PGA"],
     "names": ["ModelName"],
     "note": "One sentence on what is geometric-algebraic about it."
   }
   ```

   `algebras` takes any of `EGA`, `PGA`, `CGA`, `STA`, `General`.
2. Run `python3 scripts/build_readme.py` to refresh this README.
3. Open a pull request. Community entries show up on the project page with a "new" mark until they are folded into the next survey revision.

To correct a survey entry, please open an issue rather than editing `data/papers.json`, which is regenerated from the survey sources.

## Rebuilding the data

The site is static (HTML, CSS and vanilla JavaScript; no build step). Survey data is generated from the paper's LaTeX sources with the Python standard library:

```bash
python3 scripts/build_data.py --survey /path/to/survey-latex   # writes data/papers.json, tables.json, meta.json
python3 scripts/build_readme.py                                 # rewrites README.md
python3 -m http.server                                          # preview at http://localhost:8000
```

`build_data.py` parses `main.bib`, scans `sec/*.tex` for every `\cite` (recording the section, subsection and sentence), extracts the survey tables and figure captions, and reads `main.bbl` so reference numbers match the PDF. Algebra tags and a few model names are curated in the script with a pointer to the supporting section or table.

Deployment: GitHub Pages serves the repository root from the `main` branch (*Settings → Pages → Deploy from a branch*), so every push to `main` updates the site.

## Citation

```bibtex
@article{zhong2026geometric,
  title   = {Geometric Algebra for Neural Networks: A Survey},
  author  = {Zhong, Tao and Fong, Kaison and Wang, Keqin and Allen-Blanchette, Christine},
  journal = {arXiv preprint arXiv:TBD},
  year    = {2026}
}
```

## License

Code (site and scripts): MIT, see [LICENSE](LICENSE). The survey text excerpts, tables and figures are © the authors and are reproduced here for reference.

Maintained by the [CAB Lab](https://cablab.scholar.princeton.edu/) at Princeton University.
