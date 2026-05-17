const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('he', {
  slug: 'he-l1u17',
  title: 'Level 1 · Unit 17: בדואר — At the Post Office',
  category: 'service',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Send a letter or parcel, give an address, and ask about delivery.',
  vocabularyGoal: 'Use post office, parcel, stamp, address, and shipping vocabulary.',
  grammarGoal: 'Use `אני רוצה לשלוח` and destination phrases with `ל־`.',
  speakingGoal: 'Explain what you want to send and where it should go.',
  task: 'Roleplay sending a parcel abroad.',
  expressionPractice: [
    practice('sending-item', 'Sending item', 'Use `אני רוצה לשלוח`.'),
    practice('giving-address', 'Giving address', 'State the destination clearly.'),
    practice('asking-delivery', 'Asking delivery', 'Ask about price or arrival time.'),
  ],
  relatedPools: ['topic-service', 'topic-mail'],
  items: [
    item('דואר', 'do’ar', '“Post / mail.” It appears in service phrases and place names.', 'איפה הדואר?', '“Where is the post office?”'),
    item('מכתב', 'mikhtav', '“Letter.”', 'אני רוצה לשלוח מכתב.', '“I want to send a letter.”'),
    item('חבילה', 'khavila', '“Parcel / package.” Feminine.', 'זו חבילה לחו״ל.', '“This is a parcel abroad.”'),
    item('בול', 'bul', '“Stamp.”', 'אני צריך בול.', '“I need a stamp.”'),
    item('כתובת', 'ktovet', '“Address.” Feminine and useful in many service contexts.', 'כתוב את הכתובת כאן.', '“Write the address here.”'),
    item('אני רוצה לשלוח', 'ani rotse lishlo’akh', '“I want to send.” The infinitive carries the action.', 'אני רוצה לשלוח את החבילה הזאת.', '“I want to send this parcel.”'),
    item('לחו״ל', 'lekhul', '“Abroad.” An acronym phrase from “outside the land.”', 'החבילה הזאת לחו״ל.', '“This parcel is going abroad.”'),
    item('כמה זה עולה?', 'kama ze oleh?', 'The same price question from shopping works naturally for service fees.', 'כמה עולה משלוח מהיר?', '“How much does express shipping cost?”'),
    item('מהיר / רגיל', 'mahir / ragil', '“Express / regular.” Useful for comparing postal options.', 'אני רוצה משלוח מהיר.', '“I want express shipping.”'),
    item('מתי זה יגיע?', 'matai ze yagi’a?', '“When will it arrive?” A practical follow-up question.', 'מתי החבילה תגיע?', '“When will the parcel arrive?”'),
  ],
});
