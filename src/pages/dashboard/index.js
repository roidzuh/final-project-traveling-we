import AdminLayout from "@/layout/AdminLayout";
import { fetchUserLogged } from "@/utils/api";

// export async function getServerSideProps(context) {
//   const token = context.req.cookies.token;
//   const user = await fetchUserLogged(token);
//   return { props: { user } };
// }

export default function dashboardPage() {
  return <AdminLayout></AdminLayout>;
}
