package com.app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "person_role")
@Getter @Setter
@NoArgsConstructor
public class PersonRole {
    @Id
    Long id;

    @Column(name = "role", nullable = false)
    private String role;

    @ManyToMany(mappedBy = "roles")
    @JsonBackReference
    private Set<Person> people = new HashSet<>();
}
