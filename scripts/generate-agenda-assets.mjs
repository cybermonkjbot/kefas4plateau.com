import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";
import { agendaImageJobs } from "./agenda-image-jobs.mjs";

const endpoint = "https://cribnoshprod-resource.openai.azure.com/openai/v1/images/generations";
const model = "gpt-image-1.5";
const defaultEnvKeyName = "AZURE_OPENAI_API_KEY";
const workspaceRoot = process.cwd();
const manifestPath = path.join(workspaceRoot, "output", "imagegen", "agenda-manifest.json");

async function main() {
  const requestedSlugs = new Set(process.argv.slice(2));
  const jobs = requestedSlugs.size
    ? agendaImageJobs.filter((job) => requestedSlugs.has(job.slug) || requestedSlugs.has(job.id))
    : agendaImageJobs;

  if (!jobs.length) {
    throw new Error("No agenda image jobs matched the provided slugs or ids.");
  }

  const envKeyName = await resolveEnvKeyName();
  const apiKey = process.env[envKeyName];

  if (!apiKey) {
    throw new Error(`${envKeyName} is not set in the environment.`);
  }

  const results = [];

  for (const job of jobs) {
    const absoluteOut = path.join(workspaceRoot, job.out);
    await fs.mkdir(path.dirname(absoluteOut), { recursive: true });

    console.log(`Generating ${job.id} -> ${job.out}`);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        prompt: job.prompt,
        size: "1024x1024",
        quality: "medium",
        output_format: "png",
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Agenda image generation failed for ${job.id}: ${response.status} ${response.statusText}\n${body}`);
    }

    const payload = await response.json();
    const b64 = payload?.data?.[0]?.b64_json
      ?? payload?.output?.[0]?.b64_json
      ?? payload?.output?.[0]?.image_base64
      ?? payload?.output_image;

    if (!b64) {
      throw new Error(`No image payload returned for ${job.id}.`);
    }

    const imageBuffer = Buffer.from(b64, "base64");

    await sharp(imageBuffer)
      .resize(1440, 1440, {
        fit: "cover",
        position: "attention",
      })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(absoluteOut);

    results.push({
      id: job.id,
      slug: job.slug,
      out: job.out,
      prompt: job.prompt,
      request: {
        endpoint,
        model,
        size: "1024x1024",
        quality: "medium",
        output_format: "png",
      },
      generatedAt: new Date().toISOString(),
    });
  }

  await fs.mkdir(path.dirname(manifestPath), { recursive: true });
  await fs.writeFile(manifestPath, JSON.stringify(results, null, 2));

  console.log(`Generated ${results.length} agenda assets.`);
  console.log(`Manifest written to ${path.relative(workspaceRoot, manifestPath)}`);
}

async function resolveEnvKeyName() {
  const configPath = path.join(process.env.HOME ?? "", ".codex", "config.toml");

  try {
    const config = await fs.readFile(configPath, "utf8");
    const azureBlock = config.match(/\[model_providers\.azure\][\s\S]*?(?:\n\[|$)/);
    const envKeyMatch = azureBlock?.[0]?.match(/env_key\s*=\s*"([^"]+)"/);
    return envKeyMatch?.[1] ?? defaultEnvKeyName;
  } catch {
    return defaultEnvKeyName;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
