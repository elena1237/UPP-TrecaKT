package root.demo.services;

import org.camunda.bpm.engine.IdentityService;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import root.demo.model.FormSubmissionDto;
import root.demo.model.Magazine;
import root.demo.model.User;
import root.demo.repository.MagazineRepository;
import root.demo.repository.UserRepository;

import java.util.List;

@Service
public class ProcessingDues implements JavaDelegate {
    @Autowired
    IdentityService identityService;

    @Autowired
    MagazineRepository magazineRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public void execute(DelegateExecution execution) throws Exception {

        Boolean pay = (Boolean) execution.getVariable("pay");
        List<FormSubmissionDto> magazine = (List<FormSubmissionDto>) execution.getVariable("submitmagazine");

        String name = magazine.get(1).getFieldValue();
        User user= userRepository.findByUsername(name);

        if (user!=null) {
            user.setDues(pay);
            userRepository.save(user);
        }
    }
}
