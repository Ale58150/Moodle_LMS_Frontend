import axios from "axios";

export interface ApiErrorBody {
    success?: boolean;
    statusCode?: number;
    message: string;
    error?: string;
}

export function getApiErrorCode(error: unknown): string | undefined {
    if (axios.isAxiosError(error)) {
        return (error.response?.data as ApiErrorBody | undefined)?.error;
    }
    return undefined;
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as ApiErrorBody | undefined;
        if (data?.message) return data.message;
    }
    return fallback;
}