package root.demo.services;

import org.camunda.bpm.engine.IdentityService;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import root.demo.model.FormSubmissionDto;
import root.demo.model.Magazine;
import root.demo.repository.MagazineRepository;

import java.util.List;

@Service
public class CheckType implements JavaDelegate {
    @Autowired
    IdentityService identityService;

    @Autowired
    MagazineRepository magazineRepository;

    @Override
    public void execute(DelegateExecution execution) throws Exception {

        List<FormSubmissionDto> magazine = (List<FormSubmissionDto>) execution.getVariable("submitmagazine");

        String name = magazine.get(0).getFieldValue();
        Magazine mag= magazineRepository.findAllByName(name);
        execution.setVariable("open_access", mag.getOpen_access());
    }


}
