const { Resend } = require('resend');

// Lazily instantiated so a missing key only fails when email is actually sent,
// not at server startup (allows local dev without email credentials).
let _resend = null;
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3001';

// Localized email strings keyed by language code
const EMAIL_STRINGS = {
  en: {
    subject: 'Verify your Lingo Booth account',
    heading: 'Verify your email',
    greeting: (name) => `Hi <strong>${name}</strong>, thanks for signing up! Please confirm your email address to get the most out of Lingo Booth.`,
    button: 'Verify Email',
    copyLink: 'Or copy and paste this link into your browser:',
    expiry: "This link expires in 24 hours. If you didn't create an account, you can safely ignore this email.",
    footer: 'Learn languages for real conversations',
    textGreeting: (name) => `Hi ${name},\n\nThanks for signing up for Lingo Booth! Please verify your email by visiting this link:`,
    textExpiry: "This link expires in 24 hours.\n\nIf you didn't create an account, you can safely ignore this email.",
  },
  ko: {
    subject: 'Lingo Booth 계정 이메일 인증',
    heading: '이메일 인증',
    greeting: (name) => `안녕하세요 <strong>${name}</strong>님, 가입해 주셔서 감사합니다! Lingo Booth를 최대한 활용하려면 이메일 주소를 인증해 주세요.`,
    button: '이메일 인증',
    copyLink: '또는 아래 링크를 브라우저에 복사하여 붙여넣으세요:',
    expiry: '이 링크는 24시간 후에 만료됩니다. 계정을 만들지 않으셨다면 이 이메일을 무시하셔도 됩니다.',
    footer: '실제 대화를 위한 언어 학습',
    textGreeting: (name) => `안녕하세요 ${name}님,\n\nLingo Booth에 가입해 주셔서 감사합니다! 아래 링크를 방문하여 이메일을 인증해 주세요:`,
    textExpiry: '이 링크는 24시간 후에 만료됩니다.\n\n계정을 만들지 않으셨다면 이 이메일을 무시하셔도 됩니다.',
  },
  es: {
    subject: 'Verifica tu cuenta de Lingo Booth',
    heading: 'Verifica tu correo',
    greeting: (name) => `Hola <strong>${name}</strong>, ¡gracias por registrarte! Confirma tu dirección de correo para aprovechar Lingo Booth al máximo.`,
    button: 'Verificar correo',
    copyLink: 'O copia y pega este enlace en tu navegador:',
    expiry: 'Este enlace expira en 24 horas. Si no creaste una cuenta, puedes ignorar este correo.',
    footer: 'Aprende idiomas para conversaciones reales',
    textGreeting: (name) => `Hola ${name},\n\n¡Gracias por registrarte en Lingo Booth! Verifica tu correo visitando este enlace:`,
    textExpiry: 'Este enlace expira en 24 horas.\n\nSi no creaste una cuenta, puedes ignorar este correo.',
  },
  fr: {
    subject: 'Vérifiez votre compte Lingo Booth',
    heading: 'Vérifiez votre e-mail',
    greeting: (name) => `Bonjour <strong>${name}</strong>, merci de vous être inscrit ! Confirmez votre adresse e-mail pour profiter pleinement de Lingo Booth.`,
    button: 'Vérifier l\'e-mail',
    copyLink: 'Ou copiez et collez ce lien dans votre navigateur :',
    expiry: 'Ce lien expire dans 24 heures. Si vous n\'avez pas créé de compte, vous pouvez ignorer cet e-mail.',
    footer: 'Apprenez des langues pour de vraies conversations',
    textGreeting: (name) => `Bonjour ${name},\n\nMerci de vous être inscrit sur Lingo Booth ! Vérifiez votre e-mail en visitant ce lien :`,
    textExpiry: 'Ce lien expire dans 24 heures.\n\nSi vous n\'avez pas créé de compte, vous pouvez ignorer cet e-mail.',
  },
  de: {
    subject: 'Bestätige dein Lingo Booth Konto',
    heading: 'E-Mail bestätigen',
    greeting: (name) => `Hallo <strong>${name}</strong>, danke für die Anmeldung! Bitte bestätige deine E-Mail-Adresse, um Lingo Booth voll nutzen zu können.`,
    button: 'E-Mail bestätigen',
    copyLink: 'Oder kopiere diesen Link und füge ihn in deinen Browser ein:',
    expiry: 'Dieser Link läuft in 24 Stunden ab. Wenn du kein Konto erstellt hast, kannst du diese E-Mail ignorieren.',
    footer: 'Sprachen lernen für echte Gespräche',
    textGreeting: (name) => `Hallo ${name},\n\nDanke für die Anmeldung bei Lingo Booth! Bestätige deine E-Mail über diesen Link:`,
    textExpiry: 'Dieser Link läuft in 24 Stunden ab.\n\nWenn du kein Konto erstellt hast, kannst du diese E-Mail ignorieren.',
  },
  zh: {
    subject: '验证您的 Lingo Booth 账户',
    heading: '验证您的邮箱',
    greeting: (name) => `您好 <strong>${name}</strong>，感谢您的注册！请验证您的邮箱地址，以充分使用 Lingo Booth。`,
    button: '验证邮箱',
    copyLink: '或将此链接复制粘贴到浏览器中：',
    expiry: '此链接将在24小时后过期。如果您没有创建账户，可以忽略此邮件。',
    footer: '学习语言，进行真实对话',
    textGreeting: (name) => `您好 ${name}，\n\n感谢您注册 Lingo Booth！请访问以下链接验证您的邮箱：`,
    textExpiry: '此链接将在24小时后过期。\n\n如果您没有创建账户，可以忽略此邮件。',
  },
  ja: {
    subject: 'Lingo Booth アカウントのメール認証',
    heading: 'メールアドレスの認証',
    greeting: (name) => `<strong>${name}</strong>さん、ご登録ありがとうございます！Lingo Boothを最大限にご活用いただくため、メールアドレスを認証してください。`,
    button: 'メールを認証',
    copyLink: 'または、以下のリンクをブラウザにコピーしてください：',
    expiry: 'このリンクは24時間で有効期限が切れます。アカウントを作成していない場合は、このメールを無視してください。',
    footer: '実際の会話のための語学学習',
    textGreeting: (name) => `${name}さん\n\nLingo Boothへのご登録ありがとうございます！以下のリンクからメールを認証してください：`,
    textExpiry: 'このリンクは24時間で有効期限が切れます。\n\nアカウントを作成していない場合は、このメールを無視してください。',
  },
  hi: {
    subject: 'अपना Lingo Booth खाता सत्यापित करें',
    heading: 'ईमेल सत्यापित करें',
    greeting: (name) => `नमस्ते <strong>${name}</strong>, साइन अप करने के लिए धन्यवाद! Lingo Booth का पूरा लाभ उठाने के लिए कृपया अपना ईमेल पता सत्यापित करें।`,
    button: 'ईमेल सत्यापित करें',
    copyLink: 'या इस लिंक को अपने ब्राउज़र में कॉपी और पेस्ट करें:',
    expiry: 'यह लिंक 24 घंटे में समाप्त हो जाएगा। यदि आपने खाता नहीं बनाया है, तो इस ईमेल को अनदेखा करें।',
    footer: 'वास्तविक बातचीत के लिए भाषाएँ सीखें',
    textGreeting: (name) => `नमस्ते ${name},\n\nLingo Booth में साइन अप करने के लिए धन्यवाद! कृपया इस लिंक पर जाकर अपना ईमेल सत्यापित करें:`,
    textExpiry: 'यह लिंक 24 घंटे में समाप्त हो जाएगा।\n\nयदि आपने खाता नहीं बनाया है, तो इस ईमेल को अनदेखा करें।',
  },
  ar: {
    subject: 'تحقق من حساب Lingo Booth الخاص بك',
    heading: 'تحقق من بريدك الإلكتروني',
    greeting: (name) => `مرحباً <strong>${name}</strong>، شكراً لتسجيلك! يرجى تأكيد عنوان بريدك الإلكتروني للاستفادة القصوى من Lingo Booth.`,
    button: 'تحقق من البريد الإلكتروني',
    copyLink: 'أو انسخ والصق هذا الرابط في متصفحك:',
    expiry: 'ينتهي هذا الرابط خلال 24 ساعة. إذا لم تقم بإنشاء حساب، يمكنك تجاهل هذا البريد.',
    footer: 'تعلم اللغات للمحادثات الحقيقية',
    textGreeting: (name) => `مرحباً ${name}،\n\nشكراً لتسجيلك في Lingo Booth! يرجى التحقق من بريدك الإلكتروني بزيارة هذا الرابط:`,
    textExpiry: 'ينتهي هذا الرابط خلال 24 ساعة.\n\nإذا لم تقم بإنشاء حساب، يمكنك تجاهل هذا البريد.',
  },
  he: {
    subject: 'אמת את חשבון Lingo Booth שלך',
    heading: 'אמת את האימייל שלך',
    greeting: (name) => `שלום <strong>${name}</strong>, תודה שנרשמת! אנא אשר את כתובת האימייל שלך כדי להפיק את המרב מ-Lingo Booth.`,
    button: 'אמת אימייל',
    copyLink: 'או העתק והדבק את הקישור הזה בדפדפן שלך:',
    expiry: 'קישור זה יפוג תוך 24 שעות. אם לא יצרת חשבון, אפשר להתעלם מאימייל זה.',
    footer: 'למד שפות לשיחות אמיתיות',
    textGreeting: (name) => `שלום ${name},\n\nתודה שנרשמת ל-Lingo Booth! אנא אמת את האימייל שלך בביקור בקישור הזה:`,
    textExpiry: 'קישור זה יפוג תוך 24 שעות.\n\nאם לא יצרת חשבון, אפשר להתעלם מאימייל זה.',
  },
  pt: {
    subject: 'Verifique sua conta Lingo Booth',
    heading: 'Verifique seu e-mail',
    greeting: (name) => `Olá <strong>${name}</strong>, obrigado por se cadastrar! Confirme seu endereço de e-mail para aproveitar ao máximo o Lingo Booth.`,
    button: 'Verificar e-mail',
    copyLink: 'Ou copie e cole este link no seu navegador:',
    expiry: 'Este link expira em 24 horas. Se você não criou uma conta, pode ignorar este e-mail.',
    footer: 'Aprenda idiomas para conversas reais',
    textGreeting: (name) => `Olá ${name},\n\nObrigado por se cadastrar no Lingo Booth! Verifique seu e-mail visitando este link:`,
    textExpiry: 'Este link expira em 24 horas.\n\nSe você não criou uma conta, pode ignorar este e-mail.',
  },
  it: {
    subject: 'Verifica il tuo account Lingo Booth',
    heading: 'Verifica la tua email',
    greeting: (name) => `Ciao <strong>${name}</strong>, grazie per esserti registrato! Conferma il tuo indirizzo email per sfruttare al meglio Lingo Booth.`,
    button: 'Verifica email',
    copyLink: 'Oppure copia e incolla questo link nel tuo browser:',
    expiry: 'Questo link scade tra 24 ore. Se non hai creato un account, puoi ignorare questa email.',
    footer: 'Impara le lingue per conversazioni reali',
    textGreeting: (name) => `Ciao ${name},\n\nGrazie per esserti registrato su Lingo Booth! Verifica la tua email visitando questo link:`,
    textExpiry: 'Questo link scade tra 24 ore.\n\nSe non hai creato un account, puoi ignorare questa email.',
  },
  nl: {
    subject: 'Verifieer je Lingo Booth account',
    heading: 'Verifieer je e-mail',
    greeting: (name) => `Hallo <strong>${name}</strong>, bedankt voor je aanmelding! Bevestig je e-mailadres om het meeste uit Lingo Booth te halen.`,
    button: 'E-mail verifiëren',
    copyLink: 'Of kopieer en plak deze link in je browser:',
    expiry: 'Deze link verloopt over 24 uur. Als je geen account hebt aangemaakt, kun je deze e-mail negeren.',
    footer: 'Leer talen voor echte gesprekken',
    textGreeting: (name) => `Hallo ${name},\n\nBedankt voor je aanmelding bij Lingo Booth! Verifieer je e-mail via deze link:`,
    textExpiry: 'Deze link verloopt over 24 uur.\n\nAls je geen account hebt aangemaakt, kun je deze e-mail negeren.',
  },
  ru: {
    subject: 'Подтвердите свой аккаунт Lingo Booth',
    heading: 'Подтвердите email',
    greeting: (name) => `Привет, <strong>${name}</strong>, спасибо за регистрацию! Подтвердите свой email, чтобы использовать Lingo Booth на полную.`,
    button: 'Подтвердить email',
    copyLink: 'Или скопируйте и вставьте эту ссылку в браузер:',
    expiry: 'Ссылка действительна 24 часа. Если вы не создавали аккаунт, просто проигнорируйте это письмо.',
    footer: 'Учите языки для реальных разговоров',
    textGreeting: (name) => `Привет, ${name},\n\nСпасибо за регистрацию в Lingo Booth! Подтвердите свой email, перейдя по ссылке:`,
    textExpiry: 'Ссылка действительна 24 часа.\n\nЕсли вы не создавали аккаунт, просто проигнорируйте это письмо.',
  },
  id: {
    subject: 'Verifikasi akun Lingo Booth Anda',
    heading: 'Verifikasi email Anda',
    greeting: (name) => `Halo <strong>${name}</strong>, terima kasih telah mendaftar! Silakan konfirmasi alamat email Anda untuk memaksimalkan Lingo Booth.`,
    button: 'Verifikasi Email',
    copyLink: 'Atau salin dan tempel tautan ini di browser Anda:',
    expiry: 'Tautan ini kedaluwarsa dalam 24 jam. Jika Anda tidak membuat akun, abaikan email ini.',
    footer: 'Belajar bahasa untuk percakapan nyata',
    textGreeting: (name) => `Halo ${name},\n\nTerima kasih telah mendaftar di Lingo Booth! Verifikasi email Anda dengan mengunjungi tautan ini:`,
    textExpiry: 'Tautan ini kedaluwarsa dalam 24 jam.\n\nJika Anda tidak membuat akun, abaikan email ini.',
  },
  ms: {
    subject: 'Sahkan akaun Lingo Booth anda',
    heading: 'Sahkan e-mel anda',
    greeting: (name) => `Hai <strong>${name}</strong>, terima kasih kerana mendaftar! Sila sahkan alamat e-mel anda untuk memanfaatkan Lingo Booth sepenuhnya.`,
    button: 'Sahkan E-mel',
    copyLink: 'Atau salin dan tampal pautan ini dalam pelayar anda:',
    expiry: 'Pautan ini tamat tempoh dalam 24 jam. Jika anda tidak membuat akaun, abaikan e-mel ini.',
    footer: 'Belajar bahasa untuk perbualan sebenar',
    textGreeting: (name) => `Hai ${name},\n\nTerima kasih kerana mendaftar di Lingo Booth! Sahkan e-mel anda dengan melawati pautan ini:`,
    textExpiry: 'Pautan ini tamat tempoh dalam 24 jam.\n\nJika anda tidak membuat akaun, abaikan e-mel ini.',
  },
  fil: {
    subject: 'I-verify ang iyong Lingo Booth account',
    heading: 'I-verify ang iyong email',
    greeting: (name) => `Kumusta <strong>${name}</strong>, salamat sa pag-sign up! Pakikumpirma ang iyong email address para masulit ang Lingo Booth.`,
    button: 'I-verify ang Email',
    copyLink: 'O kopyahin at i-paste ang link na ito sa iyong browser:',
    expiry: 'Mag-e-expire ang link na ito sa loob ng 24 oras. Kung hindi ka gumawa ng account, maaari mong balewalain ang email na ito.',
    footer: 'Matuto ng mga wika para sa totoong pag-uusap',
    textGreeting: (name) => `Kumusta ${name},\n\nSalamat sa pag-sign up sa Lingo Booth! I-verify ang iyong email sa pamamagitan ng pagbisita sa link na ito:`,
    textExpiry: 'Mag-e-expire ang link na ito sa loob ng 24 oras.\n\nKung hindi ka gumawa ng account, maaari mong balewalain ang email na ito.',
  },
  tr: {
    subject: 'Lingo Booth hesabınızı doğrulayın',
    heading: 'E-postanızı doğrulayın',
    greeting: (name) => `Merhaba <strong>${name}</strong>, kayıt olduğunuz için teşekkürler! Lingo Booth'u en iyi şekilde kullanmak için e-posta adresinizi doğrulayın.`,
    button: 'E-postayı Doğrula',
    copyLink: 'Veya bu bağlantıyı tarayıcınıza kopyalayıp yapıştırın:',
    expiry: 'Bu bağlantı 24 saat içinde sona erer. Hesap oluşturmadıysanız bu e-postayı görmezden gelebilirsiniz.',
    footer: 'Gerçek konuşmalar için dil öğrenin',
    textGreeting: (name) => `Merhaba ${name},\n\nLingo Booth'a kayıt olduğunuz için teşekkürler! Bu bağlantıyı ziyaret ederek e-postanızı doğrulayın:`,
    textExpiry: 'Bu bağlantı 24 saat içinde sona erer.\n\nHesap oluşturmadıysanız bu e-postayı görmezden gelebilirsiniz.',
  },
  bn: {
    subject: 'আপনার Lingo Booth অ্যাকাউন্ট যাচাই করুন',
    heading: 'ইমেইল যাচাই করুন',
    greeting: (name) => `হ্যালো <strong>${name}</strong>, সাইন আপ করার জন্য ধন্যবাদ! Lingo Booth সর্বোচ্চ ব্যবহার করতে আপনার ইমেইল ঠিকানা নিশ্চিত করুন।`,
    button: 'ইমেইল যাচাই করুন',
    copyLink: 'অথবা এই লিঙ্কটি আপনার ব্রাউজারে কপি ও পেস্ট করুন:',
    expiry: 'এই লিঙ্কটি ২৪ ঘণ্টায় মেয়াদ শেষ হবে। আপনি যদি অ্যাকাউন্ট তৈরি না করে থাকেন, এই ইমেইলটি উপেক্ষা করুন।',
    footer: 'বাস্তব কথোপকথনের জন্য ভাষা শিখুন',
    textGreeting: (name) => `হ্যালো ${name},\n\nLingo Booth-এ সাইন আপ করার জন্য ধন্যবাদ! এই লিঙ্কে গিয়ে আপনার ইমেইল যাচাই করুন:`,
    textExpiry: 'এই লিঙ্কটি ২৪ ঘণ্টায় মেয়াদ শেষ হবে।\n\nআপনি যদি অ্যাকাউন্ট তৈরি না করে থাকেন, এই ইমেইলটি উপেক্ষা করুন।',
  },
  ta: {
    subject: 'உங்கள் Lingo Booth கணக்கை சரிபார்க்கவும்',
    heading: 'மின்னஞ்சலை சரிபார்க்கவும்',
    greeting: (name) => `வணக்கம் <strong>${name}</strong>, பதிவு செய்ததற்கு நன்றி! Lingo Booth-ஐ முழுமையாகப் பயன்படுத்த உங்கள் மின்னஞ்சல் முகவரியை உறுதிப்படுத்தவும்.`,
    button: 'மின்னஞ்சலை சரிபார்',
    copyLink: 'அல்லது இந்த இணைப்பை உங்கள் உலாவியில் நகலெடுத்து ஒட்டவும்:',
    expiry: 'இந்த இணைப்பு 24 மணி நேரத்தில் காலாவதியாகும். நீங்கள் கணக்கை உருவாக்கவில்லை என்றால், இந்த மின்னஞ்சலை புறக்கணிக்கலாம்.',
    footer: 'உண்மையான உரையாடல்களுக்கான மொழிகளைக் கற்றுக்கொள்ளுங்கள்',
    textGreeting: (name) => `வணக்கம் ${name},\n\nLingo Booth-ல் பதிவு செய்ததற்கு நன்றி! இந்த இணைப்பை பார்வையிட்டு உங்கள் மின்னஞ்சலை சரிபார்க்கவும்:`,
    textExpiry: 'இந்த இணைப்பு 24 மணி நேரத்தில் காலாவதியாகும்.\n\nநீங்கள் கணக்கை உருவாக்கவில்லை என்றால், இந்த மின்னஞ்சலை புறக்கணிக்கலாம்.',
  },
};

function getStrings(lang) {
  return EMAIL_STRINGS[lang] || EMAIL_STRINGS.en;
}

function buildVerificationTemplate(username, verifyUrl, lang) {
  const s = getStrings(lang);
  const dir = (lang === 'ar' || lang === 'he') ? 'rtl' : 'ltr';
  return `
<!DOCTYPE html>
<html dir="${dir}" lang="${lang}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#faf7f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f2;padding:40px 20px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#ff6b35,#ff8f5e);padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Lingo Booth</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0 0 8px;color:#1a1a2e;font-size:22px;">${s.heading}</h2>
            <p style="margin:0 0 24px;color:#6b7280;font-size:15px;line-height:1.6;">
              ${s.greeting(username)}
            </p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td align="center" style="padding:8px 0 32px;">
                <a href="${verifyUrl}" style="display:inline-block;background:#ff6b35;color:#ffffff;text-decoration:none;padding:14px 40px;border-radius:10px;font-size:16px;font-weight:600;">
                  ${s.button}
                </a>
              </td></tr>
            </table>
            <p style="margin:0 0 8px;color:#9ca3af;font-size:13px;">
              ${s.copyLink}
            </p>
            <p style="margin:0 0 24px;color:#ff6b35;font-size:13px;word-break:break-all;">
              ${verifyUrl}
            </p>
            <p style="margin:0;color:#9ca3af;font-size:13px;">
              ${s.expiry}
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;background:#f9fafb;text-align:center;border-top:1px solid #f0f0f0;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">
              &copy; ${new Date().getFullYear()} Lingo Booth &mdash; ${s.footer}
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendVerificationEmail(to, username, token, lang = 'en') {
  const s = getStrings(lang);
  const verifyUrl = `${FRONTEND_URL}/verify-email?token=${token}`;
  const html = buildVerificationTemplate(username, verifyUrl, lang);
  const text = `${s.textGreeting(username)}\n\n${verifyUrl}\n\n${s.textExpiry}\n\n— Lingo Booth`;

  const { error } = await getResend().emails.send({
    from: 'Lingo Booth <info@lingobooth.com>',
    reply_to: 'info@lingobooth.com',
    to,
    subject: s.subject,
    html,
    text,
  });

  if (error) {
    console.error('Resend email error:', error);
    throw new Error(error.message || 'Failed to send verification email');
  }
}

// --- Password Reset Email ---

const RESET_STRINGS = {
  en: {
    subject: 'Reset your Lingo Booth password',
    heading: 'Reset your password',
    greeting: (name) => `Hi <strong>${name}</strong>, we received a request to reset your password. Click the button below to choose a new one.`,
    button: 'Reset Password',
    copyLink: 'Or copy and paste this link into your browser:',
    expiry: "This link expires in 1 hour. If you didn't request a password reset, you can safely ignore this email.",
  },
};

function getResetStrings(lang) {
  return RESET_STRINGS[lang] || RESET_STRINGS.en;
}

function buildResetTemplate(username, resetUrl, lang) {
  const s = getResetStrings(lang);
  const dir = (lang === 'ar' || lang === 'he') ? 'rtl' : 'ltr';
  return `
<!DOCTYPE html>
<html dir="${dir}" lang="${lang}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#faf7f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f2;padding:40px 20px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
        <tr>
          <td style="background:linear-gradient(135deg,#ff6b35,#ff8f5e);padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Lingo Booth</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0 0 8px;color:#1a1a2e;font-size:22px;">${s.heading}</h2>
            <p style="margin:0 0 24px;color:#6b7280;font-size:15px;line-height:1.6;">${s.greeting(username)}</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td align="center" style="padding:8px 0 32px;">
                <a href="${resetUrl}" style="display:inline-block;background:#ff6b35;color:#ffffff;text-decoration:none;padding:14px 40px;border-radius:10px;font-size:16px;font-weight:600;">${s.button}</a>
              </td></tr>
            </table>
            <p style="margin:0 0 8px;color:#9ca3af;font-size:13px;">${s.copyLink}</p>
            <p style="margin:0 0 24px;color:#ff6b35;font-size:13px;word-break:break-all;">${resetUrl}</p>
            <p style="margin:0;color:#9ca3af;font-size:13px;">${s.expiry}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;background:#f9fafb;text-align:center;border-top:1px solid #f0f0f0;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">&copy; ${new Date().getFullYear()} Lingo Booth</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendPasswordResetEmail(to, username, token, lang = 'en') {
  const s = getResetStrings(lang);
  const resetUrl = `${FRONTEND_URL}/reset-password?token=${token}`;
  const html = buildResetTemplate(username, resetUrl, lang);
  const text = `${s.textGreeting ? s.textGreeting(username) : `Hi ${username},\n\nWe received a request to reset your Lingo Booth password. Visit this link:`}\n\n${resetUrl}\n\nThis link expires in 1 hour.\n\n— Lingo Booth`;

  const { error } = await getResend().emails.send({
    from: 'Lingo Booth <info@lingobooth.com>',
    reply_to: 'info@lingobooth.com',
    to,
    subject: s.subject,
    html,
    text,
  });

  if (error) {
    console.error('Resend email error:', error);
    throw new Error(error.message || 'Failed to send password reset email');
  }
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail };
