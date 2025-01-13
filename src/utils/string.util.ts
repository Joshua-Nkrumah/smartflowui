import stc from 'string-to-color';

import Color from 'color';

export default class StringUtil {
  static padLeft = function (str: string, ch: string, n: number): string {
    let myString = '';

    while (myString.length < n - str.length) {
      myString += ch;
    }

    myString += str;

    return myString;
  };

  static padRight = function (str: string, ch: string, n: number): string {
    let myString = str;

    while (myString.length < n) {
      myString += ch;
    }

    return myString;
  };

  static getInitials = (str: string): string => {
    if (!str || !str.trim().length) {
      return '';
    }

    const pieces = str

      .split(/[. ',_-]/)

      .map((piece) => {
        return piece.trim();
      })

      .filter((piece) => {
        return piece.length > 0;
      });

    if (pieces.length === 1) {
      const piece = pieces[0].trim();

      if (piece.length === 1) {
        return piece.toLocaleUpperCase();
      }

      return piece.substring(0, 2).toLocaleUpperCase();
    } else if (pieces.length > 1) {
      return (
        pieces[0].substring(0, 1) + pieces[pieces.length - 1].substring(0, 1)
      ).toLocaleUpperCase();
    }

    return '';
  };

  static getCharactersCodeNumericSummary = (str: string) => {
    let sum = 0;

    for (let i = 0; i < str.length; i++) {
      sum += str.charCodeAt(i);
    }

    return sum;
  };

  static getColorsFromString = (str: string) => {
    let newColor = stc(str);

    const color = Color(newColor);

    if (color.isLight()) {
      newColor = color.darken(0.5).hex();
    }

    return {
      background: `${newColor}20`,

      text: `${newColor}FF`,
    };
  };

  static capitalize(str: string) {
    return str[0].toUpperCase() + str.substring(1);
  }

  static makePossessive(str: string) {
    if (str[str.length - 1].toLocaleLowerCase() === 's') {
      return `${str}'`;
    } else {
      return `${str}'s`;
    }
  }
}
