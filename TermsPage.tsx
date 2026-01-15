import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TermsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 glass-effect sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="gap-2 hover:bg-primary/10 hover:text-primary transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            මුල් පිටුව
          </Button>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold">Terms & Conditions</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="glass-effect rounded-2xl p-8 md:p-12">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">නියම සහ කොන්දේසි</h1>
            <p className="text-muted-foreground">අවසන් වරට යාවත්කාලීන කළ දිනය: 2025 ජනවාරි 15</p>
          </div>

          {/* Alert Box */}
          <div className="mb-8 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-600 mb-1">වැදගත් දැනුම්දීමක්</p>
              <p className="text-sm text-muted-foreground">
                අපගේ සේවා භාවිතා කිරීමෙන්, ඔබ මෙම නියම සහ කොන්දේසි වලට එකඟ වන බව සලකනු ලැබේ. කරුණාකර ප්‍රවේශමෙන් කියවන්න.
              </p>
            </div>
          </div>

          {/* Terms Content */}
          <div className="space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-bold">1</span>
                සේවා විස්තරය
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  YouTube Boost (මේ සිට "අපි" හෝ "සේවාව" ලෙස හැඳින්වේ) YouTube සහ TikTok වැනි සමාජ ජාල වේදිකා සඳහා වර්ධන සේවා සපයයි:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>YouTube Watch Time වැඩිදියුණු කිරීම</li>
                  <li>YouTube Likes සහ Subscribers වැඩිදියුණු කිරීම</li>
                  <li>TikTok Followers, Likes සහ Views වැඩිදියුණු කිරීම</li>
                  <li>වෙනත් සමාජ ජාල වර්ධන සේවා</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-bold">2</span>
                ගිණුම් සහ භාවිතය
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>සේවා භාවිතා කිරීමට ඔබ අවම වශයෙන් වයස අවුරුදු 18ක් විය යුතුය</li>
                  <li>ඔබගේ ගිණුම් තොරතුරු නිවැරදි සහ යාවත්කාලීනව තබා ගත යුතුය</li>
                  <li>ඔබගේ ගිණුම් credentials ආරක්ෂිතව තබා ගත යුතුය</li>
                  <li>එක් පුද්ගලයෙකුට එක් ගිණුමක් පමණක් තිබිය හැකිය</li>
                  <li>නීති විරෝධී හෝ හානිකර කටයුතු සඳහා සේවා භාවිතා කිරීම තහනම්ය</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-bold">3</span>
                ගෙවීම් සහ මිල ගණන්
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>සියලුම මිල ගණන් ශ්‍රී ලංකා රුපියල් (LKR) වලින් දක්වා ඇත</li>
                  <li>ගෙවීම් බැංකු මාරු කිරීම හෝ Stripe හරහා කළ හැකිය</li>
                  <li>සේවා සැකසීම ආරම්භ වන්නේ ගෙවීම තහවුරු වූ පසුව පමණි</li>
                  <li>මිල ගණන් කලින් දැනුම් දීමකින් තොරව වෙනස් විය හැකිය</li>
                  <li>සම්පූර්ණ කරන ලද ඇණවුම් සඳහා මුදල් ආපසු ලබා නොදේ</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-bold">4</span>
                සේවා සැපයුම
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>සේවා බෙදා හැරීම් කාලය ඇණවුම අනුව වෙනස් විය හැකිය</li>
                  <li>අපි ගුණාත්මක සේවා සැපයීමට උත්සාහ කළත්, ප්‍රතිඵල සහතික කළ නොහැකිය</li>
                  <li>තාක්ෂණික ගැටළු හේතුවෙන් සේවා ප්‍රමාද විය හැකිය</li>
                  <li>අපට කිසියම් වේලාවක සේවා තාවකාලිකව අත්හිටුවීමට හෝ අවලංගු කිරීමට අයිතිය ඇත</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-bold">5</span>
                වගකීම් සීමා කිරීම
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>අපගේ සේවා භාවිතය ඔබගේම අවදානමේ කරනු ලැබේ</li>
                  <li>ගිණුම් අත්හිටුවීම හෝ තහනම් කිරීම් සඳහා අපි වගකිව යුතු නොවේ</li>
                  <li>තෙවන පාර්ශවීය සේවා දෝෂ හෝ ප්‍රමාද සඳහා වගකිව යුතු නොවේ</li>
                  <li>අප්‍රත්‍යක්ෂ හානි සඳහා අපි වගකීම දරන්නේ නැත</li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-bold">6</span>
                ආපසු ගෙවීම් සහ මුදල් ආපසු ලබා දීමේ ප්‍රතිපත්තිය
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>සේවා ආරම්භ කිරීමට පෙර පමණක් මුදල් ආපසු ඉල්ලා සිටිය හැකිය</li>
                  <li>සේවා සැකසීම ආරම්භ වූ පසු මුදල් ආපසු ලබා නොදේ</li>
                  <li>තාක්ෂණික දෝෂ හේතුවෙන් සම්පූර්ණ නොකළ ඇණවුම් සඳහා නැවත පිරවීමක් හෝ ප්‍රතිපූරණයක් ලබා දිය හැකිය</li>
                  <li>මුදල් ආපසු ලබා දීම් 7-14 වැඩ දින ගත විය හැකිය</li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-bold">7</span>
                නියම වෙනස් කිරීම්
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  අපට කිසියම් වේලාවක මෙම නියම සහ කොන්දේසි වෙනස් කිරීමට අයිතිය ඇත. වෙනස්කම් වහාම ක්‍රියාත්මක වන අතර, 
                  වෙනස්කම් පසු සේවා භාවිතා කිරීම ඔබ නව නියම වලට එකඟ වන බව සලකනු ලැබේ.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-bold">8</span>
                අපව සම්බන්ධ කර ගන්න
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>මෙම නියම සහ කොන්දේසි පිළිබඳ ඔබට ප්‍රශ්න තිබේ නම්, කරුණාකර අපව සම්බන්ධ කර ගන්න:</p>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="font-medium text-foreground mb-2">YouTube Boost Support</p>
                  <p>Email: ysk19971020@gmail.com</p>
                  <p>Phone: +94 77 123 4567</p>
                </div>
              </div>
            </section>
          </div>

          {/* Agreement Box */}
          <div className="mt-12 p-6 rounded-lg bg-gradient-to-r from-primary/10 to-purple-600/10 border-2 border-primary/30">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">එකඟතාව</h3>
                <p className="text-sm text-muted-foreground">
                  අපගේ සේවා භාවිතා කිරීමෙන්, ඔබ මෙම නියම සහ කොන්දේසි සම්පූර්ණයෙන් කියවා තේරුම් ගෙන එකඟ වන බව සහතික කරයි.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
