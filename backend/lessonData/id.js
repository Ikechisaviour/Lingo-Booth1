// Indonesian (Bahasa Indonesia) beginner lesson data
// All 7 categories: greetings, daily-life, food, travel, shopping, business, healthcare

const createContentItem = (targetText, romanization, nativeText, type = 'word', exampleTarget = '', exampleNative = '', breakdown = null) => ({
  type,
  targetText,
  romanization,
  nativeText,
  pronunciation: romanization,
  exampleTarget: exampleTarget || targetText,
  exampleNative: exampleNative || nativeText,
  korean: targetText,
  english: nativeText,
  example: exampleTarget || targetText,
  exampleEnglish: exampleNative || nativeText,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.korean || b.target, native: b.english || b.native, korean: b.korean || b.target, english: b.english || b.native })) } : {}),
});

// ==========================================
// GREETINGS & INTRODUCTIONS
// ==========================================
const greetings = {
  title: 'Basic Greetings & Introductions',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'id',
  content: [
    createContentItem('Halo', '', 'Hello', 'word', 'Halo, apa kabar?', 'Hello, how are you?'),
    createContentItem('Selamat pagi', '', 'Good morning', 'word', 'Selamat pagi, Bu.', 'Good morning, Ma\'am.'),
    createContentItem('Selamat siang', '', 'Good afternoon', 'word', 'Selamat siang, Pak.', 'Good afternoon, Sir.'),
    createContentItem('Selamat sore', '', 'Good late afternoon', 'word', 'Selamat sore, semuanya.', 'Good late afternoon, everyone.'),
    createContentItem('Selamat malam', '', 'Good evening / Good night', 'word', 'Selamat malam, tidur nyenyak.', 'Good night, sleep well.'),
    createContentItem('Apa kabar?', '', 'How are you?', 'sentence', 'Apa kabar? Sudah lama tidak bertemu.', 'How are you? Long time no see.', [
      { korean: 'Apa', english: 'what' },
      { korean: 'kabar', english: 'news / condition' },
    ]),
    createContentItem('Baik-baik saja.', '', 'I am fine.', 'sentence', 'Saya baik-baik saja, terima kasih.', 'I am fine, thank you.', [
      { korean: 'Baik-baik saja', english: 'fine / well' },
    ]),
    createContentItem('Terima kasih', '', 'Thank you', 'word', 'Terima kasih banyak.', 'Thank you very much.'),
    createContentItem('Sama-sama', '', 'You are welcome', 'word', 'Sama-sama, tidak masalah.', 'You are welcome, no problem.'),
    createContentItem('Permisi', '', 'Excuse me', 'word', 'Permisi, saya mau lewat.', 'Excuse me, I want to pass through.'),
    createContentItem('Maaf', '', 'Sorry', 'word', 'Maaf, saya terlambat.', 'Sorry, I am late.'),
    createContentItem('Nama saya...', '', 'My name is...', 'sentence', 'Nama saya Andi.', 'My name is Andi.', [
      { korean: 'Nama', english: 'name' },
      { korean: 'saya', english: 'I / my' },
    ]),
    createContentItem('Siapa nama Anda?', '', 'What is your name?', 'sentence', 'Siapa nama Anda?', 'What is your name?', [
      { korean: 'Siapa', english: 'who' },
      { korean: 'nama', english: 'name' },
      { korean: 'Anda', english: 'you (formal)' },
    ]),
    createContentItem('Senang bertemu dengan Anda.', '', 'Nice to meet you.', 'sentence', 'Senang bertemu dengan Anda.', 'Nice to meet you.', [
      { korean: 'Senang', english: 'happy / pleased' },
      { korean: 'bertemu', english: 'to meet' },
      { korean: 'dengan Anda', english: 'with you' },
    ]),
    createContentItem('Saya dari...', '', 'I am from...', 'sentence', 'Saya dari Amerika.', 'I am from America.', [
      { korean: 'Saya', english: 'I' },
      { korean: 'dari', english: 'from' },
    ]),
    createContentItem('Selamat tinggal', '', 'Goodbye (to one staying)', 'word', 'Selamat tinggal, sampai bertemu lagi.', 'Goodbye, see you again.'),
    createContentItem('Selamat jalan', '', 'Goodbye (to one leaving)', 'word', 'Selamat jalan, hati-hati di jalan.', 'Goodbye, be careful on the road.'),
    createContentItem('Sampai jumpa', '', 'See you later', 'word', 'Sampai jumpa besok!', 'See you tomorrow!'),
    createContentItem('Ya', '', 'Yes', 'word', 'Ya, saya mengerti.', 'Yes, I understand.'),
    createContentItem('Tidak', '', 'No', 'word', 'Tidak, terima kasih.', 'No, thank you.'),
    createContentItem('Tolong', '', 'Please / Help', 'word', 'Tolong bantu saya.', 'Please help me.'),
    createContentItem('Anda tinggal di mana?', '', 'Where do you live?', 'sentence', 'Anda tinggal di mana?', 'Where do you live?', [
      { korean: 'Anda', english: 'you' },
      { korean: 'tinggal', english: 'live' },
      { korean: 'di mana', english: 'where' },
    ]),
    createContentItem('Saya tinggal di Jakarta.', '', 'I live in Jakarta.', 'sentence', 'Saya tinggal di Jakarta.', 'I live in Jakarta.', [
      { korean: 'Saya', english: 'I' },
      { korean: 'tinggal', english: 'live' },
      { korean: 'di', english: 'in / at' },
      { korean: 'Jakarta', english: 'Jakarta' },
    ]),
    createContentItem('Apa kabar keluarga?', '', 'How is your family?', 'sentence', 'Apa kabar keluarga?', 'How is your family?', [
      { korean: 'Apa kabar', english: 'how is' },
      { korean: 'keluarga', english: 'family' },
    ]),
    createContentItem('Saya senang bertemu Anda.', '', 'I am happy to meet you.', 'sentence', 'Saya senang bertemu Anda.', 'I am happy to meet you.', [
      { korean: 'Saya', english: 'I' },
      { korean: 'senang', english: 'happy' },
      { korean: 'bertemu', english: 'to meet' },
      { korean: 'Anda', english: 'you' },
    ]),
  ],
};

// ==========================================
// DAILY LIFE
// ==========================================
const dailyLife = {
  title: 'Everyday Life & Routines',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'id',
  content: [
    createContentItem('Rumah', '', 'House / Home', 'word', 'Rumah saya dekat dari sini.', 'My house is close from here.'),
    createContentItem('Keluarga', '', 'Family', 'word', 'Keluarga saya besar.', 'My family is big.'),
    createContentItem('Ibu', '', 'Mother', 'word', 'Ibu saya seorang guru.', 'My mother is a teacher.'),
    createContentItem('Ayah', '', 'Father', 'word', 'Ayah saya bekerja di kantor.', 'My father works in an office.'),
    createContentItem('Anak', '', 'Child', 'word', 'Saya punya dua anak.', 'I have two children.'),
    createContentItem('Sekolah', '', 'School', 'word', 'Anak-anak pergi ke sekolah.', 'The children go to school.'),
    createContentItem('Bekerja', '', 'To work', 'word', 'Saya bekerja setiap hari.', 'I work every day.'),
    createContentItem('Tidur', '', 'To sleep', 'word', 'Saya tidur jam sepuluh malam.', 'I sleep at ten at night.'),
    createContentItem('Bangun', '', 'To wake up', 'word', 'Saya bangun jam enam pagi.', 'I wake up at six in the morning.'),
    createContentItem('Mandi', '', 'To bathe / To shower', 'word', 'Saya mandi dua kali sehari.', 'I shower twice a day.'),
    createContentItem('Makan', '', 'To eat', 'word', 'Kita makan bersama.', 'Let us eat together.'),
    createContentItem('Minum', '', 'To drink', 'word', 'Saya mau minum air.', 'I want to drink water.'),
    createContentItem('Saya pergi ke kantor setiap hari.', '', 'I go to the office every day.', 'sentence', 'Saya pergi ke kantor setiap hari.', 'I go to the office every day.', [
      { korean: 'Saya', english: 'I' },
      { korean: 'pergi', english: 'go' },
      { korean: 'ke kantor', english: 'to the office' },
      { korean: 'setiap hari', english: 'every day' },
    ]),
    createContentItem('Jam berapa sekarang?', '', 'What time is it now?', 'sentence', 'Jam berapa sekarang?', 'What time is it now?', [
      { korean: 'Jam', english: 'hour / time' },
      { korean: 'berapa', english: 'what / how many' },
      { korean: 'sekarang', english: 'now' },
    ]),
    createContentItem('Hari ini', '', 'Today', 'word', 'Hari ini cuacanya bagus.', 'Today the weather is nice.'),
    createContentItem('Besok', '', 'Tomorrow', 'word', 'Besok saya libur.', 'Tomorrow I have a day off.'),
    createContentItem('Kemarin', '', 'Yesterday', 'word', 'Kemarin saya pergi ke pasar.', 'Yesterday I went to the market.'),
    createContentItem('Pagi', '', 'Morning', 'word', 'Setiap pagi saya olahraga.', 'Every morning I exercise.'),
    createContentItem('Siang', '', 'Midday / Afternoon', 'word', 'Siang ini saya makan di rumah.', 'This afternoon I eat at home.'),
    createContentItem('Malam', '', 'Night / Evening', 'word', 'Malam ini saya menonton televisi.', 'Tonight I watch television.'),
    createContentItem('Saya suka membaca buku.', '', 'I like reading books.', 'sentence', 'Saya suka membaca buku.', 'I like reading books.', [
      { korean: 'Saya', english: 'I' },
      { korean: 'suka', english: 'like' },
      { korean: 'membaca', english: 'to read' },
      { korean: 'buku', english: 'book' },
    ]),
    createContentItem('Cuaca hari ini panas sekali.', '', 'The weather today is very hot.', 'sentence', 'Cuaca hari ini panas sekali.', 'The weather today is very hot.', [
      { korean: 'Cuaca', english: 'weather' },
      { korean: 'hari ini', english: 'today' },
      { korean: 'panas', english: 'hot' },
      { korean: 'sekali', english: 'very / really' },
    ]),
    createContentItem('Teman', '', 'Friend', 'word', 'Dia teman baik saya.', 'He/She is my good friend.'),
    createContentItem('Saya sedang belajar bahasa Indonesia.', '', 'I am studying Indonesian.', 'sentence', 'Saya sedang belajar bahasa Indonesia.', 'I am studying Indonesian.', [
      { korean: 'Saya', english: 'I' },
      { korean: 'sedang', english: 'currently (in progress)' },
      { korean: 'belajar', english: 'to study' },
      { korean: 'bahasa Indonesia', english: 'Indonesian language' },
    ]),
    createContentItem('Mobil', '', 'Car', 'word', 'Saya pergi naik mobil.', 'I go by car.'),
  ],
};

// ==========================================
// FOOD & DINING
// ==========================================
const food = {
  title: 'Food & Dining',
  category: 'food',
  difficulty: 'beginner',
  targetLang: 'id',
  content: [
    createContentItem('Nasi', '', 'Rice', 'word', 'Saya mau nasi goreng.', 'I want fried rice.'),
    createContentItem('Ayam', '', 'Chicken', 'word', 'Ayam goreng enak sekali.', 'Fried chicken is very delicious.'),
    createContentItem('Ikan', '', 'Fish', 'word', 'Ikan bakar adalah makanan favorit saya.', 'Grilled fish is my favorite food.'),
    createContentItem('Sayur', '', 'Vegetable', 'word', 'Makan sayur itu sehat.', 'Eating vegetables is healthy.'),
    createContentItem('Buah', '', 'Fruit', 'word', 'Buah-buahan di Indonesia sangat segar.', 'Fruits in Indonesia are very fresh.'),
    createContentItem('Air', '', 'Water', 'word', 'Tolong beri saya segelas air.', 'Please give me a glass of water.'),
    createContentItem('Teh', '', 'Tea', 'word', 'Saya mau teh manis.', 'I want sweet tea.'),
    createContentItem('Kopi', '', 'Coffee', 'word', 'Kopi Indonesia terkenal di dunia.', 'Indonesian coffee is famous in the world.'),
    createContentItem('Enak', '', 'Delicious', 'word', 'Makanan ini sangat enak!', 'This food is very delicious!'),
    createContentItem('Pedas', '', 'Spicy', 'word', 'Saya tidak suka pedas.', 'I do not like spicy food.'),
    createContentItem('Manis', '', 'Sweet', 'word', 'Teh ini terlalu manis.', 'This tea is too sweet.'),
    createContentItem('Asin', '', 'Salty', 'word', 'Supnya agak asin.', 'The soup is a bit salty.'),
    createContentItem('Lapar', '', 'Hungry', 'word', 'Saya lapar sekali.', 'I am very hungry.'),
    createContentItem('Haus', '', 'Thirsty', 'word', 'Saya haus, mau minum.', 'I am thirsty, I want to drink.'),
    createContentItem('Saya mau pesan makanan.', '', 'I want to order food.', 'sentence', 'Saya mau pesan makanan.', 'I want to order food.', [
      { korean: 'Saya', english: 'I' },
      { korean: 'mau', english: 'want' },
      { korean: 'pesan', english: 'to order' },
      { korean: 'makanan', english: 'food' },
    ]),
    createContentItem('Berapa harganya?', '', 'How much does it cost?', 'sentence', 'Berapa harganya?', 'How much does it cost?', [
      { korean: 'Berapa', english: 'how much' },
      { korean: 'harganya', english: 'the price' },
    ]),
    createContentItem('Minta bonnya.', '', 'May I have the bill.', 'sentence', 'Minta bonnya.', 'May I have the bill.', [
      { korean: 'Minta', english: 'to request / please' },
      { korean: 'bonnya', english: 'the bill' },
    ]),
    createContentItem('Nasi goreng', '', 'Fried rice', 'word', 'Nasi goreng adalah makanan khas Indonesia.', 'Fried rice is a typical Indonesian dish.'),
    createContentItem('Mie goreng', '', 'Fried noodles', 'word', 'Saya pesan mie goreng satu.', 'I order one fried noodles.'),
    createContentItem('Sate', '', 'Satay (grilled skewered meat)', 'word', 'Sate ayam dengan bumbu kacang.', 'Chicken satay with peanut sauce.'),
    createContentItem('Apakah ada menu vegetarian?', '', 'Is there a vegetarian menu?', 'sentence', 'Apakah ada menu vegetarian?', 'Is there a vegetarian menu?', [
      { korean: 'Apakah', english: 'is there / do (question)' },
      { korean: 'ada', english: 'there is / have' },
      { korean: 'menu', english: 'menu' },
      { korean: 'vegetarian', english: 'vegetarian' },
    ]),
    createContentItem('Makanan ini tidak pedas, ya?', '', 'This food is not spicy, right?', 'sentence', 'Makanan ini tidak pedas, ya?', 'This food is not spicy, right?', [
      { korean: 'Makanan ini', english: 'this food' },
      { korean: 'tidak pedas', english: 'not spicy' },
      { korean: 'ya', english: 'right / yes' },
    ]),
    createContentItem('Sendok', '', 'Spoon', 'word', 'Minta sendok satu lagi.', 'May I have one more spoon.'),
    createContentItem('Garpu', '', 'Fork', 'word', 'Saya pakai sendok dan garpu.', 'I use a spoon and fork.'),
    createContentItem('Piring', '', 'Plate', 'word', 'Tolong bawa piring bersih.', 'Please bring a clean plate.'),
  ],
};

// ==========================================
// TRAVEL & TRANSPORTATION
// ==========================================
const travel = {
  title: 'Travel & Transportation',
  category: 'travel',
  difficulty: 'beginner',
  targetLang: 'id',
  content: [
    createContentItem('Bandara', '', 'Airport', 'word', 'Saya mau pergi ke bandara.', 'I want to go to the airport.'),
    createContentItem('Hotel', '', 'Hotel', 'word', 'Hotel ini dekat pantai.', 'This hotel is near the beach.'),
    createContentItem('Stasiun', '', 'Station', 'word', 'Stasiun kereta ada di depan.', 'The train station is ahead.'),
    createContentItem('Taksi', '', 'Taxi', 'word', 'Saya naik taksi ke hotel.', 'I take a taxi to the hotel.'),
    createContentItem('Bus', '', 'Bus', 'word', 'Bus ke Bandung berangkat jam berapa?', 'What time does the bus to Bandung depart?'),
    createContentItem('Kereta', '', 'Train', 'word', 'Saya naik kereta dari Jakarta ke Surabaya.', 'I take the train from Jakarta to Surabaya.'),
    createContentItem('Pesawat', '', 'Airplane', 'word', 'Pesawat berangkat jam delapan pagi.', 'The airplane departs at eight in the morning.'),
    createContentItem('Tiket', '', 'Ticket', 'word', 'Saya mau beli tiket pulang-pergi.', 'I want to buy a round-trip ticket.'),
    createContentItem('Paspor', '', 'Passport', 'word', 'Jangan lupa bawa paspor.', 'Do not forget to bring your passport.'),
    createContentItem('Peta', '', 'Map', 'word', 'Apakah Anda punya peta?', 'Do you have a map?'),
    createContentItem('Pantai', '', 'Beach', 'word', 'Pantai Bali sangat indah.', 'The beaches of Bali are very beautiful.'),
    createContentItem('Gunung', '', 'Mountain', 'word', 'Saya ingin mendaki gunung.', 'I want to climb a mountain.'),
    createContentItem('Di mana toilet?', '', 'Where is the toilet?', 'sentence', 'Permisi, di mana toilet?', 'Excuse me, where is the toilet?', [
      { korean: 'Di mana', english: 'where' },
      { korean: 'toilet', english: 'toilet' },
    ]),
    createContentItem('Saya mau pergi ke Bali.', '', 'I want to go to Bali.', 'sentence', 'Saya mau pergi ke Bali.', 'I want to go to Bali.', [
      { korean: 'Saya', english: 'I' },
      { korean: 'mau', english: 'want' },
      { korean: 'pergi', english: 'to go' },
      { korean: 'ke Bali', english: 'to Bali' },
    ]),
    createContentItem('Berapa lama perjalanannya?', '', 'How long is the journey?', 'sentence', 'Berapa lama perjalanannya?', 'How long is the journey?', [
      { korean: 'Berapa lama', english: 'how long' },
      { korean: 'perjalanannya', english: 'the journey' },
    ]),
    createContentItem('Saya tersesat.', '', 'I am lost.', 'sentence', 'Maaf, saya tersesat.', 'Sorry, I am lost.', [
      { korean: 'Saya', english: 'I' },
      { korean: 'tersesat', english: 'lost' },
    ]),
    createContentItem('Belok kiri', '', 'Turn left', 'word', 'Belok kiri di perempatan.', 'Turn left at the intersection.'),
    createContentItem('Belok kanan', '', 'Turn right', 'word', 'Belok kanan setelah lampu merah.', 'Turn right after the traffic light.'),
    createContentItem('Lurus', '', 'Straight', 'word', 'Jalan lurus saja.', 'Just go straight.'),
    createContentItem('Dekat', '', 'Near / Close', 'word', 'Hotelnya dekat dari sini.', 'The hotel is close from here.'),
    createContentItem('Jauh', '', 'Far', 'word', 'Bandaranya jauh dari kota.', 'The airport is far from the city.'),
    createContentItem('Saya ingin memesan kamar.', '', 'I would like to book a room.', 'sentence', 'Saya ingin memesan kamar untuk dua malam.', 'I would like to book a room for two nights.', [
      { korean: 'Saya', english: 'I' },
      { korean: 'ingin', english: 'would like / want' },
      { korean: 'memesan', english: 'to book / to order' },
      { korean: 'kamar', english: 'room' },
    ]),
    createContentItem('Kapan kereta berikutnya?', '', 'When is the next train?', 'sentence', 'Kapan kereta berikutnya?', 'When is the next train?', [
      { korean: 'Kapan', english: 'when' },
      { korean: 'kereta', english: 'train' },
      { korean: 'berikutnya', english: 'the next one' },
    ]),
    createContentItem('Koper', '', 'Suitcase', 'word', 'Koper saya hilang.', 'My suitcase is lost.'),
    createContentItem('Jalan-jalan', '', 'To go sightseeing / To stroll', 'word', 'Ayo kita jalan-jalan!', 'Let us go sightseeing!'),
  ],
};

// ==========================================
// SHOPPING
// ==========================================
const shopping = {
  title: 'Shopping & Markets',
  category: 'shopping',
  difficulty: 'beginner',
  targetLang: 'id',
  content: [
    createContentItem('Toko', '', 'Shop / Store', 'word', 'Toko itu buka jam sembilan.', 'That shop opens at nine.'),
    createContentItem('Pasar', '', 'Market', 'word', 'Pasar tradisional sangat ramai.', 'The traditional market is very crowded.'),
    createContentItem('Harga', '', 'Price', 'word', 'Berapa harganya?', 'How much is the price?'),
    createContentItem('Murah', '', 'Cheap', 'word', 'Barang ini murah sekali.', 'This item is very cheap.'),
    createContentItem('Mahal', '', 'Expensive', 'word', 'Terlalu mahal untuk saya.', 'Too expensive for me.'),
    createContentItem('Beli', '', 'To buy', 'word', 'Saya mau beli baju baru.', 'I want to buy new clothes.'),
    createContentItem('Jual', '', 'To sell', 'word', 'Mereka jual buah segar di sini.', 'They sell fresh fruit here.'),
    createContentItem('Uang', '', 'Money', 'word', 'Saya tidak bawa cukup uang.', 'I did not bring enough money.'),
    createContentItem('Baju', '', 'Clothes / Shirt', 'word', 'Baju ini bagus sekali.', 'This shirt is very nice.'),
    createContentItem('Celana', '', 'Pants / Trousers', 'word', 'Saya cari celana panjang.', 'I am looking for long pants.'),
    createContentItem('Sepatu', '', 'Shoes', 'word', 'Sepatu ini ukuran berapa?', 'What size are these shoes?'),
    createContentItem('Tas', '', 'Bag', 'word', 'Tas ini terbuat dari kulit.', 'This bag is made of leather.'),
    createContentItem('Boleh saya coba?', '', 'May I try it on?', 'sentence', 'Boleh saya coba baju ini?', 'May I try on this shirt?', [
      { korean: 'Boleh', english: 'may / can' },
      { korean: 'saya', english: 'I' },
      { korean: 'coba', english: 'try' },
    ]),
    createContentItem('Ada ukuran yang lebih besar?', '', 'Is there a bigger size?', 'sentence', 'Ada ukuran yang lebih besar?', 'Is there a bigger size?', [
      { korean: 'Ada', english: 'is there' },
      { korean: 'ukuran', english: 'size' },
      { korean: 'yang lebih besar', english: 'that is bigger' },
    ]),
    createContentItem('Bisa kurang?', '', 'Can you lower the price?', 'sentence', 'Bisa kurang sedikit?', 'Can you lower the price a little?', [
      { korean: 'Bisa', english: 'can' },
      { korean: 'kurang', english: 'less / reduce' },
    ]),
    createContentItem('Saya hanya melihat-lihat.', '', 'I am just looking around.', 'sentence', 'Saya hanya melihat-lihat saja.', 'I am just looking around.', [
      { korean: 'Saya', english: 'I' },
      { korean: 'hanya', english: 'only / just' },
      { korean: 'melihat-lihat', english: 'looking around' },
    ]),
    createContentItem('Bayar', '', 'To pay', 'word', 'Saya mau bayar dengan kartu.', 'I want to pay by card.'),
    createContentItem('Kembalian', '', 'Change (money)', 'word', 'Ini kembalian Anda.', 'Here is your change.'),
    createContentItem('Diskon', '', 'Discount', 'word', 'Apakah ada diskon?', 'Is there a discount?'),
    createContentItem('Kasir', '', 'Cashier', 'word', 'Silakan bayar di kasir.', 'Please pay at the cashier.'),
    createContentItem('Bisa bayar pakai kartu?', '', 'Can I pay with a card?', 'sentence', 'Bisa bayar pakai kartu kredit?', 'Can I pay with a credit card?', [
      { korean: 'Bisa', english: 'can' },
      { korean: 'bayar', english: 'pay' },
      { korean: 'pakai', english: 'use / with' },
      { korean: 'kartu', english: 'card' },
    ]),
    createContentItem('Plastik', '', 'Plastic bag', 'word', 'Tidak pakai plastik, terima kasih.', 'No plastic bag, thank you.'),
    createContentItem('Saya cari oleh-oleh.', '', 'I am looking for souvenirs.', 'sentence', 'Saya cari oleh-oleh untuk keluarga.', 'I am looking for souvenirs for my family.', [
      { korean: 'Saya', english: 'I' },
      { korean: 'cari', english: 'to look for' },
      { korean: 'oleh-oleh', english: 'souvenirs' },
    ]),
    createContentItem('Warna', '', 'Color', 'word', 'Ada warna lain?', 'Is there another color?'),
    createContentItem('Ukuran', '', 'Size', 'word', 'Ukuran saya medium.', 'My size is medium.'),
  ],
};

// ==========================================
// BUSINESS & WORK
// ==========================================
const business = {
  title: 'Business & Office',
  category: 'business',
  difficulty: 'beginner',
  targetLang: 'id',
  content: [
    createContentItem('Kantor', '', 'Office', 'word', 'Kantor saya di pusat kota.', 'My office is in the city center.'),
    createContentItem('Rapat', '', 'Meeting', 'word', 'Rapat dimulai jam sepuluh.', 'The meeting starts at ten.'),
    createContentItem('Bos', '', 'Boss', 'word', 'Bos saya sangat baik.', 'My boss is very kind.'),
    createContentItem('Karyawan', '', 'Employee', 'word', 'Perusahaan ini punya banyak karyawan.', 'This company has many employees.'),
    createContentItem('Perusahaan', '', 'Company', 'word', 'Perusahaan ini berdiri tahun 2010.', 'This company was established in 2010.'),
    createContentItem('Gaji', '', 'Salary', 'word', 'Gaji dibayar setiap bulan.', 'The salary is paid every month.'),
    createContentItem('Pekerjaan', '', 'Job / Work', 'word', 'Apa pekerjaan Anda?', 'What is your job?'),
    createContentItem('Komputer', '', 'Computer', 'word', 'Saya bekerja di depan komputer.', 'I work in front of the computer.'),
    createContentItem('Email', '', 'Email', 'word', 'Saya akan kirim email.', 'I will send an email.'),
    createContentItem('Telepon', '', 'Telephone / Phone', 'word', 'Tolong angkat teleponnya.', 'Please answer the phone.'),
    createContentItem('Saya bekerja di bidang teknologi.', '', 'I work in the technology field.', 'sentence', 'Saya bekerja di bidang teknologi.', 'I work in the technology field.', [
      { korean: 'Saya', english: 'I' },
      { korean: 'bekerja', english: 'work' },
      { korean: 'di bidang', english: 'in the field of' },
      { korean: 'teknologi', english: 'technology' },
    ]),
    createContentItem('Boleh minta kartu nama Anda?', '', 'May I have your business card?', 'sentence', 'Boleh minta kartu nama Anda?', 'May I have your business card?', [
      { korean: 'Boleh', english: 'may' },
      { korean: 'minta', english: 'to request' },
      { korean: 'kartu nama', english: 'business card' },
      { korean: 'Anda', english: 'your' },
    ]),
    createContentItem('Jadwal', '', 'Schedule', 'word', 'Jadwal rapat hari ini apa?', 'What is the meeting schedule today?'),
    createContentItem('Kontrak', '', 'Contract', 'word', 'Tolong tanda tangan kontrak ini.', 'Please sign this contract.'),
    createContentItem('Proyek', '', 'Project', 'word', 'Proyek ini harus selesai bulan depan.', 'This project must be finished next month.'),
    createContentItem('Rapat dimulai jam berapa?', '', 'What time does the meeting start?', 'sentence', 'Rapat dimulai jam berapa?', 'What time does the meeting start?', [
      { korean: 'Rapat', english: 'meeting' },
      { korean: 'dimulai', english: 'starts' },
      { korean: 'jam berapa', english: 'at what time' },
    ]),
    createContentItem('Saya ingin memperkenalkan diri.', '', 'I would like to introduce myself.', 'sentence', 'Saya ingin memperkenalkan diri.', 'I would like to introduce myself.', [
      { korean: 'Saya', english: 'I' },
      { korean: 'ingin', english: 'would like' },
      { korean: 'memperkenalkan diri', english: 'to introduce myself' },
    ]),
    createContentItem('Presentasi', '', 'Presentation', 'word', 'Saya harus buat presentasi.', 'I have to make a presentation.'),
    createContentItem('Laporan', '', 'Report', 'word', 'Laporan sudah selesai.', 'The report is finished.'),
    createContentItem('Bisakah kita jadwalkan rapat?', '', 'Can we schedule a meeting?', 'sentence', 'Bisakah kita jadwalkan rapat minggu depan?', 'Can we schedule a meeting next week?', [
      { korean: 'Bisakah', english: 'can (question)' },
      { korean: 'kita', english: 'we' },
      { korean: 'jadwalkan', english: 'schedule' },
      { korean: 'rapat', english: 'meeting' },
    ]),
    createContentItem('Setuju', '', 'Agree', 'word', 'Saya setuju dengan rencana itu.', 'I agree with that plan.'),
    createContentItem('Tidak setuju', '', 'Disagree', 'word', 'Maaf, saya tidak setuju.', 'Sorry, I disagree.'),
    createContentItem('Terima kasih atas kerja samanya.', '', 'Thank you for the cooperation.', 'sentence', 'Terima kasih atas kerja samanya.', 'Thank you for the cooperation.', [
      { korean: 'Terima kasih', english: 'thank you' },
      { korean: 'atas', english: 'for' },
      { korean: 'kerja samanya', english: 'the cooperation' },
    ]),
    createContentItem('Klien', '', 'Client', 'word', 'Klien akan datang hari ini.', 'The client will come today.'),
    createContentItem('Wawancara', '', 'Interview', 'word', 'Saya punya wawancara kerja besok.', 'I have a job interview tomorrow.'),
  ],
};

// ==========================================
// HEALTHCARE & MEDICAL
// ==========================================
const healthcare = {
  title: 'Healthcare & Medical',
  category: 'healthcare',
  difficulty: 'beginner',
  targetLang: 'id',
  content: [
    createContentItem('Rumah sakit', '', 'Hospital', 'word', 'Rumah sakit ada di jalan utama.', 'The hospital is on the main road.'),
    createContentItem('Dokter', '', 'Doctor', 'word', 'Saya perlu ke dokter.', 'I need to see a doctor.'),
    createContentItem('Obat', '', 'Medicine', 'word', 'Saya harus minum obat tiga kali sehari.', 'I have to take medicine three times a day.'),
    createContentItem('Sakit', '', 'Sick / Pain', 'word', 'Saya merasa sakit.', 'I feel sick.'),
    createContentItem('Demam', '', 'Fever', 'word', 'Anak saya demam tinggi.', 'My child has a high fever.'),
    createContentItem('Batuk', '', 'Cough', 'word', 'Saya batuk sudah tiga hari.', 'I have been coughing for three days.'),
    createContentItem('Pilek', '', 'Cold / Runny nose', 'word', 'Saya pilek dan bersin-bersin.', 'I have a cold and keep sneezing.'),
    createContentItem('Kepala', '', 'Head', 'word', 'Kepala saya pusing.', 'My head is dizzy.'),
    createContentItem('Perut', '', 'Stomach', 'word', 'Perut saya sakit.', 'My stomach hurts.'),
    createContentItem('Alergi', '', 'Allergy', 'word', 'Saya alergi kacang.', 'I am allergic to nuts.'),
    createContentItem('Apotek', '', 'Pharmacy', 'word', 'Ada apotek di dekat sini?', 'Is there a pharmacy nearby?'),
    createContentItem('Saya perlu bantuan medis.', '', 'I need medical help.', 'sentence', 'Tolong, saya perlu bantuan medis.', 'Please, I need medical help.', [
      { korean: 'Saya', english: 'I' },
      { korean: 'perlu', english: 'need' },
      { korean: 'bantuan', english: 'help' },
      { korean: 'medis', english: 'medical' },
    ]),
    createContentItem('Di mana rumah sakit terdekat?', '', 'Where is the nearest hospital?', 'sentence', 'Di mana rumah sakit terdekat?', 'Where is the nearest hospital?', [
      { korean: 'Di mana', english: 'where' },
      { korean: 'rumah sakit', english: 'hospital' },
      { korean: 'terdekat', english: 'nearest' },
    ]),
    createContentItem('Saya punya asuransi kesehatan.', '', 'I have health insurance.', 'sentence', 'Saya punya asuransi kesehatan.', 'I have health insurance.', [
      { korean: 'Saya', english: 'I' },
      { korean: 'punya', english: 'have' },
      { korean: 'asuransi', english: 'insurance' },
      { korean: 'kesehatan', english: 'health' },
    ]),
    createContentItem('Resep', '', 'Prescription', 'word', 'Dokter memberikan resep obat.', 'The doctor gave a prescription.'),
    createContentItem('Perawat', '', 'Nurse', 'word', 'Perawat itu sangat ramah.', 'That nurse is very friendly.'),
    createContentItem('Saya alergi terhadap penisilin.', '', 'I am allergic to penicillin.', 'sentence', 'Saya alergi terhadap penisilin.', 'I am allergic to penicillin.', [
      { korean: 'Saya', english: 'I' },
      { korean: 'alergi', english: 'allergic' },
      { korean: 'terhadap', english: 'to / towards' },
      { korean: 'penisilin', english: 'penicillin' },
    ]),
    createContentItem('Gigi', '', 'Tooth / Teeth', 'word', 'Gigi saya sakit.', 'My tooth hurts.'),
    createContentItem('Mata', '', 'Eye', 'word', 'Mata saya merah dan gatal.', 'My eyes are red and itchy.'),
    createContentItem('Saya merasa tidak enak badan.', '', 'I do not feel well.', 'sentence', 'Saya merasa tidak enak badan hari ini.', 'I do not feel well today.', [
      { korean: 'Saya', english: 'I' },
      { korean: 'merasa', english: 'feel' },
      { korean: 'tidak enak badan', english: 'not feeling well / unwell' },
    ]),
    createContentItem('Sudah berapa lama sakitnya?', '', 'How long have you been sick?', 'sentence', 'Sudah berapa lama sakitnya?', 'How long have you been sick?', [
      { korean: 'Sudah', english: 'already' },
      { korean: 'berapa lama', english: 'how long' },
      { korean: 'sakitnya', english: 'the illness' },
    ]),
    createContentItem('Ambulans', '', 'Ambulance', 'word', 'Tolong panggil ambulans!', 'Please call an ambulance!'),
    createContentItem('Luka', '', 'Wound / Injury', 'word', 'Lukanya tidak terlalu parah.', 'The wound is not too serious.'),
    createContentItem('Vitamin', '', 'Vitamin', 'word', 'Saya minum vitamin setiap hari.', 'I take vitamins every day.'),
    createContentItem('Tekanan darah', '', 'Blood pressure', 'word', 'Tekanan darah saya normal.', 'My blood pressure is normal.'),
  ],
};

module.exports = { greetings, dailyLife, food, travel, shopping, business, healthcare };
