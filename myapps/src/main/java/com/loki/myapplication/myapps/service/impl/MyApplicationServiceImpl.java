package com.loki.myapplication.myapps.service.impl;

import com.loki.myapplication.myapps.data.entity.MyApplication;
import com.loki.myapplication.myapps.data.repository.MyApplicationRepository;
import com.loki.myapplication.myapps.service.FileStorageService;
import com.loki.myapplication.myapps.service.MyApplicationService;
import com.loki.myapplication.myapps.service.exception.ApplicationAlreadyExistException;
import com.loki.myapplication.myapps.service.exception.FileStorageException;
import com.loki.myapplication.myapps.service.exception.NoApplicationFoundException;
import com.loki.myapplication.myapps.web.dto.AddApplicationResponseDTO;
import com.loki.myapplication.myapps.web.dto.MyApplicationDTO;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.util.List;

@Service
public class MyApplicationServiceImpl implements MyApplicationService {

    @Autowired
    MyApplicationRepository myApplicationRepository;

    @Autowired
    FileStorageService fileStorageService;

    @Override
    public long addApplication(MyApplicationDTO myApplicationDTO){
        String appName = myApplicationDTO.getAppName();
        if (myApplicationRepository.existsByAppName(appName) ) {
            throw new ApplicationAlreadyExistException("Application exists by name: " + appName);
        }

        return  saveApplication(myApplicationDTO,null, saveFile(myApplicationDTO.getFile()));
    }



    @Override
    public long updateApplication(MyApplicationDTO myApplicationDTO, long appId) {
        if(!myApplicationRepository.existsById(appId)) {
            throw new NoApplicationFoundException("No application found");
        }
        MyApplication newApplication = myApplicationRepository.findById(appId).get();

        String name = myApplicationDTO.getAppName();
        if(myApplicationRepository.existsByAppName(name) && !name.equals(newApplication.getAppName())) {
            throw new ApplicationAlreadyExistException("Application exists by name: " + name);
        }

        if(myApplicationDTO.getFile() == null && (newApplication.getImageURL() == null || newApplication.getImageURL().isEmpty())) {
            throw new FileStorageException("File not valid");
        }

        return  saveApplication(myApplicationDTO,newApplication,
                myApplicationDTO.getFile()!=null ? saveFile(myApplicationDTO.getFile()) : newApplication.getImageURL());
    }

    @Override
    public List<MyApplication> fetchAllApplications() {
        return (List<MyApplication>) myApplicationRepository.findAll();
    }

    @Override
    public MyApplication fetchApplication(long appId) {
        if(!myApplicationRepository.existsById(appId)) {
            throw new NoApplicationFoundException("No application found!");
        }
        return myApplicationRepository.findById(appId).get();
    }

    @Override
    public void deleteMyApplication(long appId) {
        if(!myApplicationRepository.existsById(appId)) {
            throw new NoApplicationFoundException("No application found!");
        }
         myApplicationRepository.deleteById(appId);
    }

    String saveFile(MultipartFile file) {
        String fileDownloadUri = null;
        if(file != null ) {
            String fileName = fileStorageService.storeFile(file);

            fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/downloadFile/")
                    .path(fileName)
                    .toUriString();
        } else {
            throw new FileStorageException("File not valid");
        }
        return  fileDownloadUri;
    }


    private long saveApplication(MyApplicationDTO myApplicationDTO, MyApplication newApplication, String fileDownloadUri) {

        if(newApplication == null)
            newApplication = new MyApplication();

        newApplication.setAppName(myApplicationDTO.getAppName());
        newApplication.setAppLabel(myApplicationDTO.getAppLabel());
        newApplication.setAppURL(myApplicationDTO.getAppURL());
        newApplication.setAppPriority(myApplicationDTO.getAppPriority());
        newApplication.setImageURL(fileDownloadUri);
        MyApplication application = myApplicationRepository.save(newApplication);
        return application.getAppId();
    }



}
