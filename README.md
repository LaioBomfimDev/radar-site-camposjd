# Radar Viagem e Turismo — Campos do Jordão

Landing page imersiva, mobile-first, construída em React + GSAP para apresentar três experiências em Campos do Jordão: Horto Florestal, Morro do Elefante e passeio de trem pela Serra da Mantiqueira.

## Rodar localmente

```bash
npm install
npm run dev
```

## Componentes e direção de interface

Os blocos foram compostos a partir de padrões presentes no catálogo [21st.dev](https://21st.dev/): Scroll media expansion hero, Text Reveal, Radial Orbital Timeline, Spotlight Card, Zoom Parallax, horizontal scroll gallery e Liquid Glass Button. Toda a coreografia e os estados interativos do protótipo foram implementados com GSAP e ScrollTrigger.

## Performance e acessibilidade

- Imagens locais em WebP, redimensionadas e comprimidas.
- Identidade oficial da Radar servida em derivados otimizados para navegação, hero, ticket, footer e favicon.
- Vídeo WebM abaixo de 1 MB com poster e carregamento por interseção.
- `loading="lazy"` e `decoding="async"` fora da primeira dobra.
- Animações limitadas a transform e opacity sempre que possível.
- Experiência estática alternativa para `prefers-reduced-motion`.
- Botões, abas, modal e navegação operáveis por teclado.
- Áudio ambiente sintético somente após ação explícita do usuário.

## Créditos de mídia

- Horto Florestal — joao batista Shimoto, CC BY-SA 3.0, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Horto_Florestal,_Campos_do_Jord%C3%A3o._-_panoramio_(3).jpg).
- Teleférico de Campos do Jordão — Governo do Estado de São Paulo, CC BY 2.0, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Telef%C3%A9rico_de_Campos_do_Jord%C3%A3o_(3842850730).jpg).
- Estrada de Ferro Campos do Jordão — Majtec, CC BY-SA, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Estrada_de_Ferro_Campos_do_Jord%C3%A3o,_rampa_dos_11_porcento.JPG).
- Nuvens — Evan-Amos, CC0, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Clouds-Airplane.jpg).
- Timelapse de nuvens — madlag/ComputerHotline, CC BY-SA 2.0, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Clouds_Time_Lapse.webm).

As mídias foram redimensionadas e convertidas para uso no protótipo.
