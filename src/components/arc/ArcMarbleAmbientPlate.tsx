import Image from "next/image";

type ArcMarbleAmbientPlateProps = {
  src: string;
  /** Above-the-fold marble bands (About clinic gallery, hero). */
  priority?: boolean;
};

/**
 * Full-bleed marble / ambient decoration plate.
 * Served unoptimized at native resolution so Next does not recompress soft textures.
 */
export function ArcMarbleAmbientPlate({ src, priority = false }: ArcMarbleAmbientPlateProps) {
  return (
    <Image
      src={src}
      alt=""
      fill
      unoptimized
      priority={priority}
      className="object-cover object-center"
      sizes="100vw"
    />
  );
}
