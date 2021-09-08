package com.loki.myapplication.myapps.service;

import com.loki.myapplication.myapps.data.entity.MyApplication;
import com.loki.myapplication.myapps.service.exception.ApplicationAlreadyExistException;
import com.loki.myapplication.myapps.web.dto.MyApplicationDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface MyApplicationService {

     long addApplication(MyApplicationDTO myApplicationDTO);

     long updateApplication(MyApplicationDTO myApplicationDTO, long appId);

     List<MyApplication> fetchAllApplications();

     MyApplication fetchApplication(long appId);

     void deleteMyApplication(long appId);



}
