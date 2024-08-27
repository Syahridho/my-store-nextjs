import ProfileMemberView from "@/components/views/member/Profile";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Proptypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProfilePage = ({ setToaster }: Proptypes) => {
  return <ProfileMemberView setToaster={setToaster} />;
};

export default ProfilePage;
