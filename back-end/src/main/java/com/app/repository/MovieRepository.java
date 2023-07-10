package com.app.repository;


import com.app.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    @Query( value =
            "select m.id, m.title, m.image " +
                    "from public.movie m " +
                    "inner join (select ulm.movie_id, count(*) from public.user_liked_movies ulm group by ulm.movie_id " +
                    "            order by count(ulm.movie_id) DESC limit 18) t ON t.movie_id=m.id", nativeQuery = true)
    Set<Movie> getFavouriteUsersMovies();
}
