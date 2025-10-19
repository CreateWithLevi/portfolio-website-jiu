<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { ImageEffect } from '@/lib/webgl/imageEffect';

  interface Props {
    src: string;
    alt: string;
    type: 'image' | 'video';
  }

  let { src, alt, type }: Props = $props();

  let canvasElement = $state<HTMLCanvasElement>();
  let containerElement = $state<HTMLDivElement>();
  let imageEffect = $state<ImageEffect | null>(null);
  let videoElement = $state<HTMLVideoElement | null>(null);
  let observer = $state<IntersectionObserver | null>(null);
  let isVisible = $state(false);

  onMount(() => {
    if (type === 'image' && containerElement) {
      // Use Intersection Observer to only initialize WebGL when visible
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isVisible) {
              isVisible = true;
              // Initialize WebGL when component becomes visible
              if (canvasElement && !imageEffect) {
                imageEffect = new ImageEffect(canvasElement, src);
              }
            } else if (!entry.isIntersecting && isVisible) {
              // Optionally destroy when not visible to save resources
              // Uncomment below to enable cleanup when scrolling away
              // if (imageEffect) {
              //   imageEffect.destroy();
              //   imageEffect = null;
              //   isVisible = false;
              // }
            }
          });
        },
        {
          rootMargin: '50px', // Start loading slightly before visible
          threshold: 0.01,
        }
      );

      observer.observe(containerElement);
    }
  });

  onDestroy(() => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (imageEffect) {
      imageEffect.destroy();
      imageEffect = null;
    }
  });

  // Update image when src changes
  $effect(() => {
    if (type === 'image' && imageEffect && src) {
      imageEffect.updateImage(src);
    }
  });
</script>

<div bind:this={containerElement} class="project-image-container">
  {#if type === 'image'}
    <canvas bind:this={canvasElement} class="project-canvas"></canvas>
    <img src={src} alt={alt} class="fallback-image" />
  {:else}
    <video
      bind:this={videoElement}
      src={src}
      class="project-video"
      autoplay
      loop
      muted
      playsinline
    >
      <track kind="captions" />
    </video>
  {/if}
</div>

<style>
  .project-image-container {
    position: relative;
    width: 100%;
    height: 614px;
    overflow: hidden;
    background: var(--dark);
  }

  .project-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .fallback-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    pointer-events: none;
  }

  .project-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Mobile */
  @media (max-width: 1023px) {
    .project-image-container {
      height: 220px;
    }
  }
</style>
