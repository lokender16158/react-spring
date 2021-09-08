package com.loki.myapplication.myapps.web.controller;

import com.loki.myapplication.myapps.data.entity.MyApplication;
import com.loki.myapplication.myapps.data.repository.MyApplicationRepository;
import com.loki.myapplication.myapps.payload.UploadFileResponse;
import com.loki.myapplication.myapps.service.FileStorageService;
import com.loki.myapplication.myapps.service.MyApplicationService;
import com.loki.myapplication.myapps.service.exception.ApplicationAlreadyExistException;
import com.loki.myapplication.myapps.web.dto.AddApplicationResponseDTO;
import com.loki.myapplication.myapps.web.dto.MyApplicationDTO;
import com.loki.myapplication.myapps.web.util.GenericResponse;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3006")
public class MyApplicationRestController {

    protected final Log logger = LogFactory.getLog(this.getClass());


    @Autowired
    MyApplicationRepository myApplicationRepository;

    @Autowired
    MyApplicationService myApplicationService;

    @Autowired
    private FileStorageService fileStorageService;



    @PostMapping(value = "/addApp", produces = MediaType.APPLICATION_JSON_VALUE)
    public GenericResponse addApplication2(@ModelAttribute @Valid MyApplicationDTO myApplicationDTO) {
        long id = myApplicationService.addApplication(myApplicationDTO);
        return new GenericResponse("Application added with id: " + id);

    }
    @PostMapping("/updateApp")
    @ResponseBody
    public GenericResponse updateApplication(@RequestParam long appId,@ModelAttribute  MyApplicationDTO myApplicationDTO) {
        long id = myApplicationService.updateApplication(myApplicationDTO, appId);
        return new GenericResponse("Application updated with id: " + id);

    }

    @PostMapping("/uploadFile")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            System.out.println("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @GetMapping("/getApps")
    public List<MyApplication> fetchApplications() {
        return myApplicationService.fetchAllApplications();
    }

    @GetMapping("/getApp")
    public MyApplication fetchApplication(@RequestParam long appId) {
        return myApplicationService.fetchApplication(appId);
    }

    @GetMapping("/deleteApp")
    public GenericResponse deleteApplication(@RequestParam long appId) {
        myApplicationService.deleteMyApplication(appId);
        return new GenericResponse("Application deleted");
    }
}
