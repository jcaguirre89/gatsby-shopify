import React, { useState, useRef, Component, createRef, PointerEvent } from 'react';

const PRELOAD_BACK = 1;
const PRELOAD_FORWARD = 2;
const VELOCITY_TRACKING = 0.5;

const style = {
  slider: {
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },

  slider__inner: {
    height: "100%",
  },

  slider__slides: {
    height: "100%",
    display: "flex",
  },

  slider__slide: {
    flexBasis: 0,
    flexGrow: 1,
  },
};

const toRange = (value, range) => ((value % range) + range) % range;

interface SliderProps {
  slides: Array<any>; // Array<VNode> ?
  position?: number;
  onPosition?: { (position: number): void };
}

interface SliderState {
  position: number;
  destination: number;
  dragStart: number;
  dragStartTime: number | null;
  dragVelocity: number;
}

export default function Slider({slides, position, onPosition}) {
  const [state, setState] = useState({
    position: position || 0,
    destination: 0,
    dragStart: 0,
    dragStartTime: null,
    dragVelocity: 0,
  })

  let index = -1
  let scheduled = null
  const ref = useRef(null)

  const animate = () => {
    if (scheduled) return
    
  }

}

export class Slider extends Component<SliderProps, SliderState> {
  constructor(props) {
    super(props);

    this.state = {
      position: props.position || 0,
      destination: 0,
      dragStart: 0,
      dragStartTime: null,
      dragVelocity: 0,
    };

    this.index = -1;
  }

  private ref = createRef<HTMLDivElement>();

  private scheduled: any;

  private index: number;

  private animate = () => {
    if (this.scheduled) {
      return;
    }

    this.scheduled = requestAnimationFrame(() => {
      this.scheduled = false;

      const distance = this.state.destination - this.state.position;

      if (Math.abs(distance * this.getWidth()) > 1) {
        const motion = 0.12 * distance;

        this.setState(
          { position: this.state.position + motion },
          this.animate
        );
      } else {
        this.skipTo(this.state.destination);
      }
    });
  };

  slide(direction: number) {
    this.slideTo(Math.round(this.state.destination) + direction);
  }

  slideTo(destination: number) {
    this.setState({ destination, dragStartTime: null }, this.animate);
  }

  skip(direction: number) {
    this.skipTo(Math.round(this.state.position) + direction);
  }

  skipTo(position: number) {
    const destination = toRange(position, this.props.slides.length);

    this.setState({
      destination,
      position: destination
    });
  }

  private onPointerDown = (event: PointerEvent) => {
    this.setState({
      destination: this.state.position,
      dragStart: event.pageX,
      dragStartTime: Date.now(),
      dragVelocity: 0,
    });
  };

  private onPointerMove = (event: PointerEvent) => {
    if (this.state.dragStartTime === null) {
      return;
    }

    const dragTo = event.pageX;
    const distance = (this.state.dragStart - dragTo);
    const unitDistance = distance / this.getWidth();
    const position = toRange(this.state.position + unitDistance, this.props.slides.length);
    const now = Date.now();
    const elapsed = now - this.state.dragStartTime;

    this.setState({
      position,
      destination: position,
      dragStart: dragTo,
      dragStartTime: now,
      dragVelocity: (distance / elapsed) * VELOCITY_TRACKING * -1000
        + (1 - VELOCITY_TRACKING) * this.state.dragVelocity,
    });
  };

  private onPointerUp = (event: PointerEvent) => {
    const dragging = Date.now() - this.state.dragStartTime < 50;

    if (dragging && (Math.abs(this.state.dragVelocity) > 200)) {
      const direction = this.state.dragVelocity > 0 ? -1 : 1;

      this.slideTo(Math.round(this.state.destination + direction));
    } else {
      this.slideTo(Math.round(this.state.destination));
    }
  };

  private getWidth() {
    return this.ref.current.offsetWidth;
  }

  render() {
    const length = this.props.slides.length;
    const position = toRange(this.state.position, length);
    const index = Math.round(position);
    const offset = index - position;

    if (index !== this.index) {
      this.index = index;

      if (this.props.onPosition) {
        this.props.onPosition(toRange(this.index, length));
      }
    }

    const visible: Array<number> = [];

    for (let i = index - PRELOAD_BACK; i <= index + PRELOAD_FORWARD; i++) {
      visible.push((i + length) % length);
    }

    const slides = visible.map(i => <div key={i} style={style.slider__slide}>{this.props.slides[i]}</div>);

    const slides_style = {
      ...style.slider__slides,
      width: `${100 * slides.length}%`,
      transform: `translateX(${(offset - PRELOAD_BACK) * (100 / slides.length)}%)`,
    };

    return (
      <div style={style.slider} ref={this.ref}>
        <div
          style={style.slider__inner}
          onPointerDown={this.onPointerDown}
          onPointerMove={this.onPointerMove}
          onPointerUp={this.onPointerUp}
        >
          <div style={slides_style}>
            {slides}
          </div>
        </div>
      </div>
    );
  }
}
