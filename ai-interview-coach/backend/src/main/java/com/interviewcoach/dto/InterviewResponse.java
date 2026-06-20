package com.interviewcoach.dto;

import java.util.List;

public class InterviewResponse {
    private int score;
    private String grade;
    private String feedback;
    private String idealAnswer;
    private List<String> strengths;
    private List<String> improvements;
    private String tip;

    public InterviewResponse() {}

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public String getIdealAnswer() { return idealAnswer; }
    public void setIdealAnswer(String idealAnswer) { this.idealAnswer = idealAnswer; }

    public List<String> getStrengths() { return strengths; }
    public void setStrengths(List<String> strengths) { this.strengths = strengths; }

    public List<String> getImprovements() { return improvements; }
    public void setImprovements(List<String> improvements) { this.improvements = improvements; }

    public String getTip() { return tip; }
    public void setTip(String tip) { this.tip = tip; }
}
