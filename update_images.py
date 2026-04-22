#!/usr/bin/env python3
"""Update recipe images with more appropriate and diverse Unsplash photos."""

import json

# Image mapping based on recipe type/content
image_map = {
    "zheng-yu": "https://images.unsplash.com/photo-1513574095296-1e9d7f90cc8d?w=400&h=300&fit=crop",  # Steamed fish
    "fan-qie-chao-dan": "https://images.unsplash.com/photo-1630384478604-5149d35ce2da?w=400&h=300&fit=crop",  # Tomato egg
    "bo-cai-dou-fu-tang": "https://images.unsplash.com/photo-1612874742237-415c88e1d5cc?w=400&h=300&fit=crop",  # Spinach tofu soup
    "liang-ban-huang-gua": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",  # Cucumber salad
    "qing-chao-dou-miao": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",  # Pea shoots stir-fry
    "dong-gua-pai-gu-tang": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop",  # Pork rib soup
    "zheng-dan": "https://images.unsplash.com/photo-1482049016688-2d3e1bd0fd80?w=400&h=300&fit=crop",  # Steamed egg
    "chao-jie-lan": "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop",  # Broccoli stir-fry
    "dou-fu-mi-suo-tang": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",  # Miso soup
    "yan-shao-ji-tui": "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",  # Chicken thigh
    "bo-cao-ohitashi": "https://images.unsplash.com/photo-1576021182211-9ea8dced3690?w=400&h=300&fit=crop",  # Spinach
    "shirataki-chao": "https://images.unsplash.com/photo-1552611052-33e04de081de?w=400&h=300&fit=crop",  # Noodles
    "qing-gua-su-no-mono": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",  # Cucumber
    "bao-yu-muni-er": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",  # Salmon
    "dou-fu-sute-ki": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",  # Tofu steak
    "leng-dou-fu": "https://images.unsplash.com/photo-1546180143-527c7d46e98b?w=400&h=300&fit=crop",  # Cold tofu
    "shi-geum-ji-na-mul": "https://images.unsplash.com/photo-1576021182211-9ea8dced3690?w=400&h=300&fit=crop",  # Spinach
    "gye-ran-guk": "https://images.unsplash.com/photo-1612874742237-415c88e1d5cc?w=400&h=300&fit=crop",  # Egg soup
    "dou-bu-jo-rim": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",  # Braised tofu
    "o-i-mu-chim": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",  # Cucumber
    "doen-jang-jji-gae": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop",  # Soybean paste stew
    "kong-na-mul-guk": "https://images.unsplash.com/photo-1564621592411-07ff52429661?w=400&h=300&fit=crop",  # Bean sprout soup
    "thai-mixed-veggie": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",  # Vegetable stir-fry
    "thai-tofu-clear-soup": "https://images.unsplash.com/photo-1612874742237-415c88e1d5cc?w=400&h=300&fit=crop",  # Tofu soup
    "wing-bean-salad": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",  # Salad
    "ginger-fish": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",  # Fish
    "thai-steamed-egg": "https://images.unsplash.com/photo-1482049016688-2d3e1bd0fd80?w=400&h=300&fit=crop",  # Steamed egg
    "thai-clear-veggie-soup": "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",  # Vegetable soup
    "mushroom-yum": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",  # Mushroom salad
    "canh-chua-chay": "https://images.unsplash.com/photo-1612874742237-415c88e1d5cc?w=400&h=300&fit=crop",  # Soup
}

# Read recipes
with open('/Users/kate/Desktop/Kate/opencode/dinner-recipe/src/data/recipes.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Update images
for recipe in data['recipes']:
    slug = recipe.get('slug')
    if slug in image_map:
        recipe['image'] = image_map[slug]

# Write back
with open('/Users/kate/Desktop/Kate/opencode/dinner-recipe/src/data/recipes.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("✓ Updated recipe images successfully!")
