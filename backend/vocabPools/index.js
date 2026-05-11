// Reusable vocabulary pools the AI tutor can dip into when a lesson's own
// items don't cover what the learner asked about. Each pool has a stable
// `key` referenced from Lesson.relatedPools[].
//
// Pools are NOT lesson curriculum. They're reference dictionaries — the
// tutor's prompt receives only the pool keys (so the prompt stays bounded);
// pool contents are loaded by the backend only when the tutor explicitly
// asks for them.
//
// See docs/curriculum/MERGED_SYLLABUS.md for the canonical pool catalog.

const item = (target, romanization, native, type = 'word', notes = '') => ({
  target,
  romanization,
  native,
  type,
  ...(notes ? { notes } : {}),
});

const topicSchool = {
  key: 'topic-school',
  title: 'School & Education',
  description: 'Vocabulary for university and school life — courses, grades, campus, paperwork.',
  source: 'Book 2B ch.7 (학교와 수업)',
  language: 'ko',
  items: [
    item('대학교', 'daehakgyo', 'university'),
    item('학과', 'hakgwa', 'department / major'),
    item('전공', 'jeongong', 'major (academic)'),
    item('부전공', 'bujeongong', 'minor'),
    item('복수전공', 'boksujeongong', 'double major'),
    item('학년', 'hangnyeon', 'academic year'),
    item('학기', 'hakgi', 'semester'),
    item('학점', 'hakjeom', 'credit / GPA'),
    item('수업', 'sueop', 'class / lecture'),
    item('교양', 'gyoyang', 'general education'),
    item('단과대학', 'dangwadaehak', 'college (within a university)'),
    item('교수님', 'gyosunim', 'professor (honorific)'),
    item('동아리', 'dongari', 'club (school club)'),
    item('과제', 'gwaje', 'assignment / task'),
    item('시험', 'siheom', 'exam'),
    item('성적', 'seongjeok', 'grade / academic record'),
    item('휴학', 'hyuhak', 'leave of absence'),
    item('졸업', 'joreop', 'graduation'),
    item('입학', 'iphak', 'admission / enrollment'),
    item('상담', 'sangdam', 'counseling / consultation'),
    item('진로 상담', 'jinro sangdam', 'career counseling', 'phrase'),
  ],
};

const topicSociety = {
  key: 'topic-society',
  title: 'Society & Civic Life',
  description: 'Vocabulary for social issues, civic life, work and public matters.',
  source: 'Book 2B ch.9 (사회)',
  language: 'ko',
  items: [
    item('사회', 'sahoe', 'society'),
    item('사회적', 'sahoejeok', 'social / societal'),
    item('사회복지사', 'sahoebokjisa', 'social worker'),
    item('직업', 'jigeop', 'occupation / job'),
    item('직장', 'jikjang', 'workplace'),
    item('회사', 'hoesa', 'company'),
    item('동료', 'dongnyo', 'coworker / colleague'),
    item('취업', 'chwieop', 'getting a job / employment'),
    item('이력서', 'iryeokseo', 'résumé / CV'),
    item('면접', 'myeonjeop', 'interview (job)'),
    item('공무원', 'gongmuwon', 'public-sector worker'),
    item('자원봉사', 'jawonbongsa', 'volunteer work'),
    item('시민', 'simin', 'citizen'),
    item('권리', 'gwolli', 'right (entitlement)'),
    item('의무', 'uimu', 'duty / obligation'),
    item('규칙', 'gyuchik', 'rule / regulation'),
    item('환경', 'hwangyeong', 'environment'),
    item('문제', 'munje', 'problem / issue'),
    item('해결', 'haegyeol', 'resolution / solution'),
    item('가치', 'gachi', 'value / worth'),
  ],
};

const topicPeople = {
  key: 'topic-people',
  title: 'People & Personal Traits',
  description: 'Vocabulary for describing people, personality, abilities and roles.',
  source: 'Book 2B ch.1 (사람) + ch.6 (인간관계)',
  language: 'ko',
  items: [
    item('사람', 'saram', 'person'),
    item('성격', 'seonggyeok', 'personality'),
    item('성품', 'seongpum', 'character / disposition'),
    item('태도', 'taedo', 'attitude'),
    item('능력', 'neungnyeok', 'ability'),
    item('적성', 'jeokseong', 'aptitude'),
    item('장점', 'jangjeom', 'strength / merit'),
    item('단점', 'danjeom', 'weakness'),
    item('흥미', 'heungmi', 'interest'),
    item('관심', 'gwansim', 'interest / concern'),
    item('취미', 'chwimi', 'hobby'),
    item('꿈', 'kkum', 'dream / aspiration'),
    item('목표', 'mokpyo', 'goal'),
    item('외향적', 'oehyangjeok', 'extroverted'),
    item('내향적', 'naehyangjeok', 'introverted'),
    item('적극적', 'jeokgeukjeok', 'proactive / active'),
    item('소극적', 'sogeukjeok', 'passive'),
    item('꼼꼼하다', 'kkomkkomhada', 'to be meticulous'),
    item('성실하다', 'seongsilhada', 'to be diligent / sincere'),
    item('책임감', 'chaegimgam', 'sense of responsibility'),
    item('끈기', 'kkeungi', 'persistence / grit'),
  ],
};

const posPrefixSuffix = {
  key: 'pos-prefix-suffix',
  title: 'Prefixes & Suffixes (접두사·접미사)',
  description: 'Common Korean prefixes and suffixes, especially the productive ~적 suffix that turns nouns into adjective-like forms.',
  source: 'Book 3B ch.14 (접두사·접미사)',
  language: 'ko',
  items: [
    item('-적', '-jeok', 'suffix that turns a noun into an adjective-like modifier (e.g. 사회 → 사회적)', 'word', 'Used after Sino-Korean nouns. Compare 사회적 능력 (social ability) vs 사회 능력 (less natural).'),
    item('사회적', 'sahoejeok', 'social / societal', 'word', '~적 example'),
    item('합리적', 'hamnijeok', 'rational', 'word', '~적 example'),
    item('적극적', 'jeokgeukjeok', 'proactive / active', 'word', '~적 example'),
    item('소극적', 'sogeukjeok', 'passive', 'word', '~적 example'),
    item('분석적', 'bunseokjeok', 'analytical', 'word', '~적 example'),
    item('객관적', 'gaekgwanjeok', 'objective', 'word', '~적 example'),
    item('주관적', 'jugwanjeok', 'subjective', 'word', '~적 example'),
    item('감정적', 'gamjeongjeok', 'emotional', 'word', '~적 example'),
    item('논리적', 'nollijeok', 'logical', 'word', '~적 example'),
    item('현실적', 'hyeonsiljeok', 'realistic / pragmatic', 'word', '~적 example'),
    item('개인적', 'gaeinjeok', 'personal', 'word', '~적 example'),
    item('-가', '-ga', 'suffix for "person who does X" (e.g. 작가 writer, 음악가 musician)', 'word'),
    item('-자', '-ja', 'suffix for "person who is X / does X" (e.g. 학자 scholar, 기자 reporter)', 'word'),
    item('-사', '-sa', 'suffix for licensed professional (e.g. 의사 doctor, 변호사 lawyer)', 'word'),
    item('-원', '-won', 'suffix for member / staff of an organization (e.g. 회사원 employee, 공무원 civil servant)', 'word'),
    item('비-', 'bi-', 'prefix meaning "non-" (e.g. 비공식 informal, 비현실적 unrealistic)', 'word'),
    item('재-', 'jae-', 'prefix meaning "re-" (e.g. 재시험 retest, 재출발 restart)', 'word'),
    item('초-', 'cho-', 'prefix meaning "super-/ultra-" (e.g. 초과 excess, 초보 beginner)', 'word'),
    item('-님', '-nim', 'honorific suffix for titles (e.g. 선생님 teacher, 손님 guest)', 'word'),
  ],
};

module.exports = {
  pools: [topicSchool, topicSociety, topicPeople, posPrefixSuffix],
};
