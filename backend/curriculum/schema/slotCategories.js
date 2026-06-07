/**
 * Semantic categories used to fill slots in PatternLesson drills.
 *
 * A drill says: "use this pattern with 3 PLACES, 2 FOODS, and 2 ACTIONS".
 * The slot category resolves to a list of vocabulary items (slot fillers)
 * sourced from the existing Flashcard collection or the curriculum/lessons/
 * filler decks.
 */

const SLOT_CATEGORIES = Object.freeze({
  PLACE: 'place',                   // 제주도, 부산, 학교, 카페
  FOOD: 'food',                     // 비빔밥, 김치, 떡볶이
  DRINK: 'drink',                   // 커피, 물, 막걸리
  ACTION: 'action',                 // 운전하다, 노래하다, 영화 보다
  PERSON: 'person',                 // 친구, 선생님, 어머니
  TIME: 'time',                     // 어제, 주말, 작년
  OBJECT: 'object',                 // 책, 핸드폰, 가방
  EMOTION: 'emotion',               // 행복하다, 슬프다, 화나다
  ADJECTIVE_QUALITY: 'adjective_quality', // 크다, 작다, 빠르다
  BODY: 'body',                     // 손, 머리, 다리
  WEATHER: 'weather',               // 비, 눈, 더위
  ABSTRACT: 'abstract',             // 사랑, 자유, 책임
});

const SLOT_CATEGORY_VALUES = Object.freeze(Object.values(SLOT_CATEGORIES));

function isValidSlotCategory(value) {
  return SLOT_CATEGORY_VALUES.includes(value);
}

module.exports = {
  SLOT_CATEGORIES,
  SLOT_CATEGORY_VALUES,
  isValidSlotCategory,
};
