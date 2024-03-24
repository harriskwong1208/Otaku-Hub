export const apiEndPoints = {
  localHost: "http://localhost:8000/api/",
  // localHost: 'https://otakuhubexpress.ue.r.appspot.com/api/',
  jikan: "https://api.jikan.moe/v4/anime?q=",
  jikanById: "https://api.jikan.moe/v4/anime/",
  jikanManga: "https://api.jikan.moe/v4/manga?q=",
  jikanMangaById: "https://api.jikan.moe/v4/manga/",
  topUpcomingAnime:
    "https://api.jikan.moe/v4/top/anime?filter=upcoming&sfw&limit=6",
  topAnime:
    "https://api.jikan.moe/v4/top/anime?filter=bypopularity&sfw&limit=6",
  topAiring: "https://api.jikan.moe/v4/top/anime?filter=airing&sfw&limit=6",
  topManga:
    "https://api.jikan.moe/v4/top/manga?filter=bypopularity&sfw&limit=6",
  mangaRecommendations(id) {
    return `https://api.jikan.moe/v4/manga/${id}/recommendations`;
  },
  animeRecommendations(id) {
    return `https://api.jikan.moe/v4/anime/${id}/recommendations`;
  },
};
