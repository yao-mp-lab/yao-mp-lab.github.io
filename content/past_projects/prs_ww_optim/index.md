---
title: "Energy-positive wastewater treatment systems"
date: 2021-09-23T23:15:16.198Z
math: true
highlight: true
image:
  placement: 1
  caption: '' 
  focal_point: "Center"
  preview_only: true
tags: 
  - Water/Wastewater
  - Reactor Design
categories: ["Simulations"]
---
The Staged Anaerobic Fluidized-bed Membrane Bioreactor (SAF-MBR) is a promising technology for reducing the energy intensity of domestic wastewater treatment by using anaerobic microorganisms to convert organics into methane in the absence of aeration. However, the hydrodynamic processes related to flow-particle and particle-particle interactions induced by the moving particles in the SAF-MBR are poorly understood, which hinders its design and operational practices.

{{< video src="videos/p0200_10_20x.mp4" controls="yes" >}}

To address this issue, we have developed a collocated particle resolved simulation (PRS) using the immersed boundary method (IBM) to accurately quantify the fluid-particle and particle-particle interactions in a fluidized-bed reactor. Through our simulations, we have investigated the effect of particle Reynolds number and found that an intermediate particle Reynolds number regime exists where the combined effect of flow and collisions is optimal, maximizing both mixing in the AFBR and membrane scouring in the P-MBR.

{{< figure src="./figures/Flow_Effect.png" caption="Hypothetical impacts of upflow velocity and porosity on fluidized-bed reactor modeling, design and operation." numbered="true" >}}

We have also determined that the design of fluidized beds critically depends on the Archimedes number, which combines the effect of particle and fluid properties. Our simulation results show that particles with an Archimedes number greater than roughly 1000 should be used to avoid flow short-circuiting due to clusters in the AFBR and reduced membrane scouring due to ineffective collisions in the P-MBR.

{{< figure src="./figures/Archimedes_Effect.png" caption="Hypothetical impacts of particle properties and Archimedes number on fluidized-bed reactor modeling, design and operation." numbered="true" >}}

Additionally, our simulations reveal that segregated layers of particles behave identically to their corresponding monodispersed fluidized bed layers, but the transition region between the two segregated layers cannot be described as a simple superposition of the two segregated layers. Overall, our findings provide valuable insights into the hydrodynamics of the SAF-MBR and can help improve its design and operation for more efficient and effective wastewater treatment.


<!-- Recently, the Staged Anaerobic Fluidized-bed Membrane Bioreactor (SAF-MBR), which consists of an anaerobic fluidized-bed reactor
(AFBR) and a particle-sparged membrane bioreactor (P-MBR), has been developed to reduce the energy intensity of domestic wastewater
treatment by using anaerobic microorganisms that convert organics into methane in the absence of aeration. While this has the
potential to transform domestic wastewater treatment into an energy positive process, the moving particles in the SAF-MBR induce
hydrodynamic processes related to flow-particle and particle-particle interactions that are poorly understood. With a better
understanding of hydrodynamics, better design and operational practices can be developed. 

{{< video src="videos/p0200_10_20x.mp4" controls="yes" >}}

To overcome this, a collocated particle resolved simulation (PRS) using the immersed boundary method (IBM) is developed to
accurately quantify the fluid-particle and particle-particle interactions in a fluidized-bed reactor.We first investigate the effect
of particle Reynolds number which is essentially a nondimensional flow rate that controls the bed expansion. Results imply the
existence of an intermediate particle Reynolds number regime at which the combined effect of flow and collisions is optimal and both
mixing in the AFBR and membrane scouring in the P-MBR are expected to be maximized. 

{{< figure src="./figures/Flow_Effect.png" caption="Hypothetical impacts of upflow velocity and porosity on fluidized-bed reactor modeling, design and operation." numbered="true" >}}

While the Reynolds number is a critical parameter, the design of fluidized beds depends critically on the Archimedes number that
combines the effect of particle and fluid properties. Simulation results reveal that particles with Archimedes number greater than
roughly 1000 should be used to avoid flow short-circuiting due to clusters in the AFBR and reduced membrane scouring due to
ineffective collisions in the P-MBR. In industrial applications, fluidized beds typically contain particles of different sizes that
tend to segregate into layers in which the particle size increases moving
upward. 

{{< figure src="./figures/Archimedes_Effect.png" caption="Hypothetical impacts of particle properties and Archimedes number on fluidized-bed reactor modeling, design and operation." numbered="true" >}}

Our simulations reveal that segregated layers behave identically as they would in their corresponding monodispersed
fluidized bed layers. However, the transition region between the two segregated layers cannot be described as a simple superposition
of the two segregated layers -->