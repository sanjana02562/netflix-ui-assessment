import axios from "axios";

export const fetchMovies = async () => {
  try {
    const res = await axios.get(
      "https://api.tvmaze.com/shows"
    );

    return res.data.map(item => ({
      id: item.id,
      title: item.name,
      year: item.premiered?.split("-")[0] || "N/A",
      poster: item.image?.medium || "https://via.placeholder.com/150"
    }));

  } catch (err) {
    console.error("API ERROR:", err);
    return [];
  }
};