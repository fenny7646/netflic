from . import views
from django.urls import path

urlpatterns = [
    path('api/',views.TMDBStatusView.as_view(), name='tmdb-status'),
    path('api/movies/', views.MovieListView.as_view(), name='movie-list'),
    path('api/play/<int:movie_id>/', views.PlayMovieView.as_view(), name='movie-play')
]