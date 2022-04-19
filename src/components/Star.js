import React from 'react'

class Star extends React.Component {
    constructor(props) {
      super(props);
      this.id = props.id;
      this.state = {isSelected: false};
      this.handleStarHover = this.handleStarHover.bind(this);
      this.handleStarClick = this.handleStarClick.bind(this);
      this.x = Math.random()*1090;
      this.y = Math.random()*690;
      this.r = Math.random()*20;
      let c = Math.random();
      if (c < 0.4) {
        this.color = "white"
      }
      else if (c < 0.55) {
        this.color = "red"
      }
      else if (c < 0.7) {
        this.color = "orange"
      }
      else if (c < 0.85) {
        this.color = "yellow"
      }
      else {
        this.color = "blue"
      }
    }
    handleStarHover() {
        console.log('hovering');
        console.log(this.id);
    }
    handleStarClick() {
        this.state = {isSelected: !this.state.isSelected};
        console.log(this.state.isSelected);
        console.log(this);
        console.log(this.props.color);
    }

    render() {
        return (
          <g
            onMouseEnter={this.handleStarHover}
            onClick={this.handleStarClick}
          >
            <circle
              cx={this.props.x}
              cy={this.props.y}
              r={this.props.r}
              fill={this.props.color}
            />
          </g>
        )
      }
    }

export default Star;
