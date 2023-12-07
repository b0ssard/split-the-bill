export interface ApiResponse {
  result: string;
  base_code: string;
  conversion_rates: {
    USD: number;
    EUR: number;
    CAD: number;
  };
}

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_CURRENCY = "BRL";
const apiUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${BASE_CURRENCY}`;

export const getExchangeRates = async (): Promise<ApiResponse | null> => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.result === "success") {
      return data;
    }

    console.error("Error response:", data);
    return null;
  } catch (error) {
    console.error("API request failed:", error);
    return null;
  }
};
