export class CustomStorage {

  public static setPluginParam(plugin, paramName, paramValue) {
    const params = this.getPluginParams();
    if (!(plugin in params)) {
      params[plugin] = {};
    }
    params[plugin][paramName] = paramValue;
    localStorage.setItem('pluginParams', JSON.stringify(params));
    return params;
  }

  public static getPluginParams(plugin = null) {
    const params = JSON.parse(localStorage.getItem('pluginParams')) || {};
    if (plugin === null) {
      return params;
    }
    return params[plugin] || {};
  }

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
