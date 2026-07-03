/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/api/gallery-image": ["./projects/gallery/images/**/*"],
      "/api/gallery-images": ["./projects/gallery/images/**/*"],
      "/api/project-hero-image": ["./projects/**/*"],
      "/api/project-image": ["./projects/**/*"],
      "/api/project-images": ["./projects/**/*"],
    },
  },
};

export default nextConfig;
