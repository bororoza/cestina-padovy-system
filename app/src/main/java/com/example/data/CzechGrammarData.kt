package com.example.data

import com.example.data.model.*

object CzechGrammarData {

    val CONSONANT_ALTERNATIONS = listOf(
        ConsonantAlternation(
            fromChar = "K",
            toChar = "C",
            baseWord = "matka",
            changedWord = "matce",
            translation = "to / about mother",
            contextExample = "k matce / o matce (Dative / Locative)"
        ),
        ConsonantAlternation(
            fromChar = "H",
            toChar = "Z",
            baseWord = "Praha",
            changedWord = "Praze",
            translation = "to / in Prague",
            contextExample = "k Praze / v Praze (Dative / Locative)"
        ),
        ConsonantAlternation(
            fromChar = "CH",
            toChar = "Š",
            baseWord = "moucha",
            changedWord = "mouše",
            translation = "to / about a fly",
            contextExample = "k mouše / o mouše (Dative / Locative)"
        ),
        ConsonantAlternation(
            fromChar = "R",
            toChar = "Ř",
            baseWord = "sestra",
            changedWord = "sestře",
            translation = "to / about sister",
            contextExample = "k sestře / o sestře (Dative / Locative)"
        )
    )

    val KEY_RULES_FOR_ENGLISH_LEARNERS = listOf(
        GrammarRule(
            title = "Locative Rule (Case 6)",
            summary = "Always requires a preposition! Never used standalone.",
            detail = "Unlike in English where you say 'I am home', the Locative case in Czech CANNOT exist without a preposition (v, na, o, po, při). Never use a bare Locative noun.",
            example = "Bydlím v Praze. Mluvím o novém projektu. Jsem na poště."
        ),
        GrammarRule(
            title = "Animacy Rule (Case 4 - Accusative)",
            summary = "Masculine Animate (Ma) takes Genitive endings (-a / -e). Inanimate & Neuter stay like Nominative.",
            detail = "When you act upon a living male person or animal (Ma), use Genitive form. For inanimate objects (Mi) and neuter nouns (N), Accusative equals Nominative form.",
            example = "Vidím dobrého studenta (Ma = G). Vidím nový banán (Mi = N). Vidím moderní auto (N = N)."
        ),
        GrammarRule(
            title = "Dative (3) & Locative (6) Overlap",
            summary = "Masculine and Neuter nouns frequently share identical endings (-ovi, -u, -i).",
            detail = "In both Dative and Locative, masculine animate nouns typically take -ovi (studentovi), neuter takes -u / -i. Feminine adjectives in Dative and Locative both end in -é / -í.",
            example = "Dativ: Dám to mému bratrovi. Lokál: Mluvím o mém bratrovi."
        ),
        GrammarRule(
            title = "Feminine Instrumental (Case 7)",
            summary = "Hard feminine nouns end in -ou (s kávou), while soft feminine nouns end in -í (s kanceláří).",
            detail = "Always check the dictionary ending: words ending in -a take -ou (sestra -> se sestrou, káva -> s kávou), words ending in a soft consonant take -í (kancelář -> s kanceláří, radost -> s radostí).",
            example = "Piju kávu s kamarádkou. Jsem spokojený s novou kanceláří."
        ),
        GrammarRule(
            title = "Instrumental: With 's/se' vs Bare Instrumental",
            summary = "Use 's/se' for accompaniment ('with someone/something'); use bare instrumental for means/transport/tools.",
            detail = "In English 'with' is used for both. In Czech: Accompaniment = s/se (Jdu tam s kamarádem). Tool/Transport = NO 's' (Jedu vlakem, píšu perem, jsem lékařem).",
            example = "Jedu autem (By car - no 's'). Jedu s bratrem (With brother - with 's')."
        )
    )

    val ALL_CASES: List<CaseInfo> = listOf(
        // 1. NOMINATIV
        CaseInfo(
            caseNumber = 1,
            shortCode = "N",
            czechName = "Nominativ (1. pád)",
            czechQuestion = "Kdo? Co?",
            englishQuestion = "Who? What?",
            meaningDescription = "Subject of the sentence. Base dictionary form.",
            englishAnalogy = "e.g., 'The student reads a book.' -> Student je podmět.",
            rows = listOf(
                DeclensionRow(
                    gender = GrammaticalGender.MA,
                    pronoun = "ten / můj",
                    adjective = "dobrý / kvalitní",
                    hardPattern = "student-∅ (pán)",
                    softPattern = "muž-∅, soudc-e",
                    note = "Basic subject form for male persons / living creatures."
                ),
                DeclensionRow(
                    gender = GrammaticalGender.MI,
                    pronoun = "ten / můj",
                    adjective = "dobrý / kvalitní",
                    hardPattern = "banán-∅ (hrad)",
                    softPattern = "čaj-∅ (stroj)",
                    note = "Inanimate objects like buildings, fruit, tools."
                ),
                DeclensionRow(
                    gender = GrammaticalGender.F,
                    pronoun = "ta / moje (má)",
                    adjective = "dobrá / kvalitní",
                    hardPattern = "káv-a (žena)",
                    softPattern = "kancelář-∅ (píseň), restaurac-e (růže)",
                    note = "Ends in -a (hard) or consonant / -e (soft)."
                ),
                DeclensionRow(
                    gender = GrammaticalGender.N,
                    pronoun = "to / moje (mé)",
                    adjective = "dobré / kvalitní",
                    hardPattern = "aut-o (město)",
                    softPattern = "moř-e (moře), náměst-í (stavení)",
                    note = "Neuter nouns usually end in -o, -e, or -í."
                )
            ),
            prepositions = emptyList(), // No prepositions for Nominative
            a2Verbs = listOf(
                A2VerbInfo("být", "to be", "Daily Life", "Petr je nový lékař.", "Petr is a new doctor."),
                A2VerbInfo("studovat", "to study", "Work & Study", "Tento zahraniční student studuje češtinu.", "This international student studies Czech."),
                A2VerbInfo("bydlet", "to live / reside", "Housing / Trvalý pobyt", "Moje rodina bydlí v Praze.", "My family lives in Prague.")
            ),
            specialRules = listOf(
                GrammarRule(
                    title = "Base Form for All Dictionaries",
                    summary = "Always start here to look up gender and root.",
                    detail = "Look at the ending in Nominative singular to determine the noun pattern (vzor).",
                    example = "pan Novák, nová práce, české pivo"
                )
            ),
            examples = listOf(
                GrammarExample("Nový student čte českou knihu.", "The new student reads a Czech book.", "Nový student", "Subject (Ma) in Nominative"),
                GrammarExample("Tato káva je velmi horká.", "This coffee is very hot.", "Tato káva", "Subject (F) in Nominative"),
                GrammarExample("České pivo je známé na celém světě.", "Czech beer is known worldwide.", "České pivo", "Subject (N) in Nominative")
            )
        ),

        // 2. GENITIV
        CaseInfo(
            caseNumber = 2,
            shortCode = "G",
            czechName = "Genitiv (2. pád)",
            czechQuestion = "Koho? Čeho?",
            englishQuestion = "Whose? Of/From what?",
            meaningDescription = "Possession, origin, absence, quantities & numbers (5+), after specific prepositions.",
            englishAnalogy = "English 'of', ''s', 'from', 'without'. Also with quantities: 5 studentů, litr mléka.",
            rows = listOf(
                DeclensionRow(
                    gender = GrammaticalGender.MA,
                    pronoun = "toho / mého",
                    adjective = "dobrého / kvalitního",
                    hardPattern = "student-a",
                    softPattern = "muž-e, soudc-e",
                    note = "Always -a for hard animate stems (pán -> pána)."
                ),
                DeclensionRow(
                    gender = GrammaticalGender.MI,
                    pronoun = "toho / mého",
                    adjective = "dobrého / kvalitního",
                    hardPattern = "banán-u / les-a",
                    softPattern = "čaj-e",
                    note = "Most hard inanimate take -u; some nature words take -a (lesa, ostrova)."
                ),
                DeclensionRow(
                    gender = GrammaticalGender.F,
                    pronoun = "té / mojí (mé)",
                    adjective = "dobré / kvalitní",
                    hardPattern = "káv-y",
                    softPattern = "kancelář-e, restaurac-e",
                    note = "Hard feminine replaces -a with -y. Soft takes -e."
                ),
                DeclensionRow(
                    gender = GrammaticalGender.N,
                    pronoun = "toho / mého",
                    adjective = "dobrého / kvalitního",
                    hardPattern = "aut-a",
                    softPattern = "moř-e, náměst-í",
                    note = "Hard neuter replaces -o with -a."
                )
            ),
            prepositions = listOf(
                PrepositionInfo("z / ze", "from / out of", "Jsem z České republiky / Jdu ze školy.", "I am from Czechia / I am leaving school."),
                PrepositionInfo("do", "to / into (direction)", "Jedu do práce / Jdu do lékárny.", "I am going to work / to the pharmacy."),
                PrepositionInfo("od", "from (a person / time)", "Dostal jsem dopis od lékaře.", "I received a letter from the doctor."),
                PrepositionInfo("bez", "without", "Prosím čaj bez cukru a bez mléka.", "Tea without sugar and without milk please."),
                PrepositionInfo("u", "at / by / near (location with person)", "Byl jsem u doktora / Bydlím u parku.", "I was at the doctor's / I live near the park."),
                PrepositionInfo("vedle", "next to", "Lékárna je vedle pošty.", "The pharmacy is next to the post office."),
                PrepositionInfo("během", "during", "Během víkendu budu doma.", "During the weekend I will be home.")
            ),
            a2Verbs = listOf(
                A2VerbInfo("bát se", "to be afraid of (+ G)", "Doctor / Emotion", "Bojím se zubaře.", "I am afraid of the dentist."),
                A2VerbInfo("ptát se / zeptat se", "to ask someone (+ G)", "OAMP / Office", "Zeptám se úředníka na trvalý pobyt.", "I will ask the clerk about permanent residence."),
                A2VerbInfo("účastnit se", "to take part in (+ G)", "Study / Exam", "Budu se účastnit zkoušky z češtiny.", "I will take part in the Czech exam."),
                A2VerbInfo("vážit si", "to respect / value (+ G)", "Formal", "Vážím si vaší pomoci.", "I appreciate your help.")
            ),
            specialRules = listOf(
                GrammarRule(
                    title = "Direction (DO + Genitive)",
                    summary = "When going into buildings, countries, cities, always use DO + Genitive.",
                    detail = "Jdu do obchodu (inanimate Mi -> -u), jedu do Prahy (F -> -y), jdu do divadla (N -> -a).",
                    example = "Jdu do práce (F), do kina (N), do nemocnice (F)."
                ),
                GrammarRule(
                    title = "Absence & Negation (Není tady...)",
                    summary = "When something/someone is not present, use Genitive.",
                    detail = "Petr tu je (Nom) -> Petr tu není (Gen: Petra). Nemám čas (Nom) -> Nemám nového auta (Gen).",
                    example = "Doktor tady dnes není. -> Není tady doktora."
                )
            ),
            examples = listOf(
                GrammarExample("Jedu do Prahy na zkoušku z češtiny.", "I am going to Prague for the Czech exam.", "do Prahy", "do + Feminine Genitive"),
                GrammarExample("Káva bez mléka a bez cukru, prosím.", "Coffee without milk and without sugar, please.", "bez mléka, bez cukru", "bez + Neuter & Masc Inanimate Genitive"),
                GrammarExample("Dopis od mého právníka už dorazil.", "The letter from my lawyer has already arrived.", "od mého právníka", "od + Masc Animate Genitive")
            )
        ),

        // 3. DATIV
        CaseInfo(
            caseNumber = 3,
            shortCode = "D",
            czechName = "Dativ (3. pád)",
            czechQuestion = "Komu? Čemu?",
            englishQuestion = "To/For whom? To what?",
            meaningDescription = "Indirect object. Direction towards, giving, benefiting or harming someone.",
            englishAnalogy = "English 'to' or 'for' someone: 'I give the book TO my brother.'",
            rows = listOf(
                DeclensionRow(
                    gender = GrammaticalGender.MA,
                    pronoun = "tomu / mému",
                    adjective = "dobrému / kvalitnímu",
                    hardPattern = "student-ovi / -u",
                    softPattern = "muž-i / -ovi",
                    note = "-ovi is standard in speech & writing; -u only for monosyllabic/chains."
                ),
                DeclensionRow(
                    gender = GrammaticalGender.MI,
                    pronoun = "tomu / mému",
                    adjective = "dobrému / kvalitnímu",
                    hardPattern = "banán-u",
                    softPattern = "čaj-i",
                    note = "Takes -u (hard) or -i (soft)."
                ),
                DeclensionRow(
                    gender = GrammaticalGender.F,
                    pronoun = "té / mojí (mé)",
                    adjective = "dobré / kvalitní",
                    hardPattern = "káv-ě * (matce, Praze)",
                    softPattern = "kancelář-i, restaurac-i",
                    note = "* Watch consonant alternation (K->C, H->Z, CH->Š, R->Ř) with -ě/-e!"
                ),
                DeclensionRow(
                    gender = GrammaticalGender.N,
                    pronoun = "tomu / mému",
                    adjective = "dobrému / kvalitnímu",
                    hardPattern = "aut-u",
                    softPattern = "moř-i, náměst-í",
                    note = "Takes -u (hard) or -i (soft)."
                )
            ),
            prepositions = listOf(
                PrepositionInfo("k / ke", "towards / to (a person or place)", "Jdu k lékaři / Jdeme k nádraží.", "I am going to the doctor / towards the station."),
                PrepositionInfo("díky", "thanks to", "Díky této aplikaci mluvím česky.", "Thanks to this app I speak Czech."),
                PrepositionInfo("proti", "against / opposite", "Jsem proti tomuto plánu / Lék proti bolesti.", "I am against this plan / Painkiller medicine."),
                PrepositionInfo("kvůli", "because of / due to", "Kvůli špatnému počasí vlak nejede.", "Due to bad weather the train isn't running.")
            ),
            a2Verbs = listOf(
                A2VerbInfo("pomáhat / pomoct", "to help (+ D)", "Daily / Emergency", "Můžete mi pomoct, prosím?", "Can you help me, please?"),
                A2VerbInfo("děkovat / poděkovat", "to thank (+ D)", "Polite Conversation", "Děkuji panu učiteli za lekci.", "I thank the teacher for the lesson."),
                A2VerbInfo("rozumět", "to understand (+ D)", "A2 Exam Requirement", "Rozumím českému úředníkovi.", "I understand the Czech clerk."),
                A2VerbInfo("telefonovat / volat", "to phone (+ D)", "Office & Medical", "Zítra budu telefonovat své doktorce.", "Tomorrow I will phone my doctor."),
                A2VerbInfo("líbit se", "to please / to like (+ D)", "Social & Shopping", "Tento byt se mi moc líbí.", "I really like this apartment (It pleases me)."),
                A2VerbInfo("chutnat", "to taste good to (+ D)", "Restaurant & Food", "České jídlo mi moc chutná.", "Czech food tastes great to me.")
            ),
            consonantAlternations = CONSONANT_ALTERNATIONS,
            specialRules = listOf(
                GrammarRule(
                    title = "Feminine Consonant Softening in Dative",
                    summary = "Hard stems before -ě soften: K->C, H->Z, CH->Š, R->Ř.",
                    detail = "matka -> matce, Praha -> Praze, moucha -> mouše, sestra -> sestře.",
                    example = "Dám dárek sestře (sestra -> sestře)."
                ),
                GrammarRule(
                    title = "Expressions of Feelings (Líbit se / Chutnat / Být zima)",
                    summary = "Subject in English becomes Dative pronoun in Czech.",
                    detail = "English: 'I like it' -> Czech: 'Líbí se MI to' (To me it is likable). 'I am cold' -> 'Je MI zima'.",
                    example = "Je mi špatně (I feel sick). Líbí se mu Praha."
                )
            ),
            examples = listOf(
                GrammarExample("Musím jít k zubaři kvůli bolesti zubu.", "I must go to the dentist due to toothache.", "k zubaři, kvůli bolesti", "k + Masc Animate Dative, kvůli + Fem Dative"),
                GrammarExample("Děkuji paní Novákové za pomoc s formulářem.", "I thank Mrs. Novak for the help with the form.", "paní Novákové", "Dative after děkovat"),
                GrammarExample("Tento svetr se mé kamarádce moc líbí.", "My friend likes this sweater very much.", "mé kamarádce", "Dative with líbit se (kamarádka -> kamarádce)")
            )
        ),

        // 4. AKUZATIV
        CaseInfo(
            caseNumber = 4,
            shortCode = "A",
            czechName = "Akuzativ (4. pád)",
            czechQuestion = "Koho? Co?",
            englishQuestion = "Whom? What?",
            meaningDescription = "Direct object of an action verb. Destination of motion with certain prepositions.",
            englishAnalogy = "The direct receiver of the action: 'I see a student', 'I buy coffee', 'I have a car'.",
            rows = listOf(
                DeclensionRow(
                    gender = GrammaticalGender.MA,
                    pronoun = "toho / mého (=G)",
                    adjective = "dobrého / kvalitního",
                    hardPattern = "student-a (=G)",
                    softPattern = "muž-e, soudc-e",
                    note = "CRITICAL: Masculine Animate takes Genitive forms (Vidím studenta, pána)."
                ),
                DeclensionRow(
                    gender = GrammaticalGender.MI,
                    pronoun = "ten / můj (=N)",
                    adjective = "dobrý / kvalitní",
                    hardPattern = "banán-∅ (=N)",
                    softPattern = "čaj-∅ (=N)",
                    note = "Masculine Inanimate stays identical to Nominative (Koupím banán, čaj)."
                ),
                DeclensionRow(
                    gender = GrammaticalGender.F,
                    pronoun = "tu / moji (mou)",
                    adjective = "dobrou / kvalitní",
                    hardPattern = "káv-u",
                    softPattern = "kancelář-∅ (=N), restaurac-i",
                    note = "Hard feminine -a changes to -u! (káva -> kávu, kniha -> knihu)."
                ),
                DeclensionRow(
                    gender = GrammaticalGender.N,
                    pronoun = "to / moje (=N)",
                    adjective = "dobré / kvalitní",
                    hardPattern = "aut-o (=N)",
                    softPattern = "moř-e (=N), náměst-í (=N)",
                    note = "Neuter nouns stay identical to Nominative (Vidím auto, moře)."
                )
            ),
            prepositions = listOf(
                PrepositionInfo("pro", "for (someone / purpose)", "Koupil jsem dárek pro kamaráda.", "I bought a gift for a friend."),
                PrepositionInfo("na", "onto / to (motion/event)", "Jdu na poštu / na úřad / na koncert.", "I am going to the post office / to the authority / to a concert."),
                PrepositionInfo("za", "behind / in (time duration) / for (exchange)", "Děkuji za zprávu / Koupil to za sto korun.", "Thank you for the message / Bought it for 100 CZK."),
                PrepositionInfo("přes", "across / over / despite", "Přejdeme přes ulici / Most přes řeku.", "We will cross over the street / Bridge over the river."),
                PrepositionInfo("o", "for / about (motion / contest / application)", "Žádám o trvalý pobyt v ČR.", "I am applying for permanent residence in CZ.")
            ),
            a2Verbs = listOf(
                A2VerbInfo("mít", "to have (+ A)", "Basic / Everyday", "Mám platný pas a průkaz pojištěnce.", "I have a valid passport and insurance card."),
                A2VerbInfo("vidět / znát", "to see / to know (+ A)", "Social / Work", "Vidím nového kolegu v kanceláři.", "I see the new colleague in the office."),
                A2VerbInfo("hledat / potřebovat", "to search / to need (+ A)", "Shopping & Office", "Hledám levný byt k pronájmu.", "I am looking for a cheap apartment to rent."),
                A2VerbInfo("koupit / zaplatit", "to buy / to pay for (+ A)", "Shopping / Market", "Chci koupit čerstvou zeleninu a chleba.", "I want to buy fresh vegetables and bread."),
                A2VerbInfo("žádat o", "to apply for (+ A)", "OAMP / Trvalý pobyt", "Žádám o trvalý pobyt v České republice.", "I am applying for permanent residence in the Czech Republic.")
            ),
            specialRules = listOf(
                GrammarRule(
                    title = "The Animacy Split in Accusative",
                    summary = "Ma = Genitive (-a/-e), Mi = Nominative (no change), N = Nominative (no change).",
                    detail = "This is the #1 mistake for English speakers! 'I see a man' -> 'Vidím muže / studenta'. 'I see a car' -> 'Vidím auto'. 'I see a table' -> 'Vidím stůl'.",
                    example = "Vidím svého bratra (Ma -> G). Vidím svůj stůl (Mi -> N)."
                ),
                GrammarRule(
                    title = "Motion with NA / V",
                    summary = "Static Location = Lokál (v/na + Case 6). Motion/Destination = Akuzativ (na/v + Case 4).",
                    detail = "Jsem na poště (Locative: where am I?). Jdu na poštu (Accusative: where am I heading?).",
                    example = "Kde jsi? Na úřadě (Loc). Kam jdeš? Na úřad (Acc)."
                )
            ),
            examples = listOf(
                GrammarExample("Hledám paní doktorku Svobodovou.", "I am looking for Dr. Svobodova.", "paní doktorku", "Accusative Feminine (-u)"),
                GrammarExample("Potřebuji nový rodný list pro úřad.", "I need a new birth certificate for the office.", "nový rodný list, pro úřad", "Accusative Inanimate (stays Nom)"),
                GrammarExample("Žádám o dlouhodobý nebo trvalý pobyt.", "I am applying for long-term or permanent residence.", "o dlouhodobý pobyt", "o + Accusative Masc Inanimate")
            )
        ),

        // 5. VOKATIV
        CaseInfo(
            caseNumber = 5,
            shortCode = "V",
            czechName = "Vokativ (5. pád)",
            czechQuestion = "Oslovujeme, voláme!",
            englishQuestion = "Addressing / Calling someone",
            meaningDescription = "Used exclusively when addressing people directly in speech or letters/emails.",
            englishAnalogy = "When you greet someone: 'Hello, Peter!' -> 'Dobrý den, Petře!'. 'Dear Mr. Novak' -> 'Vážený pane Nováku'.",
            rows = listOf(
                DeclensionRow(
                    gender = GrammaticalGender.MA,
                    pronoun = "— / můj",
                    adjective = "dobrý / kvalitní",
                    hardPattern = "student-e! Mark-u! pán-e!",
                    softPattern = "muž-i! soudc-e! učitel-i!",
                    note = "Hard stems end in -e (Petr -> Petře!) or -u for hard gutturals (Marek -> Marku!, pan -> pane!)."
                ),
                DeclensionRow(
                    gender = GrammaticalGender.MI,
                    pronoun = "— / —",
                    adjective = "—",
                    hardPattern = "—",
                    softPattern = "—",
                    note = "Inanimate nouns are not used in Vocative in standard daily communication."
                ),
                DeclensionRow(
                    gender = GrammaticalGender.F,
                    pronoun = "— / moje (má)",
                    adjective = "dobrá / kvalitní",
                    hardPattern = "studentk-o! Ev-o! paní-∅!",
                    softPattern = "kolegyn-ě! Mari-e!",
                    note = "Hard feminine -a changes to -o! (Eva -> Evo!, paní stays paní!)."
                ),
                DeclensionRow(
                    gender = GrammaticalGender.N,
                    pronoun = "— / —",
                    adjective = "—",
                    hardPattern = "—",
                    softPattern = "—",
                    note = "Neuter nouns are not addressed directly."
                )
            ),
            prepositions = emptyList(), // Vocative NEVER uses prepositions
            a2Verbs = listOf(
                A2VerbInfo("oslovit / pozdravit", "to address / greet", "Email & Social", "Dobrý den, pane Nováku!", "Hello, Mr. Novak!"),
                A2VerbInfo("napsat e-mail", "to write an email", "Formal Letter / OAMP", "Vážený pane doktore, píšu Vám...", "Dear Doctor, I am writing to you..."),
                A2VerbInfo("zavolat na někoho", "to call out to someone", "Daily Street", "Ahoj Martine! Pojď sem!", "Hi Martin! Come here!")
            ),
            specialRules = listOf(
                GrammarRule(
                    title = "Formal Email & Letter Salutation",
                    summary = "Always decline both Title and Surname in Vocative!",
                    detail = "Vážený pane (pán -> pane) Nováku (Novák -> Nováku), Vážená paní (paní -> paní) Dvořáková (surname stays in Fem Nom/Voc).",
                    example = "Vážený pane řediteli, Vážená paní doktorko."
                ),
                GrammarRule(
                    title = "First Name Addressing",
                    summary = "Masc names end in -e (Tomáš -> Tomáši, Jan -> Jane, Petr -> Petře) or -u (Honza -> Honzo, David -> Davide/Davidu). Fem names in -a end in -o (Anna -> Anno, Lucie -> Lucie).",
                    detail = "In Czech culture, calling someone by their bare Nominative name without Vocative sounds robotic or uneducated.",
                    example = "Ahoj Petře! Čau Lucie! Dobrý den, pane profesore!"
                )
            ),
            examples = listOf(
                GrammarExample("Dobrý den, pane doktore, mám velkou horečku.", "Hello Doctor, I have a high fever.", "pane doktore", "Vocative form of pan doktor"),
                GrammarExample("Vážená paní ředitelko, posílám požadované dokumenty.", "Dear Madam Director, I am sending the required documents.", "paní ředitelko", "Vocative form of paní ředitelka"),
                GrammarExample("Ahoj Davide, jak se máš?", "Hi David, how are you?", "Davide", "Vocative of David")
            )
        ),

        // 6. LOKÁL
        CaseInfo(
            caseNumber = 6,
            shortCode = "L",
            czechName = "Lokál (6. pád)",
            czechQuestion = "O kom? O čem? (Kde?)",
            englishQuestion = "About whom/what? Where?",
            meaningDescription = "Static location or topic of discussion. ALWAYS REQUIRES A PREPOSITION!",
            englishAnalogy = "Where are you? 'In the bank' -> 'v bance'. What are you talking about? 'About work' -> 'o práci'.",
            rows = listOf(
                DeclensionRow(
                    gender = GrammaticalGender.MA,
                    pronoun = "tom / mém (mým)",
                    adjective = "dobrém / kvalitním",
                    hardPattern = "student-ovi / -u",
                    softPattern = "muž-i / -ovi, soudc-i",
                    note = "Always used with prep: o studentovi, o dobrém muži."
                ),
                DeclensionRow(
                    gender = GrammaticalGender.MI,
                    pronoun = "tom / mém (mým)",
                    adjective = "dobrém / kvalitním",
                    hardPattern = "banán-u / -ě (hradě, stole)",
                    softPattern = "čaj-i (stroj-i)",
                    note = "Hard inanimate takes -u or -e/-ě depending on stem ending."
                ),
                DeclensionRow(
                    gender = GrammaticalGender.F,
                    pronoun = "té / mojí (mé)",
                    adjective = "dobré / kvalitní",
                    hardPattern = "káv-ě * (v Praze, o matce)",
                    softPattern = "kancelář-i, restaurac-i",
                    note = "* Consonant alternations K->C, H->Z, CH->Š, R->Ř before -ě!"
                ),
                DeclensionRow(
                    gender = GrammaticalGender.N,
                    pronoun = "tom / mém (mým)",
                    adjective = "dobrém / kvalitním",
                    hardPattern = "aut-u / -ě (městě)",
                    softPattern = "moř-i, náměst-í",
                    note = "Hard takes -u or -ě (v autě, na letišti, na moři)."
                )
            ),
            prepositions = listOf(
                PrepositionInfo("v / ve", "in / inside (static location)", "Bydlím v Praze / Jsem v práci.", "I live in Prague / I am at work."),
                PrepositionInfo("na", "on / at (islands, squares, institutions)", "Jsem na nádraží / na poště / na úřadě.", "I am at the train station / post office / authority office."),
                PrepositionInfo("o", "about (topic of speech/thought)", "Mluvíme o zkoušce z češtiny.", "We are talking about the Czech exam."),
                PrepositionInfo("po", "after (time) / along (movement)", "Po práci půjdu nakoupit / Procházka po městě.", "After work I will go shopping / A walk around the town."),
                PrepositionInfo("při", "during / in the course of", "Při nehodě se nikdo nezranil.", "Nobody was injured during the accident.")
            ),
            a2Verbs = listOf(
                A2VerbInfo("mluvit o", "to speak about (+ L)", "Exam & Social", "Mluvíme o životě v České republice.", "We are speaking about life in the Czech Republic."),
                A2VerbInfo("přemýšlet o", "to think about (+ L)", "Daily Decisions", "Přemýšlím o novém zaměstnání.", "I am thinking about a new job."),
                A2VerbInfo("vědět o", "to know about (+ L)", "Office & Info", "Víte o tomto pravidle?", "Do you know about this rule?"),
                A2VerbInfo("bydlet v / na", "to reside in / on (+ L)", "Housing / Trvalý pobyt", "Bydlím v moderním bytě na okraji města.", "I live in a modern apartment on the edge of town."),
                A2VerbInfo("pracovat v / na", "to work at (+ L)", "Employment", "Pracuji v mezinárodní firmě.", "I work in an international company.")
            ),
            consonantAlternations = CONSONANT_ALTERNATIONS,
            specialRules = listOf(
                GrammarRule(
                    title = "Locative ALWAYS Needs a Preposition",
                    summary = "Never use Locative standalone! Must have: v, na, o, po, při.",
                    detail = "Unlike other cases that can be direct objects without prepositions, Locative exists purely following its designated prepositions.",
                    example = "Bydlím v Brně (NOT: Bydlím Brně). Jsem na poště."
                ),
                GrammarRule(
                    title = "V vs NA for Location",
                    summary = "V = enclosed buildings/cities/countries. NA = open areas, stations, post office, island, floor.",
                    detail = "v Praze, v nemocnici, v obchodě VS na nádraží, na poště, na úřadě, na náměstí.",
                    example = "Jsem v bance (enclosed building). Jsem na úřadě (official institution)."
                )
            ),
            examples = listOf(
                GrammarExample("Bydlím v České republice už pět let.", "I have lived in the Czech Republic for five years already.", "v České republice", "v + Feminine Locative"),
                GrammarExample("Sejdeme se na hlavním nádraží v deset hodin.", "We will meet at the main train station at 10 o'clock.", "na hlavním nádraží", "na + Neuter Locative"),
                GrammarExample("Četl jsem článek o nové české gramatice.", "I read an article about new Czech grammar.", "o nové české gramatice", "o + Feminine Locative (gramatika -> gramatice)")
            )
        ),

        // 7. INSTRUMENTÁL
        CaseInfo(
            caseNumber = 7,
            shortCode = "I",
            czechName = "Instrumentál (7. pád)",
            czechQuestion = "Kým? Čím? (S kým? S čím?)",
            englishQuestion = "With/By whom? With/By what?",
            meaningDescription = "Means, instrument, transport, profession predicate, accompaniment ('with').",
            englishAnalogy = "Means: 'by train' (vlakem), 'by pen' (perem). Profession: 'I am a doctor' (jsem lékařem). Accompaniment: 'with family' (s rodinou).",
            rows = listOf(
                DeclensionRow(
                    gender = GrammaticalGender.MA,
                    pronoun = "tím / mým",
                    adjective = "dobrým / kvalitním",
                    hardPattern = "student-em",
                    softPattern = "muž-em, soudc-em",
                    note = "Always ends in -em (s panem Novákem, se studentem)."
                ),
                DeclensionRow(
                    gender = GrammaticalGender.MI,
                    pronoun = "tím / mým",
                    adjective = "dobrým / kvalitním",
                    hardPattern = "banán-em (stolem)",
                    softPattern = "čaj-em (strojem)",
                    note = "Ends in -em (vlakem, autobusem, perem)."
                ),
                DeclensionRow(
                    gender = GrammaticalGender.F,
                    pronoun = "tou / mojí (mou)",
                    adjective = "dobrou / kvalitní",
                    hardPattern = "káv-ou (ženou, sestrou)",
                    softPattern = "kancelář-í (písní), restaurac-í (růží)",
                    note = "Hard feminine ends in -ou! Soft feminine ends in -í!"
                ),
                DeclensionRow(
                    gender = GrammaticalGender.N,
                    pronoun = "tím / mým",
                    adjective = "dobrým / kvalitním",
                    hardPattern = "aut-em (městem)",
                    softPattern = "moř-em, náměst-ím",
                    note = "Ends in -em (autem, letadlem) or -ím (náměstím)."
                )
            ),
            prepositions = listOf(
                PrepositionInfo("s / se", "with (accompaniment / together)", "Půjdu na procházku s manželkou.", "I will go for a walk with my wife."),
                PrepositionInfo("za", "behind / in back of (location)", "Auto stojí za domem.", "The car is standing behind the house."),
                PrepositionInfo("pod", "under / underneath", "Pes leží pod stolem.", "The dog is lying under the table."),
                PrepositionInfo("nad", "above / over", "Lampa visí nad stolem.", "The lamp is hanging above the table."),
                PrepositionInfo("před", "in front of / ago", "Čekám na tebe před poštou / Před týdnem.", "I am waiting for you in front of the post office / A week ago."),
                PrepositionInfo("mezi", "between / among", "Nemocnice je mezi školou a parkem.", "The hospital is between the school and the park.")
            ),
            a2Verbs = listOf(
                A2VerbInfo("být / stát se", "to be / become (+ I profession)", "Work & Status", "Můj bratr je úspěšným inženýrem.", "My brother is a successful engineer."),
                A2VerbInfo("zabývat se", "to deal with / be engaged in (+ I)", "Business & Office", "Naše firma se zabývá informatikou.", "Our company deals with IT."),
                A2VerbInfo("jezdit / jet", "to travel by (+ I vehicle)", "Transport / Doprava", "Do práce obvykle jezdím tramvají nebo metrem.", "To work I usually travel by tram or metro."),
                A2VerbInfo("mluvit s / setkat se s", "to speak with / meet with (+ I)", "Social & Work", "Zítra se setkám s novým ředitelem.", "Tomorrow I will meet with the new director."),
                A2VerbInfo("souhlasit s", "to agree with (+ I)", "Formal & Daily", "Naprosto souhlasím s vaším návrhem.", "I completely agree with your proposal.")
            ),
            specialRules = listOf(
                GrammarRule(
                    title = "Bare Instrumental for Transport & Tools",
                    summary = "DO NOT use 's' when talking about vehicles or tools!",
                    detail = "In English we say 'I go by bus' or 'I write with a pen'. In Czech, do NOT use 's': 'Jedu autobusem' (NOT 's autobusem' which means the bus is walking with you!).",
                    example = "Jedu autem (By car). Píšu perem (With a pen). Jdu se psem (With a dog - accompaniment, uses 's')."
                ),
                GrammarRule(
                    title = "Profession Predicate (Být + Instrumental)",
                    summary = "When stating what someone is professionally, use Instrumental.",
                    detail = "Jsem učitelem (I am a teacher). Stal se lékařem (He became a doctor).",
                    example = "Pan Svoboda je dobrým právníkem."
                )
            ),
            examples = listOf(
                GrammarExample("Do práce jezdím každý den metrem a autobusem.", "I travel to work every day by metro and bus.", "metrem a autobusem", "Bare Instrumental for vehicles"),
                GrammarExample("Na víkend jedeme na hory s celou rodinou.", "For the weekend we are going to the mountains with the whole family.", "s celou rodinou", "s + Feminine Instrumental (-ou)"),
                GrammarExample("Před úřadem je velké parkoviště pro auta.", "In front of the office there is a large parking lot for cars.", "Před úřadem", "Před + Masc Inanimate Instrumental (-em)")
            )
        )
    )

    val EXERCISE_QUESTIONS: List<ExerciseQuestion> = listOf(
        // CASE 1 - NOMINATIVE
        ExerciseQuestion(
            id = "n_1",
            caseNumber = 1,
            gender = GrammaticalGender.MA,
            examTopic = "Work & Study",
            promptEnglish = "Choose the correct subject form: 'The new student reads.'",
            sentenceCzechPrompt = "___ student čte novou knihu.",
            options = listOf("Nový", "Nového", "Novém", "Novým"),
            correctIndex = 0,
            fullCorrectCzechSentence = "Nový student čte novou knihu.",
            explanation = "Nominative singular for Masculine Animate adjective takes the hard ending '-ý' (dobrý -> nový).",
            ruleBadge = "1. Nominativ - Ma Adjektivum"
        ),
        ExerciseQuestion(
            id = "n_2",
            caseNumber = 1,
            gender = GrammaticalGender.F,
            examTopic = "Housing / Bydlení",
            promptEnglish = "Select the correct feminine subject: 'My mother lives in Brno.'",
            sentenceCzechPrompt = "Moje ___ bydlí v Brně.",
            options = listOf("matce", "matku", "matka", "matkou"),
            correctIndex = 2,
            fullCorrectCzechSentence = "Moje matka bydlí v Brně.",
            explanation = "Subject of the sentence requires Nominative singular feminine ending '-a' (matka).",
            ruleBadge = "1. Nominativ - F Podstatné jméno"
        ),

        // CASE 2 - GENITIVE
        ExerciseQuestion(
            id = "g_1",
            caseNumber = 2,
            gender = GrammaticalGender.F,
            examTopic = "Doctor & Health / Zdraví",
            promptEnglish = "Fill in the correct form after 'do': 'I am going to the pharmacy.'",
            sentenceCzechPrompt = "Musím jít do ___ pro léky.",
            options = listOf("lékárna", "lékárně", "lékárny", "lékárnu"),
            correctIndex = 2,
            fullCorrectCzechSentence = "Musím jít do lékárny pro léky.",
            explanation = "The preposition 'do' always requires Genitive (Case 2). Hard feminine nouns change '-a' to '-y' (lékárna -> lékárny).",
            ruleBadge = "2. Genitiv - Předložka DO + F"
        ),
        ExerciseQuestion(
            id = "g_2",
            caseNumber = 2,
            gender = GrammaticalGender.MI,
            examTopic = "Shopping / Obchod",
            promptEnglish = "Choose the form after 'bez': 'Coffee without sugar, please.'",
            sentenceCzechPrompt = "Dám si kávu bez ___.",
            options = listOf("cukru", "cukr", "cukrem", "cukře"),
            correctIndex = 0,
            fullCorrectCzechSentence = "Dám si kávu bez cukru.",
            explanation = "'Bez' (without) requires Genitive. Masculine inanimate hard noun 'cukr' takes the ending '-u' (bez cukru).",
            ruleBadge = "2. Genitiv - Předložka BEZ + Mi"
        ),
        ExerciseQuestion(
            id = "g_3",
            caseNumber = 2,
            gender = GrammaticalGender.MA,
            examTopic = "Doctor & Health / Zdraví",
            promptEnglish = "Complete with verb 'bát se': 'I am afraid of the doctor.'",
            sentenceCzechPrompt = "Bojím se toho nového ___.",
            options = listOf("doktor", "doktorovi", "doktora", "doktorem"),
            correctIndex = 2,
            fullCorrectCzechSentence = "Bojím se toho nového doktora.",
            explanation = "The reflex verb 'bát se' governs Genitive. Masculine animate hard noun 'doktor' takes '-a' (toho nového doktora).",
            ruleBadge = "2. Genitiv - Sloveso BÁT SE + Ma"
        ),
        ExerciseQuestion(
            id = "g_4",
            caseNumber = 2,
            gender = GrammaticalGender.N,
            examTopic = "Travel / Cestování",
            promptEnglish = "Direction to a city: 'We are going into the center (centrum / město).'",
            sentenceCzechPrompt = "Jdeme do ___ na večeři.",
            options = listOf("město", "městu", "městě", "města"),
            correctIndex = 3,
            fullCorrectCzechSentence = "Jdeme do města na večeři.",
            explanation = "Neuter noun 'město' after 'do' takes Genitive ending '-a' (do města).",
            ruleBadge = "2. Genitiv - Neuter -a"
        ),

        // CASE 3 - DATIVE
        ExerciseQuestion(
            id = "d_1",
            caseNumber = 3,
            gender = GrammaticalGender.MA,
            examTopic = "Social & Politeness",
            promptEnglish = "Complete with verb 'děkovat': 'I thank the teacher (pan učitel).'",
            sentenceCzechPrompt = "Děkuji panu ___ za trpělivost.",
            options = listOf("učiteli", "učitelem", "učitele", "učitele"),
            correctIndex = 0,
            fullCorrectCzechSentence = "Děkuji panu učiteli za trpělivost.",
            explanation = "'Děkovat' takes Dative (Case 3). Soft masculine animate 'učitel' takes '-i' (panu učiteli).",
            ruleBadge = "3. Dativ - Sloveso DĚKOVAT"
        ),
        ExerciseQuestion(
            id = "d_2",
            caseNumber = 3,
            gender = GrammaticalGender.F,
            examTopic = "Consonant Alternation K->C",
            promptEnglish = "Give a gift to mother (matka): 'I give a flower to mother.'",
            sentenceCzechPrompt = "Dám květinu své ___.",
            options = listOf("matke", "matce", "matku", "matky"),
            correctIndex = 1,
            fullCorrectCzechSentence = "Dám květinu své matce.",
            explanation = "Hard feminine stem in -K softens to -C before Dative '-e': matka -> matce!",
            ruleBadge = "3. Dativ - Alternace K -> C"
        ),
        ExerciseQuestion(
            id = "d_3",
            caseNumber = 3,
            gender = GrammaticalGender.F,
            examTopic = "Consonant Alternation H->Z",
            promptEnglish = "Direction towards Prague: 'The train is approaching Prague.'",
            sentenceCzechPrompt = "Vlak se blíží k ___.",
            options = listOf("Praze", "Prahe", "Prahu", "Prahy"),
            correctIndex = 0,
            fullCorrectCzechSentence = "Vlak se blíží k Praze.",
            explanation = "Preposition 'k' takes Dative. Stem -H softens to -Z before '-e': Praha -> Praze!",
            ruleBadge = "3. Dativ - Alternace H -> Z"
        ),
        ExerciseQuestion(
            id = "d_4",
            caseNumber = 3,
            gender = null,
            examTopic = "Feelings & Food (Líbit se / Chutnat)",
            promptEnglish = "Say 'I like it / It pleases me': '___ se tento byt moc líbí.'",
            sentenceCzechPrompt = "___ se tento byt moc líbí.",
            options = listOf("Já", "Mě", "Mně (Mi)", "Se mnou"),
            correctIndex = 2,
            fullCorrectCzechSentence = "Mně (Mi) se tento byt moc líbí.",
            explanation = "Verbs 'líbit se' and 'chutnat' require Dative pronoun: 'Mi' / 'Mně' (to me).",
            ruleBadge = "3. Dativ - Zájmeno MI / MNĚ"
        ),

        // CASE 4 - ACCUSATIVE
        ExerciseQuestion(
            id = "a_1",
            caseNumber = 4,
            gender = GrammaticalGender.MA,
            examTopic = "Animacy Rule / Životnost",
            promptEnglish = "Accusative of Masculine Animate: 'I see a new doctor (lékař).'",
            sentenceCzechPrompt = "V ordinaci vidím nového ___.",
            options = listOf("lékař", "lékaře", "lékaři", "lékařem"),
            correctIndex = 1,
            fullCorrectCzechSentence = "V ordinaci vidím nového lékaře.",
            explanation = "Masculine Animate in Accusative takes Genitive form (-e for soft noun lékař): Vidím nového lékaře.",
            ruleBadge = "4. Akuzativ - Ma Životnost (= Genitiv)"
        ),
        ExerciseQuestion(
            id = "a_2",
            caseNumber = 4,
            gender = GrammaticalGender.MI,
            examTopic = "Inanimacy Rule / Neživotnost",
            promptEnglish = "Accusative of Inanimate: 'I need a new passport (pas).'",
            sentenceCzechPrompt = "Pro úřad potřebuji nový ___.",
            options = listOf("pasa", "pasu", "pas", "pasem"),
            correctIndex = 2,
            fullCorrectCzechSentence = "Pro úřad potřebuji nový pas.",
            explanation = "Masculine Inanimate objects in Accusative stay identical to Nominative (pas -> pas).",
            ruleBadge = "4. Akuzativ - Mi (= Nominativ)"
        ),
        ExerciseQuestion(
            id = "a_3",
            caseNumber = 4,
            gender = GrammaticalGender.F,
            examTopic = "Permanent Residence / OAMP",
            promptEnglish = "Applying for a card: 'I am applying for a permanent residence card (karta).'",
            sentenceCzechPrompt = "Žádám o novou pobytovou ___.",
            options = listOf("karta", "kartu", "kartě", "kartou"),
            correctIndex = 1,
            fullCorrectCzechSentence = "Žádám o novou pobytovou kartu.",
            explanation = "'Žádat o' requires Accusative. Feminine noun ending in -a changes to '-u' (karta -> kartu).",
            ruleBadge = "4. Akuzativ - F koncovka -U"
        ),

        // CASE 5 - VOCATIVE
        ExerciseQuestion(
            id = "v_1",
            caseNumber = 5,
            gender = GrammaticalGender.MA,
            examTopic = "OAMP / Doctor Formal Greeting",
            promptEnglish = "Address Mr. Novak formally: 'Hello, Mr. Novak!'",
            sentenceCzechPrompt = "Dobrý den, pane ___!",
            options = listOf("Novák", "Nováku", "Nováka", "Novákem"),
            correctIndex = 1,
            fullCorrectCzechSentence = "Dobrý den, pane Nováku!",
            explanation = "Vocative of masculine names ending in hard consonants (k, g, h, ch) takes '-u': pan Novák -> pane Nováku!",
            ruleBadge = "5. Vokativ - Oslovení -U"
        ),
        ExerciseQuestion(
            id = "v_2",
            caseNumber = 5,
            gender = GrammaticalGender.MA,
            examTopic = "First Name Greeting",
            promptEnglish = "Call Peter: 'Hi Peter, come here!'",
            sentenceCzechPrompt = "Ahoj ___, pojď dál!",
            options = listOf("Petr", "Petře", "Petra", "Petrovi"),
            correctIndex = 1,
            fullCorrectCzechSentence = "Ahoj Petře, pojď dál!",
            explanation = "Vocative of Petr softens '-r' to '-ře': Petr -> Petře!",
            ruleBadge = "5. Vokativ - Petr -> Petře"
        ),
        ExerciseQuestion(
            id = "v_3",
            caseNumber = 5,
            gender = GrammaticalGender.F,
            examTopic = "Addressing Women",
            promptEnglish = "Address Eva directly: 'Hello Eva!'",
            sentenceCzechPrompt = "Ahoj ___!",
            options = listOf("Eva", "Evo", "Evě", "Evu"),
            correctIndex = 1,
            fullCorrectCzechSentence = "Ahoj Evo!",
            explanation = "Feminine names ending in -a change to '-o' in Vocative: Eva -> Evo!",
            ruleBadge = "5. Vokativ - Ženská jména -O"
        ),

        // CASE 6 - LOCATIVE
        ExerciseQuestion(
            id = "l_1",
            caseNumber = 6,
            gender = GrammaticalGender.F,
            examTopic = "Housing & Residence",
            promptEnglish = "State your residence: 'I live in Prague.'",
            sentenceCzechPrompt = "Už tři roky bydlím v ___.",
            options = listOf("Praha", "Praze", "Prahu", "Prahou"),
            correctIndex = 1,
            fullCorrectCzechSentence = "Už tři roky bydlím v Praze.",
            explanation = "Preposition 'v' requires Locative (Case 6). Feminine stem -H softens to -Z before '-e': Praha -> Praze.",
            ruleBadge = "6. Lokál - Předložka V + Praha -> Praze"
        ),
        ExerciseQuestion(
            id = "l_2",
            caseNumber = 6,
            gender = GrammaticalGender.N,
            examTopic = "Public Transport / Doprava",
            promptEnglish = "Meeting location: 'We are at the train station (nádraží).'",
            sentenceCzechPrompt = "Čekám na tebe na hlavním ___.",
            options = listOf("nádraží", "nádražího", "nádražím", "nádraže"),
            correctIndex = 0,
            fullCorrectCzechSentence = "Čekám na tebe na hlavním nádraží.",
            explanation = "Soft neuter pattern 'stavení' (nádraží) keeps ending '-í' in Locative (na hlavním nádraží).",
            ruleBadge = "6. Lokál - Neuter -Í"
        ),
        ExerciseQuestion(
            id = "l_3",
            caseNumber = 6,
            gender = GrammaticalGender.F,
            examTopic = "Consonant Alternation R->Ř",
            promptEnglish = "Talk about sister: 'We were talking about my sister (sestra).'",
            sentenceCzechPrompt = "Mluvili jsme o mé starší ___.",
            options = listOf("sestře", "sestre", "sestru", "sestry"),
            correctIndex = 0,
            fullCorrectCzechSentence = "Mluvili jsme o mé starší sestře.",
            explanation = "Preposition 'o' requires Locative. Stem -R softens to -Ř before '-e': sestra -> sestře!",
            ruleBadge = "6. Lokál - Alternace R -> Ř"
        ),

        // CASE 7 - INSTRUMENTAL
        ExerciseQuestion(
            id = "i_1",
            caseNumber = 7,
            gender = GrammaticalGender.MI,
            examTopic = "Public Transport (No 's' rule)",
            promptEnglish = "Travel by vehicle: 'I go to work by bus (autobus).'",
            sentenceCzechPrompt = "Každý den jezdím do práce ___.",
            options = listOf("autobusem", "s autobusem", "autobusu", "autobuse"),
            correctIndex = 0,
            fullCorrectCzechSentence = "Každý den jezdím do práce autobusem.",
            explanation = "Means of transport use bare Instrumental WITHOUT preposition 's': jezdit autobusem.",
            ruleBadge = "7. Instrumentál - Dopravní prostředky bez S"
        ),
        ExerciseQuestion(
            id = "i_2",
            caseNumber = 7,
            gender = GrammaticalGender.F,
            examTopic = "Accompaniment with 's'",
            promptEnglish = "Accompaniment: 'I am going to the cinema with my wife (manželka).'",
            sentenceCzechPrompt = "Jdu do kina se svou ___.",
            options = listOf("manželkou", "manželce", "manželku", "manželky"),
            correctIndex = 0,
            fullCorrectCzechSentence = "Jdu do kina se svou manželkou.",
            explanation = "Accompaniment takes 's/se' + Instrumental. Hard feminine nouns ending in -a take '-ou' (manželka -> manželkou).",
            ruleBadge = "7. Instrumentál - F koncovka -OU"
        ),
        ExerciseQuestion(
            id = "i_3",
            caseNumber = 7,
            gender = GrammaticalGender.MA,
            examTopic = "Profession Predicate",
            promptEnglish = "State your profession: 'Petr is a doctor (lékař).'",
            sentenceCzechPrompt = "Petr je výborným ___.",
            options = listOf("lékař", "lékaře", "lékařem", "lékaři"),
            correctIndex = 2,
            fullCorrectCzechSentence = "Petr je výborným lékařem.",
            explanation = "Predicate profession with 'být' takes Instrumental: výborným lékařem (ending '-em').",
            ruleBadge = "7. Instrumentál - Profese s BÝT"
        ),
        ExerciseQuestion(
            id = "i_4",
            caseNumber = 7,
            gender = GrammaticalGender.F,
            examTopic = "Soft Feminine Ending -Í",
            promptEnglish = "Feminine soft pattern: 'I am satisfied with this office (kancelář).'",
            sentenceCzechPrompt = "Jsem spokojen s touto novou ___.",
            options = listOf("kanceláří", "kancelárou", "kanceláře", "kanceláři"),
            correctIndex = 0,
            fullCorrectCzechSentence = "Jsem spokojen s touto novou kanceláří.",
            explanation = "Soft feminine nouns (kancelář) take '-í' in Instrumental, unlike hard nouns which take '-ou'.",
            ruleBadge = "7. Instrumentál - Měkké F koncovka -Í"
        )
    )

    val CHECKLIST_ITEMS: List<ChecklistItem> = listOf(
        ChecklistItem(
            id = "chk_case_1",
            category = "Cases / Pády",
            title = "1. Nominativ (Subject)",
            description = "Mastered subject forms (ten dobrý student / ta dobrá káva / to dobré auto).",
            exampleCzech = "Nový student čte českou knihu.",
            caseNumber = 1
        ),
        ChecklistItem(
            id = "chk_case_2",
            category = "Cases / Pády",
            title = "2. Genitiv (Possession & Prepositions)",
            description = "Using prepositions z, do, od, bez, u, vedle and verbs bát se, ptát se.",
            exampleCzech = "Jdu do obchodu bez peněz.",
            caseNumber = 2
        ),
        ChecklistItem(
            id = "chk_case_3",
            category = "Cases / Pády",
            title = "3. Dativ (Indirect Object & k, díky)",
            description = "Direction k, verbs děkovat, pomáhat, líbit se, chutnat, and -ovi endings.",
            exampleCzech = "Děkuji panu učiteli za pomoc.",
            caseNumber = 3
        ),
        ChecklistItem(
            id = "chk_case_4",
            category = "Cases / Pády",
            title = "4. Akuzativ (Direct Object & Animacy)",
            description = "Knowing Ma takes Genitive (vidím studenta), while Mi and N stay Nominative.",
            exampleCzech = "Vidím nového kolegu a moderní auto.",
            caseNumber = 4
        ),
        ChecklistItem(
            id = "chk_case_5",
            category = "Cases / Pády",
            title = "5. Vokativ (Direct Addressing)",
            description = "Addressing people in emails and spoken greetings (pane Nováku, Petře, paní ředitelko).",
            exampleCzech = "Dobrý den, pane doktore!",
            caseNumber = 5
        ),
        ChecklistItem(
            id = "chk_case_6",
            category = "Cases / Pády",
            title = "6. Lokál (Location & Topic)",
            description = "Always using prepositions v, na, o, po and softening stems.",
            exampleCzech = "Bydlím v Praze a mluvím o práci.",
            caseNumber = 6
        ),
        ChecklistItem(
            id = "chk_case_7",
            category = "Cases / Pády",
            title = "7. Instrumentál (Means & Accompaniment)",
            description = "Bare instrumental for transport/tools (autem) and 's/se' for accompaniment.",
            exampleCzech = "Jedu vlakem s rodinou.",
            caseNumber = 7
        ),
        // Alternations
        ChecklistItem(
            id = "chk_alt_k",
            category = "Consonant Alternations",
            title = "Alternation K → C",
            description = "Softening K to C before -ě in Dative and Locative (matka → matce, ruka → ruce).",
            exampleCzech = "Koupil jsem dárek matce."
        ),
        ChecklistItem(
            id = "chk_alt_h",
            category = "Consonant Alternations",
            title = "Alternation H → Z",
            description = "Softening H to Z before -ě in Dative and Locative (Praha → Praze, noha → noze).",
            exampleCzech = "Bydlím v Praze."
        ),
        ChecklistItem(
            id = "chk_alt_ch",
            category = "Consonant Alternations",
            title = "Alternation CH → Š",
            description = "Softening CH to Š before -ě in Dative and Locative (moucha → mouše, střecha → střeše).",
            exampleCzech = "O mouše na stěně."
        ),
        ChecklistItem(
            id = "chk_alt_r",
            category = "Consonant Alternations",
            title = "Alternation R → Ř",
            description = "Softening R to Ř before -ě in Dative and Locative (sestra → sestře, hora → hoře).",
            exampleCzech = "Mluvím o mé sestře."
        ),
        // A2 Exam Topics
        ChecklistItem(
            id = "chk_exam_oamp",
            category = "A2 Trvalý Pobyt Exam Scenarios",
            title = "Immigration & OAMP Interactions",
            description = "Applying for residence, submitting documents, asking clerks (žádat o trvalý pobyt, ptát se úředníka).",
            exampleCzech = "Žádám o trvalý pobyt a mám všechny dokumenty."
        ),
        ChecklistItem(
            id = "chk_exam_doctor",
            category = "A2 Trvalý Pobyt Exam Scenarios",
            title = "Doctor Visit & Pharmacy",
            description = "Describing symptoms, going to the doctor (jít k lékaři, bolet, lék proti bolesti).",
            exampleCzech = "Bolí mě hlava, musím jít k lékaři."
        ),
        ChecklistItem(
            id = "chk_exam_transport",
            category = "A2 Trvalý Pobyt Exam Scenarios",
            title = "Public Transport & Directions",
            description = "Buying tickets, asking for train/bus schedules (jet metrem, na nádraží, přestupovat).",
            exampleCzech = "Jedu tramvají číslo devět na Václavské náměstí."
        ),
        ChecklistItem(
            id = "chk_exam_shopping",
            category = "A2 Trvalý Pobyt Exam Scenarios",
            title = "Shopping & Restaurant",
            description = "Ordering food, asking for sizes and prices (dám si kávu, kilo jablek, platit kartou).",
            exampleCzech = "Dám si jedno pivo a hovězí guláš s knedlíkem."
        )
    )

    val PRONUNCIATION_SOUNDS = listOf(
        PronunciationGuide(
            letter = "Ř / ř",
            name = "Voiced / Voiceless Alveolar Fricative Trill",
            guideEnglish = "Unique Czech sound! Pronounce 'r' and 'zh' (like 's' in 'measure') simultaneously with tongue vibrating against the ridge.",
            examples = listOf("dvořák", "tři", "čtyři", "lékař", "moře", "příroda", "řízek")
        ),
        PronunciationGuide(
            letter = "Ě / ě",
            name = "Softening E",
            guideEnglish = "Changes the preceding consonant: bě [bje], pě [pje], vě [vje], mě [mňe], dě [ďe], tě [ťe], ně [ňe].",
            examples = listOf("město [mňesto]", "děti [ďeťi]", "v Praze [v praze]", "pět [pjet]", "oběd [objed]")
        ),
        PronunciationGuide(
            letter = "Č, Š, Ž",
            name = "Hushing Sibilants",
            guideEnglish = "Č = 'ch' in 'chair', Š = 'sh' in 'shoe', Ž = 's' in 'measure' / 'vision'.",
            examples = listOf("čeština", "škola", "život", "nádraží", "pošta", "čaj")
        ),
        PronunciationGuide(
            letter = "Ď, Ť, Ň",
            name = "Palatal Consonants",
            guideEnglish = "Ď = soft d (like 'd' in 'duty'), Ť = soft t (like 't' in 'tune'), Ň = soft n (like 'ny' in 'canyon' or Spanish 'ñ').",
            examples = listOf("děkuji", "chuť", "skříň", "paměť", "den", "tělo")
        ),
        PronunciationGuide(
            letter = "Á, É, Í/Ý, Ó, Ú/Ů",
            name = "Long Vowels (Čárka & Kroužek)",
            guideEnglish = "Vowels with an acute accent or ring are pronounced approximately twice as long as short vowels without changing pitch.",
            examples = listOf("dobrý", "káva", "krásný", "domů", "lékárna", "bílý")
        ),
        PronunciationGuide(
            letter = "OU",
            name = "Czech Diphthong",
            guideEnglish = "Smoothly glide from 'o' to 'u' (similar to English 'oh' or 'go'). Crucial for Feminine Instrumental ending (-ou).",
            examples = listOf("s kávou", "sestrou", "dobrou", "moukou", "hlavou")
        )
    )
}

data class PronunciationGuide(
    val letter: String,
    val name: String,
    val guideEnglish: String,
    val examples: List<String>
)
