// Čeština na úrovni - Web & JavaScript Engine
console.log("Initializing Čeština na úrovni Web App...");

// State
let currentTab = 'table';
let currentCase = 1;
let speechRate = 1.0;
let score = parseInt(localStorage.getItem('czech_score') || '0', 10);
let exercisesAnswered = parseInt(localStorage.getItem('czech_exercises') || '0', 10);

// English Explanations for all Czech Cases
const ENGLISH_CASE_INFO = {
  "1": {
    "englishName": "1st Case: Nominative (Subject)",
    "englishUsage": "Used for the subject of a sentence (who or what performs the action) and the standard dictionary form of words. Answers 'Who?' (Kdo?) or 'What?' (Co?).",
    "englishKeyRules": [
      "Masculine Animate (Ma): hard adjective ends in -ý (nový student), noun ends in consonant.",
      "Masculine Inanimate (Mi): hard adjective ends in -ý (nový hrad), noun ends in consonant.",
      "Feminine (F): hard adjective ends in -á (nová žena), noun ends in -a (nebo -e / konsonant).",
      "Neuter (N): hard adjective ends in -é (nové město), noun ends in -o / -e."
    ],
    "englishTip": "Always use Nominative when stating who or what is doing something: 'Nový student studuje češtinu' (The new student studies Czech)."
  },
  "2": {
    "englishName": "2nd Case: Genitive (Possession, Origin, Absence & Quantity)",
    "englishUsage": "Expresses 'of', possession, quantity, absence, and answers 'Whose?' or 'Of whom/what?' (Koho? Čeho?). Essential for prepositions: do (into/to), od (from), z (out of), bez (without), u (at/near), vedle (next to), během (during).",
    "englishKeyRules": [
      "Masculine Animate & Inanimate: adjectives end in -ého (nového) or -ího. Nouns end in -a (bratra, sýra) or -u (hradu, obchodu).",
      "Feminine: hard adjectives end in -é (nové). Hard nouns ending in -a turn into -y (ženy, kávy).",
      "Neuter: adjectives end in -ého (nového). Hard nouns end in -a (města, auta).",
      "Used after numbers from 5 upwards: e.g., 'pět studentů', 'deset korun'."
    ],
    "englishTip": "Whenever going TO a place (city, country, building), use DO + Genitive: 'Jdu do nového obchodu' (I am going into the new shop)."
  },
  "3": {
    "englishName": "3rd Case: Dative (Indirect Object / Beneficiary)",
    "englishUsage": "Indicates the receiver, recipient, or beneficiary ('to someone', 'for someone'). Answers 'To whom/what?' (Komu? Čemu?). Used with verbs like děkovat (thank), pomáhat (help), rozumět (understand), and prepositions k/ke (towards), díky (thanks to), proti (against), kvůli (due to).",
    "englishKeyRules": [
      "Masculine (Ma & Mi): hard adjectives end in -ému (novému). Male persons (Ma) take the distinctive -ovi ending (panu Novákovi, lékaři).",
      "Feminine: hard adjectives end in -é (nové). Nouns end in -ě/-e, often with consonant palatalization (k->c: matka -> matce; r->ř: sestra -> sestře).",
      "Neuter: adjectives end in -ému (novému). Nouns end in -u (městu) or -i (moři).",
      "Personal expressions: 'Je mi dobře' (I feel well), 'Chutná mi to' (It tastes good to me)."
    ],
    "englishTip": "Think of Dative as the 'giving and helping' case. Whenever you give, help, explain, or say something to a person, that person goes into the Dative."
  },
  "4": {
    "englishName": "4th Case: Accusative (Direct Object)",
    "englishUsage": "The most vital case for daily conversation! Represents the direct object receiving the action. Answers 'Whom/What do you see, have, want, or buy?' (Koho? Co?). Follows transitive verbs (mít, vidět, znát, hledat, kupovat) and motion prepositions (na, pro, za, o, v).",
    "englishKeyRules": [
      "Masculine Animate (Ma): matches the Genitive form! Adjective -ého (nového), noun -a (bratra, kolegu).",
      "Masculine Inanimate (Mi): matches the Nominative form! Adjective -ý (nový), noun unchanged (hrad, byt).",
      "Feminine: changes distinctly to -ou for adjectives (novou) and -u for nouns ending in -a (ženu, kávu).",
      "Neuter: matches the Nominative form! Adjective -é (nové), noun -o (město, auto)."
    ],
    "englishTip": "A2 Exam Golden Rule: Feminine nouns change to -u with -ou adjective ('Mám novou práci'). Masculine animate takes Genitive ending ('Vidím pana doktora')."
  },
  "5": {
    "englishName": "5th Case: Vocative (Direct Address & Greetings)",
    "englishUsage": "Used exclusively when calling, greeting, or addressing people directly by name or title. Crucial for polite spoken etiquette, writing formal emails, and addressing friends.",
    "englishKeyRules": [
      "Masculine names & titles: take -e, -u, or -i (pan -> pane!, doktor -> doktore!, Petr -> Petře!, Tomáš -> Tomáši!).",
      "Feminine names: ending in -a shift to -o (Eva -> Evo!, Petra -> Petro!, paní Nováková stays unchanged).",
      "Neuter & inanimate: practically not used in modern everyday speech."
    ],
    "englishTip": "Never begin an email with 'Dobrý den pan Novák'! Proper Czech always uses Vocative: 'Dobrý den, pane Nováku!' or 'Milá Evo!'."
  },
  "6": {
    "englishName": "6th Case: Locative (Location & Subject Matter)",
    "englishUsage": "The ONLY case that NEVER stands alone—it ALWAYS requires a preposition! Answers 'Where?' (Kde?) or 'About whom/what?' ((O) kom? (O) čem?). Used with prepositions: v/ve (in/at), na (on/at), o (about), po (after/along), při (during).",
    "englishKeyRules": [
      "Masculine (Ma & Mi): hard adjectives end in -ém (novém). Living persons take -ovi (o Petrovi). Inanimate nouns end in -e/-ě/-u (v domě, na stole, v hotelu).",
      "Feminine: hard adjectives end in -é (nové). Hard nouns end in -e/-ě (v Praze, v lékárně), with consonant shifts (k->c, h->z, ch->š).",
      "Neuter: adjectives end in -ém (novém). Nouns end in -ě/-e (v autě, v kině).",
      "Answers 'Kde?' (static location) vs. Accusative 'Kam?' (movement towards)."
    ],
    "englishTip": "Locative tells where you are right now or what you are talking about: 'Bydlím v Praze' (I live in Prague), 'Mluvíme o nové práci' (We are talking about the new job)."
  },
  "7": {
    "englishName": "7th Case: Instrumental (Means, Transport & Accompaniment)",
    "englishUsage": "Expresses the tool, instrument, or means of transport ('by train', 'with a pen') or accompaniment with preposition 's/se' (with someone/something). Prepositions: s/se (with), před (in front of/before), za (behind), pod (under), nad (above), mezi (between).",
    "englishKeyRules": [
      "Masculine Animate & Inanimate: hard adjectives end in -ým (novým). Nouns end in -em (vlakem, autem, bratrem).",
      "Feminine: hard adjectives end in -ou (novou). Hard nouns end in -ou (ženou, kávou).",
      "Neuter: hard adjectives end in -ým (novým). Nouns end in -em (autem, mořem).",
      "Means of transport takes NO preposition: 'Jedu autem' (by car), 'Cestuji vlakem' (by train). Accompaniment with people uses 's': 's kamarádem' (with a friend)."
    ],
    "englishTip": "Do not put 's' before transportation! Say 'Jedu vlakem' (no preposition). Only add 's/se' when you mean 'together with': 'Jdu na kávu s kamarádem'."
  }
};

// Grammar Data for Table
const CASES_DATA = {
  1: {
    name: "1. Pád (Nominativ)",
    question: "Kdo? Co?",
    usage: "Podmět věty, základní tvar ve slovníku.",
    example: "Nový student studuje češtinu.",
    table: [
      { gender: "Ma (Mužský živ.)", adj: "nov-ý / modern-í", noun: "student / muži", note: "předseda, soudce" },
      { gender: "Mi (Mužský neživ.)", adj: "nov-ý / modern-í", noun: "hrad / pokoj", note: "stroj, čaj" },
      { gender: "Ženský (F)", adj: "nov-á / modern-í", noun: "žen-a / růž-e", note: "píseň, kost" },
      { gender: "Střední (N)", adj: "nov-é / modern-í", noun: "měst-o / moř-e", note: "kuře, náměstí" }
    ]
  },
  2: {
    name: "2. Pád (Genitiv)",
    question: "Koho? Čeho?",
    usage: "Množství, absence, předložky: do, od, z, bez, u, vedle, během.",
    example: "Jdu do nového obchodu bez bratra.",
    table: [
      { gender: "Ma (Mužský živ.)", adj: "nov-ého / modern-ího", noun: "student-a / muž-e", note: "-ovi (panu Novákovi)" },
      { gender: "Mi (Mužský neživ.)", adj: "nov-ého / modern-ího", noun: "hrad-u / pokoj-e", note: "lesa, sýra (-a)" },
      { gender: "Ženský (F)", adj: "nov-é / modern-í", noun: "žen-y / růž-e", note: "písně, kosti" },
      { gender: "Střední (N)", adj: "nov-ého / modern-ího", noun: "měst-a / moř-e", note: "kuřete, náměstí" }
    ]
  },
  3: {
    name: "3. Pád (Dativ)",
    question: "Komu? Čemu?",
    usage: "Příjemce, předložky: k/ke, díky, proti, naproti, kvůli.",
    example: "Děkuji novému kolegovi za pomoc.",
    table: [
      { gender: "Ma (Mužský živ.)", adj: "nov-ému / modern-ímu", noun: "student-ovi / muž-i", note: "-ovi je nejčastější" },
      { gender: "Mi (Mužský neživ.)", adj: "nov-ému / modern-ímu", noun: "hrad-u / pokoj-i", note: "lesu, stolu" },
      { gender: "Ženský (F)", adj: "nov-é / modern-í", noun: "žen-ě / růž-i", note: "pozor na alternace (k->c)" },
      { gender: "Střední (N)", adj: "nov-ému / modern-ímu", noun: "měst-u / moř-i", note: "kuřeti, náměstí" }
    ]
  },
  4: {
    name: "4. Pád (Akuzativ)",
    question: "Koho? Co?",
    usage: "Přímý předmět věty! Předložky: na, pro, za, o, v (směr/cíl).",
    example: "Mám rád nového kolegu a moderní byt.",
    table: [
      { gender: "Ma (Mužský živ.)", adj: "nov-ého / modern-ího", noun: "student-a / muž-e", note: "Ma = Genitiv tvar!" },
      { gender: "Mi (Mužský neživ.)", adj: "nov-ý / modern-í", noun: "hrad / pokoj", note: "Mi = Nominativ tvar!" },
      { gender: "Ženský (F)", adj: "nov-ou / modern-í", noun: "žen-u / růž-i", note: "-ou je klíčová koncovka" },
      { gender: "Střední (N)", adj: "nov-é / modern-í", noun: "měst-o / moř-e", note: "N = Nominativ tvar!" }
    ]
  },
  5: {
    name: "5. Pád (Vokativ)",
    question: "Oslovujeme, voláme!",
    usage: "Při oslovení osob, psaní e-mailů a dopisů.",
    example: "Dobrý den, pane profesore a milá Petro!",
    table: [
      { gender: "Ma (Mužský živ.)", adj: "nov-ý / mil-ý", noun: "pane! / doktore! / Petře!", note: "koncovky -e / -u / -i" },
      { gender: "Ženský (F)", adj: "mil-á / drah-á", noun: "Petr-o! / pan-í!", note: "Eva -> Evo!, Marie -> Marie!" },
      { gender: "Střední / Neživ.", adj: "—", noun: "používá se zřídka", note: "většinou jen osoby a zvířata" }
    ]
  },
  6: {
    name: "6. Pád (Lokál)",
    question: "(O) kom? (O) čem?",
    usage: "VŽDY JEN S PŘEDLOŽKOU! v/ve, na, o, po, při.",
    example: "Bydlím v Praze a mluvím o nové práci.",
    table: [
      { gender: "Ma (Mužský živ.)", adj: "nov-ém / modern-ím", noun: "student-ovi / muž-i", note: "vždy předložka: o Petrovi" },
      { gender: "Mi (Mužský neživ.)", adj: "nov-ém / modern-ím", noun: "hrad-ě / pokoj-i", note: "v domě, na stole (-ě/-e/-u)" },
      { gender: "Ženský (F)", adj: "nov-é / modern-í", noun: "žen-ě / růž-i", note: "v Praze, na poště (-ě/-e)" },
      { gender: "Střední (N)", adj: "nov-ém / modern-ím", noun: "měst-ě / moř-i", note: "v autě, v kině" }
    ]
  },
  7: {
    name: "7. Pád (Instrumentál)",
    question: "Kým? Čím?",
    usage: "Nástroj, prostředek, doprovod s předložkou: s/se, pod, nad, před, za, mezi.",
    example: "Jedu do práce novým autem s kamarádem.",
    table: [
      { gender: "Ma (Mužský živ.)", adj: "nov-ým / modern-ím", noun: "student-em / muž-em", note: "vždy koncovka -em" },
      { gender: "Mi (Mužský neživ.)", adj: "nov-ým / modern-ím", noun: "hrad-em / pokoj-em", note: "vlakem, autobusem (-em)" },
      { gender: "Ženský (F)", adj: "nov-ou / modern-í", noun: "žen-ou / růž-í", note: "s maminkou, s kávou (-ou)" },
      { gender: "Střední (N)", adj: "nov-ým / modern-ím", noun: "měst-em / moř-em", note: "s autem, s pivem (-em)" }
    ]
  }
};

// Practice Questions - 20 examples per case (140 total)
const QUESTIONS_BY_CASE = {
  "1": [
    {
      "prompt": "Pan ___ je náš nový soused v domě.",
      "options": [
        "Novák",
        "Nováka",
        "Novákovi",
        "Novákem"
      ],
      "correct": 0,
      "caseNum": 1,
      "caseName": "1. Nominativ (Kdo? Co?)",
      "explanation": "Subject of the sentence requires Nominative singular: 'Pan Novák'.",
      "badge": "1. Nominativ - Ma Podmět"
    },
    {
      "prompt": "V ordinaci pracuje ___ lékař.",
      "options": [
        "nový",
        "nového",
        "novém",
        "novým"
      ],
      "correct": 0,
      "caseNum": 1,
      "caseName": "1. Nominativ (Kdo? Co?)",
      "explanation": "Nominative singular masculine hard adjective ends in '-ý': 'nový lékař'.",
      "badge": "1. Nominativ - Ma Adjektivum -Ý"
    },
    {
      "prompt": "Moje ___ pracuje v městské nemocnici.",
      "options": [
        "manželka",
        "manželku",
        "manželky",
        "manželkou"
      ],
      "correct": 0,
      "caseNum": 1,
      "caseName": "1. Nominativ (Kdo? Co?)",
      "explanation": "Feminine hard noun subject in Nominative singular ends in '-a': 'manželka'.",
      "badge": "1. Nominativ - F Podstatné jméno -A"
    },
    {
      "prompt": "Zdravotní ___ je v České republice povinné.",
      "options": [
        "pojištění",
        "pojištěním",
        "pojištěniu",
        "pojištěně"
      ],
      "correct": 0,
      "caseNum": 1,
      "caseName": "1. Nominativ (Kdo? Co?)",
      "explanation": "Neuter soft noun (pattern stavení) ends in '-í' in Nominative: 'pojištění'.",
      "badge": "1. Nominativ - N Vzor Stavení"
    },
    {
      "prompt": "___ pobyt je můj hlavní cíl v České republice.",
      "options": [
        "Trvalý",
        "Trvalého",
        "Trvalém",
        "Trvalým"
      ],
      "correct": 0,
      "caseNum": 1,
      "caseName": "1. Nominativ (Kdo? Co?)",
      "explanation": "Masculine inanimate adjective modifying subject takes '-ý': 'Trvalý pobyt'.",
      "badge": "1. Nominativ - Mi Adjektivum -Ý"
    },
    {
      "prompt": "Naše nová ___ smlouva je uzavřena na jeden rok.",
      "options": [
        "nájemní",
        "nájemnou",
        "nájemních",
        "nájemním"
      ],
      "correct": 0,
      "caseNum": 1,
      "caseName": "1. Nominativ (Kdo? Co?)",
      "explanation": "Soft adjective pattern 'jarní' ending in '-í' for feminine: 'nájemní smlouva'.",
      "badge": "1. Nominativ - F Měkké adjektivum -Í"
    },
    {
      "prompt": "Pražské hlavní ___ je velmi moderní a přehledné.",
      "options": [
        "nádraží",
        "nádražím",
        "nádraže",
        "nádražie"
      ],
      "correct": 0,
      "caseNum": 1,
      "caseName": "1. Nominativ (Kdo? Co?)",
      "explanation": "Neuter noun ending in -í retains form in Nominative singular: 'hlavní nádraží'.",
      "badge": "1. Nominativ - N Nádraží"
    },
    {
      "prompt": "Tento ___ na přepážce je velmi ochotný.",
      "options": [
        "úředník",
        "úředníka",
        "úředníkovi",
        "úředníkem"
      ],
      "correct": 0,
      "caseNum": 1,
      "caseName": "1. Nominativ (Kdo? Co?)",
      "explanation": "Nominative singular masculine hard noun (pán) has zero ending: 'úředník'.",
      "badge": "1. Nominativ - Ma Vzor Pán"
    },
    {
      "prompt": "Tento doporučený ___ přišel na mou adresu včera.",
      "options": [
        "dopis",
        "dopisu",
        "dopisem",
        "dopise"
      ],
      "correct": 0,
      "caseNum": 1,
      "caseName": "1. Nominativ (Kdo? Co?)",
      "explanation": "Masculine inanimate noun (hrad) has zero ending in Nominative: 'dopis'.",
      "badge": "1. Nominativ - Mi Vzor Hrad"
    },
    {
      "prompt": "Moje pracovní ___ začíná v osm hodin ráno.",
      "options": [
        "doba",
        "dobu",
        "době",
        "dobou"
      ],
      "correct": 0,
      "caseNum": 1,
      "caseName": "1. Nominativ (Kdo? Co?)",
      "explanation": "Subject of sentence in Nominative singular feminine ending '-a': 'pracovní doba'.",
      "badge": "1. Nominativ - F Vzor Žena"
    },
    {
      "prompt": "___ z českého jazyka pro trvalý pobyt má písemnou i ústní část.",
      "options": [
        "Zkouška",
        "Zkoušku",
        "Zkoušce",
        "Zkouškou"
      ],
      "correct": 0,
      "caseNum": 1,
      "caseName": "1. Nominativ (Kdo? Co?)",
      "explanation": "Subject requires Nominative singular feminine ending '-a': 'Zkouška'.",
      "badge": "1. Nominativ - F Zkouška"
    },
    {
      "prompt": "Můj cestovní ___ platí ještě dalších pět let.",
      "options": [
        "pas",
        "pasu",
        "pasem",
        "pase"
      ],
      "correct": 0,
      "caseNum": 1,
      "caseName": "1. Nominativ (Kdo? Co?)",
      "explanation": "Subject noun in Nominative singular masculine inanimate: 'pas'.",
      "badge": "1. Nominativ - Mi Cestovní pas"
    },
    {
      "prompt": "Můj praktický ___ ordinuje každé pracovní dopoledne.",
      "options": [
        "lékař",
        "lékaře",
        "lékaři",
        "lékařem"
      ],
      "correct": 0,
      "caseNum": 1,
      "caseName": "1. Nominativ (Kdo? Co?)",
      "explanation": "Soft masculine animate noun (muž) in Nominative singular has zero ending: 'lékař'.",
      "badge": "1. Nominativ - Ma Vzor Muž"
    },
    {
      "prompt": "Jejich malé ___ chodí do české státní školky.",
      "options": [
        "dítě",
        "dítěte",
        "dítětem",
        "děti"
      ],
      "correct": 0,
      "caseNum": 1,
      "caseName": "1. Nominativ (Kdo? Co?)",
      "explanation": "Neuter pattern (kuře) in Nominative singular: 'malé dítě'.",
      "badge": "1. Nominativ - N Malé dítě"
    },
    {
      "prompt": "Nejbližší autobusová ___ je dvě stě metrů od našeho domu.",
      "options": [
        "zastávka",
        "zastávku",
        "zastávce",
        "zastávkou"
      ],
      "correct": 0,
      "caseNum": 1,
      "caseName": "1. Nominativ (Kdo? Co?)",
      "explanation": "Subject noun ending in '-a': 'autobusová zastávka'.",
      "badge": "1. Nominativ - F Zastávka"
    },
    {
      "prompt": "K žádosti je potřeba úředně přeložený rodný ___.",
      "options": [
        "list",
        "listu",
        "listem",
        "liste"
      ],
      "correct": 0,
      "caseNum": 1,
      "caseName": "1. Nominativ (Kdo? Co?)",
      "explanation": "Masculine inanimate noun (hrad) in Nominative: 'rodný list'.",
      "badge": "1. Nominativ - Mi Rodný list"
    },
    {
      "prompt": "Tato nová ___ má otevřeno i o víkendu a svátcích.",
      "options": [
        "lékárna",
        "lékárnu",
        "lékárně",
        "lékárnou"
      ],
      "correct": 0,
      "caseNum": 1,
      "caseName": "1. Nominativ (Kdo? Co?)",
      "explanation": "Subject in Nominative singular feminine ending in '-a': 'lékárna'.",
      "badge": "1. Nominativ - F Lékárna"
    },
    {
      "prompt": "Místní ___ prodává čerstvé rohlíky a chléb.",
      "options": [
        "pekařství",
        "pekařstvím",
        "pekařstva",
        "pekařstvě"
      ],
      "correct": 0,
      "caseNum": 1,
      "caseName": "1. Nominativ (Kdo? Co?)",
      "explanation": "Neuter noun ending in '-í' retains ending in Nominative: 'pekařství'.",
      "badge": "1. Nominativ - N Pekařství"
    },
    {
      "prompt": "Cizinecká ___ kontroluje platnost pobytových oprávnění.",
      "options": [
        "policie",
        "policii",
        "policií",
        "policiech"
      ],
      "correct": 0,
      "caseNum": 1,
      "caseName": "1. Nominativ (Kdo? Co?)",
      "explanation": "Feminine soft noun (růže) in Nominative ends in '-e': 'policie'.",
      "badge": "1. Nominativ - F Vzor Růže"
    },
    {
      "prompt": "___ jazyk má sedm pádů v jednotném i množném čísle.",
      "options": [
        "Český",
        "Českého",
        "Českém",
        "Českým"
      ],
      "correct": 0,
      "caseNum": 1,
      "caseName": "1. Nominativ (Kdo? Co?)",
      "explanation": "Nominative singular masculine hard adjective takes '-ý': 'Český jazyk'.",
      "badge": "1. Nominativ - Mi Adjektivum"
    }
  ],
  "2": [
    {
      "prompt": "Musím jít do ___ pro kapky proti kašli.",
      "options": [
        "lékárna",
        "lékárně",
        "lékárny",
        "lékárnu"
      ],
      "correct": 2,
      "caseNum": 2,
      "caseName": "2. Genitiv (Koho? Čeho?)",
      "explanation": "Preposition 'do' always requires Genitive. Feminine hard noun changes '-a' to '-y': 'do lékárny'.",
      "badge": "2. Genitiv - Předložka DO + F"
    },
    {
      "prompt": "Prosím jednu černou kávu bez ___.",
      "options": [
        "cukru",
        "cukr",
        "cukrem",
        "cukře"
      ],
      "correct": 0,
      "caseNum": 2,
      "caseName": "2. Genitiv (Koho? Čeho?)",
      "explanation": "Preposition 'bez' requires Genitive. Masculine inanimate noun takes '-u': 'bez cukru'.",
      "badge": "2. Genitiv - Předložka BEZ + Mi"
    },
    {
      "prompt": "Můj kolega se včera vrátil z ___ republiky.",
      "options": [
        "Česká",
        "České",
        "Českou",
        "Českém"
      ],
      "correct": 1,
      "caseNum": 2,
      "caseName": "2. Genitiv (Koho? Čeho?)",
      "explanation": "Preposition 'z' requires Genitive. Feminine adjective in Genitive ends in '-é': 'z České republiky'.",
      "badge": "2. Genitiv - Předložka Z + F Adjektivum"
    },
    {
      "prompt": "V pondělí ráno spěchám do ___.",
      "options": [
        "práce",
        "práci",
        "prácou",
        "prácech"
      ],
      "correct": 0,
      "caseNum": 2,
      "caseName": "2. Genitiv (Koho? Čeho?)",
      "explanation": "Feminine noun 'práce' (pattern růže) takes ending '-e' in Genitive: 'do práce'.",
      "badge": "2. Genitiv - Do práce"
    },
    {
      "prompt": "Mám novou zprávu a recept od pana ___.",
      "options": [
        "doktora",
        "doktorovi",
        "doktorem",
        "doktor"
      ],
      "correct": 0,
      "caseNum": 2,
      "caseName": "2. Genitiv (Koho? Čeho?)",
      "explanation": "Preposition 'od' requires Genitive. Masculine animate noun takes '-a': 'od pana doktora'.",
      "badge": "2. Genitiv - Předložka OD + Ma"
    },
    {
      "prompt": "Sejdeme se odpoledne u stanice ___.",
      "options": [
        "metro",
        "metru",
        "metra",
        "metrem"
      ],
      "correct": 2,
      "caseNum": 2,
      "caseName": "2. Genitiv (Koho? Čeho?)",
      "explanation": "Preposition 'u' and possessive genitive 'stanice metra': neuter foreign noun takes '-a': 'metra'.",
      "badge": "2. Genitiv - Stanice metra"
    },
    {
      "prompt": "Bankomat stojí hned vedle hlavní ___.",
      "options": [
        "pošty",
        "pošta",
        "poštou",
        "poště"
      ],
      "correct": 0,
      "caseNum": 2,
      "caseName": "2. Genitiv (Koho? Čeho?)",
      "explanation": "Preposition 'vedle' requires Genitive. Feminine hard noun takes '-y': 'vedle pošty'.",
      "badge": "2. Genitiv - Předložka VEDLE + F"
    },
    {
      "prompt": "Nemusíte se vůbec bát této jazykové ___.",
      "options": [
        "zkoušky",
        "zkouška",
        "zkoušku",
        "zkoušce"
      ],
      "correct": 0,
      "caseNum": 2,
      "caseName": "2. Genitiv (Koho? Čeho?)",
      "explanation": "The reflexive verb 'bát se' governs Genitive. Feminine hard noun takes '-y': 'bát se zkoušky'.",
      "badge": "2. Genitiv - Sloveso BÁT SE"
    },
    {
      "prompt": "Cizinec se ptá přítomného ___ na správný formulář.",
      "options": [
        "úředník",
        "úředníka",
        "úředníkovi",
        "úředníkem"
      ],
      "correct": 1,
      "caseNum": 2,
      "caseName": "2. Genitiv (Koho? Čeho?)",
      "explanation": "Verb 'ptát se' governs Genitive. Masculine animate takes '-a': 'ptát se úředníka'.",
      "badge": "2. Genitiv - Sloveso PTÁT SE"
    },
    {
      "prompt": "Rozhodnutí o pobytu obdržíte během jednoho ___.",
      "options": [
        "týdne",
        "týden",
        "týdnu",
        "týdnem"
      ],
      "correct": 0,
      "caseNum": 2,
      "caseName": "2. Genitiv (Koho? Čeho?)",
      "explanation": "Preposition 'během' requires Genitive: 'během jednoho týdne'.",
      "badge": "2. Genitiv - Předložka BĚHEM"
    },
    {
      "prompt": "Rychlík odjíždí z ___ v deset hodin dopoledne.",
      "options": [
        "Prahy",
        "Praha",
        "Praze",
        "Prahu"
      ],
      "correct": 0,
      "caseNum": 2,
      "caseName": "2. Genitiv (Koho? Čeho?)",
      "explanation": "Preposition 'z' takes Genitive. Hard feminine stem ending in -ha takes '-y': 'z Prahy'.",
      "badge": "2. Genitiv - Z Prahy"
    },
    {
      "prompt": "V supermarketu koupím jedno kilo červených ___.",
      "options": [
        "jablek",
        "jablka",
        "jablky",
        "jablkách"
      ],
      "correct": 0,
      "caseNum": 2,
      "caseName": "2. Genitiv (Koho? Čeho?)",
      "explanation": "Quantity after 'kilo' takes Genitive plural (zero ending for neuter jablko -> jablek).",
      "badge": "2. Genitiv - Množství (Genitiv plurálu)"
    },
    {
      "prompt": "Náš autobus má zpoždění asi pět ___.",
      "options": [
        "minut",
        "minuty",
        "minutách",
        "minutami"
      ],
      "correct": 0,
      "caseNum": 2,
      "caseName": "2. Genitiv (Koho? Čeho?)",
      "explanation": "Numbers 5 and above govern Genitive plural: 'pět minut' (zero ending for feminine minuta).",
      "badge": "2. Genitiv - Číslovky 5+ (pět minut)"
    },
    {
      "prompt": "Jak se nejrychleji dostanu do ___ města?",
      "options": [
        "centra",
        "centrum",
        "centru",
        "centrem"
      ],
      "correct": 0,
      "caseNum": 2,
      "caseName": "2. Genitiv (Koho? Čeho?)",
      "explanation": "Preposition 'do' requires Genitive. Neuter noun 'centrum' changes to '-a': 'do centra'.",
      "badge": "2. Genitiv - Do centra"
    },
    {
      "prompt": "Děti se vracejí ze ___ ve dvě hodiny odpoledne.",
      "options": [
        "školy",
        "škola",
        "škole",
        "školu"
      ],
      "correct": 0,
      "caseNum": 2,
      "caseName": "2. Genitiv (Koho? Čeho?)",
      "explanation": "Preposition 'ze' requires Genitive. Feminine hard noun takes '-y': 'ze školy'.",
      "badge": "2. Genitiv - Ze školy"
    },
    {
      "prompt": "Na úřad nemůžete přijít bez platného cestovního ___.",
      "options": [
        "pasu",
        "pas",
        "pasem",
        "pase"
      ],
      "correct": 0,
      "caseNum": 2,
      "caseName": "2. Genitiv (Koho? Čeho?)",
      "explanation": "Preposition 'bez' requires Genitive. Masculine inanimate noun takes '-u': 'bez pasu'.",
      "badge": "2. Genitiv - Bez pasu"
    },
    {
      "prompt": "Každý večer chodíme na procházku kolem městského ___.",
      "options": [
        "parku",
        "park",
        "parkem",
        "parce"
      ],
      "correct": 0,
      "caseNum": 2,
      "caseName": "2. Genitiv (Koho? Čeho?)",
      "explanation": "Preposition 'kolem' requires Genitive. Masculine inanimate takes '-u': 'kolem parku'.",
      "badge": "2. Genitiv - Předložka KOLEM"
    },
    {
      "prompt": "Bydlíme v klidné čtvrti blízko krajské ___.",
      "options": [
        "nemocnice",
        "nemocnici",
        "nemocnicí",
        "nemocnica"
      ],
      "correct": 0,
      "caseNum": 2,
      "caseName": "2. Genitiv (Koho? Čeho?)",
      "explanation": "Preposition 'blízko' requires Genitive. Feminine soft noun takes '-e': 'blízko nemocnice'.",
      "badge": "2. Genitiv - Předložka BLÍZKO"
    },
    {
      "prompt": "Dostal jsem pochvalu od našeho nového ___.",
      "options": [
        "šéfa",
        "šéf",
        "šéfovi",
        "šéfem"
      ],
      "correct": 0,
      "caseNum": 2,
      "caseName": "2. Genitiv (Koho? Čeho?)",
      "explanation": "Preposition 'od' requires Genitive. Masculine animate noun takes '-a': 'od šéfa'.",
      "badge": "2. Genitiv - Od šéfa"
    },
    {
      "prompt": "Historická kašna stojí uprostřed velkého ___.",
      "options": [
        "náměstí",
        "náměstím",
        "náměstia",
        "náměstie"
      ],
      "correct": 0,
      "caseNum": 2,
      "caseName": "2. Genitiv (Koho? Čeho?)",
      "explanation": "Preposition 'uprostřed' requires Genitive. Neuter noun ending in '-í' keeps '-í': 'náměstí'.",
      "badge": "2. Genitiv - Uprostřed náměstí"
    }
  ],
  "3": [
    {
      "prompt": "Ráno musím jít k praktickému ___.",
      "options": [
        "lékaři",
        "lékaře",
        "lékařem",
        "lékař"
      ],
      "correct": 0,
      "caseNum": 3,
      "caseName": "3. Dativ (Komu? Čemu?)",
      "explanation": "Preposition 'k' requires Dative. Masculine animate soft noun takes '-i': 'k lékaři'.",
      "badge": "3. Dativ - Předložka K + Ma"
    },
    {
      "prompt": "Děkuji panu ___ za trpělivé vysvětlení úkolu.",
      "options": [
        "učiteli",
        "učitelem",
        "učitele",
        "učitel"
      ],
      "correct": 0,
      "caseNum": 3,
      "caseName": "3. Dativ (Komu? Čemu?)",
      "explanation": "Verb 'děkovat' governs Dative (komu? čemu?). Masculine animate soft noun takes '-i': 'panu učiteli'.",
      "badge": "3. Dativ - Sloveso DĚKOVAT"
    },
    {
      "prompt": "Poslal jsem balík a přání své ___.",
      "options": [
        "matce",
        "matke",
        "matku",
        "matky"
      ],
      "correct": 0,
      "caseNum": 3,
      "caseName": "3. Dativ (Komu? Čemu?)",
      "explanation": "In Dative singular, feminine stem -K softens to -C before '-e': matka -> matce!",
      "badge": "3. Dativ - Alternace K -> C"
    },
    {
      "prompt": "Náš vlak se již blíží k ___.",
      "options": [
        "Praze",
        "Prahe",
        "Prahu",
        "Prahy"
      ],
      "correct": 0,
      "caseNum": 3,
      "caseName": "3. Dativ (Komu? Čemu?)",
      "explanation": "Preposition 'k' takes Dative. Stem -H softens to -Z before '-e': Praha -> Praze!",
      "badge": "3. Dativ - Alternace H -> Z"
    },
    {
      "prompt": "Tento světlý byt se ___ velmi líbí.",
      "options": [
        "mi",
        "mě",
        "já",
        "se mnou"
      ],
      "correct": 0,
      "caseNum": 3,
      "caseName": "3. Dativ (Komu? Čemu?)",
      "explanation": "Verb 'líbit se' requires Dative pronoun: short form 'mi' (to me).",
      "badge": "3. Dativ - Zájmeno MI (líbit se)"
    },
    {
      "prompt": "Česká svíčková mému ___ moc chutná.",
      "options": [
        "synovi",
        "syna",
        "synem",
        "syn"
      ],
      "correct": 0,
      "caseNum": 3,
      "caseName": "3. Dativ (Komu? Čemu?)",
      "explanation": "Verb 'chutnat' governs Dative (komu?). Hard masculine animate noun takes '-ovi': 'mému synovi'.",
      "badge": "3. Dativ - Sloveso CHUTNAT + -OVI"
    },
    {
      "prompt": "Vezměte si jednu tabletu proti ___ hlavy.",
      "options": [
        "bolesti",
        "bolest",
        "bolestí",
        "bolestu"
      ],
      "correct": 0,
      "caseNum": 3,
      "caseName": "3. Dativ (Komu? Čemu?)",
      "explanation": "Preposition 'proti' requires Dative. Feminine noun (kost) takes '-i': 'proti bolesti'.",
      "badge": "3. Dativ - Předložka PROTI"
    },
    {
      "prompt": "Zkoušku jsem zvládl díky vaší laskavé ___.",
      "options": [
        "pomoci",
        "pomoc",
        "pomocí",
        "pomoce"
      ],
      "correct": 0,
      "caseNum": 3,
      "caseName": "3. Dativ (Komu? Čemu?)",
      "explanation": "Preposition 'díky' requires Dative: 'díky pomoci'.",
      "badge": "3. Dativ - Předložka DÍKY"
    },
    {
      "prompt": "Lékárna se nachází přímo naproti městské ___.",
      "options": [
        "nemocnici",
        "nemocnice",
        "nemocnicí",
        "nemocnica"
      ],
      "correct": 0,
      "caseNum": 3,
      "caseName": "3. Dativ (Komu? Čemu?)",
      "explanation": "Preposition 'naproti' requires Dative. Soft feminine noun (růže) takes '-i': 'naproti nemocnici'.",
      "badge": "3. Dativ - Předložka NAPROTI"
    },
    {
      "prompt": "Přestěhoval jsem se do Brna kvůli nové ___.",
      "options": [
        "práci",
        "práce",
        "prácou",
        "prácičce"
      ],
      "correct": 0,
      "caseNum": 3,
      "caseName": "3. Dativ (Komu? Čemu?)",
      "explanation": "Preposition 'kvůli' requires Dative. Feminine noun 'práce' takes '-i': 'kvůli práci'.",
      "badge": "3. Dativ - Předložka KVŮLI"
    },
    {
      "prompt": "Odpoledne budu telefonovat ___ bytu ohledně kauce.",
      "options": [
        "majiteli",
        "majitele",
        "majitelem",
        "majitel"
      ],
      "correct": 0,
      "caseNum": 3,
      "caseName": "3. Dativ (Komu? Čemu?)",
      "explanation": "Verb 'telefonovat' takes Dative. Soft masculine noun takes '-i': 'majiteli'.",
      "badge": "3. Dativ - Sloveso TELEFONOVAT"
    },
    {
      "prompt": "O víkendu často pomáhám starší ___ s těžkým nákupem.",
      "options": [
        "sousedce",
        "sousedke",
        "sousedku",
        "sousedky"
      ],
      "correct": 0,
      "caseNum": 3,
      "caseName": "3. Dativ (Komu? Čemu?)",
      "explanation": "Verb 'pomáhat' requires Dative. Feminine noun sousedka changes -ka to '-ce': 'sousedce'.",
      "badge": "3. Dativ - Sloveso POMÁHAT + Alternace"
    },
    {
      "prompt": "Po intenzivním kurzu už dobře rozumím českému ___.",
      "options": [
        "jazyku",
        "jazyk",
        "jazykem",
        "jazyce"
      ],
      "correct": 0,
      "caseNum": 3,
      "caseName": "3. Dativ (Komu? Čemu?)",
      "explanation": "Verb 'rozumět' takes Dative. Hard masculine inanimate noun takes '-u': 'českému jazyku'.",
      "badge": "3. Dativ - Sloveso ROZUMĚT"
    },
    {
      "prompt": "Zavři prosím okno, je ___ chladno.",
      "options": [
        "mi",
        "mě",
        "mne",
        "já"
      ],
      "correct": 0,
      "caseNum": 3,
      "caseName": "3. Dativ (Komu? Čemu?)",
      "explanation": "Impersonal state (je mi zima/chladno/špatně) requires Dative pronoun 'mi'.",
      "badge": "3. Dativ - Stavové je mi zima"
    },
    {
      "prompt": "K narozeninám dám svému ___ nové jízdní kolo.",
      "options": [
        "synovi",
        "syna",
        "synem",
        "syn"
      ],
      "correct": 0,
      "caseNum": 3,
      "caseName": "3. Dativ (Komu? Čemu?)",
      "explanation": "Indirect object with 'dát' takes Dative: 'dám synovi' (ending '-ovi').",
      "badge": "3. Dativ - Sloveso DÁT"
    },
    {
      "prompt": "Odpověď na výzvu musím poslat příslušnému ___.",
      "options": [
        "úředníkovi",
        "úředníka",
        "úředníkem",
        "úředník"
      ],
      "correct": 0,
      "caseNum": 3,
      "caseName": "3. Dativ (Komu? Čemu?)",
      "explanation": "Indirect recipient takes Dative ending '-ovi': 'příslušnému úředníkovi'.",
      "badge": "3. Dativ - Koncovka -OVI"
    },
    {
      "prompt": "Jděte rovně k nejbližší stanici ___.",
      "options": [
        "metru",
        "metra",
        "metro",
        "metrem"
      ],
      "correct": 0,
      "caseNum": 3,
      "caseName": "3. Dativ (Komu? Čemu?)",
      "explanation": "Notice 'k nejbližší stanici' (Dative). In 'k tomu metru' masculine/neuter takes '-u': 'k metru'.",
      "badge": "3. Dativ - K metru / Ke stanici"
    },
    {
      "prompt": "Koupil jsem kytici květin své mladší ___.",
      "options": [
        "sestře",
        "sestre",
        "sestru",
        "sestry"
      ],
      "correct": 0,
      "caseNum": 3,
      "caseName": "3. Dativ (Komu? Čemu?)",
      "explanation": "In Dative singular, feminine stem -R softens to -Ř before '-e': sestra -> sestře!",
      "badge": "3. Dativ - Alternace R -> Ř"
    },
    {
      "prompt": "V těžké životní situaci plně věřím svému nejlepšímu ___.",
      "options": [
        "kamarádovi",
        "kamaráda",
        "kamarádem",
        "kamarád"
      ],
      "correct": 0,
      "caseNum": 3,
      "caseName": "3. Dativ (Komu? Čemu?)",
      "explanation": "Verb 'věřit' takes Dative (komu?). Masculine noun takes '-ovi': 'kamarádovi'.",
      "badge": "3. Dativ - Sloveso VĚŘIT"
    },
    {
      "prompt": "Nechal jsem se očkovat proti sezónní ___.",
      "options": [
        "chřipce",
        "chřipke",
        "chřipku",
        "chřipky"
      ],
      "correct": 0,
      "caseNum": 3,
      "caseName": "3. Dativ (Komu? Čemu?)",
      "explanation": "Preposition 'proti' + Dative. Alternation K->C: chřipka -> chřipce.",
      "badge": "3. Dativ - Proti chřipce"
    }
  ],
  "4": [
    {
      "prompt": "V ordinaci vidím nového ___.",
      "options": [
        "lékaře",
        "lékař",
        "lékaři",
        "lékařem"
      ],
      "correct": 0,
      "caseNum": 4,
      "caseName": "4. Akuzativ (Koho? Co?)",
      "explanation": "Masculine Animate in Accusative takes Genitive form (-e for soft noun lékař): 'nového lékaře'.",
      "badge": "4. Akuzativ - Ma Životnost (= Genitiv)"
    },
    {
      "prompt": "Už měsíc hledám v Praze vhodný ___.",
      "options": [
        "byt",
        "bytu",
        "bytem",
        "bytě"
      ],
      "correct": 0,
      "caseNum": 4,
      "caseName": "4. Akuzativ (Koho? Co?)",
      "explanation": "Masculine Inanimate objects in Accusative remain identical to Nominative (byt -> byt).",
      "badge": "4. Akuzativ - Mi (= Nominativ)"
    },
    {
      "prompt": "Na úřadě si vyzvednu novou pobytovou ___.",
      "options": [
        "kartu",
        "karta",
        "kartě",
        "kartou"
      ],
      "correct": 0,
      "caseNum": 4,
      "caseName": "4. Akuzativ (Koho? Co?)",
      "explanation": "Direct object feminine noun ending in -a changes to '-u' in Accusative: 'pobytovou kartu'.",
      "badge": "4. Akuzativ - F koncovka -U"
    },
    {
      "prompt": "K žádosti potřebuji platné ___ o zajištění ubytování.",
      "options": [
        "potvrzení",
        "potvrzením",
        "potvrzeniu",
        "potvrzeně"
      ],
      "correct": 0,
      "caseNum": 4,
      "caseName": "4. Akuzativ (Koho? Co?)",
      "explanation": "Neuter nouns (and adjectives) in Accusative are identical to Nominative: 'platné potvrzení'.",
      "badge": "4. Akuzativ - N (= Nominativ)"
    },
    {
      "prompt": "Podávám žádost o trvalý ___ v České republice.",
      "options": [
        "pobyt",
        "pobytu",
        "pobytem",
        "pobytě"
      ],
      "correct": 0,
      "caseNum": 4,
      "caseName": "4. Akuzativ (Koho? Co?)",
      "explanation": "'Žádost o' requires Accusative. Masculine inanimate stays like Nominative: 'o trvalý pobyt'.",
      "badge": "4. Akuzativ - Žádost o + Akuzativ"
    },
    {
      "prompt": "Už dvacet minut čekám na ranní ___.",
      "options": [
        "autobus",
        "autobusu",
        "autobusem",
        "autobuse"
      ],
      "correct": 0,
      "caseNum": 4,
      "caseName": "4. Akuzativ (Koho? Co?)",
      "explanation": "'Čekat na' governs Accusative. Masculine Inanimate stays identical to Nominative: 'na autobus'.",
      "badge": "4. Akuzativ - Čekat na + Akuzativ"
    },
    {
      "prompt": "Na pokladně koupím jednosměrný ___ do Brna.",
      "options": [
        "lístek",
        "lístku",
        "lístkem",
        "lístka"
      ],
      "correct": 0,
      "caseNum": 4,
      "caseName": "4. Akuzativ (Koho? Co?)",
      "explanation": "Masculine Inanimate direct object with 'koupit': 'jednosměrný lístek'.",
      "badge": "4. Akuzativ - Koupit lístek"
    },
    {
      "prompt": "Znáte osobně pana ___?",
      "options": [
        "Nováka",
        "Novák",
        "Novákovi",
        "Novákem"
      ],
      "correct": 0,
      "caseNum": 4,
      "caseName": "4. Akuzativ (Koho? Co?)",
      "explanation": "Direct object with 'znát' for a male person takes '-a' ending: 'pana Nováka'.",
      "badge": "4. Akuzativ - Znát pana Nováka"
    },
    {
      "prompt": "Mám důležitý dopis pro paní ___.",
      "options": [
        "ředitelku",
        "ředitelka",
        "ředitelce",
        "ředitelkou"
      ],
      "correct": 0,
      "caseNum": 4,
      "caseName": "4. Akuzativ (Koho? Co?)",
      "explanation": "Preposition 'pro' always governs Accusative. Feminine noun takes '-u': 'pro paní ředitelku'.",
      "badge": "4. Akuzativ - Předložka PRO + F"
    },
    {
      "prompt": "Každý měsíc včas platím za ___ a poplatky.",
      "options": [
        "nájem",
        "nájmu",
        "nájmem",
        "nájme"
      ],
      "correct": 0,
      "caseNum": 4,
      "caseName": "4. Akuzativ (Koho? Co?)",
      "explanation": "Preposition 'za' (in exchange for) requires Accusative: 'za nájem'.",
      "badge": "4. Akuzativ - Platit za + Akuzativ"
    },
    {
      "prompt": "Dnes zůstanu doma, protože mám nemocného ___.",
      "options": [
        "syna",
        "syn",
        "synovi",
        "synem"
      ],
      "correct": 0,
      "caseNum": 4,
      "caseName": "4. Akuzativ (Koho? Co?)",
      "explanation": "Transitive verb 'mít' with masculine animate noun takes '-a': 'nemocného syna'.",
      "badge": "4. Akuzativ - Mít syna"
    },
    {
      "prompt": "V pekařství koupím jeden velký čerstvý ___.",
      "options": [
        "chléb",
        "chlebu",
        "chlebem",
        "chlebe"
      ],
      "correct": 0,
      "caseNum": 4,
      "caseName": "4. Akuzativ (Koho? Co?)",
      "explanation": "Masculine Inanimate direct object in Accusative retains Nominative form: 'čerstvý chléb'.",
      "badge": "4. Akuzativ - Koupit chléb"
    },
    {
      "prompt": "Zítra ráno jdu podepsat novou pracovní ___.",
      "options": [
        "smlouvu",
        "smlouva",
        "smlouvě",
        "smlouvou"
      ],
      "correct": 0,
      "caseNum": 4,
      "caseName": "4. Akuzativ (Koho? Co?)",
      "explanation": "Direct object with 'podepsat'. Feminine noun takes '-u': 'pracovní smlouvu'.",
      "badge": "4. Akuzativ - Podepsat smlouvu"
    },
    {
      "prompt": "Můj budoucí cíl je získat české státní ___.",
      "options": [
        "občanství",
        "občanstvím",
        "občanstva",
        "občanstvě"
      ],
      "correct": 0,
      "caseNum": 4,
      "caseName": "4. Akuzativ (Koho? Co?)",
      "explanation": "Neuter direct object with 'získat' equals Nominative: 'státní občanství'.",
      "badge": "4. Akuzativ - Získat občanství"
    },
    {
      "prompt": "V kavárně si dám horkou ___ a jablečný koláč.",
      "options": [
        "kávu",
        "káva",
        "kávě",
        "kávou"
      ],
      "correct": 0,
      "caseNum": 4,
      "caseName": "4. Akuzativ (Koho? Co?)",
      "explanation": "Verb phrase 'dát si' requires Accusative. Feminine ending '-a' changes to '-u': 'horkou kávu'.",
      "badge": "4. Akuzativ - Dát si kávu"
    },
    {
      "prompt": "Hledám pro celou rodinu dobrého a spolehlivého ___.",
      "options": [
        "zubaře",
        "zubař",
        "zubaři",
        "zubařem"
      ],
      "correct": 0,
      "caseNum": 4,
      "caseName": "4. Akuzativ (Koho? Co?)",
      "explanation": "Masculine Animate soft noun takes '-e' in Accusative: 'spolehlivého zubaře'.",
      "badge": "4. Akuzativ - Hledat zubaře"
    },
    {
      "prompt": "Na zastávce pečlivě čtu nový jízdní ___.",
      "options": [
        "řád",
        "řádu",
        "řádem",
        "řáde"
      ],
      "correct": 0,
      "caseNum": 4,
      "caseName": "4. Akuzativ (Koho? Co?)",
      "explanation": "Direct object with 'číst'. Masculine Inanimate equals Nominative: 'nový jízdní řád'.",
      "badge": "4. Akuzativ - Číst jízdní řád"
    },
    {
      "prompt": "Maminka píše omluvenku pro svou ___.",
      "options": [
        "dceru",
        "dcera",
        "dceři",
        "dcerou"
      ],
      "correct": 0,
      "caseNum": 4,
      "caseName": "4. Akuzativ (Koho? Co?)",
      "explanation": "Preposition 'pro' takes Accusative. Feminine noun ending in -a takes '-u': 'pro dceru'.",
      "badge": "4. Akuzativ - Pro dceru"
    },
    {
      "prompt": "Musíte správně vyplnit tento úřední ___.",
      "options": [
        "formulář",
        "formuláře",
        "formulářem",
        "formuláři"
      ],
      "correct": 0,
      "caseNum": 4,
      "caseName": "4. Akuzativ (Koho? Co?)",
      "explanation": "Masculine Inanimate direct object with 'vyplnit': 'tento úřední formulář'.",
      "badge": "4. Akuzativ - Vyplnit formulář"
    },
    {
      "prompt": "Z okna letadla vidím celé pražské ___.",
      "options": [
        "letiště",
        "letištěm",
        "letišti",
        "letišťa"
      ],
      "correct": 0,
      "caseNum": 4,
      "caseName": "4. Akuzativ (Koho? Co?)",
      "explanation": "Neuter noun (letiště) in Accusative stays identical to Nominative: 'pražské letiště'.",
      "badge": "4. Akuzativ - Vidět letiště"
    }
  ],
  "5": [
    {
      "prompt": "Dobrý den, pane ___!",
      "options": [
        "doktore",
        "doktor",
        "doktora",
        "doktoru"
      ],
      "correct": 0,
      "caseNum": 5,
      "caseName": "5. Vokativ (Oslovujeme)",
      "explanation": "Vocative of 'doktor' softens hard -r to '-re': 'pane doktore!'.",
      "badge": "5. Vokativ - Pane doktore"
    },
    {
      "prompt": "Dobrý den, pane ___!",
      "options": [
        "Nováku",
        "Novák",
        "Nováka",
        "Novákem"
      ],
      "correct": 0,
      "caseNum": 5,
      "caseName": "5. Vokativ (Oslovujeme)",
      "explanation": "Masculine surnames ending in -k take '-u' in Vocative: 'pane Nováku!'.",
      "badge": "5. Vokativ - Pane Nováku"
    },
    {
      "prompt": "Ahoj ___, můžeš mi prosím s tímto pomoct?",
      "options": [
        "Petře",
        "Petr",
        "Petra",
        "Petrovi"
      ],
      "correct": 0,
      "caseNum": 5,
      "caseName": "5. Vokativ (Oslovujeme)",
      "explanation": "Vocative of Petr softens stem -r to '-ře': 'Petře!'.",
      "badge": "5. Vokativ - Petr -> Petře"
    },
    {
      "prompt": "Milá ___, děkuji mnohokrát za tvůj dopis.",
      "options": [
        "Evo",
        "Eva",
        "Evě",
        "Evu"
      ],
      "correct": 0,
      "caseNum": 5,
      "caseName": "5. Vokativ (Oslovujeme)",
      "explanation": "Feminine first names ending in -a change to '-o' in Vocative: 'Evo!'.",
      "badge": "5. Vokativ - Eva -> Evo"
    },
    {
      "prompt": "Dobrý den, paní ___!",
      "options": [
        "učitelko",
        "učitelka",
        "učitelce",
        "učitelku"
      ],
      "correct": 0,
      "caseNum": 5,
      "caseName": "5. Vokativ (Oslovujeme)",
      "explanation": "Feminine noun ending in -a changes to '-o' when addressing: 'paní učitelko!'.",
      "badge": "5. Vokativ - Paní učitelko"
    },
    {
      "prompt": "Vážený pane ___!",
      "options": [
        "učiteli",
        "učitel",
        "učitele",
        "učitelem"
      ],
      "correct": 0,
      "caseNum": 5,
      "caseName": "5. Vokativ (Oslovujeme)",
      "explanation": "Soft masculine noun (učitel) takes '-i' in Vocative: 'pane učiteli!'.",
      "badge": "5. Vokativ - Pane učiteli"
    },
    {
      "prompt": "Prosím vás, pane ___, staví tento autobus na nádraží?",
      "options": [
        "řidiči",
        "řidič",
        "řidiče",
        "řidičem"
      ],
      "correct": 0,
      "caseNum": 5,
      "caseName": "5. Vokativ (Oslovujeme)",
      "explanation": "Soft masculine noun (řidič) takes '-i' in Vocative: 'pane řidiči!'.",
      "badge": "5. Vokativ - Pane řidiči"
    },
    {
      "prompt": "Dobrý večer, pane ___, neteče vám voda?",
      "options": [
        "sousede",
        "soused",
        "souseď",
        "sousedovi"
      ],
      "correct": 0,
      "caseNum": 5,
      "caseName": "5. Vokativ (Oslovujeme)",
      "explanation": "Hard masculine noun (soused) takes '-e' in Vocative: 'pane sousede!'.",
      "badge": "5. Vokativ - Pane sousede"
    },
    {
      "prompt": "Ahoj ___, v kolik hodin zítra začíná směna?",
      "options": [
        "Jane",
        "Jan",
        "Jana",
        "Janu"
      ],
      "correct": 0,
      "caseNum": 5,
      "caseName": "5. Vokativ (Oslovujeme)",
      "explanation": "Vocative of hard name Jan takes '-e': 'Jane!'.",
      "badge": "5. Vokativ - Jan -> Jane"
    },
    {
      "prompt": "Ahoj ___, jak se dneska cítíš?",
      "options": [
        "Jano",
        "Jana",
        "Janě",
        "Janu"
      ],
      "correct": 0,
      "caseNum": 5,
      "caseName": "5. Vokativ (Oslovujeme)",
      "explanation": "Feminine name ending in -a changes to '-o' in Vocative: 'Jano!'.",
      "badge": "5. Vokativ - Jana -> Jano"
    },
    {
      "prompt": "Vážený pane ___, posílám vám zápis ze včerejší schůzky.",
      "options": [
        "kolego",
        "kolega",
        "kolegu",
        "kolegovi"
      ],
      "correct": 0,
      "caseNum": 5,
      "caseName": "5. Vokativ (Oslovujeme)",
      "explanation": "Masculine noun ending in -a (kolega) takes '-o' in Vocative: 'pane kolego!'.",
      "badge": "5. Vokativ - Pane kolego"
    },
    {
      "prompt": "Pane ___, potřeboval bych si vzít dva dny dovolené.",
      "options": [
        "vedoucí",
        "vedoucího",
        "vedoucím",
        "vedouče"
      ],
      "correct": 0,
      "caseNum": 5,
      "caseName": "5. Vokativ (Oslovujeme)",
      "explanation": "Adjectival masculine noun (vedoucí) retains adjectival form: 'pane vedoucí!'.",
      "badge": "5. Vokativ - Pane vedoucí"
    },
    {
      "prompt": "Vážený pane ___, potvrzujeme přijetí vaší platby.",
      "options": [
        "Novotný",
        "Novotného",
        "Novotném",
        "Novotným"
      ],
      "correct": 0,
      "caseNum": 5,
      "caseName": "5. Vokativ (Oslovujeme)",
      "explanation": "Surnames ending in adjectival '-ý' retain '-ý' in Vocative: 'pane Novotný!'.",
      "badge": "5. Vokativ - Příjmení na -Ý"
    },
    {
      "prompt": "Ahoj ___, půjdeš dnes po práci na fotbal?",
      "options": [
        "Tomáši",
        "Tomáš",
        "Tomáše",
        "Tomášem"
      ],
      "correct": 0,
      "caseNum": 5,
      "caseName": "5. Vokativ (Oslovujeme)",
      "explanation": "Names ending in soft consonant -š take '-i' in Vocative: 'Tomáši!'.",
      "badge": "5. Vokativ - Tomáš -> Tomáši"
    },
    {
      "prompt": "Ahoj ___, máš na chvilku čas?",
      "options": [
        "Martine",
        "Martin",
        "Martina",
        "Martinovi"
      ],
      "correct": 0,
      "caseNum": 5,
      "caseName": "5. Vokativ (Oslovujeme)",
      "explanation": "Masculine name ending in hard consonant takes '-e': 'Martine!'.",
      "badge": "5. Vokativ - Martin -> Martine"
    },
    {
      "prompt": "Dobrý den, paní ___!",
      "options": [
        "Dvořáková",
        "Dvořákovou",
        "Dvořákové",
        "Dvořákovo"
      ],
      "correct": 0,
      "caseNum": 5,
      "caseName": "5. Vokativ (Oslovujeme)",
      "explanation": "Female surnames ending in -ová retain '-ová' in Vocative: 'paní Dvořáková!'.",
      "badge": "5. Vokativ - Paní s příjmením -OVÁ"
    },
    {
      "prompt": "Milá ___, přeji ti všechno nejlepší k svátku!",
      "options": [
        "maminko",
        "maminka",
        "mamince",
        "maminku"
      ],
      "correct": 0,
      "caseNum": 5,
      "caseName": "5. Vokativ (Oslovujeme)",
      "explanation": "Affectionate feminine nouns ending in -a take '-o': 'maminko!'.",
      "badge": "5. Vokativ - Maminko"
    },
    {
      "prompt": "Ahoj ___, nezapomněl jsi klíče od bytu?",
      "options": [
        "Pavle",
        "Pavel",
        "Pavla",
        "Pavlovi"
      ],
      "correct": 0,
      "caseNum": 5,
      "caseName": "5. Vokativ (Oslovujeme)",
      "explanation": "In Pavel, the fleeting -e- drops and ending '-e' is added: 'Pavle!'.",
      "badge": "5. Vokativ - Pavel -> Pavle"
    },
    {
      "prompt": "Vážený pane ___, posílám opravené technické výkresy.",
      "options": [
        "inženýre",
        "inženýr",
        "inženýra",
        "inženýrovi"
      ],
      "correct": 0,
      "caseNum": 5,
      "caseName": "5. Vokativ (Oslovujeme)",
      "explanation": "Stem -r softens to -re: 'pane inženýre!'.",
      "badge": "5. Vokativ - Pane inženýre"
    },
    {
      "prompt": "Vážený pane ___, obracím se na vás s prosbou ohledně parku.",
      "options": [
        "starosto",
        "starosta",
        "starostu",
        "starostovi"
      ],
      "correct": 0,
      "caseNum": 5,
      "caseName": "5. Vokativ (Oslovujeme)",
      "explanation": "Masculine noun ending in -a (starosta) takes '-o' in Vocative: 'pane starosto!'.",
      "badge": "5. Vokativ - Pane starosto"
    }
  ],
  "6": [
    {
      "prompt": "Už pět let spokojeně žiji v ___.",
      "options": [
        "Praze",
        "Praha",
        "Prahu",
        "Prahou"
      ],
      "correct": 0,
      "caseNum": 6,
      "caseName": "6. Lokál (O kom? O čem?)",
      "explanation": "Preposition 'v' requires Locative (Case 6). Hard stem -H softens to -Z before '-e': Praha -> v Praze.",
      "badge": "6. Lokál - Alternace H -> Z (v Praze)"
    },
    {
      "prompt": "Čekám ve frontě na hlavní ___.",
      "options": [
        "poště",
        "pošta",
        "poštu",
        "poštou"
      ],
      "correct": 0,
      "caseNum": 6,
      "caseName": "6. Lokál (O kom? O čem?)",
      "explanation": "Preposition 'na' + Locative. Hard feminine noun pošta takes '-ě': 'na poště'.",
      "badge": "6. Lokál - Na poště"
    },
    {
      "prompt": "Mám trvalý pobyt v České ___.",
      "options": [
        "republice",
        "republika",
        "republiku",
        "republikou"
      ],
      "correct": 0,
      "caseNum": 6,
      "caseName": "6. Lokál (O kom? O čem?)",
      "explanation": "Preposition 'v' + Locative. Hard stem -K softens to -C before '-e': republika -> v republice.",
      "badge": "6. Lokál - Alternace K -> C (v republice)"
    },
    {
      "prompt": "Sejdeme se na hlavním ___ u pokladen.",
      "options": [
        "nádraží",
        "nádražím",
        "nádraže",
        "nádražie"
      ],
      "correct": 0,
      "caseNum": 6,
      "caseName": "6. Lokál (O kom? O čem?)",
      "explanation": "Neuter noun pattern 'stavení' (nádraží) retains '-í' in Locative: 'na hlavním nádraží'.",
      "badge": "6. Lokál - Neuter -Í (na nádraží)"
    },
    {
      "prompt": "V našem novém ___ máme velký balkón.",
      "options": [
        "bytě",
        "bytu",
        "bytem",
        "byt"
      ],
      "correct": 0,
      "caseNum": 6,
      "caseName": "6. Lokál (O kom? O čem?)",
      "explanation": "Masculine Inanimate noun (byt) takes '-ě' in Locative: 'v bytě'.",
      "badge": "6. Lokál - V bytě"
    },
    {
      "prompt": "Můj dědeček leží v městské ___.",
      "options": [
        "nemocnici",
        "nemocnice",
        "nemocnicí",
        "nemocnica"
      ],
      "correct": 0,
      "caseNum": 6,
      "caseName": "6. Lokál (O kom? O čem?)",
      "explanation": "Soft feminine noun (růže) takes '-i' in Locative: 'v nemocnici'.",
      "badge": "6. Lokál - V nemocnici"
    },
    {
      "prompt": "Učitel nám podrobně vyprávěl o závěrečné ___.",
      "options": [
        "zkoušce",
        "zkouška",
        "zkoušku",
        "zkouškou"
      ],
      "correct": 0,
      "caseNum": 6,
      "caseName": "6. Lokál (O kom? O čem?)",
      "explanation": "Preposition 'o' requires Locative. Stem -K softens to -C: zkouška -> o zkoušce.",
      "badge": "6. Lokál - O zkoušce (K -> C)"
    },
    {
      "prompt": "Byl jsem na cizineckém ___ podat žádost.",
      "options": [
        "úřadě",
        "úřadu",
        "úřadem",
        "úřad"
      ],
      "correct": 0,
      "caseNum": 6,
      "caseName": "6. Lokál (O kom? O čem?)",
      "explanation": "Hard masculine noun (hrad) takes '-ě' in Locative: 'na úřadě' (or na úřadu).",
      "badge": "6. Lokál - Na úřadě"
    },
    {
      "prompt": "Dnes musím zůstat déle v ___.",
      "options": [
        "práci",
        "práce",
        "prácou",
        "prácí"
      ],
      "correct": 0,
      "caseNum": 6,
      "caseName": "6. Lokál (O kom? O čem?)",
      "explanation": "Feminine noun práce takes '-i' in Locative: 'v práci'.",
      "badge": "6. Lokál - V práci"
    },
    {
      "prompt": "Koupil jsem vitamíny a léky v místní ___.",
      "options": [
        "lékárně",
        "lékárna",
        "lékárnu",
        "lékárnou"
      ],
      "correct": 0,
      "caseNum": 6,
      "caseName": "6. Lokál (O kom? O čem?)",
      "explanation": "Feminine noun lékárna takes '-ě' in Locative: 'v lékárně'.",
      "badge": "6. Lokál - V lékárně"
    },
    {
      "prompt": "Letadlo přistálo na pražském mezinárodním ___.",
      "options": [
        "letišti",
        "letiště",
        "letištěm",
        "letišťu"
      ],
      "correct": 0,
      "caseNum": 6,
      "caseName": "6. Lokál (O kom? O čem?)",
      "explanation": "Neuter noun (letiště) softens -ště to '-šti' in Locative: 'na letišti'.",
      "badge": "6. Lokál - Na letišti"
    },
    {
      "prompt": "Při ústní zkoušce jsem plynule mluvil o své ___.",
      "options": [
        "rodině",
        "rodina",
        "rodinu",
        "rodinou"
      ],
      "correct": 0,
      "caseNum": 6,
      "caseName": "6. Lokál (O kom? O čem?)",
      "explanation": "Preposition 'o' requires Locative. Feminine noun rodina takes '-ě': 'o rodině'.",
      "badge": "6. Lokál - O rodině"
    },
    {
      "prompt": "Vrátím se k počítači hned po ___.",
      "options": [
        "obědě",
        "obědu",
        "obědem",
        "oběd"
      ],
      "correct": 0,
      "caseNum": 6,
      "caseName": "6. Lokál (O kom? O čem?)",
      "explanation": "Preposition 'po' (time) requires Locative. Hard noun oběd takes '-ě': 'po obědě'.",
      "badge": "6. Lokál - Po obědě"
    },
    {
      "prompt": "Trhy se konají na starém městském ___.",
      "options": [
        "náměstí",
        "náměstím",
        "náměstia",
        "náměstie"
      ],
      "correct": 0,
      "caseNum": 6,
      "caseName": "6. Lokál (O kom? O čem?)",
      "explanation": "Neuter noun ending in '-í' keeps '-í' in Locative: 'na náměstí'.",
      "badge": "6. Lokál - Na náměstí"
    },
    {
      "prompt": "Poslouchám rádio, když sedím v ___.",
      "options": [
        "autě",
        "autu",
        "autem",
        "auto"
      ],
      "correct": 0,
      "caseNum": 6,
      "caseName": "6. Lokál (O kom? O čem?)",
      "explanation": "Neuter hard noun (město -> auto) takes '-ě': 'v autě'.",
      "badge": "6. Lokál - V autě"
    },
    {
      "prompt": "Kolegové u stolu diskutovali o své budoucí ___.",
      "options": [
        "práci",
        "práce",
        "prácou",
        "prácí"
      ],
      "correct": 0,
      "caseNum": 6,
      "caseName": "6. Lokál (O kom? O čem?)",
      "explanation": "Preposition 'o' requires Locative: 'o budoucí práci'.",
      "badge": "6. Lokál - O práci"
    },
    {
      "prompt": "Vystupte prosím na ___ stanici metra.",
      "options": [
        "příští",
        "příštím",
        "příštího",
        "příště"
      ],
      "correct": 0,
      "caseNum": 6,
      "caseName": "6. Lokál (O kom? O čem?)",
      "explanation": "Locative singular feminine soft adjective ends in '-í': 'na příští stanici'.",
      "badge": "6. Lokál - Na příští stanici"
    },
    {
      "prompt": "Vyprávěl jsem přátelům o mé starší ___.",
      "options": [
        "sestře",
        "sestre",
        "sestru",
        "sestry"
      ],
      "correct": 0,
      "caseNum": 6,
      "caseName": "6. Lokál (O kom? O čem?)",
      "explanation": "Preposition 'o' requires Locative. Stem -R softens to -Ř before '-e': sestra -> o sestře!",
      "badge": "6. Lokál - Alternace R -> Ř (o sestře)"
    },
    {
      "prompt": "Zakládal jsem si účet v české ___.",
      "options": [
        "bance",
        "banka",
        "banku",
        "bankou"
      ],
      "correct": 0,
      "caseNum": 6,
      "caseName": "6. Lokál (O kom? O čem?)",
      "explanation": "Preposition 'v' requires Locative. Stem -K softens to -C: banka -> v bance!",
      "badge": "6. Lokál - Alternace K -> C (v bance)"
    },
    {
      "prompt": "Moje dcera studuje medicínu na Karlově ___.",
      "options": [
        "univerzitě",
        "univerzita",
        "univerzitu",
        "univerzitou"
      ],
      "correct": 0,
      "caseNum": 6,
      "caseName": "6. Lokál (O kom? O čem?)",
      "explanation": "Preposition 'na' + Locative. Hard feminine noun univerzita takes '-ě': 'na univerzitě'.",
      "badge": "6. Lokál - Na univerzitě"
    }
  ],
  "7": [
    {
      "prompt": "Každé ráno jezdím do práce ___.",
      "options": [
        "autobusem",
        "s autobusem",
        "autobusu",
        "autobuse"
      ],
      "correct": 0,
      "caseNum": 7,
      "caseName": "7. Instrumentál (Kým? Čím?)",
      "explanation": "Means of transport require bare Instrumental WITHOUT 's': 'jezdit autobusem'.",
      "badge": "7. Instrumentál - Doprava bez S"
    },
    {
      "prompt": "Do poradny pro cizince jsem přišel se svou ___.",
      "options": [
        "manželkou",
        "manželka",
        "manželce",
        "manželku"
      ],
      "correct": 0,
      "caseNum": 7,
      "caseName": "7. Instrumentál (Kým? Čím?)",
      "explanation": "Accompaniment takes 's/se' + Instrumental. Feminine noun ending in -a takes '-ou': 'se svou manželkou'.",
      "badge": "7. Instrumentál - F koncovka -OU"
    },
    {
      "prompt": "Můj bratr vystudoval fakultu a stal se ___.",
      "options": [
        "lékařem",
        "lékař",
        "lékaře",
        "lékaři"
      ],
      "correct": 0,
      "caseNum": 7,
      "caseName": "7. Instrumentál (Kým? Čím?)",
      "explanation": "Predicate profession with 'být' or 'stát se' takes Instrumental: 'stal se lékařem' (-em).",
      "badge": "7. Instrumentál - Profese s BÝT/STÁT SE"
    },
    {
      "prompt": "Do centra je nejlepší jet přímou linkovou ___.",
      "options": [
        "tramvají",
        "tramvajem",
        "tramvaje",
        "tramvaji"
      ],
      "correct": 0,
      "caseNum": 7,
      "caseName": "7. Instrumentál (Kým? Čím?)",
      "explanation": "Soft feminine noun (tramvaj) takes '-í' in Instrumental: 'jet tramvají'.",
      "badge": "7. Instrumentál - Jet tramvají (-Í)"
    },
    {
      "prompt": "Všichni zaměstnanci jsou spokojeni s novou moderní ___.",
      "options": [
        "kanceláří",
        "kancelárou",
        "kanceláře",
        "kanceláři"
      ],
      "correct": 0,
      "caseNum": 7,
      "caseName": "7. Instrumentál (Kým? Čím?)",
      "explanation": "Soft feminine noun (kancelář) takes '-í' in Instrumental: 's kanceláří'.",
      "badge": "7. Instrumentál - Měkké F na -Í"
    },
    {
      "prompt": "Velké parkoviště pro návštěvníky je přímo před ___.",
      "options": [
        "úřadem",
        "úřadu",
        "úřadě",
        "úřad"
      ],
      "correct": 0,
      "caseNum": 7,
      "caseName": "7. Instrumentál (Kým? Čím?)",
      "explanation": "Preposition 'před' (place) takes Instrumental. Hard masculine noun takes '-em': 'před úřadem'.",
      "badge": "7. Instrumentál - Před úřadem"
    },
    {
      "prompt": "Dám si prosím jednu kávu s ___ a cukrem.",
      "options": [
        "mlékem",
        "mléko",
        "mléka",
        "mléku"
      ],
      "correct": 0,
      "caseNum": 7,
      "caseName": "7. Instrumentál (Kým? Čím?)",
      "explanation": "Preposition 's' + Instrumental. Neuter noun (mléko) takes '-em': 's mlékem'.",
      "badge": "7. Instrumentál - Káva s mlékem"
    },
    {
      "prompt": "O víkendu půjdu na hřiště se svým malým ___.",
      "options": [
        "synem",
        "syn",
        "syna",
        "synovi"
      ],
      "correct": 0,
      "caseNum": 7,
      "caseName": "7. Instrumentál (Kým? Čím?)",
      "explanation": "Accompaniment 's/se' takes Instrumental. Masculine noun takes '-em': 'se synem'.",
      "badge": "7. Instrumentál - Se synem"
    },
    {
      "prompt": "Formulář žádosti musíte čitelně vyplnit modrým nebo černým ___.",
      "options": [
        "perem",
        "pero",
        "pera",
        "peru"
      ],
      "correct": 0,
      "caseNum": 7,
      "caseName": "7. Instrumentál (Kým? Čím?)",
      "explanation": "Tool used to perform an action uses bare Instrumental WITHOUT 's': 'psát perem'.",
      "badge": "7. Instrumentál - Psát perem (Nástroj bez S)"
    },
    {
      "prompt": "Hledaná lékárna se nachází hned za hlavní ___.",
      "options": [
        "poštou",
        "pošta",
        "poště",
        "poštu"
      ],
      "correct": 0,
      "caseNum": 7,
      "caseName": "7. Instrumentál (Kým? Čím?)",
      "explanation": "Preposition 'za' (position behind) takes Instrumental. Feminine noun takes '-ou': 'za poštou'.",
      "badge": "7. Instrumentál - Za poštou"
    },
    {
      "prompt": "Bydlím v podnájmu společně se svým starším ___.",
      "options": [
        "bratrem",
        "bratr",
        "bratra",
        "bratrovi"
      ],
      "correct": 0,
      "caseNum": 7,
      "caseName": "7. Instrumentál (Kým? Čím?)",
      "explanation": "Accompaniment 'se' + Instrumental: 'se svým starším bratrem'.",
      "badge": "7. Instrumentál - S bratrem"
    },
    {
      "prompt": "Na celodenní výlet jsme cestovali moderním rychlým ___.",
      "options": [
        "vlakem",
        "s vlakem",
        "vlaku",
        "vlak"
      ],
      "correct": 0,
      "caseNum": 7,
      "caseName": "7. Instrumentál (Kým? Čím?)",
      "explanation": "Means of transport take bare Instrumental: 'cestovat vlakem'.",
      "badge": "7. Instrumentál - Cestovat vlakem"
    },
    {
      "prompt": "Moje sestra pracuje v supermarketu jako vedoucí ___.",
      "options": [
        "prodavačka",
        "prodavačkou",
        "prodavačce",
        "prodavačku"
      ],
      "correct": 1,
      "caseNum": 7,
      "caseName": "7. Instrumentál (Kým? Čím?)",
      "explanation": "Profession with 'pracovat jako' often takes Instrumental (or Nominative): 'prodavačkou'.",
      "badge": "7. Instrumentál - Pracovat jako prodavačkou"
    },
    {
      "prompt": "Náš soused často myje své auto přímo před ___.",
      "options": [
        "domem",
        "domu",
        "domě",
        "dom"
      ],
      "correct": 0,
      "caseNum": 7,
      "caseName": "7. Instrumentál (Kým? Čím?)",
      "explanation": "Preposition 'před' takes Instrumental. Masculine noun takes '-em': 'před domem'.",
      "badge": "7. Instrumentál - Před domem"
    },
    {
      "prompt": "Měl jsem velmi příjemný pohovor s panem ___.",
      "options": [
        "ředitelem",
        "ředitel",
        "ředitele",
        "řediteli"
      ],
      "correct": 0,
      "caseNum": 7,
      "caseName": "7. Instrumentál (Kým? Čím?)",
      "explanation": "Preposition 's' + Instrumental. Soft masculine noun takes '-em': 's panem ředitelem'.",
      "badge": "7. Instrumentál - S ředitelem"
    },
    {
      "prompt": "Metro na chvíli zastavilo v tunelu mezi dvěma ___.",
      "options": [
        "stanicemi",
        "stanice",
        "stanicích",
        "stanicami"
      ],
      "correct": 0,
      "caseNum": 7,
      "caseName": "7. Instrumentál (Kým? Čím?)",
      "explanation": "Preposition 'mezi' + Instrumental plural. Feminine noun takes '-emi/-ami': 'mezi dvěma stanicemi'.",
      "badge": "7. Instrumentál - Mezi stanicemi"
    },
    {
      "prompt": "Při nachlazení piju teplý bylinkový čaj s ___.",
      "options": [
        "citronem",
        "citron",
        "citronu",
        "citrone"
      ],
      "correct": 0,
      "caseNum": 7,
      "caseName": "7. Instrumentál (Kým? Čím?)",
      "explanation": "Preposition 's' + Instrumental. Masculine noun takes '-em': 'čaj s citronem'.",
      "badge": "7. Instrumentál - S citronem"
    },
    {
      "prompt": "Krabice s formuláři leží v kanceláři pod mým ___.",
      "options": [
        "stolem",
        "stolu",
        "stole",
        "stůl"
      ],
      "correct": 0,
      "caseNum": 7,
      "caseName": "7. Instrumentál (Kým? Čím?)",
      "explanation": "Preposition 'pod' (location underneath) takes Instrumental: 'pod stolem'.",
      "badge": "7. Instrumentál - Pod stolem"
    },
    {
      "prompt": "Domluvil jsem si prohlídku bytu se slečnou ___.",
      "options": [
        "Novákovou",
        "Nováková",
        "Novákové",
        "Novákovu"
      ],
      "correct": 0,
      "caseNum": 7,
      "caseName": "7. Instrumentál (Kým? Čím?)",
      "explanation": "Female surname ending in -ová takes '-ou' in Instrumental: 'se slečnou Novákovou'.",
      "badge": "7. Instrumentál - Se slečnou Novákovou"
    },
    {
      "prompt": "Do zaměstnání se nejrychleji dostanu osobním ___.",
      "options": [
        "autem",
        "s autem",
        "autu",
        "autě"
      ],
      "correct": 0,
      "caseNum": 7,
      "caseName": "7. Instrumentál (Kým? Čím?)",
      "explanation": "Means of transport takes bare Instrumental without 's': 'jet autem'.",
      "badge": "7. Instrumentál - Jet autem (bez S)"
    }
  ]
};

let currentPracticeCase = 1;
let currentQuestionIndex = 0;
let hasAnsweredCurrent = false;

function selectPracticeCase(cNum) {
  currentPracticeCase = cNum;
  currentQuestionIndex = 0;
  document.querySelectorAll(".practice-case-pill").forEach((pill) => {
    const pillNum = parseInt(pill.getAttribute("data-case"), 10);
    pill.classList.toggle("active", pillNum === cNum);
  });
  renderQuestion();
}

// Audio synthesis
function speakCzech(text) {
  if (window.AndroidBridge && typeof window.AndroidBridge.speakText === "function") {
    window.AndroidBridge.speakText(text, speechRate);
    return;
  }
  
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "cs-CZ";
    utterance.rate = speechRate;
    window.speechSynthesis.speak(utterance);
  } else {
    console.log("Speech synthesis not supported on this device.");
  }
}

function toggleSpeed() {
  speechRate = speechRate === 1.0 ? 0.75 : 1.0;
  const btn = document.getElementById("speedBtn");
  if (btn) {
    btn.innerHTML = speechRate === 0.75 ? "🐢 0.75x" : "⚡ 1.0x";
    btn.classList.toggle("active", speechRate === 0.75);
  }
  speakCzech("Rychlost řeči změněna.");
}

// Navigation
function switchTab(tabId) {
  currentTab = tabId;
  document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));

  const content = document.getElementById("tab-" + tabId);
  const navItem = document.getElementById("nav-" + tabId);
  if (content) content.classList.add("active");
  if (navItem) navItem.classList.add("active");

  if (tabId === "stats") {
    updateStatsDisplay();
  } else if (tabId === "checklist") {
    renderPrepQuestion();
  } else if (tabId === "practice") {
    renderQuestion();
  } else if (tabId === "table") {
    renderCaseDetail();
  }
}

// Render Table
function selectCase(caseNum) {
  currentCase = caseNum;
  document.querySelectorAll("#tab-table .case-pill").forEach((pill, idx) => {
    pill.classList.toggle("active", (idx + 1) === caseNum);
  });
  renderCaseDetail();
}

function renderCaseDetail() {
  const data = CASES_DATA[currentCase];
  const en = ENGLISH_CASE_INFO[currentCase] || {};
  const container = document.getElementById("case-detail-container");
  if (!container || !data) return;

  let rulesListHtml = "";
  if (en.englishKeyRules && en.englishKeyRules.length > 0) {
    rulesListHtml = "<ul style='margin-left: 18px; margin-top: 6px; font-size: 12.5px; color: #37474F; line-height: 1.5;'>";
    en.englishKeyRules.forEach(r => {
      rulesListHtml += `<li>${r}</li>`;
    });
    rulesListHtml += "</ul>";
  }

  let tableHtml = `
    <div style="margin-bottom: 12px;">
      <h3 style="color: var(--primary); font-size: 18px; margin-bottom: 4px;">${data.name}</h3>
      <div style="font-size: 14px; font-weight: 700; color: #37474F;">Otázka: <span style="color: var(--secondary);">${data.question}</span></div>
      <p style="font-size: 13px; color: #555; margin-top: 4px;">${data.usage}</p>
      
      <!-- English Explanation Box -->
      <div style="background: #E8F4FD; border: 1.5px solid #90CAF9; border-radius: 10px; padding: 12px; margin: 12px 0;">
        <div style="display: flex; align-items: center; gap: 6px; font-weight: 800; font-size: 13.5px; color: #0D47A1; margin-bottom: 4px;">
          <span>🇬🇧</span>
          <span>${en.englishName || "English Guide"}</span>
        </div>
        <p style="font-size: 12.5px; color: #1565C0; line-height: 1.4; margin-bottom: 6px;">
          <strong>Function & Meaning:</strong> ${en.englishUsage || ""}
        </p>
        <div style="font-size: 12px; font-weight: 700; color: #0D47A1; margin-top: 6px;">Key Endings & Rules:</div>
        ${rulesListHtml}
        <div style="margin-top: 8px; background: #FFFFFF; border-left: 3px solid #1976D2; padding: 6px 10px; border-radius: 4px; font-size: 12px; color: #0D47A1; font-weight: 600;">
          💡 <em>Pro-tip:</em> ${en.englishTip || ""}
        </div>
      </div>

      <div style="background: #F3E5F5; border-left: 4px solid var(--primary); padding: 8px 12px; margin: 10px 0; border-radius: 4px; font-size: 13px; font-weight: 600;">
        Příklad / Example: "${data.example}"
        <button class="speak-btn" onclick="speakCzech('${data.example.replace(/'/g, "\\x27")}')">🔊 Přehrát</button>
      </div>
    </div>

    <div class="grammar-table-wrap">
      <table class="grammar-table">
        <thead>
          <tr>
            <th>Rod / Gender</th>
            <th>Přídavné jméno (Adj.)</th>
            <th>Podstatné jméno (Noun)</th>
            <th>Poznámka / Note</th>
          </tr>
        </thead>
        <tbody>
  `;

  data.table.forEach(row => {
    tableHtml += `
      <tr>
        <td><strong>${row.gender}</strong></td>
        <td><span class="highlight-ending">${row.adj}</span></td>
        <td>${row.noun}</td>
        <td style="color: #666; font-size: 12px;">${row.note}</td>
      </tr>
    `;
  });

  tableHtml += `
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = tableHtml;
}

// Practice Logic
function renderQuestion() {
  const questionsList = QUESTIONS_BY_CASE[currentPracticeCase] || [];
  if (questionsList.length === 0) return;
  if (currentQuestionIndex >= questionsList.length) currentQuestionIndex = 0;

  const q = questionsList[currentQuestionIndex];
  hasAnsweredCurrent = false;

  const card = document.getElementById("practice-card");
  if (!card) return;

  let optionsHtml = "";
  q.options.forEach((opt, idx) => {
    optionsHtml += `
      <button class="btn-option" id="opt-${idx}" onclick="handleOptionClick(${idx})">
        ${opt}
      </button>
    `;
  });

  card.innerHTML = `
    <div class="question-header">
      <span class="badge">${q.badge || q.caseName}</span>
      <span style="font-size: 12px; font-weight: 700; color: var(--gray);">Otázka ${currentQuestionIndex + 1} z ${questionsList.length}</span>
    </div>
    <div class="sentence-prompt">${q.prompt}</div>
    <div class="options-grid">
      ${optionsHtml}
    </div>
    <div id="feedback-box" style="display: none; margin-top: 10px;"></div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px; flex-wrap: wrap; gap: 8px;">
      <button class="speak-btn" onclick="speakCzech('${q.prompt.replace("___", "...").replace(/'/g, "\\x27")}')">🔊 Poslech otázky</button>
      <button id="next-btn" style="display: none; background: var(--primary); color: white; border: none; padding: 10px 18px; border-radius: 10px; font-weight: 700; cursor: pointer;" onclick="nextQuestion()">Další otázka (${currentQuestionIndex + 2 <= questionsList.length ? currentQuestionIndex + 2 : 1}/${questionsList.length}) ➔</button>
    </div>
  `;
}

function handleOptionClick(index) {
  if (hasAnsweredCurrent) return;
  hasAnsweredCurrent = true;

  const questionsList = QUESTIONS_BY_CASE[currentPracticeCase] || [];
  const q = questionsList[currentQuestionIndex];
  const isCorrect = index === q.correct;
  const chosenBtn = document.getElementById("opt-" + index);
  const correctBtn = document.getElementById("opt-" + q.correct);
  const feedbackBox = document.getElementById("feedback-box");
  const nextBtn = document.getElementById("next-btn");

  exercisesAnswered++;
  localStorage.setItem("czech_exercises", exercisesAnswered);

  if (isCorrect) {
    score += 10;
    localStorage.setItem("czech_score", score);
    if (chosenBtn) chosenBtn.classList.add("correct");
    speakCzech("Výborně! Správná odpověď.");
    feedbackBox.innerHTML = `
      <div style="background: var(--success-bg); color: var(--success); padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 600;">
        ✓ Správně! ${q.explanation}
      </div>
    `;
  } else {
    if (chosenBtn) chosenBtn.classList.add("incorrect");
    if (correctBtn) correctBtn.classList.add("correct");
    speakCzech("Pozor, tady je chyba.");
    feedbackBox.innerHTML = `
      <div style="background: var(--error-bg); color: var(--error); padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 600;">
        ✗ Chyba. Správně je: <strong>${q.options[q.correct]}</strong>.<br>${q.explanation}
      </div>
    `;
  }

  feedbackBox.style.display = "block";
  if (nextBtn) nextBtn.style.display = "inline-block";
}

function nextQuestion() {
  const questionsList = QUESTIONS_BY_CASE[currentPracticeCase] || [];
  currentQuestionIndex = (currentQuestionIndex + 1) % questionsList.length;
  renderQuestion();
}

function updateStatsDisplay() {
  const scoreEl = document.getElementById("stat-score");
  const countEl = document.getElementById("stat-count");
  if (scoreEl) scoreEl.innerText = score;
  if (countEl) countEl.innerText = exercisesAnswered;
}

// PREPOSITION QUIZ LOGIC (15 questions per case, 3 choices, 1 correct)
// ==========================================
const PREPOSITION_QUESTIONS = {
  "1": [
    {
      "prompt": "___ nový soused se včera přistěhoval do našeho domu.",
      "options": [
        "Tento",
        "K",
        "O"
      ],
      "correct": 0,
      "explanation": "Podmět věty vyžaduje 1. pád (Nominativ) bez předložky. 'Tento' je ukazovací zájmeno v nominativu, předložky 'k' ani 'o' se s 1. pádem nepojí.",
      "prep": "Tento"
    },
    {
      "prompt": "___ známý lékař ordinuje každé úterý.",
      "options": [
        "Váš",
        "Bez",
        "Do"
      ],
      "correct": 0,
      "explanation": "Kdo ordinuje? Podmět věty v 1. pádě (Nominativ): 'Váš známý lékař'. Předložky 'bez' (2. pád) ani 'do' (2. pád) zde nelze použít.",
      "prep": "Váš"
    },
    {
      "prompt": "Petr pracuje ___ programátor ve velké mezinárodní firmě.",
      "options": [
        "jako",
        "k",
        "při"
      ],
      "correct": 0,
      "explanation": "Spojka / částice 'jako' se v tomto typu přirovnání a profesního zařazení pojí s 1. pádem (Nominativ): 'jako programátor'.",
      "prep": "jako"
    },
    {
      "prompt": "___ moderní nemocnice se nachází v centru města.",
      "options": [
        "Tato",
        "Z",
        "U"
      ],
      "correct": 0,
      "explanation": "Podmět věty (Co se nachází?) je v 1. pádě: 'Tato moderní nemocnice'. Předložky 'z' a 'u' vyžadují 2. pád.",
      "prep": "Tato"
    },
    {
      "prompt": "Moje sestra pracuje ___ učitelka na základní škole.",
      "options": [
        "jako",
        "od",
        "pro"
      ],
      "correct": 0,
      "explanation": "Profese po 'jako' zůstává v 1. pádě (Nominativ): 'pracuje jako učitelka'.",
      "prep": "jako"
    },
    {
      "prompt": "___ červené auto stojí před naším domem.",
      "options": [
        "To",
        "Do",
        "V"
      ],
      "correct": 0,
      "explanation": "Podmět věty v 1. pádě rodu středního: 'To červené auto'.",
      "prep": "To"
    },
    {
      "prompt": "Pan Novák nastoupil ___ ředitel nové pobočky.",
      "options": [
        "jako",
        "k",
        "přes"
      ],
      "correct": 0,
      "explanation": "Spojení 'nastoupit jako + 1. pád': 'jako ředitel'.",
      "prep": "jako"
    },
    {
      "prompt": "___ dobrá kamarádka mi vždy ochotně pomůže.",
      "options": [
        "Moje",
        "U",
        "Bez"
      ],
      "correct": 0,
      "explanation": "Kdo mi pomůže? Podmět je v 1. pádě (Nominativ): 'Moje dobrá kamarádka'.",
      "prep": "Moje"
    },
    {
      "prompt": "Tento člověk vystupuje ___ odborník na českou gramatiku.",
      "options": [
        "jako",
        "ze",
        "při"
      ],
      "correct": 0,
      "explanation": "Po 'jako' následuje tvar 1. pádu: 'jako odborník'.",
      "prep": "jako"
    },
    {
      "prompt": "___ český jazyk je pro cizince velmi zajímavý.",
      "options": [
        "Tento",
        "Do",
        "O"
      ],
      "correct": 0,
      "explanation": "Podmět věty: 'Tento český jazyk' (1. pád).",
      "prep": "Tento"
    },
    {
      "prompt": "Praha slouží ___ hlavní město České republiky.",
      "options": [
        "jako",
        "proti",
        "pod"
      ],
      "correct": 0,
      "explanation": "Funkce vyjádřená 'jako + 1. pád': 'jako hlavní město'.",
      "prep": "jako"
    },
    {
      "prompt": "___ nová studentka mluví výborně česky i anglicky.",
      "options": [
        "Naše",
        "Od",
        "K"
      ],
      "correct": 0,
      "explanation": "Podmět věty v 1. pádě rodu ženského: 'Naše nová studentka'.",
      "prep": "Naše"
    },
    {
      "prompt": "Karel se osvědčil ___ spolehlivý vedoucí týmu.",
      "options": [
        "jako",
        "bez",
        "do"
      ],
      "correct": 0,
      "explanation": "Vazba 'osvědčit se jako + 1. pád': 'jako spolehlivý vedoucí'.",
      "prep": "jako"
    },
    {
      "prompt": "___ historické centrum je zapsáno na seznamu UNESCO.",
      "options": [
        "Celé",
        "Z",
        "V"
      ],
      "correct": 0,
      "explanation": "Podmět v 1. pádě: 'Celé historické centrum'.",
      "prep": "Celé"
    },
    {
      "prompt": "Můj syn vystudoval a teď pracuje ___ zubař.",
      "options": [
        "jako",
        "u",
        "s"
      ],
      "correct": 0,
      "explanation": "Profese: 'pracuje jako zubař' (1. pád Nominativ).",
      "prep": "jako"
    }
  ],
  "2": [
    {
      "prompt": "Zítra odpoledne jdeme ___ nového divadla.",
      "options": [
        "do",
        "k",
        "na"
      ],
      "correct": 0,
      "explanation": "Předložka DO se pojí výhradně s 2. pádem (Genitiv) a vyjadřuje směr dovnitř: 'do nového divadla'.",
      "prep": "do"
    },
    {
      "prompt": "Dostal jsem krásný dopis ___ své babičky.",
      "options": [
        "od",
        "k",
        "pro"
      ],
      "correct": 0,
      "explanation": "Předložka OD vyžaduje 2. pád (Genitiv) vyjadřující původce: 'od své babičky'.",
      "prep": "od"
    },
    {
      "prompt": "Piju kávu zásadně ___ cukru a mléka.",
      "options": [
        "bez",
        "s",
        "pro"
      ],
      "correct": 0,
      "explanation": "Předložka BEZ se pojí s 2. pádem (Genitiv) a vyjadřuje absenci: 'bez cukru a mléka'.",
      "prep": "bez"
    },
    {
      "prompt": "Vrátili jsme se pozdě večer ___ práce domů.",
      "options": [
        "z",
        "v",
        "do"
      ],
      "correct": 0,
      "explanation": "Předložka Z/ZE vyžaduje 2. pád (Genitiv) při směru odkud (z povrchu/prostoru): 'z práce'.",
      "prep": "z"
    },
    {
      "prompt": "Celé odpoledne jsme čekali ___ zubního lékaře.",
      "options": [
        "u",
        "k",
        "o"
      ],
      "correct": 0,
      "explanation": "Předložka U se pojí s 2. pádem (Genitiv) a znamená 'u koho': 'u zubního lékaře'.",
      "prep": "u"
    },
    {
      "prompt": "Nová lékárna stojí hned ___ velké pošty.",
      "options": [
        "vedle",
        "k",
        "před"
      ],
      "correct": 0,
      "explanation": "Předložka VEDLE vyžaduje 2. pád (Genitiv): 'vedle velké pošty'.",
      "prep": "vedle"
    },
    {
      "prompt": "___ letních prázdnin plánujeme cestu do Španělska.",
      "options": [
        "Během",
        "Při",
        "V"
      ],
      "correct": 0,
      "explanation": "Předložka BĚHEM se pojí s 2. pádem (Genitiv) pro časový úsek: 'během letních prázdnin'.",
      "prep": "Během"
    },
    {
      "prompt": "Bydlíme jen kousek ___ stanice metra.",
      "options": [
        "blízko",
        "naproti",
        "v"
      ],
      "correct": 0,
      "explanation": "Předložka BLÍZKO se pojí s 2. pádem (Genitiv): 'blízko stanice metra'.",
      "prep": "blízko"
    },
    {
      "prompt": "Každé ráno jezdím tramvají ___ naší staré školy.",
      "options": [
        "kolem",
        "přes",
        "s"
      ],
      "correct": 0,
      "explanation": "Předložka KOLEM vyžaduje 2. pád (Genitiv): 'kolem naší staré školy'.",
      "prep": "kolem"
    },
    {
      "prompt": "Nemůžu najít brýle, nemohu číst ___ nich.",
      "options": [
        "bez",
        "k",
        "pro"
      ],
      "correct": 0,
      "explanation": "Předložka BEZ + Genitiv zájmena: 'bez nich'.",
      "prep": "bez"
    },
    {
      "prompt": "Maminka se právě vrátila ___ nákupu v supermarketu.",
      "options": [
        "z",
        "do",
        "k"
      ],
      "correct": 0,
      "explanation": "Předložka Z + 2. pád: 'z nákupu'.",
      "prep": "z"
    },
    {
      "prompt": "Obchod je otevřen ___ pondělí do pátku.",
      "options": [
        "od",
        "z",
        "k"
      ],
      "correct": 0,
      "explanation": "Časový interval 'OD pondělí (2. pád) do pátku (2. pád)'.",
      "prep": "od"
    },
    {
      "prompt": "Rodiče odjeli na dovolenou ___ České republiky.",
      "options": [
        "do",
        "k",
        "na"
      ],
      "correct": 0,
      "explanation": "Cíl cesty do státu: 'DO České republiky' (2. pád Genitiv).",
      "prep": "do"
    },
    {
      "prompt": "Byli jsme na návštěvě ___ našich dobrých známých.",
      "options": [
        "u",
        "k",
        "o"
      ],
      "correct": 0,
      "explanation": "Lokalita u osob: 'U našich dobrých známých' (2. pád Genitiv).",
      "prep": "u"
    },
    {
      "prompt": "Musím koupit dárek ___ bratra k narozeninám.",
      "options": [
        "od",
        "pro",
        "do"
      ],
      "correct": 0,
      "explanation": "Pozor: pokud se ptáme 'od koho je dárek', užijeme 'OD bratra' (2. pád).",
      "prep": "od"
    }
  ],
  "3": [
    {
      "prompt": "V pátek odpoledne jdu na kontrolu ___ zubnímu lékaři.",
      "options": [
        "k",
        "do",
        "u"
      ],
      "correct": 0,
      "explanation": "Předložka K/KE se pojí výhradně s 3. pádem (Dativ) při směru k osobě či cíli: 'k zubnímu lékaři'.",
      "prep": "k"
    },
    {
      "prompt": "Zkoušku z češtiny jsem složil ___ tvé skvělé pomoci.",
      "options": [
        "díky",
        "pro",
        "kvůli"
      ],
      "correct": 0,
      "explanation": "Předložka DÍKY se pojí s 3. pádem (Dativ) s pozitivním významem: 'díky tvé skvělé pomoci'.",
      "prep": "díky"
    },
    {
      "prompt": "Tento lék je velmi účinný ___ silné bolesti hlavy.",
      "options": [
        "proti",
        "bez",
        "před"
      ],
      "correct": 0,
      "explanation": "Předložka PROTI vyžaduje 3. pád (Dativ): 'proti silné bolesti'.",
      "prep": "proti"
    },
    {
      "prompt": "Naše nová restaurace leží přímo ___ městskému divadlu.",
      "options": [
        "naproti",
        "vedle",
        "blízko"
      ],
      "correct": 0,
      "explanation": "Předložka NAPROTI se pojí s 3. pádem (Dativ): 'naproti městskému divadlu'.",
      "prep": "naproti"
    },
    {
      "prompt": "Vlak měl zpoždění ___ špatnému počasí a sněhu.",
      "options": [
        "kvůli",
        "díky",
        "pro"
      ],
      "correct": 0,
      "explanation": "Předložka KVŮLI vyžaduje 3. pád (Dativ) u negativních příčin: 'kvůli špatnému počasí'.",
      "prep": "kvůli"
    },
    {
      "prompt": "O víkendu jedeme na návštěvu ___ babičce na venkov.",
      "options": [
        "k",
        "u",
        "do"
      ],
      "correct": 0,
      "explanation": "Předložka K + Dativ vyjadřuje směřování k osobě: 'k babičce'.",
      "prep": "k"
    },
    {
      "prompt": "Přišel jsem na schůzku pozdě ___ dopravní zácpě.",
      "options": [
        "kvůli",
        "díky",
        "bez"
      ],
      "correct": 0,
      "explanation": "Předložka KVŮLI + 3. pád: 'kvůli dopravní zácpě'.",
      "prep": "kvůli"
    },
    {
      "prompt": "Běželi jsme rychle ___ východu z metra.",
      "options": [
        "k",
        "do",
        "v"
      ],
      "correct": 0,
      "explanation": "Směr k místu/bodu s 3. pádem: 'k východu'.",
      "prep": "k"
    },
    {
      "prompt": "Projekt jsme dokončili včas jen ___ moderní technologii.",
      "options": [
        "díky",
        "pro",
        "kvůli"
      ],
      "correct": 0,
      "explanation": "Zásluha / pozitivní důvod s Dativem: 'díky moderní technologii'.",
      "prep": "díky"
    },
    {
      "prompt": "Hlasovali jsme všichni ___ tomuto novému návrhu.",
      "options": [
        "proti",
        "bez",
        "od"
      ],
      "correct": 0,
      "explanation": "Předložka PROTI + 3. pád (Dativ): 'proti tomuto návrhu'.",
      "prep": "proti"
    },
    {
      "prompt": "Auto zaparkovalo přímo ___ našemu domu.",
      "options": [
        "naproti",
        "u",
        "vedle"
      ],
      "correct": 0,
      "explanation": "Předložka NAPROTI + Dativ (našemu domu): 'naproti našemu domu'.",
      "prep": "naproti"
    },
    {
      "prompt": "Můj syn má velký respekt ___ starším lidem.",
      "options": [
        "k",
        "o",
        "pro"
      ],
      "correct": 0,
      "explanation": "Vazba 'respekt K někomu' vyžaduje Dativ (3. pád): 'k starším lidem'.",
      "prep": "k"
    },
    {
      "prompt": "Nemohl jsem spát ___ nepříjemnému hluku na ulici.",
      "options": [
        "kvůli",
        "pro",
        "bez"
      ],
      "correct": 0,
      "explanation": "Předložka KVŮLI + Dativ: 'kvůli nepříjemnému hluku'.",
      "prep": "kvůli"
    },
    {
      "prompt": "___ laskavému přístupu sestřičky se pacient uklidnil.",
      "options": [
        "Díky",
        "Bez",
        "Z"
      ],
      "correct": 0,
      "explanation": "Předložka DÍKY + 3. pád: 'Díky laskavému přístupu'.",
      "prep": "Díky"
    },
    {
      "prompt": "Musím jít zítra ___ své právničce podepsat smlouvu.",
      "options": [
        "k",
        "u",
        "do"
      ],
      "correct": 0,
      "explanation": "Směr k osobě: 'jít K právničce' (3. pád Dativ).",
      "prep": "k"
    }
  ],
  "4": [
    {
      "prompt": "Mám koupený krásný dárek ___ svou manželku.",
      "options": [
        "pro",
        "k",
        "o"
      ],
      "correct": 0,
      "explanation": "Předložka PRO se pojí výhradně se 4. pádem (Akuzativ): 'pro svou manželku'.",
      "prep": "pro"
    },
    {
      "prompt": "V sobotu odpoledne jdeme ___ fotbalový stadion.",
      "options": [
        "na",
        "v",
        "u"
      ],
      "correct": 0,
      "explanation": "Směr na otevřené prostranství / akci se 4. pádem: 'na fotbalový stadion' (Kam? Akuzativ).",
      "prep": "na"
    },
    {
      "prompt": "Děkuji vám mnohokrát ___ vaši ochotu a čas.",
      "options": [
        "za",
        "pro",
        "k"
      ],
      "correct": 0,
      "explanation": "Vazba 'děkovat ZA něco' vyžaduje 4. pád (Akuzativ): 'za vaši ochotu'.",
      "prep": "za"
    },
    {
      "prompt": "Musíme přejít opatrně ___ tuto rušnou ulici.",
      "options": [
        "přes",
        "kolem",
        "po"
      ],
      "correct": 0,
      "explanation": "Předložka PŘES se pojí se 4. pádem (Akuzativ) při přechodu: 'přes tuto rušnou ulici'.",
      "prep": "přes"
    },
    {
      "prompt": "V pátek odjíždíme na víkend ___ hory.",
      "options": [
        "na",
        "do",
        "v"
      ],
      "correct": 0,
      "explanation": "Cíl cesty na hory: 'na hory' (4. pád Akuzativ).",
      "prep": "na"
    },
    {
      "prompt": "Přihlásil jsem se ___ intenzivní kurz češtiny.",
      "options": [
        "na",
        "do",
        "k"
      ],
      "correct": 0,
      "explanation": "Vazba 'přihlásit se NA co' (Akuzativ): 'na intenzivní kurz'.",
      "prep": "na"
    },
    {
      "prompt": "Tento dopis je důležitý ___ pana ředitele.",
      "options": [
        "pro",
        "k",
        "za"
      ],
      "correct": 0,
      "explanation": "Určení příjemce: předložka PRO + 4. pád (Ma = Genitiv): 'pro pana ředitele'.",
      "prep": "pro"
    },
    {
      "prompt": "Zaplatil jsem ___ nový oběd kartou.",
      "options": [
        "za",
        "pro",
        "na"
      ],
      "correct": 0,
      "explanation": "Platba 'platit ZA co' (4. pád): 'za nový oběd'.",
      "prep": "za"
    },
    {
      "prompt": "Cestou domů jsme museli jet ___ dlouhý tunel.",
      "options": [
        "přes",
        "v",
        "po"
      ],
      "correct": 0,
      "explanation": "Průchod / přejezd: předložka PŘES + 4. pád: 'přes dlouhý tunel'.",
      "prep": "přes"
    },
    {
      "prompt": "Každý večer se dívám ___ televizní zprávy.",
      "options": [
        "na",
        "o",
        "v"
      ],
      "correct": 0,
      "explanation": "Vazba 'dívat se NA co' (4. pád Akuzativ): 'na televizní zprávy'.",
      "prep": "na"
    },
    {
      "prompt": "Rodiče mají velkou starost ___ své děti.",
      "options": [
        "o",
        "na",
        "pro"
      ],
      "correct": 0,
      "explanation": "Vazba 'starost O koho/co' se 4. pádem: 'o své děti'.",
      "prep": "o"
    },
    {
      "prompt": "Koupil jsem kávu s sebou ___ našeho kolegu.",
      "options": [
        "pro",
        "k",
        "za"
      ],
      "correct": 0,
      "explanation": "Určeno pro někoho: PRO + 4. pád: 'pro našeho kolegu'.",
      "prep": "pro"
    },
    {
      "prompt": "Polož tu těžkou knihu ___ stůl, prosím.",
      "options": [
        "na",
        "v",
        "u"
      ],
      "correct": 0,
      "explanation": "Pohyb/položení (Kam?): NA + 4. pád: 'polož na stůl'.",
      "prep": "na"
    },
    {
      "prompt": "Vyměnil jsem starý telefon ___ moderní model.",
      "options": [
        "za",
        "pro",
        "k"
      ],
      "correct": 0,
      "explanation": "Výměna 'vyměnit ZA co' (4. pád): 'za moderní model'.",
      "prep": "za"
    },
    {
      "prompt": "Turisté se šli podívat ___ Karlův most.",
      "options": [
        "na",
        "v",
        "do"
      ],
      "correct": 0,
      "explanation": "Vazba 'jít se podívat NA co' (4. pád): 'na Karlův most'.",
      "prep": "na"
    }
  ],
  "5": [
    {
      "prompt": "Dobrý den, ___ doktore, potřebuji recept na léky.",
      "options": [
        "pane",
        "panu",
        "panem"
      ],
      "correct": 0,
      "explanation": "Při oslovení se v 5. pádě (Vokativ) užívá tvar 'pane': 'pane doktore'.",
      "prep": "pane"
    },
    {
      "prompt": "Vážený ___, děkujeme za Vaši registraci.",
      "options": [
        "pane Nováku",
        "pan Novák",
        "panu Novákovi"
      ],
      "correct": 0,
      "explanation": "V oficiálním oslovení se používá 5. pád (Vokativ): 'Vážený pane Nováku'.",
      "prep": "pane Nováku"
    },
    {
      "prompt": "Ahoj ___, jak se dneska máš?",
      "options": [
        "Petře",
        "Petr",
        "Petrovi"
      ],
      "correct": 0,
      "explanation": "Přátelské oslovení vyžaduje 5. pád (Vokativ) se změnou r->ř: 'Petře!'.",
      "prep": "Petře"
    },
    {
      "prompt": "Milá ___, srdečně tě zvu na oslavu narozenin.",
      "options": [
        "Evo",
        "Eva",
        "Evu"
      ],
      "correct": 0,
      "explanation": "Ženská jména na -a mají v 5. pádě (Vokativ) koncovku -o: 'Milá Evo!'.",
      "prep": "Evo"
    },
    {
      "prompt": "Dobrý den, paní ___, přišla vám nová zásilka.",
      "options": [
        "Černá",
        "Černou",
        "Černé"
      ],
      "correct": 0,
      "explanation": "Příjmení typu přídavného jména v oslovení žen: 'paní Černá' (5. pád).",
      "prep": "Černá"
    },
    {
      "prompt": "Prosím tě, ___, podej mi ten slovník.",
      "options": [
        "Pavle",
        "Pavel",
        "Pavlovi"
      ],
      "correct": 0,
      "explanation": "Vokativ jména Pavel: 'Pavle!'.",
      "prep": "Pavle"
    },
    {
      "prompt": "Vážená paní ___, dovolte mi poděkovat za spolupráci.",
      "options": [
        "ředitelko",
        "ředitelka",
        "ředitelku"
      ],
      "correct": 0,
      "explanation": "Oslovení funkce v 5. pádě pro ženy: 'paní ředitelko'.",
      "prep": "ředitelko"
    },
    {
      "prompt": "Ahoj ___, zítra se uvidíme ve škole.",
      "options": [
        "Tomáši",
        "Tomáš",
        "Tomášem"
      ],
      "correct": 0,
      "explanation": "Jména zakončená na měkkou souhlásku mají ve Vokativu -i: 'Tomáši!'.",
      "prep": "Tomáši"
    },
    {
      "prompt": "Haló, pane ___, zapomněl jste si tady tašku!",
      "options": [
        "sousedem",
        "soused",
        "sousede"
      ],
      "correct": 2,
      "explanation": "Oslovení v 5. pádě tvrdého vzoru: 'pane sousede!'.",
      "prep": "sousede"
    },
    {
      "prompt": "Milý ___, přeji ti hodně štěstí u zkoušky z češtiny.",
      "options": [
        "kamaráde",
        "kamarád",
        "kamarádu"
      ],
      "correct": 0,
      "explanation": "Přídavné jméno a podstatné jméno v 5. pádě: 'Milý kamaráde!'.",
      "prep": "kamaráde"
    },
    {
      "prompt": "Dobrý večer, pane ___, váš stůl je připraven.",
      "options": [
        "vrchní",
        "vrchního",
        "vrchním"
      ],
      "correct": 0,
      "explanation": "Oslovení 'pane vrchní' (přídavné jméno měkké).",
      "prep": "vrchní"
    },
    {
      "prompt": "Ahoj ___, půjdeš dnes večer do kina?",
      "options": [
        "Lenko",
        "Lenka",
        "Lenku"
      ],
      "correct": 0,
      "explanation": "Vokativ pro ženské jméno Lenka: 'Lenko!'.",
      "prep": "Lenko"
    },
    {
      "prompt": "Vážený pane ___, posílám Vám požadované dokumenty.",
      "options": [
        "profesore",
        "profesor",
        "profesorem"
      ],
      "correct": 0,
      "explanation": "Vokativ pro akademický titul: 'pane profesore!'.",
      "prep": "profesore"
    },
    {
      "prompt": "Maminko a ___, děkuji vám za všechno.",
      "options": [
        "tatínku",
        "tatínek",
        "tatínkem"
      ],
      "correct": 0,
      "explanation": "Oslovení v rodině: 'tatínku!' (5. pád Vokativ).",
      "prep": "tatínku"
    },
    {
      "prompt": "Dobrý den, paní ___, jak se vám dnes daří?",
      "options": [
        "doktorko",
        "doktorka",
        "doktorkou"
      ],
      "correct": 0,
      "explanation": "Oslovení lékařky: 'paní doktorko!' (5. pád).",
      "prep": "doktorko"
    }
  ],
  "6": [
    {
      "prompt": "Už pět let bydlím a pracuji ___ Praze.",
      "options": [
        "v",
        "do",
        "na"
      ],
      "correct": 0,
      "explanation": "Předložka V/VE se v 6. pádě (Lokál) pojí se statickou polohou uvnitř města: 'v Praze' (Kde?).",
      "prep": "v"
    },
    {
      "prompt": "Na schůzce jsme dlouho mluvili ___ nové práci.",
      "options": [
        "o",
        "na",
        "pro"
      ],
      "correct": 0,
      "explanation": "Předložka O se pojí s 6. pádem (Lokál) ve významu tématu hovoru: 'o nové práci'.",
      "prep": "o"
    },
    {
      "prompt": "Kolega teď čeká dole ___ poštovním úřadě.",
      "options": [
        "na",
        "v",
        "u"
      ],
      "correct": 0,
      "explanation": "Předložka NA se s institucemi (pošta, úřad) pojí v 6. pádě: 'na poštovním úřadě'.",
      "prep": "na"
    },
    {
      "prompt": "Rád se procházím večer ___ starém městě.",
      "options": [
        "po",
        "v",
        "přes"
      ],
      "correct": 0,
      "explanation": "Předložka PO se v 6. pádě (Lokál) užívá pro pohyb po ploše: 'po starém městě'.",
      "prep": "po"
    },
    {
      "prompt": "___ vstupu do budovy musíte předložit svůj průkaz.",
      "options": [
        "Při",
        "V",
        "O"
      ],
      "correct": 0,
      "explanation": "Předložka PŘI se pojí s 6. pádem (Lokál) pro souběžnost dějů: 'při vstupu do budovy'.",
      "prep": "Při"
    },
    {
      "prompt": "Knihy mám uložené ___ pracovním stole.",
      "options": [
        "na",
        "v",
        "k"
      ],
      "correct": 0,
      "explanation": "Poloha na povrchu (Kde?): NA + 6. pád: 'na pracovním stole'.",
      "prep": "na"
    },
    {
      "prompt": "Učíme se česky ___ moderní jazykové škole.",
      "options": [
        "v",
        "na",
        "do"
      ],
      "correct": 0,
      "explanation": "Poloha v instituci: V + 6. pád: 'v moderní jazykové škole'.",
      "prep": "v"
    },
    {
      "prompt": "Dědeček nám vyprávěl příběhy ___ svém dětství.",
      "options": [
        "o",
        "po",
        "při"
      ],
      "correct": 0,
      "explanation": "Téma vyprávění: O + 6. pád: 'o svém dětství'.",
      "prep": "o"
    },
    {
      "prompt": "Během víkendu jsme cestovali ___ celé České republice.",
      "options": [
        "po",
        "v",
        "na"
      ],
      "correct": 0,
      "explanation": "Pohyb po území: PO + 6. pád: 'po celé České republice'.",
      "prep": "po"
    },
    {
      "prompt": "___ vaření vždy poslouchám český rozhlas.",
      "options": [
        "Při",
        "O",
        "Na"
      ],
      "correct": 0,
      "explanation": "Doprovodná činnost: PŘI + 6. pád: 'Při vaření'.",
      "prep": "Při"
    },
    {
      "prompt": "Moje rodina bydlí ___ hezkém rodinném domě.",
      "options": [
        "v",
        "na",
        "u"
      ],
      "correct": 0,
      "explanation": "Uvnitř stavby: V + 6. pád: 'v hezkém rodinném domě'.",
      "prep": "v"
    },
    {
      "prompt": "Byli jsme na obědě ___ italské restauraci.",
      "options": [
        "v",
        "na",
        "do"
      ],
      "correct": 0,
      "explanation": "Lokace v podniku: V + 6. pád: 'v italské restauraci'.",
      "prep": "v"
    },
    {
      "prompt": "Četl jsem zajímavý článek ___ české historii.",
      "options": [
        "o",
        "po",
        "při"
      ],
      "correct": 0,
      "explanation": "Téma článku: O + 6. pád (Lokál): 'o české historii'.",
      "prep": "o"
    },
    {
      "prompt": "Potkáme se odpoledne ___ hlavním nádraží.",
      "options": [
        "na",
        "v",
        "do"
      ],
      "correct": 0,
      "explanation": "Nádraží se tradičně pojí s předložkou NA v 6. pádě: 'na hlavním nádraží'.",
      "prep": "na"
    },
    {
      "prompt": "___ ukončení kurzu obdrží každý student certifikát.",
      "options": [
        "Po",
        "V",
        "O"
      ],
      "correct": 0,
      "explanation": "Časový následník: PO + 6. pád: 'Po ukončení kurzu'.",
      "prep": "Po"
    }
  ],
  "7": [
    {
      "prompt": "Do kina jdu zítra večer ___ svým kamarádem.",
      "options": [
        "se",
        "k",
        "pro"
      ],
      "correct": 0,
      "explanation": "Předložka S/SE vyjadřuje doprovod s 7. pádem (Instrumentál): 'se svým kamarádem'.",
      "prep": "se"
    },
    {
      "prompt": "Naše auto stojí zaparkované ___ naším domem.",
      "options": [
        "před",
        "u",
        "do"
      ],
      "correct": 0,
      "explanation": "Předložka PŘED se pojí se 7. pádem (Instrumentál) při určení polohy: 'před naším domem'.",
      "prep": "před"
    },
    {
      "prompt": "Zahrada s bazénem leží hned ___ novým domem.",
      "options": [
        "za",
        "k",
        "pro"
      ],
      "correct": 0,
      "explanation": "Předložka ZA se pojí se 7. pádem (Kde?): 'za novým domem'.",
      "prep": "za"
    },
    {
      "prompt": "Kočka spí klidně ___ tímto dřevěným stolem.",
      "options": [
        "pod",
        "na",
        "v"
      ],
      "correct": 0,
      "explanation": "Předložka POD se v 7. pádě pojí s polohou dole: 'pod stolem'.",
      "prep": "pod"
    },
    {
      "prompt": "Na stěně ___ mou postelí visí hezký obraz.",
      "options": [
        "nad",
        "před",
        "s"
      ],
      "correct": 0,
      "explanation": "Předložka NAD se pojí se 7. pádem (Instrumentál): 'nad mou postelí'.",
      "prep": "nad"
    },
    {
      "prompt": "Seděl jsem v letadle ___ dvěma příjemnými cizinci.",
      "options": [
        "mezi",
        "před",
        "s"
      ],
      "correct": 0,
      "explanation": "Předložka MEZI se pojí se 7. pádem při poloze uprostřed dvou entit: 'mezi dvěma cizinci'.",
      "prep": "mezi"
    },
    {
      "prompt": "Piju černý čaj vždy ___ čerstvým citronem.",
      "options": [
        "s",
        "bez",
        "pro"
      ],
      "correct": 0,
      "explanation": "Doprovodná ingredience: S + 7. pád: 's čerstvým citronem'.",
      "prep": "s"
    },
    {
      "prompt": "Cestuji do zaměstnání městským ___ každé ráno.",
      "options": [
        "autobusem",
        "s autobusem",
        "o autobusu"
      ],
      "correct": 0,
      "explanation": "Dopravní prostředek je v 7. pádě BEZ PŘEDLOŽKY: 'cestuji autobusem'.",
      "prep": "autobusem"
    },
    {
      "prompt": "Mluvili jsme o tom dlouho ___ panem ředitelem.",
      "options": [
        "s",
        "k",
        "za"
      ],
      "correct": 0,
      "explanation": "Společné jednání s osobou: S + 7. pád: 's panem ředitelem'.",
      "prep": "s"
    },
    {
      "prompt": "Schovali jsme se před deštěm ___ velkým stromem.",
      "options": [
        "pod",
        "nad",
        "s"
      ],
      "correct": 0,
      "explanation": "Krytí pod něčím: POD + 7. pád: 'pod velkým stromem'.",
      "prep": "pod"
    },
    {
      "prompt": "Lampa visí přímo ___ jídelním stolem.",
      "options": [
        "nad",
        "za",
        "s"
      ],
      "correct": 0,
      "explanation": "Předložka NAD + 7. pád: 'nad jídelním stolem'.",
      "prep": "nad"
    },
    {
      "prompt": "Rozdělil jídlo rovnoměrně ___ všemi dětmi.",
      "options": [
        "mezi",
        "před",
        "nad"
      ],
      "correct": 0,
      "explanation": "Distribuce MEZI + 7. pád množného čísla: 'mezi všemi dětmi'.",
      "prep": "mezi"
    },
    {
      "prompt": "Můj syn rád píše tímto modrým ___ .",
      "options": [
        "perem",
        "s perem",
        "o peru"
      ],
      "correct": 0,
      "explanation": "Nástroj / instrument v 7. pádě je BEZ předložky: 'píše perem'.",
      "prep": "perem"
    },
    {
      "prompt": "Setkáme se za deset minut ___ hlavním vchodem.",
      "options": [
        "před",
        "u",
        "k"
      ],
      "correct": 0,
      "explanation": "Místo setkání před objektem: PŘED + 7. pád: 'před hlavním vchodem'.",
      "prep": "před"
    },
    {
      "prompt": "Ráda si povídám u kávy ___ svou nejlepší kamarádkou.",
      "options": [
        "se",
        "pro",
        "k"
      ],
      "correct": 0,
      "explanation": "Společnost osoby: SE + 7. pád: 'se svou nejlepší kamarádkou'.",
      "prep": "se"
    }
  ]
};

let currentPrepCase = 2; // Default to Genitive
let currentPrepIndex = 0;
let hasAnsweredPrep = false;

function selectPrepCase(cNum) {
  currentPrepCase = cNum;
  currentPrepIndex = 0;
  document.querySelectorAll(".prep-case-pill").forEach(pill => {
    const num = parseInt(pill.getAttribute("data-case"), 10);
    pill.classList.toggle("active", num === cNum);
  });
  renderPrepQuestion();
}

function renderPrepQuestion() {
  const list = PREPOSITION_QUESTIONS[currentPrepCase] || [];
  if (list.length === 0) return;
  if (currentPrepIndex >= list.length) currentPrepIndex = 0;

  const q = list[currentPrepIndex];
  hasAnsweredPrep = false;

  const card = document.getElementById("prep-quiz-card");
  if (!card) return;

  const caseNames = {
    1: "1. Nominativ (Bez předložky / Podmět)",
    2: "2. Genitiv (do, od, z, bez, u, vedle, během)",
    3: "3. Dativ (k, díky, proti, naproti, kvůli)",
    4: "4. Akuzativ (na, pro, za, o, přes)",
    5: "5. Vokativ (Oslovení a tituly)",
    6: "6. Lokál (v, na, o, po, při)",
    7: "7. Instrumentál (s/se, před, za, pod, nad, mezi)"
  };

  let optionsHtml = "";
  q.options.forEach((opt, idx) => {
    optionsHtml += `
      <button class="btn-option prep-opt" id="prep-opt-${idx}" onclick="handlePrepOptionClick(${idx})">
        ${opt}
      </button>
    `;
  });

  card.innerHTML = `
    <div class="question-header">
      <span class="badge" style="background: #E8F5E9; color: #2E7D32; border: 1px solid #A5D6A7;">
        ${caseNames[currentPrepCase] || "Předložky"}
      </span>
      <span style="font-size: 12px; font-weight: 700; color: var(--gray);">Cvičení ${currentPrepIndex + 1} z ${list.length}</span>
    </div>
    <div class="sentence-prompt" style="font-size: 17px; margin: 14px 0;">${q.prompt}</div>
    <div class="options-grid" style="grid-template-columns: repeat(3, 1fr);">
      ${optionsHtml}
    </div>
    <div id="prep-feedback-box" style="display: none; margin-top: 12px;"></div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px; flex-wrap: wrap; gap: 8px;">
      <button class="speak-btn" onclick="speakCzech('${q.prompt.replace("___", "...").replace(/'/g, "\\x27")}')">🔊 Poslech věty</button>
      <button id="prep-next-btn" style="display: none; background: #2E7D32; color: white; border: none; padding: 10px 18px; border-radius: 10px; font-weight: 700; cursor: pointer;" onclick="nextPrepQuestion()">Další cvičení (${currentPrepIndex + 2 <= list.length ? currentPrepIndex + 2 : 1}/${list.length}) ➔</button>
    </div>
  `;
}

function handlePrepOptionClick(index) {
  if (hasAnsweredPrep) return;
  hasAnsweredPrep = true;

  const list = PREPOSITION_QUESTIONS[currentPrepCase] || [];
  const q = list[currentPrepIndex];
  const isCorrect = index === q.correct;
  const chosenBtn = document.getElementById("prep-opt-" + index);
  const correctBtn = document.getElementById("prep-opt-" + q.correct);
  const feedbackBox = document.getElementById("prep-feedback-box");
  const nextBtn = document.getElementById("prep-next-btn");

  exercisesAnswered++;
  localStorage.setItem("czech_exercises", exercisesAnswered);

  if (isCorrect) {
    score += 10;
    localStorage.setItem("czech_score", score);
    if (chosenBtn) chosenBtn.classList.add("correct");
    speakCzech("Výborně! Správná předložka.");
    feedbackBox.innerHTML = `
      <div style="background: var(--success-bg); color: var(--success); padding: 10px 14px; border-radius: 10px; font-size: 13px; font-weight: 600;">
        ✓ Správně! <strong>${q.options[q.correct]}</strong><br>${q.explanation}
      </div>
    `;
  } else {
    if (chosenBtn) chosenBtn.classList.add("incorrect");
    if (correctBtn) correctBtn.classList.add("correct");
    speakCzech("Pozor, tady patří jiná předložka.");
    feedbackBox.innerHTML = `
      <div style="background: var(--error-bg); color: var(--error); padding: 10px 14px; border-radius: 10px; font-size: 13px; font-weight: 600;">
        ✗ Chyba. Správná předložka je: <strong>${q.options[q.correct]}</strong>.<br>${q.explanation}
      </div>
    `;
  }

  feedbackBox.style.display = "block";
  if (nextBtn) nextBtn.style.display = "inline-block";
}

function nextPrepQuestion() {
  const list = PREPOSITION_QUESTIONS[currentPrepCase] || [];
  currentPrepIndex = (currentPrepIndex + 1) % list.length;
  renderPrepQuestion();
}


// Initialization on load
document.addEventListener("DOMContentLoaded", () => {
  renderCaseDetail();
  renderQuestion();
  renderPrepQuestion();
  updateStatsDisplay();
});

// ==========================================
