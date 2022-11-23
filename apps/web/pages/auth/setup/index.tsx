import { useState } from "react";

import AdminAppsList from "@calcom/features/apps/AdminAppsList";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import prisma from "@calcom/prisma";
import { inferSSRProps } from "@calcom/types/inferSSRProps";
import { WizardForm } from "@calcom/ui";

import SetupFormStep1 from "./steps/SetupFormStep1";
import StepDone from "./steps/StepDone";

export default function Setup(props: inferSSRProps<typeof getServerSideProps>) {
  const { t } = useLocale();
  const [isLoadingStep1, setIsLoadingStep1] = useState(false);

  const steps = [
    {
      title: t("administrator_user"),
      description: t("lets_create_first_administrator_user"),
      content: props.userCount !== 0 ? <StepDone /> : <SetupFormStep1 setIsLoading={setIsLoadingStep1} />,
      isLoading: isLoadingStep1,
    },
    {
      title: t("enable_apps"),
      description: t("enable_apps_description"),
      content: <AdminAppsList baseURL="/auth/setup" />,
      isLoading: false,
    },
  ];

  return (
    <>
      <main className="flex items-center bg-gray-100 print:h-full">
        <WizardForm href="/auth/setup" steps={steps} disableNavigation={props.userCount !== 0} />
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const userCount = await prisma.user.count();
  return {
    props: {
      userCount,
    },
  };
};
