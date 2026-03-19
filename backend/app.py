"""AI Resume Screener — Flask Backend

NLP pipeline for skill extraction and candidate ranking.
Uses PyMuPDF for lightweight PDF parsing and Gemini API for embeddings.
Optimized for <200MB RAM on Render Free Tier.
"""

import os
import time
import json
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from pydantic import BaseModel, Field


# --- Pydantic Models ---

class CandidateResult(BaseModel):
    """Parsed candidate resume result."""
    name: str = Field(default="Unknown")
    email: str = Field(default="")
    skills: list[str] = Field(default_factory=list)
    experience_years: int = Field(default=0)
    education: str = Field(default="")
    similarity_score: float = Field(default=0.0, ge=0, le=1)


class RankingResponse(BaseModel):
    """Ranked list of candidates."""
    job_description: str
    candidates: list[CandidateResult]
    total_processed: int


# --- Application ---

app = Flask(__name__)
CORS(app, origins=["http://localhost:3002", "https://*.vercel.app"])


@app.route("/health", methods=["GET"])
def health_check():
    """Health endpoint for Render's spin-up logic."""
    return jsonify({
        "status": "ok",
        "service": "ai-resume-screener",
        "timestamp": time.time(),
    })


def cosine_similarity(vec_a: np.ndarray, vec_b: np.ndarray) -> float:
    """Compute cosine similarity between two vectors using NumPy."""
    dot = np.dot(vec_a, vec_b)
    norm_a = np.linalg.norm(vec_a)
    norm_b = np.linalg.norm(vec_b)
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return float(dot / (norm_a * norm_b))


@app.route("/screen", methods=["POST"])
def screen_resumes():
    """Screen and rank resumes against a job description.
    
    Expects multipart form data with:
    - job_description: string
    - resumes: file(s)
    
    TODO: Integrate PyMuPDF parsing and Gemini embeddings.
    Currently returns a placeholder response.
    """
    job_description = request.form.get("job_description", "")
    
    if not job_description:
        return jsonify({"error": "job_description is required"}), 400

    # Placeholder — will be replaced with actual PDF parsing + embedding logic
    return jsonify({
        "job_description": job_description,
        "candidates": [],
        "total_processed": 0,
    })


@app.route("/extract-skills", methods=["POST"])
def extract_skills():
    """Extract skills from a single resume file.
    
    TODO: Implement PyMuPDF parsing + Gemini API skill extraction.
    """
    return jsonify({
        "skills": [],
        "raw_text_length": 0,
    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 8002)),
        debug=True,
    )
