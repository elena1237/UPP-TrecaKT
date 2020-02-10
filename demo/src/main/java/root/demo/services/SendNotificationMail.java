package root.demo.services;

import org.camunda.bpm.engine.IdentityService;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import root.demo.model.FormSubmissionDto;
import root.demo.model.Magazine;
import root.demo.model.User;
import root.demo.repository.HashCodeRepository;
import root.demo.repository.MagazineRepository;
import root.demo.repository.UserRepository;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.List;
import java.util.Properties;

@Service
public class SendNotificationMail implements JavaDelegate {
    @Autowired
    IdentityService identityService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    HashCodeRepository hashRepository;

    @Autowired
    MagazineRepository magazineRepository;


    @Override
    public void execute(DelegateExecution execution) throws Exception {
        List<FormSubmissionDto> forMail = (List<FormSubmissionDto>) execution.getVariable("submitmagazine");
        String magazine_name = forMail.get(0).getFieldValue();
        String author = forMail.get(1).getFieldValue();

        Magazine mag = magazineRepository.findAllByName(magazine_name);
        String chiefEdior = mag.getChiefEditor();

        User author1 = userRepository.findByUsername(author);
        User chiefEditor1 = userRepository.findByUsername(chiefEdior);

        String emailAuthor = author1.getEmail();
        String emailChiefEditor = chiefEditor1.getEmail();

        //send("trkacicap4", "pticica123", emailAuthor, "Notifikacija autoru o prijavi novog rada u sistem", "Rad je objavljen u casopisu:");
        //send("trkacicap4", "pticica123", emailChiefEditor, "Notifikacija glavnom uredniku o prijavi novog rada u sistem", "Rad je objavljen u casopisu:");

    }

    public void send(String from, String password, String to, String sub, String msg) {
        //Get properties object
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.socketFactory.port", "465");
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "465");
        //get Session
        Session session = Session.getDefaultInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(from, password);
                    }
                });
        //compose message
        try {
            MimeMessage message = new MimeMessage(session);
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject(sub);
            message.setText(msg);
            //send message
            Transport.send(message);
            System.out.println("message sent successfully");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}