/* Editable content. Facts come from the previous website (archive snapshot of 2024-09-06) unless marked.
   Malayalam text (ml) is a DRAFT and must be reviewed by a native speaker before launch.
   Images: <image> is the base path without extension; files are <image>-<width>.avif and .webp (see CLAUDE.md, "Images"). */
window.PRS_CONTENT = {
  facts: [
    { value: "11 storeys", text: "Basement and ground-floor car parking" },
    { value: "25 apartments", text: "On the 9 floors above the ground floor" },
    { value: "300 m", text: "From Mahatma Gandhi Road, near Kunnumpuram Junction (Old GPO)" },
    { value: "City centre", text: "Walkable to the Secretariat, AG's office and GPO; close to the Old Collectorate" }
  ],

  /* Facilities listed on the previous website; "lifts" is visible in the lobby photo. */
  facilities: [
    { title: "Fitness centre", ml: "ഫിറ്റ്നസ് സെന്റർ", text: "Treadmill, multi-gym, bench and exercise bike.",
      image: "assets/img/fitness-centre", widths: [480, 750], w: 750, h: 606, alt: "Fitness centre with a treadmill, multi-gym, bench and exercise bike on a wooden floor." },
    { title: "Entrance lobby and lifts", ml: "ലോബിയും ലിഫ്റ്റും", text: "Main entrance lobby on the ground floor, with lifts and a fire safety notice.",
      image: "assets/img/lift-lobby", widths: [480, 750], w: 750, h: 813, alt: "Lift lobby with two lift doors and a fire safety cabinet and notice on the wall." },
    { title: "Car parking", ml: "കാർ പാർക്കിംഗ്", text: "Parking in the basement and on the ground floor." },
    { title: "Association room", ml: "അസോസിയേഷൻ റൂം", text: "A common room for the owners' association." },
    { title: "Intercom and security alert", ml: "ഇന്റർകോം, സുരക്ഷ", text: "Intercom facility and a security alert system." },
    { title: "Children's park and landscaped yards", ml: "കുട്ടികളുടെ പാർക്ക്", text: "A children's park and landscaped open yards." }
  ],

  /* Places named on the previous website, plus places added by the site owner. No distances in kilometres are shown (TO CONFIRM).
     Optional note: a short phrase shown under the place name, for example "Walkable distance". */
  nearby: [
    { place: "Government Secretariat", note: "Walkable distance", ml: "ഗവൺമെന്റ് സെക്രട്ടേറിയറ്റ്" },
    { place: "Accountant General's (AG's) Office", note: "Walkable distance", ml: "അക്കൗണ്ടന്റ് ജനറലിന്റെ (എ.ജി.) ഓഫീസ്" },
    { place: "General Post Office (GPO)", note: "Walkable distance", ml: "ജനറൽ പോസ്റ്റ് ഓഫീസ് (ജി.പി.ഒ.)" },
    { place: "Old Collectorate and District Court", ml: "പഴയ കളക്ടറേറ്റ്, ജില്ലാ കോടതി" },
    { place: "Railway station", ml: "റെയിൽവേ സ്റ്റേഷൻ" },
    { place: "Central bus station", ml: "സെൻട്രൽ ബസ് സ്റ്റേഷൻ" },
    { place: "Ayurveda College and Hospital", ml: "ആയുർവേദ കോളേജും ആശുപത്രിയും" },
    { place: "Trivandrum International Airport", ml: "തിരുവനന്തപുരം അന്താരാഷ്ട്ര വിമാനത്താവളം" },
    { place: "Zephyr Entrance Coaching Centre", ml: "സെഫിർ എൻട്രൻസ് കോച്ചിംഗ് സെന്റർ" },
    { place: "Remya and Dhanya cinema houses", ml: "രമ്യ, ധന്യ തിയേറ്ററുകൾ" }
  ],

  gallery: [
    { image: "assets/img/building-hero", widths: [480, 896], w: 896, h: 1200, caption: "The building from the street",
      alt: "PRS Shangrila apartment building seen from the street, with its name on a tall white panel under a blue sky." },
    { image: "assets/img/building-facade", widths: [480, 750], w: 750, h: 1235, caption: "The front of the building",
      alt: "Front of the PRS Shangrila building looking up, with the name on a tall white panel between balconies." },
    { image: "assets/img/entrance-porch", widths: [480, 750], w: 750, h: 606, caption: "Entrance porch",
      alt: "Entrance porch with wooden pillars and steps leading to the ground-floor lobby of PRS Shangrila." },
    { image: "assets/img/entrance-gate", widths: [480, 750], w: 750, h: 813, caption: "The gate on the approach road",
      alt: "Entrance gate and name board of PRS Shangrila beside the approach road." },
    { image: "assets/img/surroundings-1", widths: [480, 750], w: 750, h: 813, caption: "The street outside, with coconut palms",
      alt: "View from the balcony of a quiet street lined with coconut palms and houses." },
    { image: "assets/img/surroundings-2", widths: [480, 750], w: 750, h: 813, caption: "A tree-lined street nearby",
      alt: "View from the balcony of a tree-lined street beside the compound wall." }
  ],

  /* Current vacancies. Leave items empty when nothing is available; set asOf to the date you last checked.
     Each item: { unit, floor, bedrooms, area, rent, note }  (add only facts you have confirmed). */
  vacancies: { asOf: "", items: [] },

  /* Notices for residents and tenants, newest first. Each item: { date, title, text }. */
  notices: [],

  faq: [
    { q: "Where is PRS Shangrila?", ml: "PRS Shangrila എവിടെയാണ്?",
      a: "On Ambujavilasam Road, Kunnumpuram, Vanchiyoor, Thiruvananthapuram, about 300 metres from Mahatma Gandhi Road. As you go from Pulimood Junction (GPO) towards Vanchiyoor, it is near Kunnumpuram Junction (Old GPO).",
      mla: "വഞ്ചിയൂർ കുന്നുംപുറത്ത്, മഹാത്മാഗാന്ധി റോഡിൽനിന്ന് ഏകദേശം 300 മീറ്റർ അകലെ." },
    { q: "How many apartments are there?", ml: "എത്ര അപ്പാർട്ട്മെന്റുകളുണ്ട്?",
      a: "PRS Shangrila is an 11-storey building with 25 apartments on the 9 floors above the ground floor.",
      mla: "9 നിലകളിലായി 25 അപ്പാർട്ട്മെന്റുകൾ." },
    { q: "Is car parking available?", ml: "കാർ പാർക്കിംഗ് ഉണ്ടോ?",
      a: "Yes. There is car parking in the basement and on the ground floor. Please ask about parking for your apartment when you enquire.",
      mla: "ബേസ്‌മെന്റിലും ഗ്രൗണ്ട് ഫ്ലോറിലും കാർ പാർക്കിംഗ് ഉണ്ട്." },
    { q: "Can brokers enquire for a client?", ml: "ബ്രോക്കർമാർ വഴി അന്വേഷിക്കാമോ?",
      a: "No. We do not deal with brokers. Please contact us directly by phone or WhatsApp.",
      mla: "ഇല്ല. ദയവായി നേരിട്ട് ബന്ധപ്പെടുക." },
    { q: "Can I enquire from outside India?", ml: "വിദേശത്തുനിന്ന് അന്വേഷിക്കാമോ?",
      a: "Yes. WhatsApp is the easiest way. Our time zone is Indian Standard Time (UTC+5:30). Include your country code and the dates you are planning to move.",
      mla: "അതെ. വാട്സ്ആപ്പ് വഴി ബന്ധപ്പെടാം. ഇന്ത്യൻ സമയം (IST) ആണ് ഞങ്ങളുടേത്." },
    { q: "How do I find out which apartments are vacant?", ml: "ഏതൊക്കെ അപ്പാർട്ട്മെന്റുകൾ ഒഴിവുണ്ട്?",
      a: "The availability section on the Rent an apartment page lists current vacancies. Availability changes often, so please call or send a WhatsApp message to check.",
      mla: "ഒഴിവുകൾ അറിയാൻ വിളിക്കുകയോ വാട്സ്ആപ്പ് ചെയ്യുകയോ ചെയ്യുക." }
  ]
};
