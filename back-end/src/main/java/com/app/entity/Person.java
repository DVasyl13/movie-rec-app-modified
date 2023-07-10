package com.app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "person")
@Setter
@Getter
@Builder
@ToString(exclude = {"movies"})
public class Person {

    @Id
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "image", nullable = false)
    private String image;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JsonManagedReference
    private PersonRole role;

    @ManyToMany(mappedBy = "people")
    @JsonBackReference
    private Set<MovieDetails> movies = new HashSet<>();

    public Person() {

    }
}
