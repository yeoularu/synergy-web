import { LoadingOverlay } from "@mantine/core";
import { api } from "app/api";
import { UserCard } from "components/user/UserProfileCard";
import { useParams } from "react-router-dom";

export default function Profile() {
  const id = Number(useParams().id as string);
  const { data: user, isFetching, isError, error } = api.useGetUserQuery(id);

  if (isFetching) return <LoadingOverlay visible />;
  if (isError) {
    console.error(error);
    return <p>error! check console.</p>;
  }

  if (user) return <UserCard {...user} />;

  return null;
}
