import { useRouter } from "next/router";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  if (!currentUser) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
