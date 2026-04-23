import json

with open('src/data/recipes.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Calculate next ID
next_id = int(data['recipes'][-1]['id']) + 1

new_recipes = [
    # WESTERN - Quick & Diabetic Friendly
    {"id": str(next_id), "slug": "garlic-butter-prawns", "title": "蒜香牛油蝦", "titleEn": "Garlic Butter Prawns", "cuisine": "western", "budget": 90, "serves": 2, "time": 10, "difficulty": "easy", "dietary": ["diabetic-friendly", "low-carb", "gluten-free"], "image": "https://images.unsplash.com/photo-1567614775292-54d440642117?w=400&auto=format&fit=crop&q=60", "description": "快手蒜香，蝦肉鮮嫩", "ingredients": ["蝦 300g", "蒜蓉 3茶匙", "牛油 1湯匙", "黑胡椒 1茶匙"], "steps": ["蝦洗淨", "牛油熱鑊爆蒜", "加蝦炒至變紅", "加黑胡椒即可"], "tips": "時間緊不要煮太長"},
    {"id": str(next_id+1), "slug": "pan-seared-salmon", "title": "煎三文魚", "titleEn": "Pan-seared Salmon", "cuisine": "western", "budget": 85, "serves": 2, "time": 12, "difficulty": "easy", "dietary": ["diabetic-friendly", "low-carb", "gluten-free"], "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&auto=format&fit=crop&q=60", "description": "Omega-3豐富，快手必備", "ingredients": ["三文魚 300g", "鹽 少許", "油 1湯匙", "檸檬 1/2個"], "steps": ["三文魚擦乾", "熱鑊下油", "皮面下煎4分鐘", "翻面煎2分鐘", "擠檸檬汁"], "tips": "不要煮太久保持多汁"},
    {"id": str(next_id+2), "slug": "garlic-broccoli", "title": "蒜香西蘭花", "titleEn": "Garlic Broccoli", "cuisine": "western", "budget": 20, "serves": 2, "time": 8, "difficulty": "easy", "dietary": ["diabetic-friendly", "low-carb", "gluten-free"], "image": "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&auto=format&fit=crop&q=60", "description": "最簡單最健康", "ingredients": ["西蘭花 300g", "蒜 3瓣", "油 1湯匙", "鹽 少許"], "steps": ["西蘭花切小朵", "蒜片", "熱鑊炒蒜", "加西蘭花快炒", "加鹽即可"], "tips": "保持西蘭花爽身口感"},

    # INDIAN - Quick & Diabetic Friendly  
    {"id": str(next_id+3), "slug": "indian-dal", "title": "印度扁豆咖喱", "titleEn": "Indian Dal Curry", "cuisine": "indian", "budget": 25, "serves": 2, "time": 25, "difficulty": "easy", "dietary": ["diabetic-friendly", "low-carb", "gluten-free"], "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60", "description": "高蛋白質，香料豐富", "ingredients": ["紅扁豆 150g", "洋蔥 1個", "蒜 2瓣", "薑 1段", "咖喱粉 1湯匙"], "steps": ["洋蔥蒜薑炒香", "加咖喱粉炒香", "加扁豆及水煮", "加鹽調味"], "tips": "提前浸扁豆會更快"},
    {"id": str(next_id+4), "slug": "tandoori-chicken", "title": "印度烤雞", "titleEn": "Tandoori Chicken", "cuisine": "indian", "budget": 50, "serves": 2, "time": 20, "difficulty": "easy", "dietary": ["diabetic-friendly", "low-carb", "gluten-free"], "image": "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&auto=format&fit=crop&q=60", "description": "香料烤雞，香氣撲鼻", "ingredients": ["雞腿 2隻", "乳酪 100ml", "薑蓉 1湯匙", "香料粉 1茶匙"], "steps": ["混合乳酪香料", "雞腿醃30分鐘", "烤箱200°C烤15分鐘"], "tips": "提前醃會更入味"],
    {"id": str(next_id+5), "slug": "paneer-stir-fry", "title": "印度起司炒菜", "titleEn": "Paneer Stir-fry", "cuisine": "indian", "budget": 40, "serves": 2, "time": 12, "difficulty": "easy", "dietary": ["diabetic-friendly", "low-carb", "gluten-free"], "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60", "description": "素食高蛋白質", "ingredients": ["印度起司 200g", "蔬菜 200g", "洋蔥 1個", "香料粉 1茶匙"], "steps": ["起司切塊", "熱鑊炒蔬菜", "加起司炒香", "加香料即可"], "tips": "快炒保持起司形狀"],

    # MEDITERRANEAN - Quick & Diabetic Friendly
    {"id": str(next_id+6), "slug": "mediterranean-salad", "title": "地中海沙律", "titleEn": "Mediterranean Salad", "cuisine": "mediterranean", "budget": 35, "serves": 2, "time": 10, "difficulty": "easy", "dietary": ["diabetic-friendly", "low-carb", "gluten-free"], "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60", "description": "新鮮健康，5分鐘完成", "ingredients": ["番茄 2個", "黃瓜 1條", "紫洋蔥 1/4個", "橄欖 50g", "橄欖油 2湯匙"], "steps": ["番茄黃瓜切塊", "洋蔥切絲", "混合所有材料", "淋橄欖油即可"], "tips": "隨時可做快手餐"],
    {"id": str(next_id+7), "slug": "grilled-fish", "title": "地中海烤魚", "titleEn": "Grilled Fish", "cuisine": "mediterranean", "budget": 70, "serves": 2, "time": 15, "difficulty": "easy", "dietary": ["diabetic-friendly", "low-carb", "gluten-free"], "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&auto=format&fit=crop&q=60", "description": "清淡鮮甜，簡單快手", "ingredients": ["白魚 400g", "檸檬 1個", "橄欖油 2湯匙", "蒜 2瓣"], "steps": ["魚洗淨", "放上檸檬蒜", "淋橄欖油", "烤箱190°C烤12分鐘"], "tips": "用錫紙包裝易清潔"],
    {"id": str(next_id+8), "slug": "hummus", "title": "地中海鷹嘴豆醬", "titleEn": "Hummus", "cuisine": "mediterranean", "budget": 20, "serves": 4, "time": 8, "difficulty": "easy", "dietary": ["diabetic-friendly", "low-carb", "gluten-free"], "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60", "description": "健康醬料，配菜佳品", "ingredients": ["鷹嘴豆罐 400g", "芝麻醬 2湯匙", "檸檬汁 2湯匙", "蒜 1瓣"], "steps": ["鷹嘴豆瀝乾", "放攪拌機", "加檸檬蒜", "攪至順滑"], "tips": "可存放一週"],

    # FRENCH - Quick & Diabetic Friendly
    {"id": str(next_id+9), "slug": "french-omelette", "title": "法式蛋卷", "titleEn": "French Omelette", "cuisine": "french", "budget": 25, "serves": 1, "time": 8, "difficulty": "easy", "dietary": ["diabetic-friendly", "low-carb", "gluten-free"], "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60", "description": "經典快手，5分鐘搞定", "ingredients": ["蛋 3隻", "牛油 1茶匙", "鹽及黑胡椒"], "steps": ["蛋打散", "熱鑊下牛油", "倒蛋液", "半熟時折起"], "tips": "火候掌握好不會老"],
    {"id": str(next_id+10), "slug": "french-green-beans", "title": "法式煮豆", "titleEn": "French Green Beans", "cuisine": "french", "budget": 20, "serves": 2, "time": 10, "difficulty": "easy", "dietary": ["diabetic-friendly", "low-carb", "gluten-free"], "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=60", "description": "清淡爽身，經典配菜", "ingredients": ["豆角 300g", "蒜 2瓣", "檸檬 1/2個", "橄欖油 1湯匙"], "steps": ["豆角飛水", "蒜下鑊炒香", "加豆角炒", "加檸檬汁即可"], "tips": "保持豆角爽身感"],

    # ITALIAN - Quick & Diabetic Friendly
    {"id": str(next_id+11), "slug": "italian-pasta", "title": "意大利番茄意粉", "titleEn": "Italian Tomato Pasta", "cuisine": "italian", "budget": 45, "serves": 2, "time": 15, "difficulty": "easy", "dietary": ["gluten-free"], "image": "https://images.unsplash.com/photo-1612874742237-415c88e1d5cc?w=400&auto=format&fit=crop&q=60", "description": "經典意粉，快手必備", "ingredients": ["意粉 200g", "番茄罐 400g", "蒜 2瓣", "橄欖油 1湯匙"], "steps": ["煮意粉", "蒜下鑊炒香", "加番茄煮10分鐘", "混合即可"], "tips": "用番茄罐頭更方便"],
    {"id": str(next_id+12), "slug": "caprese", "title": "意大利番茄芝士", "titleEn": "Caprese Salad", "cuisine": "italian", "budget": 50, "serves": 2, "time": 5, "difficulty": "easy", "dietary": ["diabetic-friendly", "low-carb", "gluten-free"], "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60", "description": "最快5分鐘完成", "ingredients": ["番茄 2個", "芝士 200g", "羅勒 1束", "橄欖油 2湯匙"], "steps": ["番茄切片", "芝士切片", "交替鋪排", "淋橄欖油加羅勒"], "tips": "新鮮食材最重要"],

    # BRITISH - Quick & Diabetic Friendly
    {"id": str(next_id+13), "slug": "british-egg", "title": "英式炒蛋", "titleEn": "British Scrambled Eggs", "cuisine": "british", "budget": 20, "serves": 2, "time": 8, "difficulty": "easy", "dietary": ["diabetic-friendly", "low-carb", "gluten-free"], "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60", "description": "快手早餐，蓬鬆軟滑", "ingredients": ["蛋 4隻", "牛油 1湯匙", "奶 1湯匙", "鹽及黑胡椒"], "steps": ["蛋打散", "牛油下鑊", "倒蛋液", "慢速攪至軟"], "tips": "慢火令蛋更軟滑"],
    {"id": str(next_id+14), "slug": "british-mushroom", "title": "英式炒蘑菇", "titleEn": "British Sautéed Mushrooms", "cuisine": "british", "budget": 25, "serves": 2, "time": 10, "difficulty": "easy", "dietary": ["diabetic-friendly", "low-carb", "gluten-free"], "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop&q=60", "description": "健康配菜，5分鐘搞定", "ingredients": ["蘑菇 300g", "蒜 2瓣", "牛油 1湯匙", "百里香 1枝"], "steps": ["蘑菇切件", "蒜切片", "牛油下鑊爆蒜", "加蘑菇炒", "加百里香"], "tips": "高火快炒更香"],

    # THAI - More Quick & Diabetic Friendly
    {"id": str(next_id+15), "slug": "thai-basil-chicken", "title": "泰式九層塔雞", "titleEn": "Thai Basil Chicken", "cuisine": "thai", "budget": 40, "serves": 2, "time": 12, "difficulty": "easy", "dietary": ["diabetic-friendly", "low-carb", "gluten-free"], "image": "https://images.unsplash.com/photo-1628840042765-356cda07f4db?w=400&auto=format&fit=crop&q=60", "description": "辣身香氣，快手下飯", "ingredients": ["雞肉 250g", "九層塔 50g", "辣椒 1條", "蒜 3瓣", "魚露 1湯匙"], "steps": ["雞肉炒至熟", "加蒜辣椒", "加魚露", "加九層塔即可"], "tips": "香草最後加保香氣"],
    {"id": str(next_id+16), "slug": "thai-papaya-salad", "title": "泰式木瓜沙律", "titleEn": "Thai Papaya Salad", "cuisine": "thai", "budget": 30, "serves": 2, "time": 8, "difficulty": "easy", "dietary": ["diabetic-friendly", "low-carb", "gluten-free"], "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60", "description": "酸辣爽口，即做即食", "ingredients": ["青木瓜 200g", "番茄 1個", "檸檬汁 2湯匙", "魚露 1湯匙", "辣椒 1條"], "steps": ["木瓜擂碎", "加番茄", "加檸檬魚露", "加辣椒即可"], "tips": "要即刻食避免軟身"],

    # KOREAN - More Quick & Diabetic Friendly
    {"id": str(next_id+17), "slug": "korean-egg-roll", "title": "韓式蛋卷", "titleEn": "Korean Egg Roll", "cuisine": "korean", "budget": 25, "serves": 2, "time": 10, "difficulty": "easy", "dietary": ["diabetic-friendly", "low-carb", "gluten-free"], "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60", "description": "嫩滑多層，韓式早餐", "ingredients": ["蛋 4隻", "油 1湯匙", "鹽 少許"], "steps": ["蛋打散", "熱鑊下油", "薄薄倒一層蛋液", "等半熟捲起", "重複直至完成"], "tips": "薄火多層令口感豐富"],
    {"id": str(next_id+18), "slug": "korean-spinach", "title": "韓式菠菜", "titleEn": "Korean Spinach Namul", "cuisine": "korean", "budget": 20, "serves": 2, "time": 8, "difficulty": "easy", "dietary": ["diabetic-friendly", "low-carb", "gluten-free"], "image": "https://images.unsplash.com/photo-1576021182211-9ea8dced3690?w=400&auto=format&fit=crop&q=60", "description": "快手菜，清淡健康", "ingredients": ["菠菜 200g", "蒜蓉 1茶匙", "芝麻油 1茶匙", "鹽 少許"], "steps": ["菠菜飛水", "過冷河", "擠乾", "加蒜蓉芝麻油鹽"], "tips": "一分鐘完成"],

    # VIETNAMESE - More Quick & Diabetic Friendly
    {"id": str(next_id+19), "slug": "vietnamese-rolls", "title": "越南春捲", "titleEn": "Vietnamese Spring Rolls", "cuisine": "vietnamese", "budget": 35, "serves": 2, "time": 12, "difficulty": "easy", "dietary": ["diabetic-friendly", "low-carb", "gluten-free"], "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop&q=60", "description": "清爽低卡，5分鐘完成", "ingredients": ["米紙 8張", "蝦 150g", "生菜 100g", "紫洋蔥 50g", "香草 50g"], "steps": ["蝦煮熟", "米紙浸軟", "鋪生菜蝦香草", "捲起", "蘸魚露醬"], "tips": "米紙浸一秒即可"],
]

# Add all recipes
for i, recipe in enumerate(new_recipes):
    recipe['id'] = str(next_id + i)

data['recipes'].extend(new_recipes)

# Write back
with open('src/data/recipes.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"✓ Added {len(new_recipes)} new recipes!")
print(f"✓ Total recipes: {len(data['recipes'])}")
