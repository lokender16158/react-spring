package com.loki.myapplication.myapps.data.repository;


import com.loki.myapplication.myapps.data.entity.MyApplication;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyApplicationRepository extends CrudRepository<MyApplication,Long> {

    public boolean existsByAppName(String appName);
}

