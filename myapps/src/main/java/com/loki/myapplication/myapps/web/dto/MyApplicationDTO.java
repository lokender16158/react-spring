package com.loki.myapplication.myapps.web.dto;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class MyApplicationDTO {



    @NotNull
    @NotEmpty
    private String appName;

    @NotNull
    private String appLabel;

    @Min(value = 1)
    @Max(value = 10)
    private int appPriority;

    @NotNull
    @NotEmpty
    private String appURL;

    private MultipartFile file;

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getAppLabel() {
        return appLabel;
    }

    public void setAppLabel(String appLabel) {
        this.appLabel = appLabel;
    }

    public int getAppPriority() {
        return appPriority;
    }

    public void setAppPriority(int appPriority) {
        this.appPriority = appPriority;
    }

    public String getAppURL() {
        return appURL;
    }

    public void setAppURL(String appURL) {
        this.appURL = appURL;
    }


}
