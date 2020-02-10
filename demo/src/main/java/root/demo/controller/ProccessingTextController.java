package root.demo.controller;

import org.camunda.bpm.engine.*;
import org.camunda.bpm.engine.form.FormField;
import org.camunda.bpm.engine.form.TaskFormData;
import org.camunda.bpm.engine.impl.form.type.EnumFormType;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.task.Task;
import org.camunda.bpm.model.bpmn.instance.UserTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import root.demo.model.*;
import root.demo.repository.MagazineRepository;
import root.demo.repository.ScientificFieldsRepository;
import root.demo.repository.UserRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/text")
public class ProccessingTextController {

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
    MagazineRepository magazineRepository;

    @Autowired
    ScientificFieldsRepository scientificFieldsRepository;


    @Autowired
    UserRepository userRepository;

    @GetMapping(path = "/get/{username}", produces = "application/json")
    public @ResponseBody
    FormFieldsDto get(@PathVariable String username) {
        ProcessInstance pi = runtimeService.startProcessInstanceByKey("ProcessingText");
        Task task = taskService.createTaskQuery().processInstanceId(pi.getId()).list().get(0);

        UserTask userTask = repositoryService
                .getBpmnModelInstance(pi.getProcessDefinitionId())
                .getModelElementById("chooseMagazine");
        String candidateGroups = userTask.getCamundaCandidateGroups();
        User user=userRepository.findByUsername(username);

        if (user != null && candidateGroups.equals(user.getRole())) {
            TaskFormData tfd = formService.getTaskFormData(task.getId());
            List<FormField> properties = tfd.getFormFields();
            List<Magazine> magazineList = magazineRepository.findAll();

            if (properties != null) {
                for (FormField field : properties) {
                    if (field.getId().equals("magazine_type")) {
                        //ovo je nase select polje
                        EnumFormType enumFormType = (EnumFormType) field.getType();
                        Map<String, String> items = enumFormType.getValues();
                        for (Magazine magazine : magazineList) {
                            items.put(magazine.getName(), magazine.getName());
                        }
                    }
                }
            }

            return new FormFieldsDto(task.getId(), pi.getId(), properties);
        } else {
            return new FormFieldsDto();
        }
    }

    @PostMapping(path = "/post/{taskId}", produces = "application/json")
    public @ResponseBody
    ResponseEntity post(@RequestBody List<FormSubmissionDto> dto, @PathVariable String taskId) {

        HashMap<String, Object> map = this.mapListToDto(dto);

        Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
        String processInstanceId = task.getProcessInstanceId();
        runtimeService.setVariable(processInstanceId, "submitmagazine", dto);
        formService.submitTaskForm(taskId, map);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path = "/getDues/{processInstanceId}", produces = "application/json")
    public @ResponseBody String getDues(@PathVariable String processInstanceId) {
        Boolean rez = (Boolean)runtimeService.getVariable(processInstanceId, "dues");
        return rez.toString();
    }

    @GetMapping(path = "/getPayForm/{processInstanceId}", produces = "application/json")
    public @ResponseBody FormFieldsDto getPayForm(@PathVariable String processInstanceId) {

        Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).taskDefinitionKey("payForm").singleResult();;

        TaskFormData tfd = formService.getTaskFormData(task.getId());
        List<FormField> properties = tfd.getFormFields();
        return new FormFieldsDto(task.getId(), "", properties);
    }


    @PostMapping(path = "/putPayDues/{taskId}", produces = "application/json")
    public @ResponseBody ResponseEntity putActivateMagazine(@RequestBody List<FormSubmissionDto> dto, @PathVariable String taskId) {

        HashMap<String, Object> map = this.mapListToDto(dto);

        Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
        String processInstanceId = task.getProcessInstanceId();
        runtimeService.setVariable(processInstanceId, "pay", dto.get(0).getFieldValue());
        formService.submitTaskForm(taskId, map);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path = "/getEnterDataForm/{processInstanceId}", produces = "application/json")
    public @ResponseBody FormFieldsDto getEnterDataForm(@PathVariable String processInstanceId) {
        ProcessInstance pi = runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();


        List<FormSubmissionDto> magazine = (List<FormSubmissionDto>)runtimeService.getVariable(processInstanceId, "submitmagazine");
        String username = magazine.get(1).getFieldValue();

        User user = userRepository.findByUsername(username);

        UserTask userTask = repositoryService
                .getBpmnModelInstance(pi.getProcessDefinitionId())
                .getModelElementById("enterData");
        String candidateGroups = userTask.getCamundaCandidateGroups();

        if(user != null && user.getRole().equals(candidateGroups)){

            Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).taskDefinitionKey("enterData").singleResult();;

            TaskFormData tfd = formService.getTaskFormData(task.getId());
            List<FormField> properties = tfd.getFormFields();

            List<ScientificField> sciFields = scientificFieldsRepository.findAll();

            if(properties!=null) {
                for (FormField field : properties) {
                    if (field.getId().equals("scientific_area")) {
                        EnumFormType enumFormType = (EnumFormType)field.getType();
                        Map<String, String> items = enumFormType.getValues();
                        for(ScientificField sciField:sciFields){
                            items.put(sciField.getName(), sciField.getId().toString());
                        }
                    }
                }
            }

            return new FormFieldsDto(task.getId(), "", properties);
        }

        return new FormFieldsDto();
    }



    @PostMapping(path = "/submitEnterData/{taskId}", produces = "application/json")
    public @ResponseBody
    ResponseEntity submitEnterData(@RequestBody List<FormSubmissionDto> dto, @PathVariable String taskId) {

        HashMap<String, Object> map = this.mapListToDto(dto);

        Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
        String processInstanceId = task.getProcessInstanceId();
        runtimeService.setVariable(processInstanceId, "submitenterdata", dto);
        formService.submitTaskForm(taskId, map);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path = "/getFormForReview/{processInstanceId}", produces = "application/json")
    public @ResponseBody FormFieldsDto getForm2(@PathVariable String processInstanceId) {

        Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).
                taskDefinitionKey("form2").singleResult();

        TaskFormData tfd = formService.getTaskFormData(task.getId());
        List<FormField> properties = tfd.getFormFields();
        return new FormFieldsDto(task.getId(), "", properties);
    }


    private HashMap<String, Object> mapListToDto(List<FormSubmissionDto> list)
    {
        HashMap<String, Object> map = new HashMap<String, Object>();
        for(FormSubmissionDto temp : list){
            if(temp.getFieldId().equals("scientificFields"))
                map.put(temp.getFieldId(), temp.getFieldListValue().get(0));
            else if(temp.getFieldId().equals("payment"))
                map.put(temp.getFieldId(), temp.getFieldListValue().get(0));
            else if(temp.getFieldId().equals("reviewers"))
                map.put(temp.getFieldId(), temp.getFieldListValue().get(0));
            else if(temp.getFieldId().equals("editors"))
                map.put(temp.getFieldId(), temp.getFieldListValue().get(0));
            else
                map.put(temp.getFieldId(), temp.getFieldValue());
        }
        return map;
    }
}
