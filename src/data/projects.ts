import type { Project, ProjectEditorialBlock, ProjectEditorialImage } from "@/types/portfolio";

const image = (slug: string, filename: string, alt: string): ProjectEditorialImage => ({
  src: `/projects/${slug}/images/${filename}`,
  alt,
});

const casagrandeImage = (filename: string, alt: string): ProjectEditorialImage => ({
  src: `/projects/casagrande/images/${filename}?v=20260621`,
  alt,
});

const coralImage = (filename: string, alt: string): ProjectEditorialImage => ({
  src: `/projects/coral/images/${filename}?v=20260621`,
  alt,
});

const melabodyImage = (filename: string, alt: string): ProjectEditorialImage => ({
  src: `/projects/melabody/images/${filename}?v=20260623`,
  alt,
});

const sealedImage = (filename: string, alt: string): ProjectEditorialImage => ({
  src: `/projects/sealed/images/${filename}?v=20260623`,
  alt,
});

const aspectImage = (filename: string, alt: string): ProjectEditorialImage => ({
  src: `/projects/aspect/images/${filename}?v=20260623`,
  alt,
});

const sinkyImage = (filename: string, alt: string): ProjectEditorialImage => ({
  src: `/projects/sinky/images/${filename}?v=20260623`,
  alt,
});

const saltwoodImage = (filename: string, alt: string): ProjectEditorialImage => ({
  src: `/projects/saltwood/images/${filename}?v=20260623`,
  alt,
});

type EditorialLayoutKind = ProjectEditorialBlock["kind"] | "detail";

const block = (
  kind: EditorialLayoutKind,
  ...images: ProjectEditorialImage[]
): ProjectEditorialBlock => ({ kind: kind === "detail" ? "single" : kind, images });

export const projects: Project[] = [
  {
    slug: "aura",
    title: "AURA",
    year: "Case Study",
    category: "Brand",
    tags: ["Identity", "Art Direction", "Digital"],
    summary:
      "AURA was developed as a complete visual identity project, covering the brand from its conceptual foundation to its final digital applications.",
    featured: true,
    thumbnail: { alt: "AURA project placeholder", fallback: "AU" },
    description: {
      en: ["AURA was developed as a complete visual identity project, covering the brand from its conceptual foundation to its final digital applications. The process included logo design, typography selection, color palette definition, visual hierarchy, brand applications and interface exploration, all built as part of a unified identity system rather than a collection of individual assets.","Throughout the project, multiple creative directions were explored before refining the final visual language. Every element was designed to work cohesively across different formats, ensuring consistency, scalability and long-term flexibility. Particular attention was given to typography, spacing and composition, allowing the identity to remain recognizable while adapting naturally to both print and digital environments.","The final result is a modular brand system designed to communicate with clarity, maintain visual consistency and support future expansion without compromising its core identity."],
      es: ["AURA fue desarrollado como un proyecto integral de identidad visual, abarcando la marca desde su base conceptual hasta sus aplicaciones digitales finales. El proceso incluyó diseño de logotipo, selección tipográfica, definición de paleta de color, jerarquía visual, aplicaciones de marca y exploración de interfaces, todo construido como parte de un sistema de identidad unificado y no como una colección de recursos aislados.","Durante el proyecto se exploraron distintas direcciones creativas antes de definir el lenguaje visual final. Cada elemento fue diseñado para funcionar de manera coherente en diferentes formatos, asegurando consistencia, escalabilidad y flexibilidad a largo plazo. Se prestó especial atención a la tipografía, el espaciado y la composición, permitiendo que la identidad se mantuviera reconocible y se adaptara naturalmente tanto a entornos impresos como digitales.","El resultado final es un sistema de marca modular diseñado para comunicar con claridad, mantener consistencia visual y acompañar futuras expansiones sin comprometer su identidad central."],
    },
    details: {
      type: "Design > Brand > Identity > Art Direction > Digital",
      tools: "Adobe Illustrator, Adobe Photoshop",
    },
    editorialLayout: [
      block("single", image("aura", "single-hero.PNG", "AURA hero composition")),
      block("single", image("aura", "detail-color-system.PNG", "AURA color system")),
      block(
        "single",
        image("aura", "single-mobile-mockup.PNG", "AURA mobile mockup"),
      ),
      block("single", image("aura", "detail-logo.jpg", "AURA logo composition")),
      block(
        "single",
        image("aura", "detail-mobile-interface.PNG", "AURA mobile interface detail"),
      ),
    ],
    editorialNote: {
      en: "The project focused on building a flexible visual system where consistency comes from structure, not repetition, allowing the identity to adapt naturally across different applications.",
      es: "El proyecto se enfocó en construir un sistema visual flexible, donde la consistencia surge de la estructura y no de la repetición, permitiendo que la identidad se adapte naturalmente a distintas aplicaciones.",
    },
  },
  {
    slug: "casagrande",
    title: "CASAGRANDE",
    year: "Case Study",
    category: "Brand",
    tags: ["Identity", "Editorial", "Print"],
    summary:
      "CASAGRANDE was developed as a complete branding project focused on creating a sophisticated and cohesive visual identity across both editorial and physical applications.",
    featured: true,
    thumbnail: { alt: "CASAGRANDE project placeholder", fallback: "CG" },
    description: {
      en: ["CASAGRANDE was developed as a complete branding project focused on creating a sophisticated and cohesive visual identity across both editorial and physical applications. The process covered logo development, typography selection, color palette definition, layout exploration, print collateral and brand applications, establishing a flexible system capable of adapting to multiple touchpoints while maintaining a consistent visual language.","Throughout the project, particular attention was given to composition, spacing and visual hierarchy, ensuring that every application felt connected to the same identity rather than functioning as isolated pieces. From editorial layouts to packaging and promotional materials, each asset was designed to reinforce the brand through consistency, clarity and attention to detail.","The final system balances contemporary aesthetics with practical scalability, allowing the identity to remain recognizable across different formats while preserving a refined and timeless visual character."],
      es: ["CASAGRANDE fue desarrollado como un proyecto integral de branding enfocado en crear una identidad visual sofisticada y cohesiva para aplicaciones tanto editoriales como físicas. El proceso abarcó desarrollo de logotipo, selección tipográfica, definición de paleta de color, exploración de composiciones, piezas impresas y aplicaciones de marca, estableciendo un sistema flexible capaz de adaptarse a múltiples puntos de contacto sin perder un lenguaje visual consistente.","Durante el proyecto se prestó especial atención a la composición, el espaciado y la jerarquía visual, asegurando que cada aplicación se sintiera conectada a la misma identidad en lugar de funcionar como una pieza aislada. Desde layouts editoriales hasta empaques y materiales promocionales, cada recurso fue diseñado para reforzar la marca mediante consistencia, claridad y atención al detalle.","El sistema final equilibra una estética contemporánea con escalabilidad práctica, permitiendo que la identidad se mantenga reconocible en distintos formatos mientras conserva un carácter visual refinado y atemporal."],
    },
    details: {
      type: "Design > Brand > Identity > Editorial > Print",
      tools: "Adobe Illustrator, Adobe Photoshop",
    },
    editorialLayout: [
      block("single", casagrandeImage("single-hero.PNG", "CASAGRANDE hero")),
      block(
        "single",
        casagrandeImage("single-editorial-poster.PNG", "CASAGRANDE editorial poster"),
      ),
      block(
        "pair",
        casagrandeImage("pair-01-a.PNG", "CASAGRANDE paired layout one"),
        casagrandeImage("pair-01-b.PNG", "CASAGRANDE paired layout two"),
      ),
      block(
        "single",
        casagrandeImage("single-brand-application.PNG", "CASAGRANDE brand application"),
      ),
      block(
        "single",
        casagrandeImage("single-mobile-experience.PNG", "CASAGRANDE mobile experience"),
      ),
      block(
        "mosaic",
        casagrandeImage("mosaic-01-main.PNG", "CASAGRANDE mosaic main image"),
        casagrandeImage("mosaic-01-a.PNG", "CASAGRANDE mosaic detail one"),
        casagrandeImage("mosaic-01-b.PNG", "CASAGRANDE mosaic detail two"),
      ),
      block(
        "single",
        casagrandeImage(
          "single-lifestyle-application.PNG",
          "CASAGRANDE lifestyle application",
        ),
      ),
      block("detail", casagrandeImage("detail-01.PNG", "CASAGRANDE detail one")),
      block(
        "mosaic",
        casagrandeImage("mosaic-02-main.PNG", "CASAGRANDE second mosaic main image"),
        casagrandeImage("mosaic-02-a.PNG", "CASAGRANDE second mosaic detail one"),
        casagrandeImage("mosaic-02-b.PNG", "CASAGRANDE second mosaic detail two"),
      ),
      block("detail", casagrandeImage("detail-02.PNG", "CASAGRANDE detail two")),
    ],
    editorialNote: {
      en: "Rather than treating each application as a standalone deliverable, every piece was designed as part of a unified visual system where typography, composition and material choices reinforce the same brand language across every touchpoint.",
      es: "En lugar de tratar cada aplicación como un entregable independiente, cada pieza fue diseñada como parte de un sistema visual unificado, donde la tipografía, la composición y las decisiones de materialidad refuerzan el mismo lenguaje de marca en cada punto de contacto.",
    },
  },
  {
    slug: "coral",
    title: "CORAL",
    year: "Case Study",
    category: "Brand",
    tags: ["Identity", "Art Direction", "Digital"],
    summary:
      "CORAL was developed as a branding project focused on building a refined and adaptable visual identity capable of extending consistently across both digital and printed applications.",
    thumbnail: { alt: "CORAL project placeholder", fallback: "CO" },
    description: {
      en: ["CORAL was developed as a branding project focused on building a refined and adaptable visual identity capable of extending consistently across both digital and printed applications. The process involved logo development, typography selection, color exploration, layout definition and the creation of key brand assets, resulting in a cohesive identity system rather than a collection of isolated deliverables.","Throughout the project, emphasis was placed on visual hierarchy, balance and consistency, ensuring that every application reinforced the same design principles regardless of format. From concept exploration to final presentations, each asset was carefully developed to communicate a unified brand language while remaining flexible enough to evolve across different touchpoints."],
      es: ["CORAL fue desarrollado como un proyecto de branding enfocado en construir una identidad visual refinada y adaptable, capaz de extenderse de manera consistente tanto en aplicaciones digitales como impresas. El proceso incluyó desarrollo de logotipo, selección tipográfica, exploración de color, definición de composiciones y creación de recursos clave de marca, dando como resultado un sistema de identidad cohesivo en lugar de una colección de entregables aislados.","Durante el proyecto se puso especial atención en la jerarquía visual, el equilibrio y la consistencia, asegurando que cada aplicación reforzara los mismos principios de diseño sin importar el formato. Desde la exploración conceptual hasta las presentaciones finales, cada recurso fue desarrollado cuidadosamente para comunicar un lenguaje de marca unificado y, al mismo tiempo, mantener la flexibilidad necesaria para evolucionar en distintos puntos de contacto."],
    },
    details: {
      type: "Design > Brand > Identity > Art Direction > Digital",
      tools: "Adobe Illustrator, Adobe Photoshop",
    },
    editorialLayout: [
      block("single", coralImage("single-hero.PNG", "CORAL hero")),
      block(
        "single",
        coralImage("single-brand-application.PNG", "CORAL brand application"),
      ),
      block(
        "pair",
        coralImage("pair-01-a.PNG", "CORAL paired layout one"),
        coralImage("pair-01-b.PNG", "CORAL paired layout two"),
      ),
      block(
        "banner",
        coralImage("banner-brand-system.PNG", "CORAL panoramic brand system"),
      ),
      block("single", coralImage("single-brand-system.PNG", "CORAL brand system")),
    ],
    editorialNote: {
      en: "The project was approached as a complete identity system, where every application reinforces the same visual language through consistency, proportion and careful attention to detail.",
      es: "El proyecto fue abordado como un sistema de identidad integral, donde cada aplicación refuerza el mismo lenguaje visual mediante consistencia, proporción y atención cuidadosa al detalle.",
    },
  },
  {
    slug: "graphiczsz",
    title: "GRAPHICZSZ",
    year: "Personal Archive",
    category: "Archive",
    tags: ["Art Direction", "Visual Exploration", "Personal Archive"],
    summary: "A personal visual archive built around experimentation, instinct and graphic exploration.",
    thumbnail: { alt: "GRAPHICZSZ project cover", fallback: "GZ" },
    description: {
      en: ["GRAPHICZSZ is a personal visual archive built around experimentation, instinct and graphic exploration. Unlike the structured branding projects in the portfolio, this project works more like a creative space where ideas, images, typography and compositions can exist without the pressure of a commercial brief.", "The project reflects a more personal side of the work: visual studies, experimental pieces and artwork created through curiosity, style and self-expression. It functions as a bridge between design practice and personal art, showing how exploration outside client work helps shape the visual language behind the rest of the portfolio."],
      es: ["GRAPHICZSZ es un archivo visual personal construido alrededor de la experimentación, el instinto y la exploración gráfica. A diferencia de los proyectos de branding más estructurados del portafolio, este proyecto funciona más como un espacio creativo donde las ideas, imágenes, tipografías y composiciones pueden existir sin la presión de un brief comercial.", "El proyecto refleja una faceta más personal del trabajo: estudios visuales, piezas experimentales y arte creado desde la curiosidad, el estilo y la expresión propia. Funciona como un puente entre la práctica del diseño y el arte personal, mostrando cómo la exploración fuera del trabajo para clientes también influye en el lenguaje visual del resto del portafolio."],
    },
    details: {
      type: "Design \u003e Art Direction \u003e Visual Exploration \u003e Personal Archive",
      tools: "Adobe Illustrator, Adobe Photoshop",
    },
    editorialLayout: [
      block(
        "gallery-layout",
        {
          src: "/api/project-hero-image?slug=graphiczsz",
          alt: "GRAPHICZSZ hero image",
        },
      ),
    ],
    editorialNote: {
      en: "A personal archive of visual experiments, studies and artwork developed outside the structure of commercial branding projects.",
      es: "Un archivo personal de experimentos visuales, estudios y piezas artísticas desarrolladas fuera de la estructura de proyectos comerciales de branding.",
    },
  },  {
    slug: "gallery",
    title: "GALLERY",
    year: "Archive",
    category: "Archive",
    tags: ["Gallery", "Visual Archive"],
    summary:
      "A curated archive of selected visuals, experiments and supporting artwork produced throughout different projects.",
    thumbnail: { alt: "GALLERY project placeholder", fallback: "GL" },
    description: {
      en: ["A curated archive of selected visuals, experiments and supporting artwork produced throughout different projects. Rather than presenting complete case studies, this gallery functions as a visual notebook, collecting explorations, compositions and things that represent me."],
      es: ["Un archivo curado de imágenes, exploraciones y piezas desarrolladas a lo largo de distintos proyectos. Más que presentar casos de estudio completos, esta galería funciona como un cuaderno visual que reúne composiciones, experimentos y cosas que me representan."],
    },
    details: {
      type: "Design > Archive > Gallery",
      tools: "Adobe Illustrator, Adobe Photoshop",
    },
    editorialLayout: [block("gallery-grid")],
    editorialNote: {
      en: "I will update this every time I can. Mi mind evolves, my eyes become sharper and my vision chages.",
      es: "Intentaré actualizar esto lo más que pueda. Mi mente evoluciona, mis ojos cada vez son más precisos y mi visión cambia constantemente.",
    },
  },  {
    slug: "logofolio",
    title: "Logofolio",
    year: "Selected Identities",
    category: "Brand",
    tags: ["Identity", "Logo Design"],
    summary:
      "A curated collection of selected logo explorations and visual identities developed across different industries.",
    thumbnail: { alt: "Logofolio project placeholder", fallback: "LF" },
    description: {
      en: "A curated collection of selected logo explorations and visual identities developed across different industries. This archive showcases different approaches to symbolism, typography and brand construction through a selection of standalone identity projects.",
      es: "Una colección curada de exploraciones de logotipo e identidades visuales desarrolladas para distintas industrias. Este archivo reúne diferentes aproximaciones al simbolismo, la tipografía y la construcción de marca a través de una selección de proyectos de identidad independientes.",
    },
    details: {
      type: "Design > Brand > Identity",
      tools: "Adobe Illustrator, Adobe Photoshop",
    },
    editorialLayout: [
      block(
        "custom-grid",
        image("logofolio", "IMG_7978.PNG", "Selected logo identity 01"),
        image("logofolio", "IMG_7979.PNG", "Selected logo identity 02"),
        image("logofolio", "IMG_7980.PNG", "Selected logo identity 03"),
        image("logofolio", "IMG_7981.PNG", "Selected logo identity 04"),
        image("logofolio", "IMG_7982.PNG", "Selected logo identity 05"),
        image("logofolio", "IMG_7984.PNG", "Selected logo identity 06"),
        image("logofolio", "IMG_7988.PNG", "Selected logo identity 07"),
        image("logofolio", "IMG_7989.PNG", "Selected logo identity 08"),
        image("logofolio", "IMG_7991.PNG", "Selected logo identity 09"),
        image("logofolio", "IMG_7992.PNG", "Selected logo identity 10"),
        image("logofolio", "IMG_7993.PNG", "Selected logo identity 11"),
        image("logofolio", "IMG_7994.PNG", "Selected logo identity 12"),
        image("logofolio", "IMG_7995.PNG", "Selected logo identity 13"),
        image("logofolio", "IMG_7996.PNG", "Selected logo identity 14"),
        image("logofolio", "IMG_7997.PNG", "Selected logo identity 15"),
        image("logofolio", "IMG_7998.PNG", "Selected logo identity 16"),
        image("logofolio", "IMG_7999.PNG", "Selected logo identity 17"),
      ),
    ],
    editorialNote: {
      en: "Selected identities developed across branding projects.",
      es: "Selección de identidades desarrolladas en distintos proyectos de branding.",
    },
  },
  {
    slug: "pagaille",
    title: "PAGAILLE",
    year: "Case Study",
    category: "Brand",
    tags: ["Identity", "Packaging", "Print"],
    summary:
      "PAGAILLE was developed as a branding project centered on creating a clean and memorable visual identity capable of extending naturally across packaging and supporting brand applications.",
    featured: true,
    thumbnail: { alt: "PAGAILLE project placeholder", fallback: "PG" },
    description: {
      en: ["PAGAILLE was developed as a branding project centered on creating a clean and memorable visual identity capable of extending naturally across packaging and supporting brand applications. The process included logo development, typography selection, color exploration, packaging design and the creation of a cohesive visual system designed to maintain consistency across every customer touchpoint.","Throughout the project, emphasis was placed on simplicity, proportion and visual clarity, allowing each application to reinforce the same identity while remaining flexible enough to adapt across different formats. Every design decision contributed to building a recognizable and scalable brand system rather than a collection of independent deliverables."],
      es: ["PAGAILLE fue desarrollado como un proyecto de branding centrado en crear una identidad visual limpia y memorable, capaz de extenderse naturalmente a través del empaque y otras aplicaciones de marca. El proceso incluyó desarrollo de logotipo, selección tipográfica, exploración de color, diseño de empaque y la creación de un sistema visual cohesivo diseñado para mantener consistencia en cada punto de contacto con el cliente.","Durante el proyecto, se puso especial atención en la simplicidad, la proporción y la claridad visual, permitiendo que cada aplicación reforzara la misma identidad mientras conservaba la flexibilidad necesaria para adaptarse a distintos formatos. Cada decisión de diseño aportó a la construcción de un sistema de marca reconocible y escalable, en lugar de una colección de entregables independientes."],
    },
    details: {
      type: "Design > Brand > Identity > Packaging > Print",
      tools: "Adobe Illustrator, Adobe Photoshop",
    },
    editorialLayout: [
      block("single", image("pagaille", "single-hero.PNG", "PAGAILLE hero")),
      block(
        "single",
        image("pagaille", "single-brand-application.PNG", "PAGAILLE brand application"),
      ),
      block("detail", image("pagaille", "detail-01.PNG", "PAGAILLE detail")),
      block(
        "single",
        image("pagaille", "single-packaging.PNG", "PAGAILLE packaging"),
      ),
    ],
    editorialNote: {
      en: "The project was approached as a unified identity system where branding and packaging work together to strengthen recognition, consistency and the overall customer experience.",
      es: "El proyecto fue abordado como un sistema de identidad unificado, donde el branding y el empaque trabajan en conjunto para fortalecer el reconocimiento, la consistencia y la experiencia general del cliente.",
    },
  },
  {
    slug: "sealed",
    title: "SEALED",
    year: "Case Study",
    category: "Brand",
    tags: ["Identity", "Packaging", "Product Design"],
    summary:
      "SEALED was developed as a branding and packaging project focused on creating a cohesive product identity from concept to final presentation.",
    featured: true,
    thumbnail: { alt: "SEALED project placeholder", fallback: "SE" },
    description: {
      en: ["SEALED was developed as a branding and packaging project focused on creating a cohesive product identity from concept to final presentation. The process included logo development, typography selection, packaging exploration, label design, color definition and the creation of supporting brand applications, resulting in a visual system capable of extending consistently across both physical and digital touchpoints.","Particular attention was given to packaging structure, hierarchy and presentation, ensuring that every element contributed to a recognizable and functional product experience. Rather than treating packaging as a standalone deliverable, it was developed as an integral part of the brand identity, reinforcing the same visual language across every application while maintaining clarity, scalability and long-term consistency."],
      es: ["SEALED fue desarrollado como un proyecto de branding y packaging enfocado en crear una identidad de producto cohesiva, desde el concepto hasta su presentación final. El proceso incluyó desarrollo de logotipo, selección tipográfica, exploración de empaques, diseño de etiquetas, definición de color y creación de aplicaciones complementarias de marca, dando como resultado un sistema visual capaz de extenderse de forma consistente tanto en puntos de contacto físicos como digitales.","Se prestó especial atención a la estructura, jerarquía y presentación del empaque, asegurando que cada elemento aportara a una experiencia de producto reconocible y funcional. En lugar de tratar el packaging como un entregable aislado, se desarrolló como una parte integral de la identidad de marca, reforzando el mismo lenguaje visual en cada aplicación mientras mantiene claridad, escalabilidad y consistencia a largo plazo."],
    },
    details: {
      type: "Design > Brand > Identity > Packaging > Product Design",
      tools: "Adobe Illustrator, Adobe Photoshop",
    },
    editorialLayout: [
      block("single", sealedImage("single-hero.PNG", "SEALED hero")),
      block(
        "pair",
        sealedImage("pair-01-a.PNG", "SEALED paired layout one"),
        sealedImage("pair-01-b.PNG", "SEALED paired layout two"),
      ),
      block("detail", sealedImage("detail-01.PNG", "SEALED detail one")),
      block(
        "mosaic",
        sealedImage("mosaic-01-main.PNG", "SEALED mosaic main image"),
        sealedImage("mosaic-01-a.PNG", "SEALED mosaic detail one"),
        sealedImage("mosaic-01-b.PNG", "SEALED mosaic detail two"),
      ),
      block("detail", sealedImage("detail-02.PNG", "SEALED detail two")),
      block(
        "single",
        sealedImage("single-brand-application.PNG", "SEALED brand application"),
      ),
      block(
        "banner",
        sealedImage("banner-packaging-system.PNG", "SEALED packaging system"),
      ),
    ],
    editorialNote: {
      en: "Packaging was approached as an extension of the identity system, where structure, typography and visual hierarchy work together to create a consistent product experience across every customer touchpoint.",
      es: "El packaging fue abordado como una extensión del sistema de identidad, donde la estructura, la tipografía y la jerarquía visual trabajan en conjunto para crear una experiencia de producto consistente en cada punto de contacto con el cliente.",
    },
  },
  {
    slug: "melabody",
    title: "MELABODY",
    year: "Case Study",
    category: "Brand",
    tags: ["Identity", "Art Direction", "Digital"],
    summary:
      "MELABODY was developed as a branding project focused on creating a premium visual identity with a strong emphasis on clarity, consistency and product presentation.",
    thumbnail: { alt: "MELABODY project placeholder", fallback: "MB" },
    description: {
      en: ["MELABODY was developed as a branding project focused on creating a premium visual identity with a strong emphasis on clarity, consistency and product presentation. The process involved logo development, typography selection, color definition and the creation of a cohesive visual system capable of extending naturally across different brand applications.","Throughout the project, every visual decision was guided by simplicity, balance and scalability, allowing the identity to maintain a refined aesthetic while remaining adaptable across multiple touchpoints. The result is a flexible brand system designed to communicate professionalism, confidence and long-term consistency."],
      es: ["MELABODY fue desarrollado como un proyecto de branding enfocado en crear una identidad visual premium, con especial énfasis en la claridad, la consistencia y la presentación del producto. El proceso involucró desarrollo de logotipo, selección tipográfica, definición de color y la creación de un sistema visual cohesivo capaz de extenderse naturalmente a distintas aplicaciones de marca.","Durante el proyecto, cada decisión visual estuvo guiada por la simplicidad, el equilibrio y la escalabilidad, permitiendo que la identidad mantuviera una estética refinada mientras se adaptaba a múltiples puntos de contacto. El resultado es un sistema de marca flexible diseñado para comunicar profesionalismo, confianza y consistencia a largo plazo."],
    },
    details: {
      type: "Design > Brand > Identity > Art Direction > Digital",
      tools: "Adobe Illustrator, Adobe Photoshop",
    },
    editorialLayout: [
      block("single", melabodyImage("single-hero.PNG", "MELABODY hero")),
      block(
        "mosaic",
        melabodyImage("mosaic-01-main.PNG", "MELABODY mosaic main image"),
        melabodyImage("mosaic-01-a.PNG", "MELABODY mosaic supporting image one"),
        melabodyImage("mosaic-01-b.PNG", "MELABODY mosaic supporting image two"),
      ),
      block(
        "pair",
        melabodyImage("pair-01-a.PNG", "MELABODY paired image one"),
        melabodyImage("pair-01-b.PNG", "MELABODY paired image two"),
      ),
    ],
    editorialNote: {
      en: "The visual system was designed to remain consistent across different applications, allowing typography, composition and brand elements to work together as a unified identity rather than independent assets.",
      es: "El sistema visual fue diseñado para mantener consistencia en distintas aplicaciones, permitiendo que la tipografía, la composición y los elementos de marca funcionen como una identidad unificada y no como recursos independientes.",
    },
  },
  {
    slug: "aspect",
    title: "ASPECT",
    year: "Case Study",
    category: "Brand",
    tags: ["Identity", "Art Direction", "Digital"],
    summary:
      "ASPECT was developed as a branding project focused on building a contemporary visual identity capable of extending consistently across editorial, digital and brand communication assets.",
    thumbnail: { alt: "ASPECT project placeholder", fallback: "AS" },
    description: {
      en: ["ASPECT was developed as a branding project focused on building a contemporary visual identity capable of extending consistently across editorial, digital and brand communication assets. The process included logo development, typography selection, color exploration and the creation of a cohesive visual system designed to maintain clarity and consistency across multiple applications.","Throughout the project, emphasis was placed on composition, proportion and visual hierarchy, ensuring that every application contributed to a unified identity rather than functioning as isolated pieces. The resulting system balances flexibility with consistency, allowing the brand to adapt naturally across different formats while preserving a strong and recognizable visual language."],
      es: ["ASPECT fue desarrollado como un proyecto de branding enfocado en construir una identidad visual contemporánea capaz de extenderse de forma consistente a través de piezas editoriales, digitales y de comunicación de marca. El proceso incluyó desarrollo de logotipo, selección tipográfica, exploración de color y la creación de un sistema visual cohesivo diseñado para mantener claridad y consistencia en múltiples aplicaciones.","Durante el proyecto, se puso especial atención en la composición, la proporción y la jerarquía visual, asegurando que cada aplicación aportara a una identidad unificada en lugar de funcionar como una pieza aislada. El sistema resultante equilibra flexibilidad y consistencia, permitiendo que la marca se adapte naturalmente a distintos formatos mientras conserva un lenguaje visual sólido y reconocible."],
    },
    details: {
      type: "Design > Brand > Identity > Art Direction > Digital",
      tools: "Adobe Illustrator, Adobe Photoshop",
    },
    editorialLayout: [
      block("single", aspectImage("single-hero.PNG", "ASPECT hero")),
      block("banner", aspectImage("banner-01.PNG", "ASPECT opening banner")),
      block(
        "pair",
        aspectImage("pair-01-a.PNG", "ASPECT paired image one"),
        aspectImage("pair-01-b.PNG", "ASPECT paired image two"),
      ),
      block("banner", aspectImage("banner-02.PNG", "ASPECT closing banner")),
    ],
    editorialNote: {
      en: "The identity was developed as a modular visual system where every application reinforces the same design principles through consistent typography, composition and visual hierarchy.",
      es: "La identidad fue desarrollada como un sistema visual modular, donde cada aplicación refuerza los mismos principios de diseño mediante una tipografía, composición y jerarquía visual consistentes.",
    },
  },
  {
    slug: "sinky",
    title: "SINKY",
    year: "Case Study",
    category: "Brand",
    tags: ["Identity", "Art Direction", "Digital"],
    summary:
      "SINKY was developed as a branding project focused on creating a bold and recognizable visual identity capable of adapting consistently across both digital and physical brand applications.",
    thumbnail: { alt: "SINKY project placeholder", fallback: "SK" },
    description: {
      en: ["SINKY was developed as a branding project focused on creating a bold and recognizable visual identity capable of adapting consistently across both digital and physical brand applications. The process included logo development, typography selection, color exploration and the creation of a cohesive visual system designed to strengthen brand recognition while maintaining flexibility across different touchpoints.","Throughout the project, emphasis was placed on visual hierarchy, composition and scalability, ensuring that every application reinforced the same identity principles. Each asset was developed as part of a unified branding system, balancing strong visual impact with long-term consistency across multiple formats."],
      es: ["SINKY fue desarrollado como un proyecto de branding enfocado en crear una identidad visual audaz y reconocible, capaz de adaptarse de manera consistente tanto a aplicaciones digitales como físicas de marca. El proceso incluyó desarrollo de logotipo, selección tipográfica, exploración de color y la creación de un sistema visual cohesivo diseñado para fortalecer el reconocimiento de marca mientras mantiene flexibilidad en distintos puntos de contacto.","Durante el proyecto, se puso especial atención en la jerarquía visual, la composición y la escalabilidad, asegurando que cada aplicación reforzara los mismos principios de identidad. Cada recurso fue desarrollado como parte de un sistema de branding unificado, equilibrando un fuerte impacto visual con consistencia a largo plazo en múltiples formatos."],
    },
    details: {
      type: "Design > Brand > Identity > Art Direction > Digital",
      tools: "Adobe Illustrator, Adobe Photoshop",
    },
    editorialLayout: [
      block("single", sinkyImage("single-hero.PNG", "SINKY hero")),
      block(
        "single",
        sinkyImage("single-brand-application.png", "SINKY brand application"),
      ),
      block("banner", sinkyImage("banner-01.PNG", "SINKY panoramic brand section")),
      block(
        "pair",
        sinkyImage("pair-01-a.PNG", "SINKY paired image one"),
        sinkyImage("pair-01-b.PNG", "SINKY paired image two"),
      ),
    ],
    editorialNote: {
      en: "Every application was developed as part of the same visual system, allowing the identity to remain consistent while adapting naturally across different formats and communication channels.",
      es: "Cada aplicación fue desarrollada como parte del mismo sistema visual, permitiendo que la identidad mantenga consistencia mientras se adapta naturalmente a distintos formatos y canales de comunicación.",
    },
  },
  {
    slug: "saltwood",
    title: "SALTWOOD",
    year: "Case Study",
    category: "Brand",
    tags: ["Identity", "Art Direction", "Digital"],
    summary:
      "SALTWOOD was developed as a branding project focused on creating a warm, refined and adaptable visual identity across brand and promotional applications.",
    thumbnail: { alt: "SALTWOOD project placeholder", fallback: "SW" },
    description: {
      en: ["SALTWOOD was developed as a branding project focused on creating a warm, refined and adaptable visual identity across brand and promotional applications. The process included logo development, typography selection, color exploration, art direction and the creation of a cohesive visual system designed to communicate consistency, character and visual clarity.","The project was approached as a flexible identity system, allowing the brand to maintain a strong visual presence across different formats while keeping the overall direction clean, intentional and recognizable."],
      es: ["SALTWOOD fue desarrollado como un proyecto de branding enfocado en crear una identidad visual cálida, refinada y adaptable para aplicaciones de marca y comunicación promocional. El proceso incluyó desarrollo de logotipo, selección tipográfica, exploración de color, dirección de arte y la creación de un sistema visual cohesivo diseñado para comunicar consistencia, carácter y claridad visual.","El proyecto fue abordado como un sistema de identidad flexible, permitiendo que la marca mantuviera una presencia visual sólida en distintos formatos mientras conservaba una dirección general limpia, intencional y reconocible."],
    },
    details: {
      type: "Design > Brand > Identity > Art Direction > Digital",
      tools: "Adobe Illustrator, Adobe Photoshop",
    },
    editorialLayout: [
      block("single", saltwoodImage("single-hero.PNG", "SALTWOOD hero")),
      block(
        "single",
        saltwoodImage("single-brand-application.PNG", "SALTWOOD brand application"),
      ),
      block(
        "mosaic",
        saltwoodImage("mosaic-01-main.PNG", "SALTWOOD mosaic main image"),
        saltwoodImage("mosaic-01-a.PNG", "SALTWOOD mosaic supporting image one"),
        saltwoodImage("mosaic-01-b.PNG", "SALTWOOD mosaic supporting image two"),
      ),
      block("single", saltwoodImage("single-poster.PNG", "SALTWOOD poster")),
    ],
    editorialNote: {
      en: "The identity was built to feel consistent across every application, using typography, composition and visual hierarchy as the main tools for recognition.",
      es: "La identidad fue construida para mantener consistencia en cada aplicación, utilizando la tipografía, la composición y la jerarquía visual como principales herramientas de reconocimiento.",
    },
  },
];



