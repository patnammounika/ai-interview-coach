package com.interviewcoach.dto;

import java.util.List;

public class QuestionResponse {
    private List<String> questions;
    private String jobRole;
    private String difficulty;

    public QuestionResponse() {}

    public List<String> getQuestions() { return questions; }
    public void setQuestions(List<String> questions) { this.questions = questions; }

    public String getJobRole() { return jobRole; }
    public void setJobRole(String jobRole) { this.jobRole = jobRole; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
}
