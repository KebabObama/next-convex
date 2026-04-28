"use client";

//#region
import { useMutation } from "convex/react";
import { Camera } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { UserAvatar } from "@/layout/user-avatar";
import { getCroppedImg } from "@/settings/actions";
import { Button } from "@/ui/button";
import { Dialog } from "@/ui/dialog";
import { Slider } from "@/ui/slider";
//#endregion

export const AvatarUpload = () => {
  const getUploadUrl = useMutation(api.users.getUploadAvatarUrl);
  const saveAvatar = useMutation(api.users.saveUserAvatar);

  const [isPending, setIsPending] = useState(false);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pixels, setPixels] = useState<Area | null>(null);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(event.target.files[0]);
    event.target.value = "";
  };

  const reset = () => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setPixels(null);
  };

  const handleUpload = async () => {
    try {
      setIsPending(true);
      if (!imageSrc || !pixels) throw new Error("Missing image crop data.");
      const blob = await getCroppedImg(imageSrc, pixels, 0.6);
      const file = new File([blob], "avatar.webp", { type: "image/webp" });
      const uploadUrl = await getUploadUrl();
      const uploadResult = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!uploadResult.ok) throw new Error("Failed to upload avatar.");
      const { storageId } = await uploadResult.json();
      await saveAvatar({ storageId });
      toast.success("Avatar successfully uploaded.");
      reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        id="avatar-input"
        className="hidden"
        accept="image/*"
        onChange={onFileChange}
        disabled={isPending}
      />

      <label htmlFor="avatar-input" className="group relative size-48 cursor-pointer">
        <UserAvatar className="size-full rounded-full border-2 border-muted transition-opacity duration-300 group-hover:opacity-80" />
        <Camera className="absolute inset-0 size-full scale-0 text-foreground opacity-0 transition-all duration-300 group-hover:scale-50 group-hover:opacity-100" />
      </label>

      <Dialog open={Boolean(imageSrc)} onOpenChange={(open) => !open && reset()}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Crop your avatar</Dialog.Title>
            <Dialog.Description>Center your avatar precisely as you want it...</Dialog.Description>
          </Dialog.Header>

          <div className="relative h-64 w-full overflow-hidden rounded-md bg-muted">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={(_, croppedPixels) => setPixels(croppedPixels)}
                onZoomChange={setZoom}
              />
            )}
          </div>

          <div className="py-4">
            <span className="mb-2 block text-sm text-foreground/70">Zoom</span>
            <Slider value={[zoom]} min={1} max={3} step={0.1} onValueChange={([value]) => setZoom(value)} />
          </div>

          <Dialog.Footer>
            <Button variant="outline" disabled={isPending} onClick={reset}>
              Cancel
            </Button>
            <Button disabled={isPending} onClick={handleUpload}>
              {isPending ? "Uploading..." : "Save changes"}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  );
};
