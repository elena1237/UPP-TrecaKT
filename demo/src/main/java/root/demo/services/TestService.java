package root.demo.services;

import java.util.List;

import org.camunda.bpm.engine.IdentityService;
import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.bpm.engine.form.FormField;
import org.camunda.bpm.engine.identity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import root.demo.model.FormSubmissionDto;

@Service
public class TestService implements JavaDelegate{

	@Autowired
	IdentityService identityService;

	@Override
	public void execute(DelegateExecution execution) throws Exception {

		List<FormSubmissionDto> registration = (List<FormSubmissionDto>)execution.getVariable("registration");
		//System.out.println(registration);
		boolean rez = true;

		for(FormSubmissionDto temp : registration){
			if(temp.getFieldId().equals("scientificFields")){
				if(temp.getFieldListValue().isEmpty()){
					rez = false;
					break;
				}
			}else{
				if(temp.getFieldValue().isEmpty()){
					rez = false;
					break;
				}
			}
		}
		execution.setVariable("rez", rez);
	}
}
