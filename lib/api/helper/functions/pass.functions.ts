import type { Pass } from "@/lib/api/hooks";
import type { PassConfig } from "@/components/pages/passes/config/passes.config";

/**
 * Converts backend Pass (from MongoDB) to frontend PassConfig
 */
export function toPassConfig(pass: Pass): PassConfig {
  return {
    id: pass.slug,
    name: pass.name,
    price: pass.price,
    image: pass.image,
    tagline: pass.tagline,
    accentColor: pass.accentColor,
    glowColor: pass.glowColor,
    popular: pass.popular,
    benefits: pass.benefits,
    details: pass.details,
  };
}
