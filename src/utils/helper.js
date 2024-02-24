import YandexAPI from "../services/apis/yandexAPI";

export default {
  translateWord: async (word, nativeLang) => {
    return await YandexAPI.get(nativeLang, word);
  }
}