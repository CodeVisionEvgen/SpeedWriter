export const FileImageInput = () => {
  return (
    <label className="
     block cursor-pointer
     !h-max
     active:bg-default-300
     hover:bg-default-200
     w-full bg-default-100 p-3 rounded-[15px] text-default-700
     " htmlFor="file_input">
      <p className="text-[11px]">Avatar</p>
      <p className="text-[15px] text-default-500">Upload your avatar</p>
      <input name="UserPicture" className=" hidden" id="file_input" type="file" />
    </label>
  )
}