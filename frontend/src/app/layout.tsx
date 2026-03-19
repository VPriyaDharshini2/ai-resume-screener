import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "AI Resume Screener — NLP-Powered Candidate Ranking",
    description: "Screen and rank resumes using AI-powered skill extraction and cosine similarity matching.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark">
            <body className="min-h-screen bg-background font-sans">
                <div className="relative min-h-screen">
                    <div className="pointer-events-none fixed inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-sky-500/8 blur-3xl" />
                        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-violet-500/8 blur-3xl" />
                    </div>
                    <main className="relative z-10">{children}</main>
                </div>
            </body>
        </html>
    );
}
