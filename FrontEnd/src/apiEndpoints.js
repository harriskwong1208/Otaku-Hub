export const apiEndPoints = {
  backEndApi: "http://localhost:8000/api/",
  // backEndApi: "https://otakuhubbe.onrender.com/api/",
  jikan: "https://api.jikan.moe/v4/anime?q=",
  jikanById: "https://api.jikan.moe/v4/anime/",
  jikanManga: "https://api.jikan.moe/v4/manga?q=",
  jikanMangaById: "https://api.jikan.moe/v4/manga/",
  topUpcomingAnime:
    "https://api.jikan.moe/v4/top/anime?filter=upcoming&sfw&limit=8",
  topAnime:
    "https://api.jikan.moe/v4/top/anime?filter=bypopularity&sfw&limit=8",
  topAiring: "https://api.jikan.moe/v4/top/anime?filter=airing&sfw&limit=8",
  topManga:
    "https://api.jikan.moe/v4/top/manga?filter=bypopularity&sfw&limit=8",
  mangaRecommendations(id) {
    return `https://api.jikan.moe/v4/manga/${id}/recommendations`;
  },
  animeRecommendations(id) {
    return `https://api.jikan.moe/v4/anime/${id}/recommendations`;
  },
};
