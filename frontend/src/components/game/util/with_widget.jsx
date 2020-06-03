import React from 'react';
import styles from './with_widget.module.scss';

const withWidget = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      const { x, y } = this.props;
      this.state = {
        dragging: false,
        opacity: 1,
        x,
        y,
        offsetX: 0,
        offsetY: 0,
      };
      this.startDrag = this.startDrag.bind(this);
      this.dragOver = this.dragOver.bind(this);
      this.endDrag = this.endDrag.bind(this);
    }

    startDrag(e) {
      this.setState({ opacity: 0.5, dragging: true });
      const { x, y } = this.state;
      this.setState({ offsetX: e.clientX - x, offsetY: e.clientY - y });
    }

    endDrag(e) {
      this.setState({ opacity: 1, dragging: false });
      const { offsetX, offsetY } = this.state;
      let endX = e.clientX - offsetX;
      if (endX < 0) {
        endX = 0;
      } else if (endX > window.innerWidth - e.currentTarget.clientWidth) {
        endX = window.innerWidth - e.currentTarget.clientWidth;
      }

      let endY = e.clientY - offsetY;
      if (endY < 0) {
        endY = 0;
      } else if (endY > window.innerHeight - e.currentTarget.clientHeight) {
        endY = window.innerHeight - e.currentTarget.clientHeight;
      }

      this.setState({ x: endX, y: endY });
    }

    dragOver(e) {
      e.preventDefault();
    }

    render() {
      const {
        dragging, opacity, x, y,
      } = this.state;
      const { x: oriX, y: oriY, ...restProps } = this.props;
      return (
        <div className={dragging ? `${styles.coverContainer} ${styles.container}` : styles.container} onDragOver={this.dragOver}>
          <div
            className={styles.contentContainer}
            draggable
            onDragStart={this.startDrag}
            onDragEnd={this.endDrag}
            style={{ top: y, left: x, opacity }}
          >
            <Component {...restProps} />
          </div>
        </div>
      );
    }
  };
};

export default withWidget;
