import SphereImageGrid from "@/components/ui/img-sphere";
import {
  SPHERE_DEMO_GRID_PROPS,
  SPHERE_DEMO_IMAGES,
} from "@/content/sphereImageGridDemo";

/**
 * Standalone **DemoOne**-style sphere (`layoutMode="demo"`).
 * Homepage testimonials keep default **`layoutMode="arc"`** (volumetric dark).
 */
export default function SphereDemoPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-zinc-100 p-6">
      <SphereImageGrid
        images={SPHERE_DEMO_IMAGES}
        layoutMode="demo"
        theme="light"
        className="w-full max-w-[min(100%,720px)]"
        {...SPHERE_DEMO_GRID_PROPS}
      />
    </main>
  );
}
