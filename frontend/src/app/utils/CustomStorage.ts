export class CustomStorage {

  public static getCardHeight() {
    return parseInt(localStorage.getItem('cardHeight'), 10) || 120;
  }

  public static setCardHeight(cardHeight) {
    localStorage.setItem('cardHeight', cardHeight + '');
  }

  public static getCardWidth() {
    return parseInt(localStorage.getItem('cardWidth'), 10) || 25;
  }

  public static setCardWidth(cardWidth) {
    localStorage.setItem('cardWidth', cardWidth + '');
  }
}
