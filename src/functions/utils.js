function generateUID(name = "id") {
  // Combine timestamp with random number and base conversions
  const timestamp = Date.now().toString(36); // Base 36 for shorter string
  const randomString = Math.random().toString(36).substring(2, 15); // Substring to avoid leading zeroes
  return name + "-" + timestamp + randomString;
}

const capitalize = (str) =>
  str ? str[0].toUpperCase() + str.slice(1, str.length).toLowerCase() : "";

function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function getEmoji(name) {
  // Convert the name to lowercase to avoid case mismatches
  name = name.toLowerCase();

  const emojis = {
    apple: "🍎",
    apples: "🍎",
    яблуко: "🍎",
    яблука: "🍎",
    banana: "🍌",
    банан: "🍌",
    банани: "🍌",
    cherry: "🍒",
    cherries: "🍒",
    вишня: "🍒",
    вишні: "🍒",
    grapes: "🍇",
    виноград: "🍇",
    watermelon: "🍉",
    кавун: "🍉",
    strawberry: "🍓",
    полуниця: "🍓",
    lemon: "🍋",
    lemons: "🍋",
    лимон: "🍋",
    лимони: "🍋",
    orange: "🍊",
    oranges: "🍊",
    апельсин: "🍊",
    апельсини: "🍊",
    peach: "🍑",
    персик: "🍑",
    pear: "🍐",
    груша: "🍐",
    pineapple: "🍍",
    ананас: "🍍",
    kiwi: "🥝",
    ківі: "🥝",
    avocado: "🥑",
    авокадо: "🥑",
    tomato: "🍅",
    томат: "🍅",
    eggplant: "🍆",
    баклажан: "🍆",
    carrot: "🥕",
    морква: "🥕",
    corn: "🌽",
    кукурудза: "🌽",
    potato: "🥔",
    картопля: "🥔",
    broccoli: "🥦",
    броколі: "🥦",
    mushroom: "🍄",
    mushrooms: "🍄",
    гриб: "🍄",
    гриби: "🍄",
    peanuts: "🥜",
    арахіс: "🥜",
    bread: "🍞",
    хліб: "🍞",
    baguette: "🥖",
    багет: "🥖",
    cheese: "🧀",
    сир: "🧀",
    egg: "🥚",
    eggs: "🥚",
    яйце: "🥚",
    яйця: "🥚",
    bacon: "🥓",
    бекон: "🥓",
    hamburger: "🍔",
    гамбургер: "🍔",
    pizza: "🍕",
    піца: "🍕",
    hotdog: "🌭",
    "хот-дог": "🌭",
    sandwich: "🥪",
    сендвіч: "🥪",
    taco: "🌮",
    тако: "🌮",
    burrito: "🌯",
    буріто: "🌯",
    salad: "🥗",
    салат: "🥗",
    popcorn: "🍿",
    попкорн: "🍿",
    bento: "🍱",
    бенто: "🍱",
    rice: "🍚",
    рис: "🍚",
    ramen: "🍜",
    рамен: "🍜",
    stew: "🍲",
    тушковане: "🍲",
    fish: "🐟",
    риба: "🐟",
    sushi: "🍣",
    суші: "🍣",
    cake: "🍰",
    торт: "🍰",
    cupcake: "🧁",
    кекс: "🧁",
    тістечко: "🧁",
    pie: "🥧",
    пиріг: "🥧",
    chocolate: "🍫",
    шоколад: "🍫",
    candy: "🍬",
    цукерка: "🍬",
    doughnut: "🍩",
    пончик: "🍩",
    cookie: "🍪",
    печиво: "🍪",
    beer: "🍺",
    пиво: "🍺",
    cocktail: "🍹",
    коктейль: "🍹",
    wine: "🍷",
    вино: "🍷",
    vodka: "🥃",
    whiskey: "🥃",
    віскі: "🥃",
    горілка: "🥃",
    coffee: "☕",
    кава: "☕",
    tea: "🍵",
    чай: "🍵",
    milk: "🥛",
    молоко: "🥛",
    juice: "🧃",
    сік: "🧃",
    champagne: "🍾",
    шампанське: "🍾",
    icecream: "🍨",
    морозиво: "🍨",
  };

  // If the name is in the dictionary, return the corresponding emoji
  if (name in emojis) {
    return emojis[name];
  } else if (name === "") {
    return "";
  }
  // If the name is not in the dictionary, return the generic emoji
  else {
    return "🥑";
  }
}

export { generateUID, capitalize, getEmoji, debounce };
