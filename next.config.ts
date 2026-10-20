import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

/**
 * En worktrees, `node_modules` es un symlink al repo principal (fuera de la raíz
 * del proyecto) y Turbopack falla con "Symlink is invalid". Solo en ese caso
 * ampliamos la raíz de Turbopack al padre común de ambos.
 */
function turbopackRootForLinkedNodeModules(): string | undefined {
  const projectRoot = process.cwd();
  const nodeModules = path.join(projectRoot, "node_modules");
  try {
    if (!fs.lstatSync(nodeModules).isSymbolicLink()) return undefined;
    const target = fs.realpathSync(nodeModules);
    const fromProject = path.resolve(projectRoot).split(path.sep);
    const fromTarget = path.resolve(target).split(path.sep);
    const shared: string[] = [];
    for (let i = 0; i < Math.min(fromProject.length, fromTarget.length); i++) {
      if (fromProject[i] !== fromTarget[i]) break;
      shared.push(fromProject[i]);
    }
    return shared.join(path.sep) || path.sep;
  } catch {
    return undefined;
  }
}

const linkedNodeModulesRoot = turbopackRootForLinkedNodeModules();

const nextConfig: NextConfig = {
  ...(linkedNodeModulesRoot ? { turbopack: { root: linkedNodeModulesRoot } } : {}),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
