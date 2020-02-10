package root.demo.services;

import org.camunda.bpm.engine.IdentityService;
import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import root.demo.model.EnterDataForSciWork;
import root.demo.model.FormSubmissionDto;
import root.demo.model.Magazine;
import root.demo.repository.EnterDataRepository;
import root.demo.repository.MagazineRepository;
import root.demo.repository.UserRepository;

import java.util.List;

@Service
public class ProcessingData implements JavaDelegate {
    @Autowired
    IdentityService identityService;

    @Autowired
    EnterDataRepository enterDataRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private RuntimeService runtimeService;

    @Autowired
    private RepositoryService repositoryService;

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        List<FormSubmissionDto> enteringData = (List<FormSubmissionDto>)execution.getVariable("submitenterdata");

        String title = enteringData.get(0).getFieldValue();
        String name_coauthor = enteringData.get(1).getFieldValue();
        String key_term = enteringData.get(2).getFieldValue();
        String abstract1 = enteringData.get(3).getFieldValue();
        List<String> sciFields = enteringData.get(4).getFieldListValue();
        String pdf = enteringData.get(5).getFieldValue();
        List<FormSubmissionDto> magazine = (List<FormSubmissionDto>)execution.getVariable("submitmagazine");
        String magazine_name = magazine.get(0).getFieldValue();

        String sciFieldsToString = "";

        for(String field: sciFields){
            sciFieldsToString += field + ",";
        }

        if (sciFieldsToString != null && sciFieldsToString.length() > 0 && sciFieldsToString.charAt(sciFieldsToString.length() - 1) == ',') {
            sciFieldsToString = sciFieldsToString.substring(0, sciFieldsToString.length() - 1);
        }

        execution.setVariable("sciFieldsToString",sciFieldsToString);

        EnterDataForSciWork enterDataForSciWork = new EnterDataForSciWork(title,name_coauthor,key_term,abstract1,sciFieldsToString,pdf,magazine_name);

        try {
            enterDataRepository.save(enterDataForSciWork);
            System.out.println("Uspjesno sacuvani uneseni podaci" );
        }catch(NullPointerException e) {
            System.out.println("Uneseni podaci nisu sacuvani u bazu");
        }
    }
}
