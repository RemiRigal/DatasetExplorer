export class CustomStorage {

  public static getCardHeight() {
    return parseInt(localStorage.getItem('cardHeight'), 10) || 120;
  }

  public static setCardHeight(cardHeight) {
    localStorage.setItem('cardHeight', cardHeight + '');
  }

  public static getCardWidth() {
    return parseFloat(localStorage.getItem('cardWidth')) || 25.0;
  }

  public static setCardWidth(cardWidth) {
    localStorage.setItem('cardWidth', cardWidth + '');
  }
}
