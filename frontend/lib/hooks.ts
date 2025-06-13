import { useAuthStore } from "./store";

export const useUserJwtToken = (): string | undefined => {
	return useAuthStore((state) => state.accessToken)	
};