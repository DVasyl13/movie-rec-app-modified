package com.app.event;

import com.app.entity.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class RegistrationCompleteEvent extends ApplicationEvent {
    private User user;
    private String jwtToken;
    private String applicationUrl;

    public RegistrationCompleteEvent(User user, String jwtToken, String applicationUrl) {
        super(user);
        this.user = user;
        this.jwtToken = jwtToken;
        this.applicationUrl = applicationUrl;
    }
}