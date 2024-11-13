---
# Documentation: https://wowchemy.com/docs/managing-content/

title: Particle-resolved simulations of four-way coupled, polydispersed, particle-laden flows
subtitle: ''
summary: ''
authors:
- admin
- Edward Biegert
- Bernhard Vowinckel
- Thomas Köllner
- Eckart Meiburg
- S. Balachandar
- Craig S. Criddle
- Oliver B. Fringer
tags: []
categories: []
date: '2022-06-22'
lastmod: 2022-03-07T14:08:38-08:00
featured: true
draft: false


# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ''
  focal_point: ''
  preview_only: false
url_pdf: ""
# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: [prs_ww_optim]
publishDate: '2022-06-22T22:08:38.202742Z'
publication_types:
- '2'
doi: 10.1002/fld.5128
abstract: 'We present a collocated-grid method for Direct Numerical Simulations of polydisperse particles submerged in a viscous fluid. The fluid-particle forces are coupled with the Immersed Boundary Method (IBM) while the particle-particle forces are modeled with a combination of contact and lubrication models. Our method is modified from the staggered-grid IBM of previous authors to a collocated-grid IBM by adapting the fluid and particle solvers. The method is shown to be second-order accurate in space and scales well on high-performance parallel computing platforms. It has been validated against various cases and is able to reproduce experimental results. Tuning parameters have been thoroughly calibrated to ensure method accuracy. Finally, we demonstrate the capability of the method to simulate a fluidized bed and reproduce the power law relationship between the inflow velocity and the porosity.'
publication: '*International Journal for Numerical Methods in Fluids*, 94, 1810-1840'
links:
- name: arXiv
  url: https://arxiv.org/abs/2109.03972
---
