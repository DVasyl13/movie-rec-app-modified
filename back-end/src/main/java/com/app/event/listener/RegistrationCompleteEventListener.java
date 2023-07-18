package com.app.event.listener;

import com.app.entity.User;
import com.app.event.RegistrationCompleteEvent;
import com.app.repository.UserRepository;
import com.app.service.emailsender.EmailSender;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;

@Slf4j
@Component
@RequiredArgsConstructor
public class RegistrationCompleteEventListener implements ApplicationListener<RegistrationCompleteEvent> {
    private final UserRepository userRepository;
    private final JavaMailSender mailSender;
    private final EmailSender emailSender;
    private User user;
    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        user = event.getUser();
        String verificationToken =  event.getJwtToken();
        String url = event.getApplicationUrl()+"/register/verifyEmail?token="+verificationToken;
        try {
            emailSender.sendVerificationEmail(user, url);
        } catch (MessagingException | UnsupportedEncodingException e) {
            userRepository.delete(user);
            throw new RuntimeException(e);
        }
        log.info("Click the link to verify your registration :  {}", url);
    }
}
