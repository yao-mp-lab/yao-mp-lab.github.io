---
# Leave the homepage title empty to use the site title
title:
date: 2024-11-12
type: landing

sections:
  - block: hero
    content:
      title: |
        MSCE Lab
      image:
        filename: welcome.jpg
      text: |
        At the MSCE Lab, we study how flow, transport, and reactions shape environmental and energy systems. We combine mathematical modeling, numerical simulations, and experiments to connect small-scale processes with system performance.

        Our work focuses on biofilms, water treatment, resource recovery, and energy storage. Computational methods are developed alongside experiments to understand these systems and guide their design. We aim to bring fundamental insights into practical engineering applications, in a supportive research environment that welcomes students from diverse backgrounds.

        {{% cta cta_link="./join/" cta_text="Join us →" %}}

  - block: markdown
    content:
      title: |
        Funded Research Opportunities
      subtitle:
      text: |
        {{< recruitment >}}
    # design:
    #   columns: '1'

  - block: collection
    content:
      title: Latest News
      # page_type: news
      subtitle:
      text:
      count: 4
      filters:
        author: ''
        category: ''
        exclude_featured: false
        folders:
          - news
        publication_type: ''
        tag: ''
      offset: 0
      order: desc
      page_type: news
    design:
      view: compact
      columns: '1'
  
  # - block: markdown
  #   content:
  #     title:
  #     subtitle: ''
  #     text:
  #   design:
  #     columns: '1'
  #     background:
  #       image: 
  #         filename: coders.jpg
  #         filters:
  #           brightness: 1
  #         parallax: false
  #         position: center
  #         size: cover
  #         text_color_light: true
  #     spacing:
  #       padding: ['20px', '0', '20px', '0']
  #     css_class: fullscreen

  # - block: collection
  #   content:
  #     title: Latest Preprints
  #     text: ""
  #     count: 5
  #     filters:
  #       folders:
  #         - publication
  #       publication_type: 'article'
  #   design:
  #     view: citation
  #     columns: '1'

  # - block: markdown
  #   content:
  #     title:
  #     subtitle:
  #     text: |
  #       {{% cta cta_link="./people/" cta_text="Meet the team →" %}}
  #   design:
  #     columns: '1'
---
