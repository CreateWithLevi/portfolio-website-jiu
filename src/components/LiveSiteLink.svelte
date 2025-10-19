<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";

  interface Props {
    url: string;
  }

  let { url }: Props = $props();

  let arrowPath: SVGPathElement;
  let linkElement: HTMLAnchorElement;

  // SVG path data for normal and hovered states
  const normalPath = "M7 7L17 17M17 17H7M17 17V7";
  //pointing upper right
  const hoveredPath = "M7 17L17 7M17 7H7M17 7V17";

  onMount(() => {
    // Initialize GSAP timeline
    const tl = gsap.timeline({ paused: true });

    tl.to(arrowPath, {
      attr: { d: hoveredPath },
      duration: 0.4,
      ease: "power2.out",
    });

    // Event handlers
    const handleMouseEnter = () => {
      tl.play();
    };

    const handleMouseLeave = () => {
      tl.reverse();
    };

    linkElement.addEventListener("mouseenter", handleMouseEnter);
    linkElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      linkElement.removeEventListener("mouseenter", handleMouseEnter);
      linkElement.removeEventListener("mouseleave", handleMouseLeave);
      tl.kill();
    };
  });
</script>

<a
  bind:this={linkElement}
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  class="live-site-link"
>
  <span class="link-text">Visit</span>
  <svg
    width="25"
    height="25"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="link-icon"
  >
    <path
      bind:this={arrowPath}
      d={normalPath}
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</a>

<style>
  .live-site-link {
    display: flex;
    align-items: center;
    gap: var(--spacing-12);
    transition: opacity var(--transition-fast);
    padding: var(--spacing-8) 0;
  }

  .live-site-link:hover {
    opacity: 1;
  }

  .link-text {
    font-size: var(--font-size-body);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-normal);
    color: var(--off-white);
  }

  .link-icon {
    width: 24.757px;
    height: 24.757px;
    color: var(--off-white);
    flex-shrink: 0;
  }
</style>
