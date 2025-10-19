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
  }

  let {
    id,
    title,
    description,
    media,
    tags,
    url,
    year = "2025",
  }: Props = $props();
</script>

<article {id} class="project-card">
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
  </div>
</article>

<style>
  .project-card {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-35);
    width: 100%;
  }

  .project-header {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-35);
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
    gap: var(--spacing-35);
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
    .project-card {
      gap: 5px;
    }

    .project-header {
      gap: var(--spacing-12);
    }

    .project-year {
      display: none;
    }

    .project-content {
      gap: 5px;
      padding: 0 var(--spacing-24);
    }

    .project-title-row {
      height: 21px;
      align-items: center;
    }

    .project-title {
      font-size: var(--font-size-hero);
      max-width: none;
      white-space: nowrap;
    }

    .project-details {
      flex-direction: column;
      gap: var(--spacing-12);
      padding: var(--spacing-12) 0 var(--spacing-24);
    }

    .project-tags {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .project-description {
      max-width: none;
    }
  }
</style>
