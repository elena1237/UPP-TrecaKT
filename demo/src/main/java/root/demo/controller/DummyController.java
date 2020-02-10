package root.demo.controller;

import java.util.*;

import org.camunda.bpm.engine.*;
import org.camunda.bpm.engine.externaltask.LockedExternalTask;
import org.camunda.bpm.engine.form.FormField;
import org.camunda.bpm.engine.form.TaskFormData;
import org.camunda.bpm.engine.history.HistoricProcessInstance;
import org.camunda.bpm.engine.impl.cmd.GetDeploymentResourceNamesCmd;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import root.demo.model.*;
import root.demo.repository.HashCodeRepository;
import root.demo.repository.ScientificFieldsRepository;

@Controller
@RequestMapping("/welcome")
public class DummyController {
	@Autowired
	IdentityService identityService;
	
	@Autowired
	private RuntimeService runtimeService;
	
	@Autowired
	private RepositoryService repositoryService;
	
	@Autowired
	TaskService taskService;
	
	@Autowired
	FormService formService;

	@Autowired
	HashCodeRepository codeRepository;

	@Autowired
	ExternalTaskService externalTaskService;

	@GetMapping(path = "/get", produces = "application/json")
    public @ResponseBody FormFieldsDto get() {

		ProcessInstance pi = runtimeService.startProcessInstanceByKey("Registracija");

		Task task = taskService.createTaskQuery().processInstanceId(pi.getId()).list().get(0);
		
		TaskFormData tfd = formService.getTaskFormData(task.getId());
		List<FormField> properties = tfd.getFormFields();
        return new FormFieldsDto(task.getId(), pi.getId(), properties);
    }

	@GetMapping(path = "/getRez/{processInstanceId}", produces = "application/json")
	public @ResponseBody String getRez(@PathVariable String processInstanceId) {
		Boolean rez = (Boolean)runtimeService.getVariable(processInstanceId, "rez");
		return rez.toString();
	}

	
	@GetMapping(path = "/get/tasks/{processInstanceId}", produces = "application/json")
    public @ResponseBody ResponseEntity<List<TaskDto>> get(@PathVariable String processInstanceId) {
		
		List<Task> tasks = taskService.createTaskQuery().processInstanceId(processInstanceId).list();
		List<TaskDto> dtos = new ArrayList<TaskDto>();
		for (Task task : tasks) {
			TaskDto t = new TaskDto(task.getId(), task.getName(), task.getAssignee());
			dtos.add(t);
		}
		
        return new ResponseEntity(dtos,  HttpStatus.OK);
    }

	//Provera hash vrednosti poslete na mejl i potrvrda registracije
	@GetMapping(path = "/checkHash/{sha256hex}/{username}", produces = "application/json")
	public @ResponseBody ResponseEntity getHash(@PathVariable String sha256hex, @PathVariable String username) {

		System.out.println(sha256hex);

		List<HashCodeConfirm> allHashCode = codeRepository.findAll();

		for(HashCodeConfirm c: allHashCode) {
			if(c.getUsername().equals(username) && c.getHashCode().equals(sha256hex)) {
				c.setConfirmed("da");
				codeRepository.save(c);
				break;
			}
		}


		List<LockedExternalTask> tasks = externalTaskService.fetchAndLock(1, "externalWorkerId")
				.topic("EmailValidation", 60L * 1000L)
				.execute();

		for (LockedExternalTask task : tasks) {
			try {
				String topic = task.getTopicName();

				externalTaskService.complete(task.getId(), "externalWorkerId");
			}
			catch(Exception e) {

				System.out.println("External task nije uspesno zavrsen!");
			}
		}
		String content =
				"<header>"
						+ "<h1>Uspjesno ste potvrdili registraciju</h1>"
						+ "</header>";
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.setContentType(MediaType.TEXT_HTML);

		return new ResponseEntity<String>(content, responseHeaders, HttpStatus.OK);
	}
	
	@PostMapping(path = "/post/{taskId}", produces = "application/json")
    public @ResponseBody ResponseEntity post(@RequestBody List<FormSubmissionDto> dto, @PathVariable String taskId) {
		HashMap<String, Object> map = this.mapListToDto(dto);
		
		    // list all running/unsuspended instances of the process
//		    ProcessInstance processInstance =
//		        runtimeService.createProcessInstanceQuery()
//		            .processDefinitionKey("Process_1")
//		            .active() // we only want the unsuspended process instances
//		            .list().get(0);
		
//			Task task = taskService.createTaskQuery().processInstanceId(processInstance.getId()).list().get(0);
		
		
		
		Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
		String processInstanceId = task.getProcessInstanceId();
		runtimeService.setVariable(processInstanceId, "registration", dto);
		formService.submitTaskForm(taskId, map);

        return new ResponseEntity<>(HttpStatus.OK);
    }
	
	@PostMapping(path = "/tasks/claim/{taskId}", produces = "application/json")
    public @ResponseBody ResponseEntity claim(@PathVariable String taskId) {
		Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
		String processInstanceId = task.getProcessInstanceId();
		String user = (String) runtimeService.getVariable(processInstanceId, "username");
		taskService.claim(taskId, user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
	
	@PostMapping(path = "/tasks/complete/{taskId}", produces = "application/json")
    public @ResponseBody ResponseEntity<List<TaskDto>> complete(@PathVariable String taskId) {
		Task taskTemp = taskService.createTaskQuery().taskId(taskId).singleResult();
		taskService.complete(taskId);
		List<Task> tasks = taskService.createTaskQuery().processInstanceId(taskTemp.getProcessInstanceId()).list();
		List<TaskDto> dtos = new ArrayList<TaskDto>();
		for (Task task : tasks) {
			TaskDto t = new TaskDto(task.getId(), task.getName(), task.getAssignee());
			dtos.add(t);
		}
        return new ResponseEntity<List<TaskDto>>(dtos, HttpStatus.OK);
    }

	@GetMapping(path = "/getReviewerConfirmForm", produces = "application/json")
	public @ResponseBody FormFieldsDto getReviewerConfirmForm() {

		//List<Task> tasks = taskService.createTaskQuery().taskDefinitionKey("Approve_reviewer").list();
		//runtimeService.deleteProcessInstance("9ecb10b9-37c3-11ea-bae3-28c63fe250d7", null);

		Task task = taskService.createTaskQuery().taskDefinitionKey("Approve_reviewer").singleResult();

		TaskFormData tfd = formService.getTaskFormData(task.getId());
		List<FormField> properties = tfd.getFormFields();
		return new FormFieldsDto(task.getId(), "", properties);
	}

	@PostMapping(path = "/postFormConfirmReviewer/{taskId}", produces = "application/json")
	public @ResponseBody ResponseEntity postFormConfirmReviewer(@RequestBody List<FormSubmissionDto> dto, @PathVariable String taskId) {

		HashMap<String, Object> map = this.mapListToDto(dto);

		Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
		String processInstanceId = task.getProcessInstanceId();
		runtimeService.setVariable(processInstanceId, "approvedrev", dto);
		formService.submitTaskForm(taskId, map);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	private HashMap<String, Object> mapListToDto(List<FormSubmissionDto> list)
	{
		HashMap<String, Object> map = new HashMap<String, Object>();
		for(FormSubmissionDto temp : list){
			if(temp.getFieldId().equals("scientificFields"))
				map.put(temp.getFieldId(), temp.getFieldListValue().get(0));
			else
				map.put(temp.getFieldId(), temp.getFieldValue());
		}
		return map;
	}
}
