export interface Recipe {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  cuisine: string;
  budget: number;
  serves: number;
  time: number;
  difficulty: string;
  dietary: string[];
  image: string;
  description: string;
  ingredients: string[];
  steps: string[];
  tips: string;
}

export interface FilterState {
  cuisine: string;
  budget: number;
  serves: number;
  time: string;
  dietary: string[];
  search: string;
}

export const cuisines = [
  { id: 'hong-kong', name: 'Hong Kong', nameZh: '港式', icon: '🏙️' },
  { id: 'western', name: 'Western', nameZh: '西式', icon: '🍝' },
  { id: 'japanese', name: 'Japanese', nameZh: '日式', icon: '🍱' },
  { id: 'thai', name: 'Thai', nameZh: '泰式', icon: '🥘' },
  { id: 'vietnamese', name: 'Vietnamese', nameZh: '越式', icon: '🥖' },
  { id: 'korean', name: 'Korean', nameZh: '韓式', icon: '🍲' },
  { id: 'taiwanese', name: 'Taiwanese', nameZh: '台式', icon: '🍜' },
  { id: 'chinese', name: 'Chinese', nameZh: '中式', icon: '🥢' },
];

export const dietaryOptions = [
  { id: 'diabetic-friendly', name: 'Diabetic-Friendly', nameZh: '糖尿病友好' },
  { id: 'low-sugar', name: 'Low Sugar', nameZh: '低糖' },
  { id: 'low-carb', name: 'Low Carb', nameZh: '低碳水' },
  { id: 'gluten-free', name: 'Gluten-Free', nameZh: '無麩質' },
];

export const timeOptions = [
  { id: 'all', name: 'All', nameZh: '全部', max: 30 },
  { id: 'quick', name: 'Quick', nameZh: '快手', max: 15 },
  { id: 'medium', name: 'Medium', nameZh: '中等', max: 30 },
];

export const servingOptions = [
  { id: 1, name: '1 Person', nameZh: '1人', icon: '👤' },
  { id: 2, name: '2 People', nameZh: '2人', icon: '👥' },
  { id: 4, name: '3-4 People', nameZh: '3-4人', icon: '👨‍👩‍👧' },
  { id: 5, name: '5+ People', nameZh: '5人+', icon: '👨‍👩‍👧‍👦' },
];

export function filterRecipes(recipes: Recipe[], filters: FilterState): Recipe[] {
  return recipes.filter((recipe) => {
    if (filters.cuisine && filters.cuisine !== 'all' && recipe.cuisine !== filters.cuisine) {
      return false;
    }
    if (filters.budget && recipe.budget > filters.budget) {
      return false;
    }
    if (filters.serves && filters.serves > 0) {
      const servesOption = servingOptions.find(s => s.id === filters.serves);
      if (servesOption) {
        const [min, max] = servesOption.id === 1 ? [1, 1] : servesOption.id === 2 ? [2, 2] : servesOption.id === 4 ? [3, 4] : [5, 100];
        if (recipe.serves < min || recipe.serves > max) {
          return false;
        }
      }
    }
    if (filters.time && filters.time !== 'all') {
      const timeOption = timeOptions.find(t => t.id === filters.time);
      if (timeOption && recipe.time > timeOption.max) {
        return false;
      }
    }
    if (filters.dietary && filters.dietary.length > 0) {
      const hasAllDietary = filters.dietary.every(d => recipe.dietary.includes(d));
      if (!hasAllDietary) {
        return false;
      }
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesTitle = recipe.title.toLowerCase().includes(searchLower) || 
                        recipe.titleEn.toLowerCase().includes(searchLower) ||
                        recipe.description.toLowerCase().includes(searchLower);
      if (!matchesTitle) {
        return false;
      }
    }
    return true;
  });
}

export function getCuisineName(id: string): string {
  return cuisines.find(c => c.id === id)?.name || id;
}

export function getTimeLabel(minutes: number): string {
  if (minutes <= 15) return 'Quick';
  if (minutes <= 30) return 'Medium';
  return `${minutes} min`;
}