export interface WordEntry {
  word: string;
  wordRoman?: string; // For Roman script words
  meaning: string;
  meaning_en: string;
  etymology: string;
  etymology_en: string;
  example?: string;
  example_en?: string;
}

// Dictionary of words with meanings and etymology
// This can be expanded with more words
export const wordDictionary: WordEntry[] = [
  {
    word: 'कल',
    wordRoman: 'kal',
    meaning: 'बीता हुआ समय; गत दिवस; पिछला दिन या आने वाला दिन',
    meaning_en: 'Yesterday or tomorrow; past or future time',
    etymology: 'संस्कृत "कल्य" से व्युत्पन्न, जिसका अर्थ है "समय"',
    etymology_en: 'Derived from Sanskrit "kalya", meaning "time"',
    example: 'कल रात को मच्छर ने काटा',
    example_en: 'The mosquito bit me last night'
  },
  {
    word: 'रात',
    wordRoman: 'raat',
    meaning: 'सूर्यास्त के बाद से सूर्योदय तक का समय',
    meaning_en: 'The period from sunset to sunrise; night',
    etymology: 'संस्कृत "रात्रि" से, जिसका अर्थ है "रात"',
    etymology_en: 'From Sanskrit "ratri", meaning "night"',
    example: 'रात में तारे दिखते हैं',
    example_en: 'Stars appear at night'
  },
  {
    word: 'मच्छर',
    wordRoman: 'machchar',
    meaning: 'एक छोटा कीट जो रक्त चूसता है',
    meaning_en: 'A small insect that sucks blood; mosquito',
    etymology: 'हिंदी में उर्दू/फ़ारसी "मश" से, जिसका अर्थ है "फुलाना"',
    etymology_en: 'From Urdu/Persian "mash", related to "to blow" or "to bite"',
    example: 'मच्छर के काटने से खुजली होती है',
    example_en: 'Mosquito bites cause itching'
  },
  {
    word: 'काटने',
    wordRoman: 'kaatne',
    meaning: 'दांतों या नुकीले अंग से चोट पहुंचाना',
    meaning_en: 'To bite or sting; to cut with teeth or sharp instrument',
    etymology: 'संस्कृत "कर्त" (काटना) से',
    etymology_en: 'From Sanskrit "kart" (to cut)',
    example: 'मच्छर काटता है',
    example_en: 'The mosquito bites'
  },
  {
    word: 'सच्चा',
    wordRoman: 'sachcha',
    meaning: 'वास्तविक, सत्य, असली',
    meaning_en: 'True, real, genuine, authentic',
    etymology: 'संस्कृत "सत्य" से, जिसका अर्थ है "सच"',
    etymology_en: 'From Sanskrit "satya", meaning "truth"',
    example: 'सच्चा दोस्त',
    example_en: 'True friend'
  },
  {
    word: 'आशिक',
    wordRoman: 'ashiq',
    meaning: 'प्रेमी, जो किसी से प्रेम करता है',
    meaning_en: 'Lover, one who is in love',
    etymology: 'अरबी/उर्दू "आशिक़" से, जिसका अर्थ है "प्रेमी"',
    etymology_en: 'From Arabic/Urdu "ashiq", meaning "lover"',
    example: 'वह उसकी आशिक है',
    example_en: 'He is her lover'
  },
  {
    word: 'आगयी',
    wordRoman: 'aagayi',
    meaning: 'आ गई (स्त्रीलिंग), वापस आना या प्रकट होना',
    meaning_en: 'Came back (feminine), to return or appear',
    etymology: 'हिंदी "आना" (to come) का भूतकाल रूप',
    etymology_en: 'Past tense form of Hindi "aana" (to come)',
    example: 'याद आ गई',
    example_en: 'Memory came back'
  },
  {
    word: 'याद',
    wordRoman: 'yaad',
    meaning: 'स्मृति, वह जो मन में रहता है',
    meaning_en: 'Memory, remembrance; something remembered',
    etymology: 'अरबी/फ़ारसी "याद" से, जिसका अर्थ है "स्मरण"',
    etymology_en: 'From Arabic/Persian "yaad", meaning "remembrance"',
    example: 'तुम्हारी याद आती है',
    example_en: 'I remember you'
  },
  {
    word: 'माथे',
    wordRoman: 'mathe',
    meaning: 'सिर का ऊपरी हिस्सा, ललाट',
    meaning_en: 'Forehead, the upper part of the head',
    etymology: 'संस्कृत "मस्तक" से',
    etymology_en: 'From Sanskrit "mastak"',
    example: 'माथे पर बिंदी',
    example_en: 'Bindi on forehead'
  },
  {
    word: 'बिंदी',
    wordRoman: 'bindi',
    meaning: 'माथे पर लगाया जाने वाला सजावटी बिन्दु',
    meaning_en: 'Decorative dot worn on the forehead',
    etymology: 'संस्कृत "बिन्दु" से, जिसका अर्थ है "बिंदी"',
    etymology_en: 'From Sanskrit "bindu", meaning "dot"',
    example: 'सुंदर बिंदी',
    example_en: 'Beautiful bindi'
  },
  {
    word: 'गालों',
    wordRoman: 'gaalon',
    meaning: 'चेहरे के दोनों ओर की गाल हड्डी',
    meaning_en: 'Cheeks, the sides of the face',
    etymology: 'संस्कृत "गाल" से',
    etymology_en: 'From Sanskrit "gala"',
    example: 'गुलाबी गाल',
    example_en: 'Rosy cheeks'
  },
  {
    word: 'तिल',
    wordRoman: 'til',
    meaning: 'शरीर पर छोटा काला निशान या तिल का बीज',
    meaning_en: 'Mole on the body, or sesame seed',
    etymology: 'संस्कृत "तिल" से',
    etymology_en: 'From Sanskrit "til"',
    example: 'गाल पर तिल',
    example_en: 'Mole on cheek'
  },
  {
    word: 'होंठों',
    wordRoman: 'honthhon',
    meaning: 'मुंह का ऊपरी और निचला भाग',
    meaning_en: 'Lips, the upper and lower part of the mouth',
    etymology: 'संस्कृत "ओष्ठ" से',
    etymology_en: 'From Sanskrit "oshtha"',
    example: 'लाल होंठ',
    example_en: 'Red lips'
  },
  {
    word: 'लाल',
    wordRoman: 'laal',
    meaning: 'लाल रंग, गुलाबी या क्रिमसन',
    meaning_en: 'Red color, crimson or pink',
    etymology: 'संस्कृत "रक्त" से',
    etymology_en: 'From Sanskrit "rakta"',
    example: 'लाल गुलाब',
    example_en: 'Red rose'
  },
  {
    word: 'रंग',
    wordRoman: 'rang',
    meaning: 'रंग, वर्ण, पेंट',
    meaning_en: 'Color, hue, paint',
    etymology: 'संस्कृत "रञ्ज" से, जिसका अर्थ है "रंगना"',
    etymology_en: 'From Sanskrit "ranj", meaning "to color"',
    example: 'सुंदर रंग',
    example_en: 'Beautiful color'
  },
  {
    word: 'छूने',
    wordRoman: 'chhoone',
    meaning: 'स्पर्श करना, हाथ लगाना',
    meaning_en: 'To touch, to feel with hand',
    etymology: 'संस्कृत "स्पृश" से',
    etymology_en: 'From Sanskrit "sprish"',
    example: 'मुझे छुओ मत',
    example_en: 'Don\'t touch me'
  },
  {
    word: 'लालच',
    wordRoman: 'lalach',
    meaning: 'लोभ, लालसा, अत्यधिक इच्छा',
    meaning_en: 'Greed, desire, excessive want',
    etymology: 'संस्कृत "लालसा" से',
    etymology_en: 'From Sanskrit "lalasa"',
    example: 'लालच बुरी बला है',
    example_en: 'Greed is a bad thing'
  },
  {
    word: 'हाथों',
    wordRoman: 'haathon',
    meaning: 'हाथों से (बहुवचन), हाथ द्वारा',
    meaning_en: 'By hands (plural), with hands',
    etymology: 'संस्कृत "हस्त" से',
    etymology_en: 'From Sanskrit "hasta"',
    example: 'हाथों से बनाया',
    example_en: 'Made by hand'
  },
  {
    word: 'मारा',
    wordRoman: 'mara',
    meaning: 'मारा गया, हत्या की या मारा हुआ',
    meaning_en: 'Killed, struck, or hit',
    etymology: 'संस्कृत "मृ" (मरना) से',
    etymology_en: 'From Sanskrit "mri" (to die)',
    example: 'मच्छर मारा गया',
    example_en: 'The mosquito was killed'
  }
];

// Helper function to find word in dictionary
export function findWord(word: string, isRoman: boolean = false): WordEntry | null {
  const normalizedWord = word.trim().toLowerCase();
  
  // First try exact match
  let found = wordDictionary.find(entry => {
    if (isRoman) {
      return entry.wordRoman?.toLowerCase() === normalizedWord ||
             entry.word.toLowerCase() === normalizedWord;
    } else {
      return entry.word === word || 
             entry.wordRoman?.toLowerCase() === normalizedWord;
    }
  });

  if (found) return found;

  // Try partial match (for inflected forms)
  // Check if the word contains or is contained in dictionary entries
  found = wordDictionary.find(entry => {
    if (isRoman) {
      const entryRoman = entry.wordRoman?.toLowerCase() || '';
      return normalizedWord.includes(entryRoman) || 
             entryRoman.includes(normalizedWord) ||
             normalizedWord.startsWith(entryRoman) ||
             entryRoman.startsWith(normalizedWord);
    } else {
      // For Hindi, check if word contains the dictionary word or vice versa
      return entry.word.includes(word) || 
             word.includes(entry.word) ||
             entry.word.startsWith(word) ||
             word.startsWith(entry.word);
    }
  });

  return found || null;
}

