import { AvatarProps } from "./Avatar.types";

const Avatar = ({ url }: AvatarProps) => {
  return (
    <>
      {url.length <= 1 ? (
        <div className="avatar placeholder">
          <div className="bg-primary text-neutral-content rounded-full w-12">
            <span className="text-slate-100 text-2xl ">{url}</span>
          </div>
        </div>
      ) : (
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={url} alt="" referrerPolicy="no-referrer" />
          </div>
        </div>
      )}
    </>
  );
};

export default Avatar;
