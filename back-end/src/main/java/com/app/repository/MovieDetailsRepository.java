package com.app.repository;

import com.app.entity.MovieDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.Set;

public interface MovieDetailsRepository extends JpaRepository<MovieDetails, Long> {

    @Query("select md from MovieDetails md " +
            "left join fetch md.movie m" +
            "left join fetch md.movies sm " +
            "left join fetch md.genres g " +
            "left join fetch md.people a " +
            "where md.id=?1 " )
    Optional<MovieDetails> findById(Long id);


    @Query("select md from MovieDetails md " +
            "left join md.movie m " +
            "left join m.usersLiked ul " +
            "where ul.id =?1")
    Set<MovieDetails> findLikedMovieByUserId(Long id);

    @Query("select md from MovieDetails md " +
            "left join md.movie m " +
            "left join m.usersIgnored ui " +
            "where ui.id =?1")
    Set<MovieDetails> findIgnoredMovieByUserId(Long id);

    @Query("select md from MovieDetails md " +
            "left join md.movie m " +
            "left join m.usersWatched uw " +
            "where uw.id =?1")
    Set<MovieDetails> findWatchedMovieByUserId(Long id);
}
