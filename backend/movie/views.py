from django.shortcuts import render
# Create your views here.
import os
import requests
from dotenv import load_dotenv
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from concurrent.futures import ThreadPoolExecutor
from django.conf import settings

load_dotenv()
class TMDBStatusView(APIView):
    def get(self, request):
        api_key = os.getenv('TMDB_API_KEY')
        if not api_key:
            return Response(
                {"error": "TMDB API key not configured"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        url = f"https://api.themoviedb.org/3/movie/popular?api_key={api_key}"
        try:
            response = requests.get(url)
            return Response(
                {
                    "tmdb_status_code": response.status_code,
                    "django_status": "TMDB API connected successfully",
                },
                status=status.HTTP_200_OK
            )
        except requests.exceptions.RequestException as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
            
class MovieListView(APIView):
    def get(self, request):
        try:

            popular_response = requests.get(
                "https://api.themoviedb.org/3/movie/popular",
                headers={"Authorization": f"Bearer {settings.TMDB_ACCESS_TOKEN}"}
            )
            popular_response.raise_for_status()
            movies_data = popular_response.json().get('results', [])

            def fetch_video(movie):
                try:
                    video_response = requests.get(
                        f"https://api.themoviedb.org/3/movie/{movie['id']}/videos",
                        headers={"Authorization": f"Bearer {settings.TMDB_ACCESS_TOKEN}"}
                    )
                    video_response.raise_for_status()
                    videos = video_response.json().get('results', [])
                    
                    # Get the first video URL if available
                    video_url = None
                    if videos:
                        video = videos[0]  # Get first video
                        video_url = f"https://www.youtube.com/watch?v={video['key']}" if video['site'] == 'YouTube' else None
                    
                    return {
                        'id': movie['id'],
                        'name': movie['title'],
                        'logo': f"https://image.tmdb.org/t/p/w200{movie['poster_path']}" if movie.get('poster_path') else None,
                        'status': movie.get('status', 'Released'),
                        'video_url': video_url,
                        'video_stat': 'false'
                    }
                
                except Exception as e:
                    print(f"Failed to fetch video for movie {movie['id']}: {str(e)}")
                    return None

            # Process movies in parallel (faster)
            with ThreadPoolExecutor(max_workers=5) as executor:
                movies = list(filter(None, executor.map(fetch_video, movies_data)))

            return Response(movies)

        except Exception as e:
            return Response(
                {
                    "error": "Failed to fetch movies",
                    "details": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
         
class PlayMovieView(APIView):
    def post(self, request, movie_id):
        if not movie_id:
            return Response(
                {"error": "movie_id parameter is required"},
                status=status.HTTP_400_BAD_REQUEST)
        try:
            movie_response = requests.get(
                f"https://api.themoviedb.org/3/movie/{movie_id}",
                headers={"Authorization": f"Bearer {settings.TMDB_ACCESS_TOKEN}"})
            
            if movie_response.status_code == 404:
                return Response(
                    {"error": "Movie not found in TMDB"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            movie_response.raise_for_status()
            movie_data = movie_response.json()

            return Response({
                "status": f"Now playing: {movie_data['title']}",
                "movie_id": movie_data['id']
            })
            
        except requests.exceptions.RequestException as e:
            return Response(
                {"error": f"Failed to verify movie: {str(e)}"},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )