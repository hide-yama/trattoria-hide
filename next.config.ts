import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // 親ディレクトリに別の package-lock.json があるため、
  // ワークスペースルートをこのプロジェクトに固定する。
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
