"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Avatar } from "@/ui/avatar";

type Props = {
  className?: string;
};

export const UserAvatar = ({ className }: Props) => {
  const user = useQuery(api.users.getProfile, {});
  return <Avatar className={className} src={user?.image} fallback={user?.name?.slice(0, 2)} alt={"User avatar"} />;
};
