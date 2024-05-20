import Nullstack, { NullstackClientContext } from 'nullstack';
import { fabric } from 'fabric';

import { MainSectionComponents } from '../../recursive/MainSectionComponents';
import { delay } from '../../utils/delay';

import './styles.scss';

const wrapper_style = (visible: boolean) =>
  visible
    ? 'left: 0;z-index: 2;position: absolute;top: 0;width: 100%;height: calc(100% - 48px);margin-top: 48px;background: white;overflow: auto;'
    : 'position:absolute; z-index:-1; aspect-ratio: 16/9; width: 1920px; left: -2690px;display:flex;';

export class Canvas extends Nullstack {
  _html2canvas;
  canvas: fabric.Canvas;
  zoom = 0.5;
  canvas_ref: HTMLCanvasElement;
  canvas_wrapper: HTMLDivElement;
  svg_wrapper: HTMLDivElement;
  isDragging: boolean;
  lastPosX: number;
  lastPosY: number;
  pressingSpace: boolean;

  hydrate({ instances }: NullstackClientContext) {
    const html2canvas = require('html2canvas');

    const { elements } = instances.pagebuilder;

    this.canvas = new fabric.Canvas(this.canvas_ref, {
      width: this.canvas_wrapper.clientWidth,
      height: this.canvas_wrapper.clientHeight,
      backgroundColor: 'transparent',
      uniformScaling: true,
    });

    this._onresize();

    window.addEventListener('resize', this._onresize);

    // Zoom and pan handling
    this.canvas.on('mouse:wheel', opt => {
      const delta = opt.e.deltaY;
      let zoom = this.canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      this.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    this.canvas.on('mouse:down', opt => {
      const evt = opt.e;
      if (
        evt.altKey ||
        (this.pressingSpace && !this.canvas.getActiveObject())
      ) {
        this.isDragging = true;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    });

    this.canvas.on('mouse:move', opt => {
      if (this.isDragging) {
        const e = opt.e;
        const vpt = this.canvas.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.canvas.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });

    this.canvas.on('mouse:up', () => {
      this.isDragging = false;
      this.canvas.setViewportTransform(this.canvas.viewportTransform);
    });

    this._html2canvas = html2canvas;

    document.addEventListener('keydown', event => this.onkeydown({ event }));
    document.addEventListener('keyup', event => this.onkeyup({ event }));

    this.draw({});
  }

  async draw({ instances }: Partial<NullstackClientContext>) {
    if (!this.canvas) return;
    if (!this._html2canvas) return;

    await delay(100);

    const vpt = this.canvas.viewportTransform.slice();

    const result = await this._html2canvas(this.svg_wrapper, {
      useCORS: true,
      allowTaint: false,
    });

    const page = instances.pagebuilder.elements.elements.find(
      ({ name }) => name === 'Page',
    );

    const img = this.canvas.getObjects()[0];
    const options: fabric.IImageOptions | null = !img
      ? {}
      : {
          aCoords: img.aCoords,
          height: img.height,
          angle: img.angle,
          width: img.width,
          left: img.left,
          top: img.top,
          backgroundColor: (page?.values?.background as string) || '#ffffff',
        };

    const imgInstance = new fabric.Image(result, options);

    imgInstance.setControlsVisibility({
      mtr: false,
      mt: false,
      ml: false,
      mr: false,
      mb: false,
    });

    this.canvas.clear();
    this.canvas.setViewportTransform(vpt);
    this.canvas.add(imgInstance);
    this.canvas.renderAll();
  }

  terminate({ instances }: NullstackClientContext) {
    window.removeEventListener('resize', this._onresize);
    document.removeEventListener('keydown', event =>
      this.onkeydown({ event, instances }),
    );
    document.removeEventListener('keyup', event => this.onkeyup({ event }));
  }

  private _onresize() {
    this.canvas.setHeight(this.canvas_wrapper.clientHeight);
    this.canvas.setWidth(this.canvas_wrapper.clientWidth);
  }

  private onkeyup({
    event,
  }: Partial<NullstackClientContext<{ event: KeyboardEvent }>>) {
    if (event.key === ' ') {
      this.pressingSpace = false;
    }
  }

  onkeydown({
    event,
    instances,
  }: Partial<NullstackClientContext<{ event: KeyboardEvent }>>) {
    if (event.key === ' ') {
      this.pressingSpace = true;
      return;
    }

    this.pressingSpace = false;

    if (!this.canvas.getActiveObject()) return;

    if (event.key === 'Delete') {
      if (!confirm('Are you sure you want to clear everything?')) return;
      instances.pagebuilder.elements.elements = [];
      this.canvas.clear();
      this.canvas.renderAll();
      this.draw({});
    }

    if (!event.ctrlKey) return;

    if (event.key === 'c') return instances.pagebuilder.copy({});

    if (event.key === 'v') {
      navigator.clipboard.readText().then(stringified_json => {
        instances.pagebuilder.load({ stringified_json });
        this.draw({});
      });
    }
  }

  render({ instances }: NullstackClientContext) {
    const { elements, previewing } = instances.pagebuilder;
    const { elements: elements_list } = elements;

    return (
      <div ref={this.canvas_wrapper} class="canvas-wrapper">
        <canvas ref={this.canvas_ref} />

        <div ref={this.svg_wrapper} style={wrapper_style(previewing)}>
          {elements_list.map(component => {
            return <MainSectionComponents component={component} />;
          })}
        </div>
      </div>
    );
  }
}
