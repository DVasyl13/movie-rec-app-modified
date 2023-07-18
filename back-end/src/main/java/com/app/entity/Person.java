package com.app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "person")
@Setter
@Getter
@NoArgsConstructor
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
    private List<MovieDetails> movies = new ArrayList<>();

    public Person(Long id, String name, String image, PersonRole role) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.role = role;
    }
}
