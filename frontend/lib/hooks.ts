import axios, { AxiosError } from "axios";
import { useAuthStore } from "./store";
import useSWR, { useSWRConfig } from "swr";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { ProductCategory, Product, UserProfile, Wishlist, Cart } from "./types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AuthContext } from "./auth-context";

export const useAxios = () => {
  const accessToken = useUserJwtToken();
  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      ...(accessToken && {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    });
  }, [accessToken]);

  return axiosInstance;
};

export const useUserJwtToken = (): string | undefined => {
  const { accessToken } = useContext(AuthContext);
  return accessToken;
};

export const useUser = () => {
  const accessToken = useUserJwtToken();
};

export const useUserProfile = () => {
  const accessToken = useUserJwtToken();
  console.log(accessToken);
  const clearAccessToken = useAuthStore((state) => state.clearToken);
  const { mutate } = useSWRConfig();

  const fetcher = useCallback(() => {
    if (!accessToken) {
      // router.push("/login");
      return undefined;
    }
    return axios
      .get<UserProfile>("/api/v1/profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((r) => r.data)
      .catch((err: AxiosError) => {
        if (err.status === 401) {
          clearAccessToken();
          return undefined;
        }
        throw err;
      });
  }, [accessToken, clearAccessToken]);

  const swr = useSWR("/api/user/profile", fetcher);

  // Refetches profile information when accessToken changes
  useEffect(() => {
    mutate("/api/user/profile");
  }, [accessToken]);

  return swr;
};

export const useProductCategories = () => {
  const axios = useAxios();
  const fetcher = useCallback(
    () => axios.get<ProductCategory[]>("/api/v1/category").then((r) => r.data),
    [axios]
  );
  const categories = useSWR("/api/category", fetcher);
  return categories;
};

export const useProduct = ({ productId }: { productId: string }) => {
  const axios = useAxios();
  const url = useMemo(() => "/api/v1/product/" + productId, [productId]);
  const fetcher = useCallback(
    () => axios.get<Product>(url).then((r) => r.data),
    [axios, productId]
  );
  const product = useSWR(url, fetcher);
  return product;
};

export const useWishlistProduct = ({ productId }: { productId: number }) => {
  const axios = useAxios();
  const { mutate } = useSWRConfig();
  const wishlist = async () => {
    try {
      const r = await axios.post<boolean>("/api/v1/wishlist/" + productId);
      if (r.data) {
        toast.success("Wishlisted !");
      } else {
        toast.error("Failed to wishlist");
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to wishlist");
    } finally {
      mutate("/api/v1/product/" + productId);
      mutate("/api/v1/wishlist");
    }
  };

  const dewishlist = async () => {
    try {
      const r = await axios.delete<boolean>("/api/v1/wishlist/" + productId);
      if (r.data) {
        toast.success("Removed from wishlist");
      } else {
        toast.error("Was not wishlisted");
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    } finally {
      mutate("/api/v1/product/" + productId);
      mutate("/api/v1/wishlist");
    }
  };

  return { wishlist, dewishlist };
};

export const useWishlists = () => {
  const axios = useAxios();
  const fetcher = useCallback(
    () => axios.get<Wishlist[]>("/api/v1/wishlist").then((r) => r.data),
    [axios]
  );
  const wishlists = useSWR("/api/v1/wishlist", fetcher);
  return wishlists;
};

export const useAddToCart = ({ productId }: { productId: number }) => {
  const axios = useAxios();
  const { mutate } = useSWRConfig();

  const addToCart = async () => {
    try {
      const r = await axios.post("/api/v1/cart/" + productId);
      toast.success("Added to cart");
      return r.data;
    } catch (e) {
      console.error(e);
      toast.error("Could not add to cart");
    } finally {
      mutate("/api/v1/cart");
    }
  };
  return { addToCart };
};

export const useCart = () => {
  const axios = useAxios();
  const fetcher = () => axios.get<Cart>("/api/v1/cart").then(r => r.data);
  const cart = useSWR("/api/v1/cart", fetcher);
  return cart;
}
