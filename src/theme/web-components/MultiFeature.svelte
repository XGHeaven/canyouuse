<svelte:options tag="cuu-multi-feature" />

<script lang="ts">
  import { CuuContext } from "../../types/context";
  import { FeatureJSON } from "../../types/feature";

  export let features: FeatureJSON[] | undefined = undefined;
  // export let featureId: string | undefined = undefined
  export let context: CuuContext | undefined = undefined;
</script>
