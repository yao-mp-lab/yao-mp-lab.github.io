---
title: 'A conservative micro-continuum-cellular automaton method for multispecies biofilm dynamics in complex flows'
authors:
  - Soyoung Kim
  - admin
date: '2026-10-01'
publication_types:
  - 'article'
publication: '*arXiv [physics.flu-dyn]*'
abstract: >-
  We develop a conservative micro-continuum-cellular automaton method for simulating multispecies biofilm dynamics in complex flows. The proposed method couples the Darcy-Brinkman-Stokes equations, reactive transport, suspended bacteria, and biofilm dynamics with a two-stage cellular automaton algorithm for biofilm redistribution and interface evolution. While treating biofilms as evolving porous media, we ensure conservative redistribution of multispecies biomass across partially occupied cells. Donor and recipient cell volumes are explicitly accounted for to conserve biomass and preserve species composition on non-uniform meshes. The proposed method is assessed against diffusion-dominated benchmark cases, including single-species fingering and multispecies stratification, and is further evaluated through a mesh-convergence study for flow and growth over a rectangular bump. The framework is then applied to counter-diffusional biofilms in a membrane-aerated biofilm reactor as a canonical example. The results demonstrate that the framework captures the expected biofilm morphology and stratification in systems involving coupled flow, substrate transport, and biofilm dynamics. The proposed method provides a flexible computational approach for simulating multispecies biofilm dynamics in complex flows and geometries.
doi: '10.48550/arXiv.2610.01565'
featured: false
draft: false
links:
  - name: arXiv
    url: https://arxiv.org/abs/2610.01565
---

{{< publication-figure publication="/publication/kim-2026-biofilm-dynamics" src="figures/Figure1.png" alt="Biofilm processes under fluid flow and their representation in computational cells" caption="Biofilm attachment, growth, decay and detachment under fluid flow, with a computational representation of partially occupied cells." >}}

{{< publication-figure publication="/publication/kim-2026-biofilm-dynamics" src="figures/Figure11.png" alt="Successive stages of multispecies biofilm growth under two substrate utilization rates" caption="Multispecies biofilm growth under two substrate utilization rates. Successive stages show changes in biofilm shape and species composition." >}}
