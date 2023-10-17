<script lang="ts">
  import { CuuContext } from "../types/context";
  import { FeatureJSON } from "../types/feature";
  import { CuuTargetsJSON } from "../types/target";
  let notes = ["What do you means", "Hahaha", "NextValue"];
  let feature: FeatureJSON = {
    name: "css:font-size",
    title: "CSS: Font-size",
    description: "Font-size",
    stats: {
      chrome: {
        "0": "u",
        "99": "n",
        "100": "y#1",
        "102": "y",
      },
    },
    notes: notes,
  };
  let targets: CuuTargetsJSON = {
    chrome: {
      name: "chrome",
      title: "Chrome",
      description: "Google Chrome",
      versions: [
        {
          version: "99",
          type: "release",
          releasedDate: "2021/09/22",
        },
        {
          version: "100",
          type: "release",
          releasedDate: "2021/10/22",
        },
        {
          version: "101",
          type: "release",
          releasedDate: "2021/11/22",
        },
        {
          version: "102",
          type: "canary",
          releasedDate: "2021/12/22",
        },
      ],
    },
    safari: {
      name: "safari",
      title: "Safari",
      description: "Apple Safari",
      versions: [
        {
          version: "11",
          type: "release",
          releasedDate: "2021/09/22",
        },
        {
          version: "12",
          type: "release",
          releasedDate: "2021/09/22",
        },
        {
          version: "13",
          type: "release",
          releasedDate: "2021/09/22",
        },
        {
          version: "14",
          type: "release",
          releasedDate: "2021/09/22",
        },
        {
          version: "15",
          type: "canary",
          releasedDate: "2021/09/22",
        },
      ],
    },
  };

  let context: CuuContext = {
    targets,
  };
  console.log(context);
</script>

<div class="main">
  <cuu-feature {feature} {context} max-released-count="3" />
</div>

<style>
  .main {
    min-height: 480px;
  }
</style>
