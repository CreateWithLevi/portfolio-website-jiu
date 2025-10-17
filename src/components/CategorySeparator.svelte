<script lang="ts">
  interface Props {
    label: string;
  }

  let { label }: Props = $props();
</script>

<div class="category-separator">
  <span class="category-label">{label}</span>
  <div class="divider"></div>
</div>

<style>
  .category-separator {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-12);
    padding: var(--spacing-24) var(--spacing-24) var(--spacing-12);
  }

  .category-label {
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-tight);
    color: var(--off-white-70);
    text-transform: uppercase;
  }

  .divider {
    height: 1px;
    width: 100%;
    background-color: var(--off-white);
  }

  /* Desktop - hide separator */
  @media (min-width: 1024px) {
    .category-separator {
      display: none;
    }
  }
</style>
