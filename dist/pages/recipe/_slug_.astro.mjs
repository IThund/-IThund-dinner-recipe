/* empty css                                    */
import { c as createAstro, d as createComponent, r as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_ncvnUENx.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout, r as recipesData, a as $$Image, g as getCuisineName, b as getTimeLabel } from '../../chunks/recipes_BdHlcyN1.mjs';
import '@astrojs/internal-helpers/path';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://ithund.github.io");
function getStaticPaths() {
  return recipesData.recipes.map((recipe) => ({
    params: { slug: recipe.slug },
    props: { recipe }
  }));
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { recipe } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": recipe.title }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<header class="bg-card-bg border-b border-secondary sticky top-0 z-50"> <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between"> <div class="flex items-center gap-3"> <a href="/-IThund-dinner-recipe/" class="flex items-center gap-2 text-text hover:text-primary transition-colors"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg> <span>Back</span> </a> </div> <div class="flex items-center gap-3"> <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center"> <span class="text-white text-xl">🍳</span> </div> <h1 class="text-xl font-bold text-text hidden sm:block">晚餐 recipes</h1> </div> </div> </header>  <section class="relative"> <div class="aspect-[16/9] md:aspect-[21/9] overflow-hidden"> ${renderComponent($$result2, "Image", $$Image, { "src": recipe.image, "alt": recipe.title, "width": 1200, "height": 675, "class": "w-full h-full object-cover", "loading": "lazy", "decoding": "async" })} </div> <div class="absolute inset-0 bg-gradient-to-t from-text/70 to-transparent"></div> <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8"> <div class="max-w-7xl mx-auto"> <div class="flex flex-wrap gap-2 mb-3"> <span class="text-sm px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white"> ${getCuisineName(recipe.cuisine)} </span> <span class="text-sm px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white"> ${getTimeLabel(recipe.time)} </span> <span class="text-sm px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white"> ${recipe.difficulty} </span> </div> <h1 class="text-3xl md:text-5xl font-bold text-white mb-2">${recipe.title}</h1> </div> </div> </section>  <section class="py-8 border-b border-secondary"> <div class="max-w-7xl mx-auto px-4"> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"> <div class="bg-card-bg rounded-xl border border-secondary p-4 text-center"> <div class="text-3xl mb-2">💰</div> <div class="text-sm text-text-muted mb-1">Budget</div> <div class="text-2xl font-bold text-primary">$${recipe.budget}</div> </div> <div class="bg-card-bg rounded-xl border border-secondary p-4 text-center"> <div class="text-3xl mb-2">⏱️</div> <div class="text-sm text-text-muted mb-1">Time</div> <div class="text-2xl font-bold text-primary">${recipe.time} min</div> </div> <div class="bg-card-bg rounded-xl border border-secondary p-4 text-center"> <div class="text-3xl mb-2">👥</div> <div class="text-sm text-text-muted mb-1">Serves</div> <div class="text-2xl font-bold text-primary">${recipe.serves} people</div> </div> <div class="bg-card-bg rounded-xl border border-secondary p-4 text-center"> <div class="text-3xl mb-2">📊</div> <div class="text-sm text-text-muted mb-1">Difficulty</div> <div class="text-2xl font-bold text-primary capitalize">${recipe.difficulty}</div> </div> </div> </div> </section>  ${recipe.dietary.length > 0 && renderTemplate`<section class="py-6 border-b border-secondary"> <div class="max-w-7xl mx-auto px-4"> <div class="flex flex-wrap gap-2"> ${recipe.dietary.map((d) => renderTemplate`<span class="px-4 py-2 bg-accent/10 text-accent rounded-full flex items-center gap-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> ${d} </span>`)} </div> </div> </section>`} <section class="py-6 border-b border-secondary"> <div class="max-w-7xl mx-auto px-4"> <p class="text-lg text-text-muted">${recipe.description}</p> </div> </section>  ${recipe.nutritionHighlights && recipe.nutritionHighlights.length > 0 && renderTemplate`<section class="py-6 border-b border-secondary bg-accent/5"> <div class="max-w-7xl mx-auto px-4"> <h2 class="text-xl font-bold text-text mb-4 flex items-center gap-2"> <span class="text-2xl">🌟</span>
營養亮點 Nutrition Highlights
</h2> <ul class="space-y-2"> ${recipe.nutritionHighlights.map((h) => renderTemplate`<li class="flex items-start gap-3"> <span class="text-primary mt-0.5">✦</span> <span class="text-text-muted">${h}</span> </li>`)} </ul> </div> </section>`} <section class="py-8"> <div class="max-w-7xl mx-auto px-4"> <div class="grid md:grid-cols-2 gap-8"> <!-- Ingredients --> <div> <h2 class="text-2xl font-bold text-text mb-6 flex items-center gap-3"> <span class="text-3xl">🥗</span>
Ingredients 材料
</h2> <ul class="space-y-3"> ${recipe.ingredients.map((ingredient, i) => renderTemplate`<li class="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg"> <span class="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm flex-shrink-0"> ${i + 1} </span> <span class="text-text">${ingredient}</span> </li>`)} </ul> </div> <!-- Steps --> <div> <h2 class="text-2xl font-bold text-text mb-6 flex items-center gap-3"> <span class="text-3xl">👨‍🍳</span>
Steps 步驟
</h2> <ol class="space-y-4"> ${recipe.steps.map((step, i) => renderTemplate`<li class="flex items-start gap-4 p-4 bg-secondary/20 rounded-lg"> <span class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0"> ${i + 1} </span> <span class="text-text pt-1">${step}</span> </li>`)} </ol> </div> </div> </div> </section>  ${recipe.tips && renderTemplate`<section class="py-8 bg-accent/10"> <div class="max-w-7xl mx-auto px-4"> <div class="bg-card-bg rounded-xl border border-accent p-6"> <h2 class="text-xl font-bold text-text mb-4 flex items-center gap-2"> <span class="text-2xl">💡</span>
Tips 提示
</h2> <p class="text-text-muted">${recipe.tips}</p> </div> </div> </section>`} <section class="py-8"> <div class="max-w-7xl mx-auto px-4 text-center"> <a href="/-IThund-dinner-recipe/" class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg>
Back to All Recipes
</a> </div> </section>  <button id="scrollTopBtn" class="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 w-11 h-11 bg-primary text-white rounded-full shadow-lg flex items-center justify-center opacity-0 pointer-events-none transition-all duration-300 hover:bg-primary/90 z-40" aria-label="Scroll to top"> <span class="text-lg">⬆</span> </button>  <footer class="bg-text text-background py-8"> <div class="max-w-7xl mx-auto px-4 text-center"> <p>© 2026 Dinner Recipe HK</p> </div> </footer>  ` })}`;
}, "/Users/kate/Desktop/Kate/opencode/dinner-recipe/src/pages/recipe/[slug].astro", void 0);

const $$file = "/Users/kate/Desktop/Kate/opencode/dinner-recipe/src/pages/recipe/[slug].astro";
const $$url = "/-IThund-dinner-recipe/recipe/[slug].html";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
