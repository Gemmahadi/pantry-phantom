// Pantry Phantom — recipe database.
// Every recipe is a real, cookable recipe. The spooky name is the costume;
// the ingredients and steps underneath are genuine.
// Ingredient `key` is the canonical pantry key used for matching.

const RECIPES = [
  {
    id: "witchs-brew-pumpkin-soup",
    name: "Witch's Brew Pumpkin Soup",
    tagline: "Silky, spiced, and suspiciously orange.",
    time: 35, difficulty: "Easy", servings: 4,
    tags: ["vegetarian", "gluten-free", "spooky"],
    ingredients: [
      { key: "pumpkin", name: "Pumpkin", qty: "1 kg, peeled & cubed" },
      { key: "onion", name: "Onion", qty: "1, chopped" },
      { key: "garlic", name: "Garlic", qty: "3 cloves" },
      { key: "vegetable stock", name: "Vegetable stock", qty: "750 ml" },
      { key: "cream", name: "Cream", qty: "120 ml" },
      { key: "butter", name: "Butter", qty: "1 tbsp" },
      { key: "ginger", name: "Fresh ginger", qty: "1 tsp, grated" },
      { key: "nutmeg", name: "Nutmeg", qty: "A pinch" }
    ],
    steps: [
      "Melt the butter in a large pot over medium heat. Add the onion and cook until soft, about 5 minutes.",
      "Stir in the garlic and ginger and cook for 1 minute until fragrant.",
      "Add the pumpkin and vegetable stock. Bring to a boil, then simmer 20 minutes until the pumpkin is tender.",
      "Blend until completely smooth, then stir in the cream and nutmeg. Season with salt and pepper.",
      "Serve hot with a swirl of cream — draw a spiderweb with a toothpick if you dare."
    ]
  },
  {
    id: "mummy-dogs",
    name: "Mummy Dogs",
    tagline: "Sausages wrapped like the undead. Kids love them.",
    time: 25, difficulty: "Easy", servings: 4,
    tags: ["spooky"],
    ingredients: [
      { key: "sausage", name: "Sausages / hot dogs", qty: "8" },
      { key: "puff pastry", name: "Puff pastry", qty: "1 sheet" },
      { key: "egg", name: "Egg", qty: "1, beaten" },
      { key: "mustard", name: "Mustard", qty: "To serve" }
    ],
    steps: [
      "Heat the oven to 200°C and line a baking tray.",
      "Cut the pastry into thin strips, about 1 cm wide.",
      "Wrap each sausage in pastry strips, leaving a small gap near the top for the face.",
      "Brush with beaten egg and bake 15–18 minutes until golden.",
      "Dot two mustard eyes on each mummy and serve warm."
    ]
  },
  {
    id: "ghost-pasta",
    name: "Ghostly Garlic Butter Pasta",
    tagline: "Pale, creamy, and gone in minutes.",
    time: 20, difficulty: "Easy", servings: 2,
    tags: ["vegetarian", "spooky"],
    ingredients: [
      { key: "pasta", name: "Pasta", qty: "250 g" },
      { key: "garlic", name: "Garlic", qty: "4 cloves, sliced" },
      { key: "butter", name: "Butter", qty: "50 g" },
      { key: "parmesan", name: "Parmesan", qty: "40 g, grated" },
      { key: "cream", name: "Cream", qty: "80 ml" },
      { key: "parsley", name: "Parsley", qty: "A small handful" }
    ],
    steps: [
      "Cook the pasta in salted water until al dente. Save a cup of the pasta water.",
      "Melt the butter in a pan and gently fry the garlic until pale gold — do not let it brown.",
      "Pour in the cream, then add the drained pasta and a splash of pasta water.",
      "Toss with the parmesan until a glossy sauce coats every strand.",
      "Serve with extra parmesan and chopped parsley."
    ]
  },
  {
    id: "vampire-tomato-soup",
    name: "Vampire's Tomato Soup",
    tagline: "Blood-red, rich, and best after dark.",
    time: 30, difficulty: "Easy", servings: 4,
    tags: ["vegetarian", "vegan-option", "gluten-free", "spooky"],
    ingredients: [
      { key: "tomato", name: "Tomatoes", qty: "800 g, chopped" },
      { key: "onion", name: "Onion", qty: "1, chopped" },
      { key: "garlic", name: "Garlic", qty: "3 cloves" },
      { key: "vegetable stock", name: "Vegetable stock", qty: "500 ml" },
      { key: "basil", name: "Fresh basil", qty: "A handful" },
      { key: "olive oil", name: "Olive oil", qty: "2 tbsp" },
      { key: "sugar", name: "Sugar", qty: "1 tsp" }
    ],
    steps: [
      "Heat the olive oil and soften the onion for 5 minutes.",
      "Add the garlic, then the tomatoes, stock and sugar.",
      "Simmer 20 minutes, then blend until smooth.",
      "Stir in the basil, season, and serve with crusty bread."
    ]
  },
  {
    id: "graveyard-tacos",
    name: "Graveyard Tacos",
    tagline: "Crunchy shells, buried treasure filling.",
    time: 25, difficulty: "Easy", servings: 4,
    tags: ["spooky"],
    ingredients: [
      { key: "ground beef", name: "Ground beef", qty: "500 g" },
      { key: "taco shells", name: "Taco shells", qty: "8" },
      { key: "tomato", name: "Tomato", qty: "2, diced" },
      { key: "lettuce", name: "Lettuce", qty: "1 cup, shredded" },
      { key: "cheese", name: "Cheddar cheese", qty: "100 g, grated" },
      { key: "onion", name: "Onion", qty: "1/2, diced" },
      { key: "cumin", name: "Cumin", qty: "1 tsp" },
      { key: "paprika", name: "Paprika", qty: "1 tsp" }
    ],
    steps: [
      "Brown the beef with the onion, cumin and paprika, about 8 minutes.",
      "Warm the taco shells in the oven for 3 minutes.",
      "Fill each shell with beef, tomato, lettuce and cheese.",
      "Serve immediately — tacos wait for no ghost."
    ]
  },
  {
    id: "pumpkin-spice-pancakes",
    name: "Pumpkin Spice Pancakes",
    tagline: "A haunted stack for slow mornings.",
    time: 25, difficulty: "Easy", servings: 4,
    tags: ["vegetarian", "spooky"],
    ingredients: [
      { key: "flour", name: "Flour", qty: "200 g" },
      { key: "pumpkin puree", name: "Pumpkin puree", qty: "200 g" },
      { key: "milk", name: "Milk", qty: "250 ml" },
      { key: "egg", name: "Egg", qty: "2" },
      { key: "sugar", name: "Sugar", qty: "2 tbsp" },
      { key: "baking powder", name: "Baking powder", qty: "2 tsp" },
      { key: "cinnamon", name: "Cinnamon", qty: "1 tsp" },
      { key: "butter", name: "Butter", qty: "For frying" }
    ],
    steps: [
      "Whisk the flour, sugar, baking powder and cinnamon in a bowl.",
      "In another bowl, whisk the pumpkin puree, milk and eggs.",
      "Combine wet and dry ingredients — lumps are fine, over-mixing is not.",
      "Fry small ladles in butter, 2 minutes per side, until golden.",
      "Stack high and serve with maple syrup."
    ]
  },
  {
    id: "spider-web-pizza",
    name: "Spiderweb Pizza",
    tagline: "Mozzarella webs over a bubbling cauldron of tomato.",
    time: 30, difficulty: "Easy", servings: 2,
    tags: ["vegetarian", "spooky"],
    ingredients: [
      { key: "pizza dough", name: "Pizza dough", qty: "1 base" },
      { key: "tomato sauce", name: "Tomato sauce", qty: "120 ml" },
      { key: "mozzarella", name: "Mozzarella", qty: "150 g" },
      { key: "olive oil", name: "Olive oil", qty: "1 tbsp" },
      { key: "basil", name: "Fresh basil", qty: "A few leaves" }
    ],
    steps: [
      "Heat the oven to 220°C.",
      "Spread tomato sauce over the dough, leaving a small border.",
      "Scatter mozzarella, then drizzle with olive oil.",
      "Bake 12–15 minutes until the crust is golden and the cheese bubbles.",
      "Pipe thin lines of extra mozzarella in a web pattern and add basil."
    ]
  },
  {
    id: "bat-wing-chicken",
    name: "Bat Wing Chicken",
    tagline: "Sticky, dark-glazed wings that fly off the plate.",
    time: 45, difficulty: "Medium", servings: 4,
    tags: ["gluten-free", "spooky"],
    ingredients: [
      { key: "chicken wings", name: "Chicken wings", qty: "800 g" },
      { key: "soy sauce", name: "Soy sauce", qty: "3 tbsp" },
      { key: "honey", name: "Honey", qty: "2 tbsp" },
      { key: "garlic", name: "Garlic", qty: "3 cloves, minced" },
      { key: "ginger", name: "Fresh ginger", qty: "1 tsp, grated" },
      { key: "chili flakes", name: "Chili flakes", qty: "1/2 tsp" }
    ],
    steps: [
      "Heat the oven to 200°C and line a tray with foil.",
      "Mix the soy sauce, honey, garlic, ginger and chili flakes.",
      "Toss the wings in half the glaze and roast 35 minutes, turning once.",
      "Brush with the remaining glaze and roast 5 more minutes until sticky and dark.",
      "Rest 5 minutes before serving."
    ]
  },
  {
    id: "cauldron-chili",
    name: "Cauldron Chili",
    tagline: "One pot, bubbling for hours, feeds a whole coven.",
    time: 60, difficulty: "Easy", servings: 6,
    tags: ["gluten-free", "spooky"],
    ingredients: [
      { key: "ground beef", name: "Ground beef", qty: "500 g" },
      { key: "kidney beans", name: "Kidney beans", qty: "400 g, drained" },
      { key: "tomato", name: "Tomatoes", qty: "400 g, chopped" },
      { key: "onion", name: "Onion", qty: "1, chopped" },
      { key: "garlic", name: "Garlic", qty: "3 cloves" },
      { key: "cumin", name: "Cumin", qty: "2 tsp" },
      { key: "paprika", name: "Paprika", qty: "1 tbsp" },
      { key: "chili powder", name: "Chili powder", qty: "1 tsp" },
      { key: "vegetable stock", name: "Vegetable stock", qty: "250 ml" }
    ],
    steps: [
      "Brown the beef and onion in a large pot, about 8 minutes.",
      "Stir in the garlic and all the spices and cook 1 minute.",
      "Add the tomatoes, beans and stock. Bring to a simmer.",
      "Cook on low for 40 minutes, stirring now and then.",
      "Season and serve with rice or bread."
    ]
  },
  {
    id: "monster-mash-potatoes",
    name: "Monster Mash Potatoes",
    tagline: "Creamy, buttery, with a green surprise.",
    time: 30, difficulty: "Easy", servings: 4,
    tags: ["vegetarian", "gluten-free", "spooky"],
    ingredients: [
      { key: "potato", name: "Potatoes", qty: "800 g" },
      { key: "butter", name: "Butter", qty: "50 g" },
      { key: "milk", name: "Milk", qty: "100 ml" },
      { key: "spinach", name: "Spinach", qty: "100 g" },
      { key: "garlic", name: "Garlic", qty: "2 cloves" },
      { key: "parmesan", name: "Parmesan", qty: "30 g" }
    ],
    steps: [
      "Boil the potatoes in salted water until tender, about 20 minutes.",
      "Wilt the spinach with the garlic in a pan for 2 minutes.",
      "Drain the potatoes, then mash with the butter and warm milk.",
      "Fold in the spinach and parmesan until the mash turns monster-green.",
      "Season and serve hot."
    ]
  },
  {
    id: "eyeball-meatballs",
    name: "Eyeball Meatballs",
    tagline: "Pasta night, but make it stare back.",
    time: 40, difficulty: "Medium", servings: 4,
    tags: ["spooky"],
    ingredients: [
      { key: "ground beef", name: "Ground beef", qty: "500 g" },
      { key: "breadcrumbs", name: "Breadcrumbs", qty: "50 g" },
      { key: "egg", name: "Egg", qty: "1" },
      { key: "garlic", name: "Garlic", qty: "2 cloves" },
      { key: "mozzarella", name: "Mozzarella", qty: "100 g, cubed" },
      { key: "tomato sauce", name: "Tomato sauce", qty: "400 ml" },
      { key: "pasta", name: "Pasta", qty: "300 g" },
      { key: "olive oil", name: "Olive oil", qty: "1 tbsp" }
    ],
    steps: [
      "Mix the beef, breadcrumbs, egg and garlic. Shape into balls, hiding a mozzarella cube inside each one.",
      "Brown the meatballs in olive oil, about 8 minutes.",
      "Pour in the tomato sauce and simmer 15 minutes.",
      "Cook the pasta, then serve the meatballs over it — the melted mozzarella is the eyeball."
    ]
  },
  {
    id: "haunted-fried-rice",
    name: "Haunted Fried Rice",
    tagline: "Yesterday's rice, resurrected.",
    time: 20, difficulty: "Easy", servings: 2,
    tags: ["vegetarian", "spooky"],
    ingredients: [
      { key: "rice", name: "Cooked rice", qty: "400 g, day-old" },
      { key: "egg", name: "Egg", qty: "2" },
      { key: "soy sauce", name: "Soy sauce", qty: "2 tbsp" },
      { key: "garlic", name: "Garlic", qty: "2 cloves" },
      { key: "carrot", name: "Carrot", qty: "1, diced" },
      { key: "peas", name: "Peas", qty: "100 g" },
      { key: "spring onion", name: "Spring onion", qty: "2, sliced" },
      { key: "vegetable oil", name: "Vegetable oil", qty: "2 tbsp" }
    ],
    steps: [
      "Scramble the eggs in a hot wok and set aside.",
      "Fry the garlic, carrot and peas in the oil for 3 minutes.",
      "Add the rice and soy sauce, tossing until every grain is coated.",
      "Fold the egg back in, top with spring onion, and serve."
    ]
  },
  {
    id: "potion-smoothie",
    name: "Witch's Potion Smoothie",
    tagline: "Green, glowing, and actually good for you.",
    time: 10, difficulty: "Easy", servings: 2,
    tags: ["vegetarian", "vegan", "gluten-free", "spooky"],
    ingredients: [
      { key: "banana", name: "Banana", qty: "2" },
      { key: "spinach", name: "Spinach", qty: "1 big handful" },
      { key: "milk", name: "Milk or oat milk", qty: "250 ml" },
      { key: "peanut butter", name: "Peanut butter", qty: "1 tbsp" },
      { key: "honey", name: "Honey", qty: "1 tsp" }
    ],
    steps: [
      "Put everything in a blender.",
      "Blend on high for 60 seconds until completely smooth.",
      "Pour into glasses and serve immediately."
    ]
  },
  {
    id: "crypt-keeper-salad",
    name: "Crypt Keeper Salad",
    tagline: "Crunchy, fresh, and far from dead.",
    time: 15, difficulty: "Easy", servings: 2,
    tags: ["vegetarian", "vegan", "gluten-free", "spooky"],
    ingredients: [
      { key: "lettuce", name: "Lettuce", qty: "1 head" },
      { key: "cucumber", name: "Cucumber", qty: "1" },
      { key: "tomato", name: "Tomatoes", qty: "2" },
      { key: "carrot", name: "Carrot", qty: "1, grated" },
      { key: "olive oil", name: "Olive oil", qty: "3 tbsp" },
      { key: "lemon", name: "Lemon", qty: "1/2, juiced" }
    ],
    steps: [
      "Wash and chop all the vegetables.",
      "Whisk the olive oil and lemon juice with salt and pepper.",
      "Toss everything together and serve straight away."
    ]
  },
  {
    id: "zombie-avocado-toast",
    name: "Zombie Avocado Toast",
    tagline: "It just won't stay dead — and neither will your hunger.",
    time: 10, difficulty: "Easy", servings: 1,
    tags: ["vegetarian", "vegan-option", "spooky"],
    ingredients: [
      { key: "bread", name: "Bread", qty: "2 slices" },
      { key: "avocado", name: "Avocado", qty: "1, ripe" },
      { key: "egg", name: "Egg", qty: "1" },
      { key: "lemon", name: "Lemon", qty: "A squeeze" },
      { key: "chili flakes", name: "Chili flakes", qty: "A pinch" }
    ],
    steps: [
      "Toast the bread until golden.",
      "Fry the egg sunny-side up.",
      "Mash the avocado with lemon juice and salt, then spread it on the toast.",
      "Top with the egg and chili flakes."
    ]
  },
  {
    id: "full-moon-ramen",
    name: "Full Moon Ramen",
    tagline: "A steaming bowl under a yolk moon.",
    time: 25, difficulty: "Medium", servings: 2,
    tags: ["spooky"],
    ingredients: [
      { key: "instant noodles", name: "Instant noodles", qty: "2 packs" },
      { key: "egg", name: "Egg", qty: "2" },
      { key: "soy sauce", name: "Soy sauce", qty: "1 tbsp" },
      { key: "spring onion", name: "Spring onion", qty: "2, sliced" },
      { key: "carrot", name: "Carrot", qty: "1, julienned" },
      { key: "chicken", name: "Chicken breast", qty: "200 g, sliced" },
      { key: "garlic", name: "Garlic", qty: "2 cloves" }
    ],
    steps: [
      "Soft-boil the eggs for 6.5 minutes, then cool and peel.",
      "Stir-fry the chicken and garlic until cooked through.",
      "Cook the noodles, then add the soy sauce and chicken.",
      "Serve in bowls, halved eggs on top like a full moon, with spring onion and carrot."
    ]
  },
  {
    id: "skeleton-ribs",
    name: "Skeleton Ribs",
    tagline: "Fall-off-the-bone, pick-up-with-your-hands.",
    time: 120, difficulty: "Medium", servings: 4,
    tags: ["gluten-free", "spooky"],
    ingredients: [
      { key: "pork ribs", name: "Pork ribs", qty: "1 kg" },
      { key: "bbq sauce", name: "BBQ sauce", qty: "150 ml" },
      { key: "garlic", name: "Garlic", qty: "3 cloves" },
      { key: "paprika", name: "Paprika", qty: "1 tbsp" },
      { key: "brown sugar", name: "Brown sugar", qty: "1 tbsp" }
    ],
    steps: [
      "Heat the oven to 160°C.",
      "Rub the ribs with garlic, paprika and brown sugar.",
      "Wrap in foil and bake 90 minutes.",
      "Unwrap, brush with BBQ sauce and bake 20 more minutes until sticky.",
      "Rest 10 minutes, then slice between the bones."
    ]
  },
  {
    id: "candy-corn-cookies",
    name: "Candy Corn Cookies",
    tagline: "Tri-coloured, buttery, and gone before midnight.",
    time: 40, difficulty: "Medium", servings: 12,
    tags: ["vegetarian", "spooky"],
    ingredients: [
      { key: "flour", name: "Flour", qty: "250 g" },
      { key: "butter", name: "Butter", qty: "150 g, softened" },
      { key: "sugar", name: "Sugar", qty: "120 g" },
      { key: "egg", name: "Egg", qty: "1" },
      { key: "baking powder", name: "Baking powder", qty: "1 tsp" },
      { key: "vanilla extract", name: "Vanilla extract", qty: "1 tsp" }
    ],
    steps: [
      "Cream the butter and sugar, then beat in the egg and vanilla.",
      "Mix in the flour and baking powder to form a dough.",
      "Divide into three parts; tint one orange and one yellow with food colouring.",
      "Roll into logs, stack the three colours, and chill 30 minutes.",
      "Slice into triangles and bake at 180°C for 10–12 minutes."
    ]
  },
  {
    id: "black-cat-brownies",
    name: "Black Cat Brownies",
    tagline: "Dark, fudgy, and nine lives of chocolate.",
    time: 45, difficulty: "Easy", servings: 9,
    tags: ["vegetarian", "spooky"],
    ingredients: [
      { key: "dark chocolate", name: "Dark chocolate", qty: "200 g" },
      { key: "butter", name: "Butter", qty: "150 g" },
      { key: "sugar", name: "Sugar", qty: "180 g" },
      { key: "egg", name: "Egg", qty: "3" },
      { key: "flour", name: "Flour", qty: "100 g" },
      { key: "cocoa powder", name: "Cocoa powder", qty: "30 g" }
    ],
    steps: [
      "Heat the oven to 180°C and line a 20 cm square tin.",
      "Melt the chocolate and butter together, then stir in the sugar.",
      "Beat in the eggs one at a time.",
      "Fold in the flour and cocoa until just combined.",
      "Bake 22–25 minutes — the centre should still wobble slightly. Cool before cutting."
    ]
  },
  {
    id: "poison-apple-crumble",
    name: "Poison Apple Crumble",
    tagline: "One bite and you'll be back for more.",
    time: 50, difficulty: "Easy", servings: 4,
    tags: ["vegetarian", "spooky"],
    ingredients: [
      { key: "apple", name: "Apples", qty: "4, peeled & sliced" },
      { key: "flour", name: "Flour", qty: "150 g" },
      { key: "butter", name: "Butter", qty: "100 g, cold" },
      { key: "sugar", name: "Sugar", qty: "100 g" },
      { key: "cinnamon", name: "Cinnamon", qty: "1 tsp" },
      { key: "lemon", name: "Lemon", qty: "1/2, juiced" }
    ],
    steps: [
      "Heat the oven to 190°C.",
      "Toss the apples with lemon juice, half the sugar and the cinnamon.",
      "Rub the butter into the flour, then stir in the remaining sugar.",
      "Tip the apples into a dish and scatter the crumble on top.",
      "Bake 35 minutes until golden and bubbling. Serve with cream."
    ]
  },
  {
    id: "werewolf-sandwich",
    name: "Werewolf Sandwich",
    tagline: "Grilled, gooey, and howls with flavour.",
    time: 15, difficulty: "Easy", servings: 1,
    tags: ["vegetarian", "spooky"],
    ingredients: [
      { key: "bread", name: "Bread", qty: "2 slices" },
      { key: "cheese", name: "Cheddar cheese", qty: "2 slices" },
      { key: "tomato", name: "Tomato", qty: "2 slices" },
      { key: "butter", name: "Butter", qty: "1 tbsp" },
      { key: "mustard", name: "Mustard", qty: "1 tsp" }
    ],
    steps: [
      "Butter the outside of both bread slices.",
      "Layer cheese, tomato and mustard inside.",
      "Grill in a pan over medium heat, 3 minutes per side, until the cheese melts.",
      "Cut diagonally and serve hot."
    ]
  },
  {
    id: "goblin-guacamole",
    name: "Goblin Guacamole",
    tagline: "Bright green, chunky, and dangerously dippable.",
    time: 10, difficulty: "Easy", servings: 4,
    tags: ["vegetarian", "vegan", "gluten-free", "spooky"],
    ingredients: [
      { key: "avocado", name: "Avocado", qty: "3, ripe" },
      { key: "tomato", name: "Tomato", qty: "1, diced" },
      { key: "onion", name: "Onion", qty: "1/2, diced" },
      { key: "lime", name: "Lime", qty: "1, juiced" },
      { key: "cilantro", name: "Cilantro", qty: "A small handful" }
    ],
    steps: [
      "Mash the avocados roughly — chunky is good.",
      "Stir in the tomato, onion, lime juice and cilantro.",
      "Season with salt and serve with tortilla chips."
    ]
  },
  {
    id: "midnight-hot-chocolate",
    name: "Midnight Hot Chocolate",
    tagline: "Thick, dark, and best sipped by candlelight.",
    time: 10, difficulty: "Easy", servings: 2,
    tags: ["vegetarian", "gluten-free", "spooky"],
    ingredients: [
      { key: "milk", name: "Milk", qty: "400 ml" },
      { key: "dark chocolate", name: "Dark chocolate", qty: "80 g" },
      { key: "cocoa powder", name: "Cocoa powder", qty: "1 tbsp" },
      { key: "sugar", name: "Sugar", qty: "1 tbsp" },
      { key: "cinnamon", name: "Cinnamon", qty: "A pinch" },
      { key: "marshmallow", name: "Marshmallows", qty: "A handful" }
    ],
    steps: [
      "Warm the milk in a saucepan — do not boil.",
      "Whisk in the cocoa, sugar and cinnamon.",
      "Add the chocolate and stir until melted and glossy.",
      "Pour into mugs and float marshmallows on top."
    ]
  },
  {
    id: "trick-or-treat-trail-mix",
    name: "Trick-or-Treat Trail Mix",
    tagline: "Sweet, salty, and ready for the long night.",
    time: 5, difficulty: "Easy", servings: 6,
    tags: ["vegetarian", "vegan", "gluten-free", "spooky"],
    ingredients: [
      { key: "peanuts", name: "Peanuts", qty: "150 g" },
      { key: "almonds", name: "Almonds", qty: "100 g" },
      { key: "raisins", name: "Raisins", qty: "100 g" },
      { key: "dark chocolate", name: "Dark chocolate chips", qty: "100 g" },
      { key: "pretzels", name: "Pretzels", qty: "100 g" }
    ],
    steps: [
      "Mix everything in a big bowl.",
      "Store in a jar or bag. That is the whole recipe — go trick-or-treating."
    ]
  }
];

// Common pantry items for quick-add, grouped by aisle.
const PANTRY_AISLES = [
  { name: "Vegetables", items: ["pumpkin", "onion", "garlic", "tomato", "potato", "carrot", "lettuce", "cucumber", "spinach", "spring onion", "apple", "avocado", "banana", "lemon", "lime", "cilantro", "basil", "parsley", "peas"] },
  { name: "Dairy & Eggs", items: ["egg", "milk", "butter", "cream", "cheese", "parmesan", "mozzarella"] },
  { name: "Meat & Fish", items: ["chicken", "ground beef", "sausage", "chicken wings", "pork ribs"] },
  { name: "Pantry Staples", items: ["flour", "sugar", "brown sugar", "rice", "pasta", "bread", "breadcrumbs", "puff pastry", "pizza dough", "taco shells", "instant noodles", "pretzels", "peanuts", "almonds", "raisins", "kidney beans", "tomato sauce", "bbq sauce", "soy sauce", "olive oil", "vegetable oil", "honey", "peanut butter", "marshmallow", "dark chocolate", "cocoa powder", "pumpkin puree", "vegetable stock"] },
  { name: "Spices & Extras", items: ["cumin", "paprika", "cinnamon", "nutmeg", "ginger", "chili powder", "chili flakes", "mustard", "baking powder", "vanilla extract"] }
];

// Display names for canonical keys (title-cased where needed).
const INGREDIENT_LABELS = {
  "pumpkin": "Pumpkin", "onion": "Onion", "garlic": "Garlic", "tomato": "Tomato",
  "potato": "Potato", "carrot": "Carrot", "lettuce": "Lettuce", "cucumber": "Cucumber",
  "spinach": "Spinach", "spring onion": "Spring onion", "apple": "Apple",
  "avocado": "Avocado", "banana": "Banana", "lemon": "Lemon", "lime": "Lime",
  "cilantro": "Cilantro", "basil": "Basil", "parsley": "Parsley", "peas": "Peas",
  "egg": "Egg", "milk": "Milk", "butter": "Butter", "cream": "Cream",
  "cheese": "Cheese", "parmesan": "Parmesan", "mozzarella": "Mozzarella",
  "chicken": "Chicken", "ground beef": "Ground beef", "sausage": "Sausage",
  "chicken wings": "Chicken wings", "pork ribs": "Pork ribs",
  "flour": "Flour", "sugar": "Sugar", "brown sugar": "Brown sugar", "rice": "Rice",
  "pasta": "Pasta", "bread": "Bread", "breadcrumbs": "Breadcrumbs",
  "puff pastry": "Puff pastry", "pizza dough": "Pizza dough", "taco shells": "Taco shells",
  "instant noodles": "Instant noodles", "pretzels": "Pretzels", "peanuts": "Peanuts",
  "almonds": "Almonds", "raisins": "Raisins", "kidney beans": "Kidney beans",
  "tomato sauce": "Tomato sauce", "bbq sauce": "BBQ sauce", "soy sauce": "Soy sauce",
  "olive oil": "Olive oil", "vegetable oil": "Vegetable oil", "honey": "Honey",
  "peanut butter": "Peanut butter", "marshmallow": "Marshmallow",
  "dark chocolate": "Dark chocolate", "cocoa powder": "Cocoa powder",
  "pumpkin puree": "Pumpkin puree", "vegetable stock": "Vegetable stock",
  "cumin": "Cumin", "paprika": "Paprika", "cinnamon": "Cinnamon", "nutmeg": "Nutmeg",
  "ginger": "Ginger", "chili powder": "Chili powder", "chili flakes": "Chili flakes",
  "mustard": "Mustard", "baking powder": "Baking powder", "vanilla extract": "Vanilla extract"
};

if (typeof module !== "undefined") { module.exports = { RECIPES, PANTRY_AISLES, INGREDIENT_LABELS }; }
