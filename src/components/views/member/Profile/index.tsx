import MemberLayout from "@/components/layouts/MemberLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";

const ProfileMemberView = ({ profile }: any) => {
  console.log(profile);
  return (
    <MemberLayout>
      <h1 className="text-2xl">Profile Page</h1>
      <div className="flex gap-10 mt-10">
        <div className="w-1/5 shadow flex flex-col items-center justify-center">
          <Image
            src={profile.image}
            alt="profile"
            width={200}
            height={200}
            className="rounded-full"
          />
          <label htmlFor="image">Upload New Avatar</label>
          <input
            type="file"
            name="image"
            id="upload-image"
            className="w-28 hover:cursor-pointer"
          />
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
