package com.loki.myapplication.myapps.data.entity;

import javax.persistence.*;

@Entity
@Table(name = "MYAPPLICATION")
public class MyApplication {

    @Id
    @Column(name = "APP_ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private  long appId;

    @Column(name = "NAME")
    private String appName;

    @Column(name = "LABEL")
    private String appLabel;

    @Column(name = "PRIORITY")
    private int appPriority;

    @Column(name = "URL")
    private String appURL;

    @Column(name = "IMAGE_URL")
    private String imageURL;

    public long getAppId() {
        return appId;
    }

    public void setAppId(long appId) {
        this.appId = appId;
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

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }
}
