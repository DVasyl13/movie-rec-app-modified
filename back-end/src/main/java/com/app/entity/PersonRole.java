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
    @Column(length = 64)
    private String id;

    @Column(name = "role", nullable = false)
    private String role;

    @OneToMany(mappedBy = "role")
    @JsonBackReference
    private Set<Person> people = new HashSet<>();

    public PersonRole(String id) {
        this.id = id;
    }
}
