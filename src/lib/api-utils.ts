export interface ApiResponse<T> {
    code: string;
    message: string;
    data: T;
}

export class ApiError extends Error {
    code: string;
    data?: unknown;

    constructor(message: string, code: string, data?: unknown) {
        super(message);
        this.name = 'ApiError';
        this.code = code;
        this.data = data;
    }
}

export async function handleApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
        throw new ApiError(`HTTP error! status: ${response.status}`, response.status.toString());
    }

    const responseData: ApiResponse<T> = await response.json();
    return responseData;
}
