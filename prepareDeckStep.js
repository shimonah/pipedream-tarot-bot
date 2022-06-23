import fs from "fs";

export default defineComponent({
  async run({ steps, $ }) {
    
    const fileData = JSON.parse(fs.readFileSync(steps.trigger.context.attachments["tarot.json"]).toString());

    let cards = fileData.cards;

    var card = cards[Math.floor(Math.random()*cards.length)];

    $.export('card', card);

    return card;
  },
})
