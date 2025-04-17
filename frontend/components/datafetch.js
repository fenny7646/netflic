const API_BASE_URL = 'http://localhost:8000/api';

export async function fetchMovies() {
  try {
    const response = await fetch(`${API_BASE_URL}/movies/`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}