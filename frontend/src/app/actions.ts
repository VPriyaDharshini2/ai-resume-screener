"use server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8002";

export async function screenResumes(formData: FormData) {
    try {
        const response = await fetch(`${BACKEND_URL}/screen`, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) return { success: false, error: `Backend returned ${response.status}` };
        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Connection failed" };
    }
}

export async function extractSkills(formData: FormData) {
    try {
        const response = await fetch(`${BACKEND_URL}/extract-skills`, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) return { success: false, error: `Backend returned ${response.status}` };
        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Connection failed" };
    }
}
