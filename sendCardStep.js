// To use any npm package, just import it
import axios from "axios"

export default defineComponent({
  async run({ steps, $ }) {
    // Reference previous step data using the steps object and return data to use it in future steps

    let url = 'https://api.telegram.org/bot'+process.env.PDT_BOT_TOKEN+'/';

    if (steps.trigger.event.body.message.text == '/start') {
      let textMessage = 'Приветствую! Прежде чем вытянуть карту сконцентрируйся на своём вопросе и проговори его мыслено или вслух. Используй комманду /card чтобы получит ответ.';

      await axios.post(url+'sendMessage',
      {
          chat_id: steps.trigger.event.body.message.chat.id,
          text: textMessage,
          parse_mode: 'html'
      })
      .then(res => {
        console.log(`statusCode: ${res.status}`);
        console.log(res);
      })
      .catch(error => {
        console.error(error);
      });
    }

    if (steps.trigger.event.body.message.text == '/card') {
      let card = steps.prepareDeck.card;

      console.log(card);

      // send image

      await axios.post(url+'sendPhoto',
      {
          chat_id: steps.trigger.event.body.message.chat.id,
          photo: card.image,
          parse_mode: 'html'
      })
      .then(res => {
        console.log(`statusCode: ${res.status}`);
        console.log(res);
      })
      .catch(error => {
        console.error(error);
      });

      // send text 

      let textMessage = '<b>Название: </b>'+card.name+'\n<b>Толкование карты: </b> ' + card.interpretation;
    
      await axios.post(url+'sendMessage',
      {
          chat_id: steps.trigger.event.body.message.chat.id,
          text: textMessage,
          parse_mode: 'html'
      })
      .then(res => {
        console.log(`statusCode: ${res.status}`);
        console.log(res);
      })
      .catch(error => {
        console.error(error);
      });
    }

    return steps.trigger.event
  },
})
