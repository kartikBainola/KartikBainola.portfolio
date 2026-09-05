import fs from "fs";
import path from "path";

const apps = [
  { id: "ventuera", packageId: "com.ventuera.app" },
  { id: "capto", packageId: "uk.cloud.capto" },
  { id: "my-professional-rewards", packageId: "uk.grgprofessionalservices.grg" },
  { id: "vrv-hospitality", packageId: "com.VRV.mindrops" },
  { id: "expense-management", packageId: "com.mindrop.expense_management" },
  { id: "footprint-warehousing", packageId: "com.mindrops.footprint" },
  {
    id: "sardar-meat-shop",
    appStoreId: "6443717642",
    appStoreUrl: "https://apps.apple.com/in/app/sardar-a-pure-meat-shop/id6443717642",
  },
];

const outDir = path.join(process.cwd(), "public", "images", "projects");

function normalizeUrl(url) {
  return url
    .replace(/\\u003d/g, "=")
    .replace(/\\u0026/g, "&")
    .replace(/=w\d+-h\d+/, "=w540-h960")
    .replace(/=s\d+/, "=w540-h960");
}

async function fetchPlayStoreImages(app) {
  const url = `https://play.google.com/store/apps/details?id=${app.packageId}&hl=en`;
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });
  const html = await res.text();
  const matches = html.match(/https:\/\/play-lh\.googleusercontent\.com[^"'\s\\]+/g) || [];
  const unique = [...new Set(matches.map(normalizeUrl))];

  const iconCandidate =
    unique.find((u) => u.includes("=w240") || u.includes("=s128")) || unique[0];

  const screenshotCandidates = unique.filter(
    (u) =>
      !u.includes("=w240") &&
      !u.includes("=s128") &&
      (u.includes("=w526") || u.includes("=w540") || u.includes("-rw"))
  );

  return { icon: iconCandidate, screenshots: screenshotCandidates.slice(0, 4) };
}

async function fetchAppStoreImages(app) {
  const res = await fetch(app.appStoreUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });
  const html = await res.text();

  const iconMatch = html.match(
    /https:\/\/is\d-ssl\.mzstatic\.com\/image\/thumb\/[^"']+/
  );
  const screenshotMatches =
    html.match(/https:\/\/is\d-ssl\.mzstatic\.com\/image\/thumb\/[^"']+/) || [];

  const allImages = [
    ...new Set(html.match(/https:\/\/is\d-ssl\.mzstatic\.com\/image\/thumb\/[^"'\s]+/g) || []),
  ];

  const icon = iconMatch?.[0]?.replace(/\/\d+x\d+bb\.(jpg|png|webp).*/, "/200x200bb.png") || null;
  const screenshots = allImages
    .filter((u) => u.includes("PurpleSource") || u.includes("Screenshot"))
    .slice(0, 4);

  return { icon, screenshots: screenshots.length ? screenshots : allImages.slice(1, 5) };
}

async function downloadImage(url, filepath) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  if (buffer.length < 2000) throw new Error("Image too small");
  fs.writeFileSync(filepath, buffer);
  return buffer.length;
}

async function pickBestScreenshot(urls, appId) {
  const results = [];
  for (let i = 0; i < urls.length; i++) {
    const tmpPath = path.join(outDir, `${appId}-candidate-${i}.png`);
    try {
      const size = await downloadImage(urls[i], tmpPath);
      results.push({ path: tmpPath, size, index: i, url: urls[i] });
    } catch {
      // skip invalid
    }
  }

  results.sort((a, b) => b.size - a.size);
  return results;
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const manifest = {};

  for (const app of apps) {
    console.log(`Fetching ${app.id}...`);
    try {
      const data = app.packageId
        ? await fetchPlayStoreImages(app)
        : await fetchAppStoreImages(app);

      if (data.icon) {
        await downloadImage(data.icon, path.join(outDir, `${app.id}-icon.png`));
        manifest[app.id] = { icon: `images/projects/${app.id}-icon.png` };
      }

      const candidates = await pickBestScreenshot(data.screenshots, app.id);
      const best = candidates.slice(0, 3);

      if (best[0]) {
        fs.copyFileSync(best[0].path, path.join(outDir, `${app.id}-screenshot.png`));
        manifest[app.id].screenshot = `images/projects/${app.id}-screenshot.png`;
        manifest[app.id].screenshots = [`images/projects/${app.id}-screenshot.png`];

        for (let i = 1; i < best.length; i++) {
          const name = `${app.id}-screenshot-${i + 1}.png`;
          fs.copyFileSync(best[i].path, path.join(outDir, name));
          manifest[app.id].screenshots.push(`images/projects/${name}`);
        }
      }

      // cleanup candidates
      for (const file of fs.readdirSync(outDir)) {
        if (file.includes(`${app.id}-candidate-`)) {
          fs.unlinkSync(path.join(outDir, file));
        }
      }

      console.log(`  ✓ ${app.id}`);
    } catch (err) {
      console.error(`  ✗ ${app.id}:`, err.message);
    }
  }

  fs.writeFileSync(
    path.join(process.cwd(), "src", "data", "project-images.json"),
    JSON.stringify(manifest, null, 2)
  );
  console.log("Done!");
}

main();
