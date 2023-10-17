<svelte:options
  customElement={{
    tag: "cuu-feature",
    props: {
      maxReleasedCount: {
        reflect: true,
        type: "Number",
        attribute: "max-released-count",
      },
      maxFutureCount: {
        reflect: true,
        type: "Number",
        attribute: "max-future-count",
      },
    },
  }}
/>

<script lang="ts">
  import { RenderFeature } from "./feature-type";
  import { FeatureJSON, FeatureStatSupport } from "../../types/feature";
  import { processFeatureStats } from "./feature-processor";
  import { Target } from "../../types/target";
  import { CuuContext } from "../../types/context";

  export let feature: FeatureJSON | undefined = undefined;
  // export let featureId: string | undefined = undefined
  export let context: CuuContext | undefined = undefined;

  export let maxReleasedCount = 5;
  export let maxFutureCount = 2;

  function supportClass(support: FeatureStatSupport) {
    if (support.isFullSupport) {
      return "support";
    }
    if (!support.isPartialSupport) {
      return "notsupport";
    }
    return "unknown";
  }

  function getTargetsArray(context: CuuContext): Target[] {
    if (context.targetDisplayOrder) {
      return context.targetDisplayOrder.map((name) => context.targets[name]);
    }

    return Object.values(context.targets);
  }

  let isReady: boolean;
  let title: string;
  let description: string;
  let stats: RenderFeature[];
  let notes: string[];
  let targets: Target[];

  $: isReady = !!feature && !!context;

  $: targets = context ? getTargetsArray(context) : targets;

  $: title = feature?.title ?? "";
  $: description = feature?.description ?? "";
  $: stats = feature?.stats && targets ? processFeatureStats(feature.stats, targets) : [];
  $: notes = feature?.notes ?? [];
  $: console.log(maxReleasedCount);
</script>

<div class="feature">
  <div class="header">
    <div class="title">{title}</div>
    <div class="description">{description}</div>
  </div>
  <div class="grid-container">
    <div class="grid" style="grid-template-columns: repeat({stats.length}, var(--cuu-feature-column-width))">
      {#each stats as stat}
        <div class="target-2-name" style="border-color: {stat.color}">{stat.target.title ?? stat.target.name}</div>
        <div class="released-versions">
          {#each stat.releasedCompactVersions as version}
            <div class="target-usage usage-{supportClass(version.support)}">
              {#if version.versions.length > 1}
                {version.versions[0].version} - {version.versions[version.versions.length - 1].version}
              {:else}
                {version.versions[0].version}
              {/if}
              {#if version.support.note}
                <div class="note">{version.support.note}</div>
              {/if}
            </div>
          {/each}
          <div class="target-usage usage-{supportClass(stat.currentVersion.support)}">
            {stat.currentVersion.version.version}
            {#if stat.currentVersion.support.note}
              <div class="note">{stat.currentVersion.support.note}</div>
            {/if}
          </div>
        </div>
        <div class="future-versions">
          {#each stat.futureCompactVersions as version}
            <div class="target-usage usage-{supportClass(version.support)}">
              {#if version.versions.length > 1}
                {version.versions[0].version} - {version.versions[version.versions.length - 1].version}
              {:else}
                {version.versions[0].version}
              {/if}
              {#if version.support.note}
                <div class="note">{version.support.note}</div>
              {/if}
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>
<div class="footer">
  {#if notes.length}
    <div class="note-box">
      <div class="note-title">Notes</div>
      <ol class="notes">
        {#each notes as note}
          <li class="note-line">{note}</li>
        {/each}
      </ol>
    </div>
  {/if}
</div>

<style>
  :host {
    --cuu-feature-bg: #252017;
    --cuu-feature-fg: #f2e8d5;
    --cuu-feature-support-bg: #0b6316;
    --cuu-feature-unknown-bg: #464646;
    --cuu-feature-not-support-bg: #86261a;
    --cuu-feature-footer-bg: #382e22;
    --cuu-feature-current-color: #382e22;

    --cuu-feature-column-width: 96px;
  }

  :host {
    display: inline-block;
    width: 100%;
    background: var(--cuu-feature-bg);
    color: var(--cuu-feature-fg);
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      Helvetica Neue,
      Tahoma,
      PingFang SC,
      Microsoft Yahei,
      Arial,
      Hiragino Sans GB,
      sans-serif,
      Apple Color Emoji,
      Segoe UI Emoji,
      Segoe UI Symbol,
      Noto Color Emoji;
  }

  .feature {
    padding: 12px 16px;
  }
  .title {
    font-size: 1.75em;
  }
  .table {
    display: flex;
    flex-direction: column;
  }
  .grid-container {
    text-align: center;
  }
  .grid {
    display: inline-grid;
  }
  .targets {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .target-2-name {
    grid-row-start: 1;
    border-bottom-width: 4px;
    border-bottom-style: solid;
    min-height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .released-versions {
    display: flex;
    flex-direction: column;
    align-self: end;
    grid-row-start: 2;
  }
  .released-versions:before {
    display: block;
    width: 100%;
    content: "";
  }
  .released-versions > *:last-child {
    outline: 4px solid var(--cuu-feature-current-color);
  }
  .future-versions {
    grid-row-start: 3;
  }
  .target-usage {
    margin: 2px;
    text-align: center;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
  }
  .note {
    position: absolute;
    font-size: 10px;
    line-height: 1;
    background: white;
    top: 0;
    left: 0;
    color: black;
    padding: 0 2px;
  }
  .usage-support {
    background: var(--cuu-feature-support-bg);
  }
  .usage-notsupport {
    background: var(--cuu-feature-not-support-bg);
  }

  .footer {
    margin-top: 16px;
    background: var(--cuu-feature-footer-bg);
  }

  .note-box {
    font-size: 14px;
    padding: 8px 16px;
  }

  .notes {
    display: inline-block;
  }

  .note-title {
    font-size: 18px;
  }
</style>
