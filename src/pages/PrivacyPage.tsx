import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PrivacyPage() {
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
            <Shield className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold">Privacy Policy</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="glass-effect rounded-2xl p-8 md:p-12">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">පෞද්ගලිකත්ව ප්‍රතිපත්තිය</h1>
            <p className="text-muted-foreground">අවසන් වරට යාවත්කාලීන කළ දිනය: 2025 ජනවාරි 15</p>
          </div>

          {/* Intro */}
          <div className="mb-8 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-sm text-muted-foreground">
              YouTube Boost හි ("අපි", "අපගේ", හෝ "අපට"), ඔබගේ පෞද්ගලිකත්වය ආරක්ෂා කිරීම අපගේ ප්‍රමුඛතාවයයි. 
              මෙම ප්‍රතිපත්තිය අපි ඔබගේ තොරතුරු එකතු කරන්නේ, භාවිතා කරන්නේ, සහ ආරක්ෂා කරන්නේ කෙසේද යන්න විස්තර කරයි.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Section 1 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">අපි එකතු කරන තොරතුරු</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">1.1 ගිණුම් තොරතුරු</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Email ලිපිනය</li>
                    <li>පරිශීලක නාමය</li>
                    <li>Password (encrypted)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">1.2 ඇණවුම් තොරතුරු</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>YouTube/TikTok channel/profile URLs</li>
                    <li>ඇණවුම් විස්තර සහ මිල ගණන්</li>
                    <li>ගෙවීම් තොරතුරු (බැංකු විස්තර හෝ Stripe දත්ත)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">1.3 තාක්ෂණික තොරතුරු</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>IP ලිපිනය</li>
                    <li>බ්‍රවුසර් වර්ගය සහ අනුවාදය</li>
                    <li>උපාංග තොරතුරු</li>
                    <li>භාවිතා දත්ත සහ අන්තර්ක්‍රියා රටා</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">අපි තොරතුරු භාවිතා කරන්නේ කෙසේද</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>ඔබගේ ඇණවුම් සැකසීමට සහ සේවා සැපයීමට</li>
                  <li>ඔබගේ ගිණුම කළමනාකරණය කිරීමට</li>
                  <li>ගෙවීම් සහ ගනුදෙනු සැකසීමට</li>
                  <li>ඔබට සහාය සහ පාරිභෝගික සේවාව සැපයීමට</li>
                  <li>අපගේ සේවා වැඩිදියුණු කිරීමට සහ ප්‍රශස්තකරණය කිරීමට</li>
                  <li>වංචා සහ අපයෝජන වැළැක්වීමට</li>
                  <li>නීතිමය අවශ්‍යතා සහ අපගේ නියම සහ කොන්දේසි බලාත්මක කිරීමට</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">දත්ත ආරක්ෂාව</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>අපි ඔබගේ පුද්ගලික තොරතුරු ආරක්ෂා කිරීමට කර්මාන්ත-ප්‍රමිත ආරක්ෂක පියවර භාවිතා කරමු:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>SSL/TLS encryption සහිත HTTPS සම්බන්ධතා</li>
                  <li>Password encryption (bcrypt හෝ සමාන)</li>
                  <li>ආරක්ෂිත දත්ත සමුදාය (Supabase/OnSpace Cloud)</li>
                  <li>නිතිපතා ආරක්ෂක විගණන සහ යාවත්කාලීන කිරීම්</li>
                  <li>සීමිත ප්‍රවේශ පාලනය සහ අනුමැතිය</li>
                </ul>
                <p className="mt-4 text-sm">
                  කෙසේ වෙතත්, අන්තර්ජාලය හරහා සම්ප්‍රේෂණ කිරීම 100% ආරක්ෂිත නොවන බව කරුණාවෙන් සටහන් කරන්න. 
                  අපි ඔබගේ දත්ත ආරක්ෂා කිරීමට උත්සාහ කළත්, නොවන ලද ප්‍රවේශය හෝ හෙළිදරව් කිරීම් වලට සම්පූර්ණ සුරක්ෂිතතාවක් සහතික කළ නොහැක.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">තොරතුරු බෙදාහැරීම</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>අපි ඔබගේ පුද්ගලික තොරතුරු තෙවන පාර්ශවයන්ට විකිණුවේ හෝ බදු දීමෙන් නැත. කෙසේ වෙතත්, පහත අවස්ථා වලදී අපි තොරතුරු බෙදාහැරිය හැකිය:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>සේවා සපයන්නන්:</strong> BulkFollows වැනි තෙවන පාර්ශවීය API සේවා සපයන්නන්</li>
                  <li><strong>ගෙවීම් සැකසුම්කරුවන්:</strong> Stripe හෝ බැංකු සේවා</li>
                  <li><strong>නීතිමය අවශ්‍යතා:</strong> නීති බලාත්මක කිරීම සඳහා අවශ්‍ය වූ විට</li>
                  <li><strong>ව්‍යාපාර හුවමාරු:</strong> ඒකාබද්ධ කිරීම්, අත්පත් කර ගැනීම්, හෝ වත්කම් විකිණීම්</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">🍪</span>
                </div>
                <h2 className="text-2xl font-bold">Cookies සහ ලුහුබැඳීම් තාක්ෂණයන්</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>අපි cookies සහ සමාන තාක්ෂණයන් භාවිතා කරමු:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>අත්‍යවශ්‍ය cookies:</strong> සේවා සක්‍රීය කිරීමට සහ ගිණුම් කළමනාකරණය සඳහා</li>
                  <li><strong>කාර්ය සාධන cookies:</strong> භාවිතය විශ්ලේෂණය කිරීමට සහ අත්දැකීම වැඩිදියුණු කිරීමට</li>
                  <li><strong>අනුමැතියේ cookies:</strong> ඔබගේ මනාපයන් සහ සැකසුම් මතක තබා ගැනීමට</li>
                </ul>
                <p className="mt-4 text-sm">
                  ඔබට ඔබගේ බ්‍රව්සර් සැකසුම් හරහා cookies පාලනය කළ හැකිය, නමුත් සමහර cookies අක්‍රිය කිරීම සේවා ක්‍රියාකාරීත්වයට බලපෑම් කළ හැකිය.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">⚖️</span>
                </div>
                <h2 className="text-2xl font-bold">ඔබගේ අයිතිවාසිකම්</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>ඔබට පහත අයිතිවාසිකම් ඇත:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>ප්‍රවේශ වීම:</strong> අපි රඳවාගෙන සිටින ඔබගේ පුද්ගලික දත්ත වලට ප්‍රවේශය ඉල්ලා සිටීම</li>
                  <li><strong>නිවැරදි කිරීම:</strong> අවලංගු හෝ අසම්පූර්ණ තොරතුරු යාවත්කාලීන කිරීම</li>
                  <li><strong>මකා දැමීම:</strong> ඔබගේ ගිණුම සහ දත්ත මකා දැමීම ඉල්ලා සිටීම</li>
                  <li><strong>සැකසුම් සීමා කිරීම:</strong> සමහර තොරතුරු සැකසීම් වලට විරෝධතා කිරීම</li>
                  <li><strong>දත්ත ස්ථාන මාරු කළ හැකි බව:</strong> ඔබගේ දත්ත ව්‍යුහගත ආකෘතියකින් ලබා ගැනීම</li>
                </ul>
                <p className="mt-4 text-sm">
                  මෙම අයිතිවාසිකම් භාවිතා කිරීමට, කරුණාකර ysk19971020@gmail.com හරහා අපව සම්බන්ධ කර ගන්න.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">👶</span>
                </div>
                <h2 className="text-2xl font-bold">ළමුන්ගේ පෞද්ගලිකත්වය</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  අපගේ සේවා වයස අවුරුදු 18ට අඩු පුද්ගලයින් සඳහා නොවේ. අපි දැනුවත්ව වයස අවුරුදු 18ට අඩු කිසිවෙකුගෙන් 
                  පුද්ගලික තොරතුරු එකතු නොකරමු. ඔබ දෙමාපියෙකු හෝ භාරකරුවෙකු නම් සහ ඔබගේ දරුවා අපට පුද්ගලික තොරතුරු 
                  සැපයූ බව ඔබ විශ්වාස කරන්නේ නම්, කරුණාකර අපව සම්බන්ධ කර ගන්න.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">📝</span>
                </div>
                <h2 className="text-2xl font-bold">ප්‍රතිපත්ති වෙනස් කිරීම්</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  අපට කලින් කලට මෙම පෞද්ගලිකත්ව ප්‍රතිපත්තිය යාවත්කාලීන කිරීමට අවශ්‍ය විය හැකිය. වැදගත් වෙනස්කම් සඳහා 
                  අපි ඔබට email හරහා දැනුම් දෙන්නෙමු. මෙම පිටුව නිතිපතා පරීක්ෂා කිරීම ඔබට යාවත්කාලීන තොරතුරු ලබා ගැනීමට උපකාරී වේ.
                </p>
              </div>
            </section>

            {/* Contact Section */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">📧</span>
                </div>
                <h2 className="text-2xl font-bold">අපව සම්බන්ධ කර ගන්න</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>මෙම පෞද්ගලිකත්ව ප්‍රතිපත්තිය පිළිබඳ ඔබට ප්‍රශ්න හෝ කනස්සල්ල තිබේ නම්:</p>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="font-medium text-foreground mb-2">YouTube Boost Privacy Team</p>
                  <p>Email: ysk19971020@gmail.com</p>
                  <p>Phone: +94 77 123 4567</p>
                  <p className="mt-2 text-sm">වැඩ කරන දින: සඳුදා - සිකුරාදා (9:00 AM - 6:00 PM)</p>
                </div>
              </div>
            </section>
          </div>

          {/* Final Note */}
          <div className="mt-12 p-6 rounded-lg bg-gradient-to-r from-primary/10 to-purple-600/10 border-2 border-primary/30">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">ඔබගේ පෞද්ගලිකත්වය වැදගත් ය</h3>
                <p className="text-sm text-muted-foreground">
                  ඔබගේ තොරතුරු ආරක්ෂා කිරීම අපට ප්‍රමුඛතාවයක්. අපි නිරන්තරයෙන් අපගේ ආරක්ෂක පියවර සහ ප්‍රතිපත්ති වැඩිදියුණු කරමින් පවතිමු.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
