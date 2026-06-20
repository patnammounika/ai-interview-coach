package com.interviewcoach.controller;

import com.interviewcoach.dto.InterviewRequest;
import com.interviewcoach.dto.InterviewResponse;
import com.interviewcoach.dto.QuestionResponse;
import com.interviewcoach.service.OpenAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/interview")
@CrossOrigin(origins = "*")
public class InterviewController {

    @Autowired
    private OpenAIService openAIService;

    // Generate interview questions
    @GetMapping("/questions")
    public ResponseEntity<QuestionResponse> generateQuestions(
            @RequestParam String jobRole,
            @RequestParam(defaultValue = "medium") String difficulty,
            @RequestParam(defaultValue = "5") int count) {

        QuestionResponse response = openAIService.generateQuestions(jobRole, difficulty, count);
        return ResponseEntity.ok(response);
    }

    // Evaluate candidate answer
    @PostMapping("/evaluate")
    public ResponseEntity<InterviewResponse> evaluateAnswer(
            @RequestBody InterviewRequest request) {

        InterviewResponse response = openAIService.evaluateAnswer(request);
        return ResponseEntity.ok(response);
    }

    // Health check
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("AI Interview Coach API is running!");
    }
}
