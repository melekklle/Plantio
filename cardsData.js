// cardsData.jsconst imageMap = {
  "Garden.jpg": require("./assets/Garden.jpg"),
  "kaktus.jpg": require("./assets/kaktus.jpg"),
  "kaktus2.jpg": require("./assets/kaktus2.jpg"),
  "yaprak.jpg": require("./assets/yaprak.jpg"),
  "yaprak2.jpg": require("./assets/yaprak2.jpg"),
  "cicek.jpg": require("./assets/cicek.jpg"),
  "papatya.jpg": require("./assets/papatya.jpg"),
  "flowers.jpg": require("./assets/flowers.jpg"),
  "flower.png": require("./assets/flower.png"),
  "cicek4.jpg": require("./assets/cicek4.jpg"),
};

const dataObj = require("./data.json");

export const cards = Array.isArray(dataObj.cards)
  ? dataObj.cards.map((item) => ({
      ...item,
      image: imageMap[item.image],
    }))
  : [];
