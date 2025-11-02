export type ExperienceDto = {
  id: number;
  roleTitle: string;
  companyName: string;
  location: string;
  startDate: string;
  endDate: string | null;
  descriptionMd: string;
  orderIndex: number;
  createdAt: string;
};

export type CreateExperienceDto = {
  roleTitle: string;
  companyName: string;
  location: string;
  startDate: string;
  endDate?: string;
  descriptionMd: string;
  orderIndex: number;
};

const API_BASE = process.env.REACT_APP_API_BASE ?? 'http://localhost:8080';

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Request failed');
  }
  return response.json() as Promise<T>;
};

export const fetchExperiences = async (): Promise<ExperienceDto[]> => {
  const response = await fetch(`${API_BASE}/api/experiences`);
  return handleResponse<ExperienceDto[]>(response);
};

export const createExperience = async (payload: CreateExperienceDto): Promise<ExperienceDto> => {
  const response = await fetch(`${API_BASE}/api/experiences`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return handleResponse<ExperienceDto>(response);
};
