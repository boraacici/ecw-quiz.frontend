import config from '@/config';
const YandexAPI = {
  async get(nativeLanguage, word) {
    const key = config.YANDEX_DICTIONARY_KEY;
    const url = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=en-${nativeLanguage}&text=${word}`;
    return await (await fetch(url)).json();
  },
};

export default YandexAPI;
