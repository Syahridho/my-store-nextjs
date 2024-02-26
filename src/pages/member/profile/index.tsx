import ProfileMemberView from "@/components/views/member/Profile";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const session: any = useSession();

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await userServices.getProfile(session.data?.accessToken);
      setProfile(data.data);
    };
    getProfile();
  }, [session]);
  return (
    <>
      <ProfileMemberView profile={profile} />
    </>
  );
};

export default ProfilePage;
