import { useContext } from "react";
import { SessionContext } from "@carerail/ui";

export function useSession() {
  const session = useContext(SessionContext);
  return {
    user: session,
    loading: false,
  };
}