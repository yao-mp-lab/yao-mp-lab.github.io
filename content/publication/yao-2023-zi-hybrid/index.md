---
# Documentation: https://wowchemy.com/docs/managing-content/

title: 'Non-intrusive Hybrid Scheme for Multiscale Heat Transfer: Thermal Runaway in a Battery Pack'
subtitle: ''
summary: ''
authors:
- admin
- Perry Harabin
- Morad Behandish
- Ilenia Battiato
tags: []
categories: []
date: '2023-09-12'
lastmod: 2023-03-26T14:08:38-08:00
featured: true
draft: false


# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: 'featured.jpg'
  focal_point: 'Smart'
  preview_only: false
url_pdf: ""
# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: [battery]
publishDate: '2023-03-20T22:08:38.202742Z'
publication_types:
- '2'
doi: 
abstract: 'Accurate analytical and numerical modeling of multiscale systems is a daunting task. The need to properly resolve spatial and temporal scales spanning multiple orders of magnitude pushes the limits of both our theoretical models as well as our computational capabilities. Rigorous upscaling techniques enable efficient computation while bounding/tracking errors and helping to make informed cost-accuracy tradeoffs. The biggest challenges arise when the applicability conditions of upscaled models break down. Here, we present a non-intrusive two-way (iterative bottom-up top-down) coupled hybrid model, applied to thermal runaway in battery packs, that combines fine-scale and upscaled equations in the same numerical simulation to achieve predictive accuracy while limiting computational costs. First, we develop two methods with different orders of accuracy to enforce continuity at the coupling boundary. Then, we derive weak (i.e., variational) formulations of the fine-scale and upscaled governing equations for finite element (FE) discretization and numerical implementation in FEniCS. We demonstrate that hybrid simulations can accurately predict the average temperature fields within error bounds determined apriori by homogenization theory. Finally, we demonstrate the computational efficiency of the hybrid algorithm against fine-scale simulations.'

publication: '*Journal of Computational Science*, 102133'
doi: 10.1016/j.jocs.2023.102133
links:
- name: arXiv
  url: https://arxiv.org/abs/2303.11087
---
