
import axios, { AxiosInstance } from 'axios';

export interface StoreDto {
  id?: string;
  name?: string;
  description?: string;
  address?: string;
  phone?: string;
  facebookURL?: string;
  instagramURL?: string;
  tiktokURL?: string;
}

export class StoreService {
  private api: AxiosInstance;

  constructor(baseURL: string = 'http://localhost:3001') {
    this.api = axios.create({
      baseURL: `${baseURL}/stores`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async findById(id: string): Promise<StoreDto> {
    const response = await this.api.get<StoreDto>(`/${id}`);
    return response.data;
  }

  async update(id: string, storeDto: Partial<StoreDto>): Promise<StoreDto> {
    const response = await this.api.patch<StoreDto>(`/${id}`, storeDto);
    return response.data;
  }
}
