package com.interviewcoach.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewcoach.dto.InterviewRequest;
import com.interviewcoach.dto.InterviewResponse;
import com.interviewcoach.dto.QuestionResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";

    public QuestionResponse generateQuestions(String jobRole, String difficulty, int count) {
        String prompt = String.format("""
            Generate %d unique interview questions for a %s role at %s difficulty level.
            Return ONLY a JSON object in this exact format (no markdown, no explanation):
            {
              "questions": ["question1", "question2", "question3", "question4", "question5"]
            }
            Mix technical and behavioral questions. Make them realistic and challenging.
            """, count, jobRole, difficulty);

        String rawResponse = callOpenAI(prompt);
        QuestionResponse response = new QuestionResponse();
        response.setJobRole(jobRole);
        response.setDifficulty(difficulty);

        try {
            String cleaned = rawResponse.replaceAll("```json|```", "").trim();
            JsonNode node = objectMapper.readTree(cleaned);
            List<String> questions = new ArrayList<>();
            node.get("questions").forEach(q -> questions.add(q.asText()));
            response.setQuestions(questions);
        } catch (Exception e) {
            response.setQuestions(List.of("Tell me about yourself.",
                    "What are your strengths and weaknesses?",
                    "Why do you want this role?",
                    "Describe a challenging project you worked on.",
                    "Where do you see yourself in 5 years?"));
        }
        return response;
    }

    public InterviewResponse evaluateAnswer(InterviewRequest request) {
        String prompt = String.format("""
            You are an expert interview coach. Evaluate the candidate's answer below.
            
            Job Role: %s
            Question: %s
            Candidate's Answer: %s
            Difficulty: %s
            
            Return ONLY a JSON object (no markdown, no explanation):
            {
              "score": <integer 1-10>,
              "grade": "<A/B/C/D/F>",
              "feedback": "<2-3 sentence overall feedback>",
              "idealAnswer": "<what a perfect answer would look like>",
              "strengths": ["<strength1>", "<strength2>"],
              "improvements": ["<improvement1>", "<improvement2>"],
              "tip": "<one quick actionable tip for next time>"
            }
            """,
                request.getJobRole(),
                request.getQuestion(),
                request.getUserAnswer(),
                request.getDifficulty());

        String rawResponse = callOpenAI(prompt);
        InterviewResponse response = new InterviewResponse();

        try {
            String cleaned = rawResponse.replaceAll("```json|```", "").trim();
            JsonNode node = objectMapper.readTree(cleaned);

            response.setScore(node.get("score").asInt());
            response.setGrade(node.get("grade").asText());
            response.setFeedback(node.get("feedback").asText());
            response.setIdealAnswer(node.get("idealAnswer").asText());
            response.setTip(node.get("tip").asText());

            List<String> strengths = new ArrayList<>();
            node.get("strengths").forEach(s -> strengths.add(s.asText()));
            response.setStrengths(strengths);

            List<String> improvements = new ArrayList<>();
            node.get("improvements").forEach(i -> improvements.add(i.asText()));
            response.setImprovements(improvements);

        } catch (Exception e) {
            response.setScore(5);
            response.setGrade("C");
            response.setFeedback("Could not evaluate answer. Please try again.");
            response.setStrengths(List.of("Answer provided"));
            response.setImprovements(List.of("Please provide more detail"));
            response.setTip("Try to be more specific in your answers.");
        }

        return response;
    }

    private String callOpenAI(String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", prompt);

        Map<String, Object> body = new HashMap<>();
        body.put("model", "gpt-4o");
        body.put("messages", List.of(message));
        body.put("temperature", 0.4);
        body.put("max_tokens", 1000);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(OPENAI_URL, entity, String.class);
            JsonNode root = objectMapper.readTree(response.getBody());
            return root.get("choices").get(0).get("message").get("content").asText();
        } catch (Exception e) {
            return "{}";
        }
    }
}
