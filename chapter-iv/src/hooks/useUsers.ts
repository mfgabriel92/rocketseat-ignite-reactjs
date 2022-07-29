import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

interface GetUsersResponse {
  totalCount: number;
  users: User[];
}

async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get(`/users?_page=${page}&_limit=2`, {
    params: {
      page,
    },
  });
  const totalCount = Number(headers["x-total-count"]);

  return { users: data, totalCount };
}

function useUsers(page: number) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60 * 15,
  });
}

export default useUsers;
