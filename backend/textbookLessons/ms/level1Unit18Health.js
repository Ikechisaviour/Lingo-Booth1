const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ms', {
  slug: 'ms-l1u18',
  title: 'Level 1 · Unit 18: Kesihatan — Health',
  category: 'health',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe simple symptoms, say what hurts, and understand basic clinic advice.',
  vocabularyGoal: 'Use body-part and symptom words that fit a primary-care visit.',
  grammarGoal: 'Use `sakit`, `rasa`, `perlu`, and passive advice forms such as `diberi ubat`.',
  speakingGoal: 'Tell a clinic staff member what is wrong and how long it has lasted.',
  task: 'Roleplay a short klinik visit from symptom to advice.',
  expressionPractice: [
    practice('symptoms', 'Symptoms', 'Say what hurts and what you feel.'),
    practice('duration', 'Duration', 'State how long the symptom has lasted.'),
    practice('clinic-advice', 'Clinic advice', 'Understand what medicine or rest is recommended.'),
  ],
  relatedPools: ['topic-health'],
  items: [
    item('sakit kepala', 'sa.kit ke.pa.la', '“Headache.” Malay often uses `sakit + body part` for pain.', 'Saya sakit kepala sejak pagi.', '“I have had a headache since morning.”'),
    item('demam', 'de.mam', '“Fever.”', 'Anak saya demam tinggi.', '“My child has a high fever.”'),
    item('batuk / selesema', 'ba.tuk / se.le.se.ma', '“Cough / flu-like cold.” Everyday clinic vocabulary.', 'Saya batuk dan selesema.', '“I have a cough and a cold.”'),
    item('rasa loya', 'ra.sa lo.ya', '“Feel nauseous.” `Rasa` introduces a bodily feeling.', 'Saya rasa loya selepas makan.', '“I feel nauseous after eating.”'),
    item('sejak', 'se.jak', '“Since.” Useful for symptom duration.', 'Sejak bila sakit?', '“Since when have you been ill?”'),
    item('klinik', 'kli.nik', '“Clinic.” A very common first stop for everyday healthcare in Malaysia.', 'Saya pergi ke klinik panel.', '“I go to the panel clinic.”'),
    item('doktor / jururawat', 'dok.tor / ju.ru.ra.wat', '“Doctor / nurse.”', 'Jururawat ambil tekanan darah saya.', '“The nurse took my blood pressure.”'),
    item('ubat', 'u.bat', '“Medicine.”', 'Doktor beri ubat batuk.', '“The doctor gave cough medicine.”'),
    item('perlu berehat', 'per.lu be.re.hat', '“Need to rest.”', 'Awak perlu berehat dua hari.', '“You need to rest for two days.”'),
    item('diberi cuti sakit', 'di.be.ri cu.ti sa.kit', '“Given medical leave.” Passive `di-` is normal when the patient receives something.', 'Saya diberi cuti sakit sehari.', '“I was given one day of medical leave.”'),
  ],
});
