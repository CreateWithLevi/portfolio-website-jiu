<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { TextScramble } from '@/lib/utils/textScramble';
  import { SITE_CONFIG } from '@/lib/utils/constants';
  import SocialLinks from './SocialLinks.svelte';

  interface Project {
    id: string;
    data: {
      title: string;
      category: string;
    };
  }

  interface Props {
    projects: Project[];
  }

  let { projects }: Props = $props();

  // Group projects by category
  const projectsByCategory = $derived(() => {
    const grouped: Record<string, Project[]> = {
      website: [],
      branding: [],
      others: [],
    };

    projects.forEach((project) => {
      const category = project.data.category;
      if (grouped[category]) {
        grouped[category].push(project);
      }
    });

    return grouped;
  });

  let scrambleInstances: Map<string, TextScramble> = new Map();

  onMount(() => {
    // Initialize text scramble for each project link
    const links = document.querySelectorAll('.project-link');
    links.forEach((link) => {
      const el = link.querySelector('.project-title') as HTMLElement;
      if (el) {
        const scramble = new TextScramble(el);
        scrambleInstances.set(link.getAttribute('data-id') || '', scramble);
      }
    });
  });

  onDestroy(() => {
    // Clean up scramble instances
    scrambleInstances.forEach((instance) => instance.destroy());
    scrambleInstances.clear();
  });

  function handleMouseEnter(event: MouseEvent, projectTitle: string) {
    const target = event.currentTarget as HTMLElement;
    const id = target.getAttribute('data-id');
    if (id) {
      const scramble = scrambleInstances.get(id);
      if (scramble) {
        scramble.setText(projectTitle);
      }
    }
  }
</script>

<aside class="sidebar">
  <div class="sidebar-content">
    <!-- Hero Section -->
    <div class="hero">
      <h1 class="hero-text">
        Hi, I'm {SITE_CONFIG.hero.name}<br />
        Mission-driven Web designer<br />
        Motion lover
      </h1>
    </div>

    <!-- Projects Navigation -->
    <nav class="projects-nav">
      {#each SITE_CONFIG.categories as category}
        {#if projectsByCategory()[category.id].length > 0}
          <div class="category-section">
            <!-- Category Header -->
            <div class="category-header">
              <span class="category-label">{category.label}</span>
              <div class="divider"></div>
            </div>

            <!-- Project List -->
            <ul class="project-list">
              {#each projectsByCategory()[category.id] as project}
                <li>
                  <a
                    href={`#${project.id}`}
                    class="project-link"
                    data-id={project.id}
                    onmouseenter={(e) => handleMouseEnter(e, project.data.title)}
                  >
                    <span class="project-title">{project.data.title}</span>
                    <div class="divider"></div>
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      {/each}
    </nav>

    <!-- Social Links -->
    <SocialLinks />
  </div>
</aside>

<style>
  .sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    width: var(--sidebar-width);
    padding: var(--spacing-35);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    flex-shrink: 0;
  }

  .sidebar-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-50);
    height: 100%;
  }

  .hero {
    flex-shrink: 0;
  }

  .hero-text {
    font-size: var(--font-size-hero);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-none);
    color: var(--white);
    text-transform: uppercase;
  }

  .projects-nav {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-34);
    flex: 1;
    overflow-y: auto;
  }

  .category-section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-16);
  }

  .category-header {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-12);
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

  .project-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-15);
  }

  .project-link {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-12);
    transition: opacity var(--transition-fast);
  }

  .project-link:hover {
    opacity: 1;
  }

  .project-title {
    font-size: var(--font-size-body);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    color: var(--white);
  }

  /* Mobile Styles */
  @media (max-width: 1023px) {
    .sidebar {
      position: static;
      width: 100%;
      height: auto;
      padding: var(--spacing-60) var(--spacing-24) var(--spacing-24);
    }

    .sidebar-content {
      gap: var(--spacing-30);
    }

    .projects-nav {
      display: none;
    }
  }
</style>
