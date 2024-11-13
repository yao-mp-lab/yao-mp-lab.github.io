---
# Documentation: https://wowchemy.com/docs/managing-content/

title: Particle resolved simulations of particle-flow interactions in fluidized beds to optimize design and operation of domestic wastewater treatment systems
subtitle: ''
summary: ''
authors:
- admin
tags: []
categories: []
date: '2021-10-06'
lastmod: 2022-10-06T14:08:38-08:00
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
- '7'
doi: 
abstract: 'The activated sludge (AS) process for domestic wastewater treatment is an energy-intensive process due to the aeration demand from aerobic microorganisms. Recently, the Staged Anaerobic Fluidized-bed Membrane Bioreactor (SAF-MBR), which consists of an anaerobic fluidized-bed reactor (AFBR) and a particle-sparged membrane bioreactor (P-MBR), has been developed to reduce the energy intensity of domestic wastewater treatment by using anaerobic microorganisms that convert organics into methane in the absence of aeration. While this has the potential to transform domestic wastewater treatment into an energy positive process, the moving particles in the SAF-MBR induce hydrodynamic processes related to flow-particle and particle-particle interactions that are poorly understood. These processes are critical for biological treatment because they enhance mass transfer and mixing in the AFBR and can prevent membrane damage and fouling by optimizing effective collisions (i.e., scouring) in the P-MBR. With a better understanding of hydrodynamics, better design and operational practices can be developed.

A collocated particle resolved simulation (PRS) using the immersed boundary method (IBM) is developed to accurately quantify the fluid-particle and particle-particle interactions in a fluidized-bed reactor. Simulations of particle fluidization/suspension are then used to study the effect of particle Reynolds number, Archimedes number and bidispersivity, or a fluidized bed with two particle sizes. The simulated conditions are relevant to fluidized-bed reactors used in wastewater treatment. 

The particle Reynolds number, which is essentially a nondimensional flow rate, is a critical operational parameter that controls the bed expansion which ultimately affects both treatment and membrane fouling control efficiency. Various studies have shown that optimal performance of wastewater treatment typically occurs at an intermediate particle Reynolds number or bed expansion, yet these results have not been verified quantitatively. Using results from our simulations, we identified two different flow regimes as a function of the particle Reynolds number. For low particle Reynolds numbers, the particle dynamics are dominated by interparticle collisions, while for high particle Reynolds numbers, the particle dynamics are dominated by hydrodynamic effects. This implies an intermediate particle Reynolds number regime at which the combined effect of flow and collisions is optimal and both mixing in the AFBR and membrane scouring in the P-MBR are expected to be maximized. The results also suggest the need to develop a biofilm detachment model that depends on particle collisions at low particle Reynolds numbers and one that depends on hydrodynamically-induced shear stresses at high particle Reynolds numbers.

While the Reynolds number is a critical parameter for optimal fluidized-bed operation, design of fluidized beds depends critically on the Archimedes number, which is a measure of the relative effects of particle buoyancy to viscosity. Previous studies suggest particles with relatively low Archimedes number (100 - 1000) should be used to maximize mass transfer. However, our results suggest that particles with low Archimedes number tend to form clusters due to ineffective collisions, likely resulting in flow short-circuiting due to clusters in the AFBR and reduced membrane scouring due to ineffective collisions in the P-MBR. Therefore, fluidized beds should not be operated at Archimedes numbers smaller than roughly 1000.

In industrial applications, fluidized beds typically contain particles of different sizes that tend to segregate into layers in which the particle size increases moving upward. Our simulations with two particle sizes show that the two segregated layers behave identically as they would in their corresponding monodispersed fluidized bed layers. However, the transition region between the two segregated layers cannot be described as a simple average between the two segregated layers. For example, the interaction between large and small particles in the transition region leads to particle fluctuations that exceed those in the upper layer at high particle Reynolds numbers. 

With the insights gained from simulating the hydrodynamics in fluidized beds, operating the SAF-MBR at intermediate particle Reynolds numbers in which momentum transfer is the most efficient is likely to lead to optimized biological reactions in the AFBR and maximized membrane scouring effects in the P-MBR. To avoid particle clustering that leads to both flow short-circuiting and ineffective membrane scouring, the results suggest that particles with Archimedes numbers greater than 1000 are recommended. However, owing to larger energy costs associated with fluidizing beds with high Archimedes number particles, the SAF-MBR should be operated at intermediate Archimedes numbers of ~1000 - 5000 to ensure membrane scour while avoiding higher pumping costs.  For a SAF-MBR with non-uniform particle size distributions, the bed expansion is not strongly correlated to the volume fraction or porosity of mean or small particle sizes because most of the expansion may be due to the smaller particles. To overcome this, reactor design and operation should be based on either the largest or each dominant particle size.

In the future, experimental validation of the simulation results is recommended. Due to limitations with computational methods, biological reactions are not included in the present simulations. To quantify mass transfer efficiency, new computational methods should be developed. Studies of other design and operation parameters such as particle sphericity and nozzle design are needed. Particle sphericity affects the particle dynamics such as mixing, mass transfer and fluidization while turbulence generated from nozzles is likely to cause membrane damage. '
publication: '*Stanford University*'
links:
- name: Proquest
  url: https://search.proquest.com/openview/b84e516e78c97350a5c4554f15a8d2d1/1.pdf?pq-origsite=gscholar&cbl=18750&diss=y
---
