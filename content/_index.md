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
        <br>
        MSCE ("Megascale") stands for Multiscale "Modeling Simulations, Computing and Experiments". At the MSCE lab, we are dedicated to tackle challenges
        related to water, energy, resources and infrastructure by using fundamental insights to solve practical problems related to .
        We integrate theories, modeling, simulations, and experiments to develop technologies for water treatment, resource recovery, and energy storage systems. Our ultimate goal is to
        facilitate the transition of these technologies from the laboratory to commercial and full-scale applications. We are committed to
        creating a supportive and inclusive research environment that welcomes highly motivated students from diverse backgrounds. 

        {{% cta cta_link="./join/" cta_text="Join us →" %}}

  - block: markdown
    content:
      title: |
        Recruitment
      subtitle:
      text: |
        <br>
        {{< hl >}}We are currently recruiting one Ph.D. student starting Fall 2025.{{< /hl >}} Please check {{< icon name="download" pack="fas" >}} {{< staticref "uploads/PhD_Opening_TAMU_2024.pdf" "newtab">}}here{{< /staticref >}} for more details.
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
