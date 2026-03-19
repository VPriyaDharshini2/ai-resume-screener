"use client";

import { useState } from "react";
import {
    FileText,
    Upload,
    Users,
    Award,
    Search,
    Sparkles,
    GraduationCap,
    Briefcase,
    BarChart3,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Mock Candidate Data                                                */
/* ------------------------------------------------------------------ */

const MOCK_CANDIDATES = [
    {
        name: "Sarah Chen",
        email: "sarah.chen@email.com",
        skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "Docker"],
        experience_years: 5,
        education: "M.S. Computer Science, Stanford",
        similarity_score: 0.92,
    },
    {
        name: "James Rodriguez",
        email: "j.rodriguez@email.com",
        skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
        experience_years: 4,
        education: "B.S. Software Engineering, MIT",
        similarity_score: 0.78,
    },
    {
        name: "Priya Patel",
        email: "priya.p@email.com",
        skills: ["Data Science", "Python", "R", "Tableau", "Statistics"],
        experience_years: 3,
        education: "M.S. Data Science, UC Berkeley",
        similarity_score: 0.71,
    },
];

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function ScoreBar({ score }: { score: number }) {
    const pct = Math.round(score * 100);
    const color =
        score >= 0.8
            ? "bg-emerald-400"
            : score >= 0.6
                ? "bg-amber-400"
                : "bg-red-400";

    return (
        <div className="flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-secondary">
                <div
                    className={`h-2 rounded-full ${color} transition-all duration-700`}
                    style={{ width: `${pct}%` }}
                />
            </div>
            <span className="text-sm font-bold w-12 text-right">{pct}%</span>
        </div>
    );
}

function CandidateCard({
    candidate,
    rank,
}: {
    candidate: (typeof MOCK_CANDIDATES)[0];
    rank: number;
}) {
    return (
        <div className="glass-card rounded-xl p-5 transition-all hover:border-primary/30">
            <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-lg font-bold text-primary shrink-0">
                    {rank}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-lg">{candidate.name}</h3>
                        <span className="text-xs text-muted-foreground">{candidate.email}</span>
                    </div>

                    <div className="mb-3">
                        <ScoreBar score={candidate.similarity_score} />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Briefcase className="h-3.5 w-3.5 text-primary" />
                            <span>{candidate.experience_years} years exp.</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <GraduationCap className="h-3.5 w-3.5 text-primary" />
                            <span>{candidate.education}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                        {candidate.skills.map((skill) => (
                            <span
                                key={skill}
                                className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function ResumeScreenerPage() {
    const [jobDescription, setJobDescription] = useState("");
    const [showResults, setShowResults] = useState(false);

    return (
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Header */}
            <header className="text-center mb-12">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-medium text-primary">
                        NLP-Powered Resume Analysis
                    </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                    <span className="gradient-text">AI Resume Screener</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Upload resumes and a job description. Our NLP pipeline extracts
                    skills, computes cosine similarity, and ranks candidates automatically.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Panel */}
                <div className="lg:col-span-1">
                    <div className="glass-card rounded-xl p-6 sticky top-8">
                        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <Search className="h-5 w-5 text-primary" />
                            Job Matching
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">
                                    Job Description
                                </label>
                                <textarea
                                    rows={5}
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    placeholder="Paste the job description here..."
                                    className="w-full rounded-lg border border-input bg-secondary/50 px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">
                                    Upload Resumes (PDF)
                                </label>
                                <div className="rounded-lg border-2 border-dashed border-input bg-secondary/30 p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">
                                        Drop PDF files here or click to browse
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Max 10 files, 5MB each
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowResults(true)}
                                className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
                            >
                                <BarChart3 className="h-4 w-4" />
                                Screen &amp; Rank
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="mt-6 pt-6 border-t border-border grid grid-cols-2 gap-3">
                            <div className="rounded-lg bg-secondary/50 p-3 text-center">
                                <FileText className="h-4 w-4 mx-auto mb-1 text-primary" />
                                <p className="text-lg font-bold">3</p>
                                <p className="text-xs text-muted-foreground">Resumes</p>
                            </div>
                            <div className="rounded-lg bg-secondary/50 p-3 text-center">
                                <Users className="h-4 w-4 mx-auto mb-1 text-primary" />
                                <p className="text-lg font-bold">15</p>
                                <p className="text-xs text-muted-foreground">Skills Found</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-2 space-y-4">
                    {showResults ? (
                        <>
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    <Award className="h-5 w-5 text-primary" />
                                    Ranked Candidates
                                </h2>
                                <span className="text-sm text-muted-foreground">
                                    Sorted by cosine similarity
                                </span>
                            </div>
                            {MOCK_CANDIDATES.map((candidate, i) => (
                                <CandidateCard key={i} candidate={candidate} rank={i + 1} />
                            ))}
                        </>
                    ) : (
                        <div className="glass-card rounded-xl p-12 text-center">
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                                <FileText className="h-8 w-8 text-primary" />
                            </div>
                            <h2 className="text-xl font-semibold mb-2">Upload Resumes</h2>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                Add a job description and upload candidate resumes to get
                                AI-powered skill extraction and ranking with cosine similarity
                                matching.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
