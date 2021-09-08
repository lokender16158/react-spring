package com.loki.myapplication.myapps.web.dto;

public class AddApplicationResponseDTO {
    String body;

    public AddApplicationResponseDTO(String body) {
        this.body = body;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
}
