package com.app.repository;


import com.app.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    @Query( value =
            "select m.id, m.title, m.image " +
                    "from public.movie m " +
                    "inner join (select ulm.users_liked_id, count(*) from public.user_liked_movies ulm group by ulm.users_liked_id " +
                    "            order by count(ulm.users_liked_id) DESC limit 18) t ON t.users_liked_id=m.id", nativeQuery = true)
    Set<Movie> getFavouriteUsersMovies();
}
