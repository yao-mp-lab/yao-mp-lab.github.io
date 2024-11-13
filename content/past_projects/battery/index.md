---
title: "Multiscale heat transfer in a battery pack"
date: 2022-03-07T23:15:16.198Z
math: true
highlight: true
image:
  placement: 1
  caption: '' 
  focal_point: "Center"
  preview_only: false
tags: 
  - Battery
  - Heat Transfer

categories: ["Simulations", "Modeling"]
#'Image credit: [**John Moeses Bauan**](https://unsplash.com/photos/OGZtQF8iC0g)'
---
Battery packs undergoing thermal runaway pose a serious safety hazard, and accurate modeling of these systems is crucial for system design and safety. However, the multiscale nature of these systems presents a significant challenge, as accurately resolving spatial and temporal scales spanning multiple orders of magnitude is computationally intensive and pushes the limits of theoretical models.

In this project, we developed a non-intrusive two-way coupled hybrid algorithm for simulating heat transfer in battery packs undergoing thermal runaway. Our hybrid algorithm combines fine-scale (cell-scale) and continuum-scale (battery pack-scale) models in the same numerical simulation to achieve predictive accuracy while keeping computational costs manageable.

We developed two methods with different orders of accuracy to enforce continuity at the coupling boundary, and derived weak
formulations of the fine-scale and upscaled governing equations for numerical implementation in FEniCS. Through our simulations, we
demonstrated that our hybrid algorithm can accurately predict the average temperature fields within errors determined by
homogenization theory.

{{< figure src="./gifs/Fine-Scale-One-Sided.gif">}}
{{< figure src="./gifs/Hybrid-Taylor-One-Sided-30.gif">}}
{{< figure src="./gifs/Hybrid-Series-One-Sided-30.gif">}}
{{< figure src="./gifs/Upscaled-Packing-One-Sided.gif" caption="Thermal runaway of a battery pack: Fine-scale, Hybrid with Taylor, Hybrid with Series, and Upscaled packing temperature." numbered="true" >}}

Furthermore, we demonstrated the computational efficiency of our hybrid algorithm against cell-scale simulations, highlighting the significant computational savings achieved without compromising the accuracy of the simulation results.

Our project presents a significant advancement in the field of battery pack modeling, providing a non-intrusive hybrid algorithm that can accurately simulate thermal runaway in these systems. Our findings have important implications for battery pack design and safety, providing a valuable tool for improving the efficiency and safety of these systems.


<!-- Accurate analytical and numerical modeling of multiscale systems is a daunting task, since the need to properly resolve spatial and temporal scales spanning multiple orders of magnitude pushes the limits of both our theoretical models as well as our computational capabilities.  Battery packs undergoing thermal runaway are one such example. While the thermal front's characteristic spatial scale may be at the scale of single cells, accurate predictions of its dynamics through the entire battery pack is critical to guide the overall system design. Classical approaches to model thermal runaway in battery packs include the use of coarse-grained macroscopic models, which describe the spatially-averaged response of the system. However, such models may become inaccurate if appropriate dynamic conditions are not met. Hybrid models that combine fine-scale (cell-scale) and continnum-scale (battery pack-scale) models in the same numerical simulation can achieve predictive accuracy while keeping computational costs in check. Here, we present a non-intrusive two-way coupled hybrid algorithm for simulating heat transfer in battery packs. 

Two methods with different orders of accuracy are developed to enforce continuity at the coupling boundary, and weak formulations of
the fine-scale and upscaled governing equations are derived for numerical implementation in FEniCS. We demonstrate that hybrid
simulations can accurately predict the average temperature fields within errors *a priori* determined by homogenization
theory. Finally, we demonstrate the computational efficiency of the hybrid algorithm against cell-scale simulations. -->