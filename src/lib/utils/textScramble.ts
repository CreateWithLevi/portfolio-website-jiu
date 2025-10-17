/**
 * Text Scramble Effect
 * Scrambles text characters with random symbols before revealing the true text
 */
export class TextScramble {
  private el: HTMLElement;
  private chars = '!<>-_\\/[]{}—=+*^?#________';
  private frameRequest: number | null = null;
  private frame = 0;
  private queue: Array<{ from: string; to: string; start: number; end: number; char?: string }> = [];
  private resolve: (() => void) | null = null;

  constructor(el: HTMLElement) {
    this.el = el;
  }

  setText(newText: string): Promise<void> {
    const oldText = this.el.textContent || '';
    const length = Math.max(oldText.length, newText.length);

    return new Promise((resolve) => {
      this.resolve = resolve;
      this.queue = [];

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 20);
        const end = start + Math.floor(Math.random() * 20);
        this.queue.push({ from, to, start, end });
      }

      if (this.frameRequest) {
        cancelAnimationFrame(this.frameRequest);
      }

      this.frame = 0;
      this.update();
    });
  }

  private update = () => {
    let output = '';
    let complete = 0;

    for (let i = 0; i < this.queue.length; i++) {
      const { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          this.queue[i].char = this.randomChar();
        }
        output += this.queue[i].char;
      } else {
        output += from;
      }
    }

    this.el.textContent = output;

    if (complete === this.queue.length) {
      if (this.resolve) {
        this.resolve();
      }
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  };

  private randomChar(): string {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }

  destroy() {
    if (this.frameRequest) {
      cancelAnimationFrame(this.frameRequest);
    }
  }
}
