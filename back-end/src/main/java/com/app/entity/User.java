package com.app.entity;

import com.app.security.token.Token;
import com.app.utils.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;


@Table(name = "user")
@Getter @Setter @ToString
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String email;
    private String country;
    private Boolean isEnable;
    private Boolean isExpired;
    private Boolean isLocked;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @OneToMany(mappedBy = "user")
    @JsonBackReference
    private Set<Token> tokens;

    public User(Long id) {
        this.id = id;
    }

    public User(String username,
                String password,
                String email,
                UserRole role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.userRole = role;
        this.isLocked = false;
        this.isExpired = false;
        this.isEnable = true;
    }

    public User(Long id, String username,
                String password, String email,
                String country, Boolean isEnable,
                Boolean isExpired, Boolean isLocked,
                UserRole userRole) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.country = country;
        this.isEnable = isEnable;
        this.isExpired = isExpired;
        this.isLocked = isLocked;
        this.userRole = userRole;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(userRole.name()));
    }
    public String getName() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return !isExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !isLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isEnable;
    }
}

