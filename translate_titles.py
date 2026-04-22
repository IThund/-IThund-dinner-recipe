#!/usr/bin/env python3
"""Translate all recipe titles to Traditional Chinese."""

import json

# Translation mapping for non-Chinese titles
title_translations = {
    # Japanese
    "菠菜おひたし": "菠菜冷拌",
    "しらたき炒め": "蒟蒻麵炒",
    "きゅうりの酢の物": "黃瓜醋拌",
    "鮭のムニエル": "煎鮭魚",
    "豆腐ステーキ": "豆腐煎排",
    # Korean
    "냉두부": "冷豆腐",
    "시금치나물": "菠菜拌菜",
    "계란국": "蛋湯",
    "두부조림": "辣豆腐燉",
    "오이무침": "辣黃瓜拌",
    "된장찌개": "豆瓣醬鍋",
    "콩나물국": "豆芽湯",
    # Thai
    "ผัดผักรวม": "泰式混合蔬菜炒",
    "ต้มจืดเต้าหู้": "泰式清湯豆腐",
    "ยำถั่วพู": "泰式豆沙拌",
    "ปลาผัดขิง": "泰式薑魚炒",
    "ไข่ตุ๋น": "泰式蒸蛋",
    "แกงจืดผักรวม": "泰式清蔬湯",
    "ยำเห็ด": "泰式蘑菇沙律",
    # Vietnamese
    "Canh chua chay": "越式酸菜素湯",
    "Đậu phụ sốt cà chua": "越式番茄豆腐",
    "Gỏi bắp cải": "越式高麗菜沙律",
    "Trứng hấp": "越式香草蒸蛋",
    "Canh rau muống": "越式蕹菜湯",
    "Bò xào rau cần": "越式牛肉芹菜炒",
    "Gỏi ngó sen": "越式蓮根沙律",
}

# Read recipes
with open('/Users/kate/Desktop/Kate/opencode/dinner-recipe/src/data/recipes.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Update titles
for recipe in data['recipes']:
    current_title = recipe.get('title', '')
    if current_title in title_translations:
        recipe['title'] = title_translations[current_title]

# Write back
with open('/Users/kate/Desktop/Kate/opencode/dinner-recipe/src/data/recipes.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("✓ All recipe titles translated to Traditional Chinese!")
