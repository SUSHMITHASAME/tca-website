export const fetchYouTubeStats = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/youtube");
    const data = await response.json();

    if (!data || data.error) {
      console.error("Backend returned error:", data.error);
      return null;
    }

    return data; // { subscribers, views, videos }
  } catch (error) {
    console.error("Error fetching stats from backend:", error);
    return null;
  }
};
