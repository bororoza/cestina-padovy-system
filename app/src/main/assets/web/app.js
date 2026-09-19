// Čeština na úrovni - Web & JavaScript Engine
console.log("Initializing Čeština na úrovni Web App...");

// State
let currentTab = 'table';
let currentCase = 1;
let speechRate = 1.0;
let score = parseInt(localStorage.getItem('czech_score') || '0', 10);
let exercisesAnswered = parseInt(localStorage.getItem('czech_exercises') || '0', 10);

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
  }
}

// Render Table
function selectCase(caseNum) {
  currentCase = caseNum;
  document.querySelectorAll(".case-pill").forEach((pill, idx) => {
    pill.classList.toggle("active", (idx + 1) === caseNum);
  });
  renderCaseDetail();
}

function renderCaseDetail() {
  const data = CASES_DATA[currentCase];
  const container = document.getElementById("case-detail-container");
  if (!container || !data) return;

  let tableHtml = `
    <div style="margin-bottom: 12px;">
      <h3 style="color: var(--primary); font-size: 18px; margin-bottom: 4px;">${data.name}</h3>
      <div style="font-size: 14px; font-weight: 700; color: #37474F;">Otázka: <span style="color: var(--secondary);">${data.question}</span></div>
      <p style="font-size: 13px; color: #555; margin-top: 4px;">${data.usage}</p>
      
      <div style="background: #F3E5F5; border-left: 4px solid var(--primary); padding: 8px 12px; margin: 10px 0; border-radius: 4px; font-size: 13px; font-weight: 600;">
        Příklad: "${data.example}"
        <button class="speak-btn" onclick="speakCzech('${data.example.replace(/'/g, "\\x27")}')">🔊 Přehrát</button>
      </div>
    </div>

    <div class="grammar-table-wrap">
      <table class="grammar-table">
        <thead>
          <tr>
            <th>Rod</th>
            <th>Přídavné jméno</th>
            <th>Podstatné jméno</th>
            <th>Poznámka</th>
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

// Initialization on load
document.addEventListener("DOMContentLoaded", () => {
  renderCaseDetail();
  renderQuestion();
  updateStatsDisplay();
});
