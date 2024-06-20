import MemberLayout from "@/components/layouts/MemberLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { uploadFile } from "@/lib/firebase/service";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import Image from "next/image";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type PropTypes = {
  profile: User | any;
  setProfile: Dispatch<SetStateAction<{}>>;
  session: any;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProfileMemberView = ({
  profile,
  setProfile,
  session,
  setToaster,
}: PropTypes) => {
  const [changeImage, setChangeImage] = useState<File | any>({});
  const [isLoading, setIsLoading] = useState("");

  const handleChangeProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("profile");
    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };
    const result = await userServices.updateProfile(
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading("");
      setProfile({
        ...profile,
        fullname: data.fullname,
        phone: data.phone,
      });
      form.reset();
      setToaster({
        variant: "success",
        message: "Success Update Profile",
      });
    } else {
      setIsLoading("");
    }
  };

  const handleChangeProfilePicture = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("picture");
    const form = e.target as HTMLFormElement;
    const file = form.image.files[0];
    const newName = "profile." + file.name.split(".")[1];
    if (file) {
      uploadFile(
        profile.id,
        file,
        newName,
        "users",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };
            const result = await userServices.updateProfile(
              data,
              session.data?.accessToken
            );
            if (result.status === 200) {
              setIsLoading("");
              setProfile({
                ...profile,
                image: newImageURL,
              });
              setChangeImage({});
              form.reset();
              setToaster({
                variant: "success",
                message: "Success Change Picture",
              });
            } else {
              setIsLoading("");
            }
          } else {
            setIsLoading("");
            setChangeImage({});
            setToaster({
              variant: "danger",
              message: "Failed Change Picture",
            });
          }
        }
      );
    }
  };

  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("password");
    const form = e.target as HTMLFormElement;
    const data = {
      password: form["new-password"].value,
      oldPassword: form["old-password"].value,
      encryptedPassword: profile.password,
    };
    try {
      const result = await userServices.updateProfile(
        data,
        session.data?.accessToken
      );
      if (result.status === 200) {
        setIsLoading("");
        form.reset();
        setToaster({
          variant: "success",
          message: "Success Change Password",
        });
      }
    } catch (error) {
      setIsLoading("");
      setToaster({
        variant: "danger",
        message: "Failed Change Password",
      });
      form.reset();
    }
  };

  return (
    <MemberLayout>
      <h1 className="text-2xl">Profile Page</h1>
      <div className="flex gap-10 mt-10">
        <div className="w-1/5 p-2 h-80 shadow flex flex-col items-center justify-center">
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
              {isLoading === "picture" ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </div>
        <div className="w-4/5 shadow px-10 py-5 rounded">
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          <form onSubmit={handleChangeProfile}>
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
              disabled
            />
            <Input
              type="number"
              label="Phone"
              name="phone"
              defaultValue={profile.phone}
              placeholder="Input your phone number"
            />
            <Input
              type="text"
              label="Role"
              name="role"
              defaultValue={profile.role}
              disabled
            />
            {/* <Input
            type="password"
            label="Password"
            name="password"
            defaultValue={profile.password}
          /> */}
            <Button type="submit" className="mt-4">
              {isLoading === "profile" ? "Loading..." : "Update profile"}
            </Button>
          </form>
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Change Password</h2>
            <form onSubmit={handleChangePassword}>
              <Input
                type="password"
                label="Old Password"
                name="old-password"
                disabled={profile.type === "google"}
                placeholder="Enter your old password"
              />
              <Input
                type="password"
                label="New Password"
                name="new-password"
                disabled={profile.type === "google"}
                placeholder="Enter your new password"
              />
              <Button
                type="submit"
                className="mt-4"
                disabled={isLoading === "password" || profile.type === "google"}
              >
                {isLoading === "password" ? "Loading..." : "Update password"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfileMemberView;
