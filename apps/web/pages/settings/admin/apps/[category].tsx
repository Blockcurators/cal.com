import AdminAppsList from "@calcom/features/apps/AdminAppsList";
import { getAdminLayout as getLayout, Meta } from "@calcom/ui";

function AdminAppsView() {
  return (
    <>
      <Meta title="Apps" description="apps_description" />
      <AdminAppsList baseURL="/settings/admin/apps" />
    </>
  );
}

AdminAppsView.getLayout = getLayout;

export default AdminAppsView;
