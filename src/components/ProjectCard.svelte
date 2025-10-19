<script lang="ts">
  import ProjectImage from "./ProjectImage.svelte";
  import LiveSiteLink from "./LiveSiteLink.svelte";

  interface Props {
    id: string;
    title: string;
    description: string;
    media: {
      src: string;
      type: "image" | "video";
      alt?: string;
    };
    tags: string[];
    url: string;
    year?: string;
    category?: string;
  }

  let {
    id,
    title,
    description,
    media,
    tags,
    url,
    year = "2025",
    category,
  }: Props = $props();
</script>

<article {id} class="project-card">
  <!-- Mobile Category Label -->
  {#if category}
    <div class="category-header">
      <span class="category-label">{category}</span>
    </div>
  {/if}

  <div class="project-header">
    {#if year}
      <p class="project-year">{year}</p>
    {/if}

    <div class="project-image-wrapper">
      <ProjectImage
        src={media.src}
        alt={media.alt || title}
        type={media.type}
      />
    </div>
  </div>

  <div class="project-content">
    <div class="project-title-row">
      <h2 class="project-title">{title}</h2>
      <LiveSiteLink {url} />
    </div>

    <div class="project-details">
      <div class="project-tags">
        {#each tags as tag}
          <span class="tag">{tag}</span>
        {/each}
      </div>

      <p class="project-description">{description}</p>
    </div>

    <!-- Mobile Divider -->
    {#if category}
      <div class="divider"></div>
    {/if}
  </div>
</article>

<style>
  .project-card {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-36);
    width: 100%;
  }

  .category-header {
    display: none;
  }

  .category-label {
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-tight);
    color: var(--off-white-70);
    text-transform: uppercase;
  }

  .divider {
    display: none;
  }

  .project-header {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-36);
  }

  .project-year {
    font-size: var(--font-size-hero);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-normal);
    color: var(--white);
    text-align: right;
    mix-blend-mode: exclusion;
  }

  .project-image-wrapper {
    width: 100%;
  }

  .project-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-24);
  }

  .project-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-16);
  }

  .project-title {
    font-size: var(--font-size-hero);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-normal);
    color: var(--off-white);
    max-width: 360px;
  }

  .project-details {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-30);
  }

  .project-tags {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-16);
    flex-shrink: 0;
  }

  .tag {
    display: inline-block;
    padding: 4px 20px;
    border: 1px solid var(--off-white);
    border-radius: var(--radius-full);
    font-size: var(--font-size-body);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-normal);
    color: var(--off-white);
    white-space: nowrap;
    text-align: center;
  }

  .project-description {
    font-size: var(--font-size-body);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-normal);
    color: var(--off-white);
    max-width: 614px;
  }

  /* Mobile */
  @media (max-width: 1023px) {
    .project-image-wrapper {
      padding: 0 var(--spacing-24);
    }

    .project-card {
      gap: 1rem;
    }

    .category-header {
      display: block;
      padding: 0 var(--spacing-24);
      margin-bottom: var(--spacing-16);
    }

    .divider {
      display: block;
      height: 1px;
      width: 100%;
      background-color: var(--off-white-50);
      margin: var(--spacing-12) 0 var(--spacing-16) 0;
    }

    .project-header {
      gap: var(--spacing-12);
    }

    .project-year {
      display: none;
    }

    .project-content {
      gap: 4px;
      padding: 0 var(--spacing-24);
    }

    .project-title-row {
      align-items: flex-start;
    }

    .project-title {
      font-size: var(--font-size-hero);
      max-width: none;
    }

    .project-details {
      flex-direction: column;
      gap: var(--spacing-16);
      padding: var(--spacing-4) 0 var(--spacing-24);
    }

    .project-tags {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .tag {
      padding: 4px 12px;
      font-size: var(--font-size-small);
      color: var(--off-white-70);
      border: 1px solid var(--off-white-70);
    }

    .project-description {
      max-width: none;
    }
  }
</style>
