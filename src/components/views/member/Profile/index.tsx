import MemberLayout from "@/components/layouts/MemberLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { uploadFile } from "@/lib/firebase/service";
import userServices from "@/services/user";
import Image from "next/image";
import { useState } from "react";

const ProfileMemberView = ({ profile, setProfile, session }: any) => {
  const [changeImage, setChangeImage] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeProfilePicture = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const file = e.target[0]?.files[0];
    if (file) {
      uploadFile(
        profile.id,
        file,
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };
            const result = await userServices.updateProfile(
              profile.id,
              data,
              session.data?.accessToken
            );
            if (result.status === 200) {
              setIsLoading(false);
              setProfile({
                ...profile,
                image: newImageURL,
              });
              setChangeImage({});
              e.target[0].value = "";
            } else {
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
            setChangeImage({});
          }
        }
      );
    }
  };
  return (
    <MemberLayout>
      <h1 className="text-2xl">Profile Page</h1>
      <div className="flex gap-10 mt-10">
        <div className="w-1/5 p-2 shadow flex flex-col items-center  justify-center">
          {profile.image ? (
            <Image
              src={profile.image}
              alt="profile"
              width={200}
              height={200}
              className="rounded-full overflow-hidden w-40 h-40 object-cover object-center"
            />
          ) : (
            <div className="w-40 h-40 bg-slate-100 rounded-full flex justify-center items-center text-3xl font-medium">
              {profile?.fullname?.charAt(0)}
            </div>
          )}
          <form
            onSubmit={handleChangeProfilePicture}
            className="flex flex-col justify-center"
          >
            <label htmlFor="image">Upload New Avatar</label>
            {changeImage.name ? (
              <p className="text-xs my-1">{changeImage.name}</p>
            ) : null}
            <input
              type="file"
              name="image"
              id="upload-image"
              className="w-28 hover:cursor-pointer"
              onChange={(e: any) => {
                e.preventDefault();
                setChangeImage(e.currentTarget.files[0]);
              }}
            />
            <Button className="text-center" type="submit">
              {isLoading ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </div>
        <div className="w-4/5 shadow px-10 py-5 rounded">
          <form action="">
            <Input
              type="text"
              label="FullName"
              name="fullname"
              defaultValue={profile.fullname}
            />
            <Input
              type="email"
              label="Email"
              name="email"
              defaultValue={profile.email}
            />
            <Input
              type="number"
              label="Phone"
              name="phone"
              defaultValue={profile.phone}
            />
            {/* <Input
            type="password"
            label="Password"
            name="password"
            defaultValue={profile.password}
          /> */}
            <Button type="submit" className="mt-4">
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfileMemberView;
