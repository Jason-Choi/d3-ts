# Reactive D3 Boilerplate

<img width="2672" alt="image" src="https://user-images.githubusercontent.com/2310571/221183706-9cc934db-dec2-45f2-ae17-3b41b7d4df7a.png">


Boilerplate for developing D3-based data visualization. You can reactively re-render both d3 visualization component and template based html component leveraging the power of [@preact/signals](https://github.com/preactjs/signals) and lit-html. No-more virtualDOM and enjoy D3 :)

[Demo with Scatterplot Tour Visualization](https://git.jasonchoi.dev/reactive-d3-boilerplate)

## Details

- [Vite](https://vitejs.dev/) for bundling
- [D3](https://d3js.org/) for visualization component
- Strictly typed with [TypeScript](https://www.typescriptlang.org/)
- DOM manipulation with [lit-html](https://lit.dev) template engine
- Design with [TailwindCSS](https://tailwindcss.com) and [DaisyUI](https://daisyui.com/)
- Reactive stores and rendering using [Preact Signals](https://github.com/preactjs/signals)

## Development

```
# Install dependencies
npm install

# Run development server
npm run dev

# Build
npm run build

# Deploy via gh-pages (You must build your app first)
npm run deploy
```

## Acknowledgement

I re-implement [Scatter plot tour component](https://github.com/takanori-fujiwara/d3-gallery-javascript/tree/main/animation/scatterplot-tour) with Typescript
