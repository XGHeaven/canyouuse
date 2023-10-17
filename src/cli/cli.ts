import { CanYouUse } from "./canyouuse";
import { Yargs, getCurrentArgv, getPwd } from "./mods";

async function getCanYouUse() {
  const config = await CanYouUse.create(getPwd());
  if (config) {
    return config;
  }
  console.warn(`Cannot found config of ${getPwd()}`);
  throw new Error("Cannot found");
}

Yargs(getCurrentArgv())
  .scriptName("canyouuse")
  .alias("h", "help")
  .alias("v", "version")
  .command("target", "Manage targets", (yargs) =>
    yargs
      .command("list", "List all targets")
      .command("create <target-name>", "Create a new target")
      .command("add-version <target-name> <version>", "Add a new target version")
      .demandCommand()
  )
  .command("feature", "Manage features", (yargs) =>
    yargs
      .command("list", "List all features")
      .command(
        "create <feature-name>",
        "Create a new feature",
        (yargs) =>
          yargs.positional("feature-name", {
            type: "string",
            desc: "Feature name",
          }),
        async (args) => {
          const canyouuse = await getCanYouUse();
          await canyouuse.createFeature(args.featureName!);
        }
      )
      .command(
        "fetch <feature-store> <feature-path> <feature-name>",
        "Fetch from remote feature and store it",
        (yargs) =>
          yargs
            .positional("feature-store", {
              type: "string",
              choices: ["mdn", "caniuse"],
            })
            .positional("feature-path", {
              type: "string",
            })
            .positional("feature-name", {
              type: "string",
            }),
        (args) => {}
      )
      .demandCommand()
  )
  .command("validate", "Validate all json data")
  .command("format", "Format all json data")
  .command("build", "Build all json data to one file")
  .command("ui", "Manage UI", (yargs) =>
    yargs.demandCommand().command("build", "Build with ui").command("serve", "Start dev ui")
  )
  .demandCommand()
  .parse();
