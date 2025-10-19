import { Renderer, Camera, Geometry, Program, Mesh, Texture, Vec2 } from 'ogl';
import { vertex, fragment } from './fluidShader';

/**
 * WebGL Image Effect Manager
 * Handles the WebGL context and fluid distortion effect for project images
 */
export class ImageEffect {
  private renderer: Renderer;
  private gl: WebGLRenderingContext;
  private camera: Camera;
  private geometry: Geometry;
  private program: Program;
  private mesh: Mesh;
  private mouse: Vec2;
  private targetMouse: Vec2;
  private time = 0;
  private animationFrame: number | null = null;

  constructor(private canvas: HTMLCanvasElement, imageSrc: string) {
    // Initialize OGL renderer
    this.renderer = new Renderer({
      canvas,
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
    });
    this.gl = this.renderer.gl;

    // Setup camera
    this.camera = new Camera(this.gl, {
      left: -0.5,
      right: 0.5,
      bottom: -0.5,
      top: 0.5,
      zoom: 1,
    });
    this.camera.position.z = 1;

    // Mouse tracking
    this.mouse = new Vec2();
    this.targetMouse = new Vec2();

    // Create plane geometry
    this.geometry = new Geometry(this.gl, {
      position: {
        size: 2,
        data: new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
      },
      uv: {
        size: 2,
        data: new Float32Array([0, 0, 1, 0, 0, 1, 1, 1])
      },
      index: {
        size: 1,
        data: new Uint16Array([0, 1, 2, 1, 3, 2])
      },
    });

    // Load texture
    const texture = new Texture(this.gl);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      texture.image = img;
      if (this.program && this.program.uniforms.uImageResolution) {
        this.program.uniforms.uImageResolution.value.set(img.width, img.height);
      }
      this.resize();
      this.update();
    };
    img.src = imageSrc;

    // Create program with shaders
    this.program = new Program(this.gl, {
      vertex,
      fragment,
      uniforms: {
        tMap: { value: texture },
        uMouse: { value: this.mouse },
        uTime: { value: 0 },
        uResolution: { value: new Vec2(this.canvas.width, this.canvas.height) },
        uImageResolution: { value: new Vec2(1, 1) },
        uStrength: { value: 1.0 },
      },
    });

    // Create mesh
    this.mesh = new Mesh(this.gl, { geometry: this.geometry, program: this.program });

    // Bind mouse events
    this.bindEvents();

    // Initial resize
    this.resize();
  }

  private bindEvents() {
    this.canvas.addEventListener('mousemove', this.onMouseMove);
    this.canvas.addEventListener('mouseleave', this.onMouseLeave);
    window.addEventListener('resize', this.resize);
  }

  private onMouseMove = (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    this.targetMouse.x = e.clientX - rect.left;
    this.targetMouse.y = rect.height - (e.clientY - rect.top);
  };

  private onMouseLeave = () => {
    this.targetMouse.set(this.canvas.width / 2, this.canvas.height / 2);
  };

  private resize = () => {
    const { clientWidth, clientHeight } = this.canvas.parentElement || this.canvas;
    this.renderer.setSize(clientWidth, clientHeight);

    if (this.program && this.program.uniforms.uResolution) {
      this.program.uniforms.uResolution.value.set(clientWidth, clientHeight);
    }

    this.camera.orthographic({
      left: -0.5,
      right: 0.5,
      bottom: -0.5,
      top: 0.5,
    });
  };

  private update = () => {
    this.animationFrame = requestAnimationFrame(this.update);

    // Smooth mouse following
    this.mouse.lerp(this.targetMouse, 0.1);

    // Update time
    this.time += 0.01;
    if (this.program && this.program.uniforms.uTime) {
      this.program.uniforms.uTime.value = this.time;
    }

    // Render
    this.renderer.render({ scene: this.mesh, camera: this.camera });
  };

  updateImage(imageSrc: string) {
    const texture = new Texture(this.gl);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      texture.image = img;
      if (this.program && this.program.uniforms.tMap) {
        this.program.uniforms.tMap.value = texture;
      }
      if (this.program && this.program.uniforms.uImageResolution) {
        this.program.uniforms.uImageResolution.value.set(img.width, img.height);
      }
    };
    img.src = imageSrc;
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
    this.canvas.removeEventListener('mouseleave', this.onMouseLeave);
    window.removeEventListener('resize', this.resize);

    // Clean up WebGL resources
    if (this.geometry) this.geometry.remove();
    if (this.program) this.program.remove();
  }
}
