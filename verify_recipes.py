import json

with open('src/data/recipes.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"✓ Total recipes: {len(data['recipes'])}")
print(f"\n📊 Breakdown by cuisine:")
cuisines = {}
for recipe in data['recipes']:
    c = recipe['cuisine']
    cuisines[c] = cuisines.get(c, 0) + 1

for cuisine, count in sorted(cuisines.items()):
    print(f"  • {cuisine}: {count} recipes")

print(f"\n⏱️ Breakdown by preparation time:")
time_ranges = {"<10min": 0, "10-15min": 0, "16-25min": 0, ">25min": 0}
for recipe in data['recipes']:
    t = recipe['time']
    if t < 10: time_ranges["<10min"] += 1
    elif t < 16: time_ranges["10-15min"] += 1
    elif t < 26: time_ranges["16-25min"] += 1
    else: time_ranges[">25min"] += 1

for range_label, count in time_ranges.items():
    print(f"  • {range_label}: {count} recipes")

print(f"\n💰 Budget breakdown:")
budget_ranges = {"<$25": 0, "$25-50": 0, "$51-80": 0, ">$80": 0}
for recipe in data['recipes']:
    b = recipe['budget']
    if b < 25: budget_ranges["<$25"] += 1
    elif b < 51: budget_ranges["$25-50"] += 1
    elif b < 81: budget_ranges["$51-80"] += 1
    else: budget_ranges[">$80"] += 1

for range_label, count in budget_ranges.items():
    print(f"  • {range_label}: {count} recipes")

print(f"\n🏷️ Dietary tags (total recipes marked):")
dietary_tags = {}
for recipe in data['recipes']:
    for tag in recipe['dietary']:
        dietary_tags[tag] = dietary_tags.get(tag, 0) + 1

for tag, count in sorted(dietary_tags.items()):
    print(f"  • {tag}: {count} recipes")

print(f"\n✅ Sample recipes:")
for i in [0, 50, 99]:
    r = data['recipes'][i]
    print(f"  Recipe {r['id']}: {r['title']} ({r['titleEn']}) - {r['cuisine']} - {r['time']}min - ${r['budget']}")
