import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

interface GetUsersResponse {
  totalRecords: number;
  users: User[];
}

async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get("/users", {
    params: {
      page,
    },
  });

  const totalRecords = Number(headers["x-total-records"]);

  return {
    users: data.users,
    totalRecords,
  };
}

function useUsers(page: number) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60 * 15,
  });
}

export default useUsers;
