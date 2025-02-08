const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const britishOnly = require("./british-only.js");

class Translator {
  constructor() {
    this.americanOnly = americanOnly;
    this.americanToBritishSpelling = americanToBritishSpelling;
    this.titles = ["Mr", "Ms", "Mrs", "Mx", "Dr", "Prof"];
    this.britishOnly = britishOnly;
  }

  translate(text, locale) {
    let translatedText = text;
    let dictionary = this.getDictionary(locale);

    // Translate dictionary words
    Object.keys(dictionary).forEach((key) => {
      const regex = new RegExp(`\\b${key}\\b`, "gi");
      translatedText = translatedText.replace(
        regex,
        (match) => `<span class="highlight">${dictionary[key]}</span>`
      );
    });

    // Time format handling
    if (locale === "british-to-american") {
      const timeRegex = /([0-9]{1,2})\.([0-9]{2})/g;
      translatedText = translatedText.replace(
        timeRegex,
        (match, p1, p2) => `<span class="highlight">${p1}:${p2}</span>`
      );
    } else {
      const timeRegex = /([0-9]{1,2}):([0-9]{2})/g;
      translatedText = translatedText.replace(
        timeRegex,
        (match, p1, p2) => `<span class="highlight">${p1}.${p2}</span>`
      );
    }

    // Honorifics handling
    if (locale === "american-to-british") {
      for (let title of this.titles) {
        // Use lookahead for space or end of string after the dot
        const regex = new RegExp(`\\b${title}\\.(?=\\s|$)`, "gi");
        translatedText = translatedText.replace(
          regex,
          (match) => `<span class="highlight">${title}</span>`
        );
      }
    } else {
      for (let title of this.titles) {
        const regex = new RegExp(`\\b${title}\\b`, "gi");
        translatedText = translatedText.replace(
          regex,
          (match) => `<span class="highlight">${title}.</span>`
        );
      }
    }

    return translatedText;
  }

  getDictionary(locale) {
    if (locale === "american-to-british") {
      return {
        ...this.americanOnly,
        ...this.americanToBritishSpelling,
      };
    } else if (locale === "british-to-american") {
      return {
        ...this.britishOnly,
        ...this.getReverseDictionary(this.americanToBritishSpelling),
      };
    }
  }

  getReverseDictionary(dictionary) {
    const reverseDictionary = {};
    for (let key in dictionary) {
      reverseDictionary[dictionary[key]] = key;
    }
    return reverseDictionary;
  }
}

module.exports = Translator;
