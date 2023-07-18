package com.app.utils;

import com.app.entity.*;
import com.app.entity.dto.*;

import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class MovieMapper {

    public static MovieDetails mapMovieDtoToMovieDetails(MovieDto movieDto) {
        Movie movie = new Movie();

        movie.setId(IdMapper.getLongFromString(movieDto.id()));
        movie.setTitle(movieDto.fullTitle());
        movie.setImage(movieDto.image());

        MovieDetails movieDetails = new MovieDetails();
        movieDetails.setId(IdMapper.getLongFromString(movieDto.id()));
        movieDetails.setYear(movieDto.year());
        movieDetails.setRuntimeMins(movieDto.runtimeMins());
        movieDetails.setPlot(movieDto.plot());
        movieDetails.setReleaseDate(movieDto.releaseDate());
        movieDetails.setAwards(movieDto.awards());
        movieDetails.setCountries(movieDto.countries());
        movieDetails.setCompanies(movieDto.companies());
        movieDetails.setImdbRating(movieDto.imDbRating());
        movieDetails.setImdbRatingVotes(movieDto.imDbRatingVotes());
        movieDetails.setMetacriticRating(movieDto.metacriticRating());
        movieDetails.setBudget(movieDto.boxOffice().budget());
        movieDetails.setTrailer(movieDto.trailer().link());
        movieDetails.setOpUsa(movieDto.boxOffice().openingWeekendUSA());
        movieDetails.setWorldwideGross(movieDto.boxOffice().cumulativeWorldwideGross());

        Set<SimilarMovie> similarMovies = mapMovieSimilarDtoToSimilarMovie(movieDto.similars());
        movieDetails.setMovies(similarMovies);

        Set<Person> people = mergePeopleIntoOneSet(
                movieDto.actorList(),
                movieDto.directorList(),
                movieDto.writerList()
        );
        movieDetails.setPeople(people);

        Set<Genre> genres = mapGenreDtoToGenre(movieDto.genreList());
        movieDetails.setGenres(genres);

        movieDetails.setMovie(movie);
        System.out.println(movieDetails);
        return movieDetails;
    }

    @SafeVarargs
    private static Set<Person> mergePeopleIntoOneSet(Set<PersonDto>... people) {
        return Stream.of(people)
                .flatMap(Set::stream)
                .map(personDto -> new Person(personDto.idDigit(),
                        personDto.name(),
                        personDto.image(),
                        new PersonRole(personDto.name())))
                .collect(Collectors.toSet());
    }

  
    private static Set<SimilarMovie> mapMovieSimilarDtoToSimilarMovie(Set<MovieSmallDto> movieSmallDtos) {
        return movieSmallDtos.stream().map((e) -> {
            SimilarMovie movie = new SimilarMovie();
            movie.setId(IdMapper.getLongFromString(e.id()));
            movie.setImage(e.image());
            movie.setTitle(e.title());
            return movie;
        }).collect(Collectors.toSet());
    }

    private static Set<Genre> mapGenreDtoToGenre(Set<GenreDto> genresDtos) {
        return genresDtos.stream().map((e) -> {
            Genre genre = new Genre();
            genre.setId(e.key());
            genre.setName(e.value());
            return genre;
        }).collect(Collectors.toSet());
    }

    private static Set<GenreDto> mapGenreToGenreDto(Set<Genre> genres) {
        return genres.stream().map((e) -> {
            return new GenreDto(e.getName(), e.getName());
        }).collect(Collectors.toSet());
    }
    private static Set<MovieSmallDto> mapSimilarMoviesToMovieSimilarDtos(Set<SimilarMovie> movies) {
        return movies.stream().map((e) -> {
            return new MovieSmallDto(IdMapper.getIMDbMovieId(e.getId()), e.getId(),e.getTitle(),
                    e.getImage());
        }).collect(Collectors.toSet());
    }

    private static Set<PersonDto> mapPeopleSetToPersonDtoSet(Set<Person> people, String role) {
        return people.stream()
                .filter(p -> p.getRole().getRole().equals(role))
                .map(p -> new PersonDto(
                        IdMapper.getIMDbPersonId(p.getId()), 
                        p.getId(),
                        p.getName(),
                        p.getImage(),
                        p.getRole().getRole()
                ))
                .collect(Collectors.toSet());
    }

    public static MovieDto mapMovieDetailsToMovieDto(MovieDetails movieDetails) {
        Set<MovieSmallDto> similars = mapSimilarMoviesToMovieSimilarDtos(movieDetails.getMovies());
        Set<GenreDto> genres = mapGenreToGenreDto(movieDetails.getGenres());
        Set<PersonDto> directors = mapPeopleSetToPersonDtoSet(movieDetails.getPeople(), "Director");
        Set<PersonDto> writers = mapPeopleSetToPersonDtoSet(movieDetails.getPeople(), "Writer");
        Set<PersonDto> actors = mapPeopleSetToPersonDtoSet(movieDetails.getPeople(), "Actor");
        return new MovieDto(
                IdMapper.getIMDbMovieId(movieDetails.getId()),
                movieDetails.getId(),
                movieDetails.getMovie().getTitle(),
                movieDetails.getMovie().getImage(),
                movieDetails.getYear(),
                movieDetails.getReleaseDate(),
                movieDetails.getRuntimeMins(),
                movieDetails.getPlot(),
                movieDetails.getAwards(),
                movieDetails.getCountries(),
                genres,
                movieDetails.getCompanies(),
                movieDetails.getImdbRating(),
                movieDetails.getImdbRatingVotes(),
                new TrailerDto(movieDetails.getTrailer()),
                movieDetails.getMetacriticRating(),
                new BoxOffice(movieDetails.getBudget(),
                        movieDetails.getOpUsa(),
                        movieDetails.getWorldwideGross()),
                similars
                , directors, writers, actors
        );
    }

    public static Set<MovieSmallDto> mapMovieSetToMovieSmallDto(Set<Movie> movies) {
        return movies.stream()
                .map((e) -> new MovieSmallDto(IdMapper.getIMDbMovieId(e.getId()),
                        e.getId(), e.getTitle(), e.getImage()))
                .collect(Collectors.toSet());
    }
}
