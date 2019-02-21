import {Component} from 'react';
import defaultProps from './default-props';
export default class SnowFlutter extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.snowParam = this.props.snowParam || defaultProps;
        this.snowParam.snowShape = this.props.snowParam&&this.props.snowParam.snowShape || defaultProps.snowShape;
    }

    componentDidMount() {
        this.final(this.snowParam);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    addChild(top, snowShape) {
        var div = document.createElement("div");
        div.innerHTML = snowShape;
        div.className = "flake";
        div.style.position = 'absolute';
        div.style.color = 'white';
        div.style.opacity = 0.9;
        div.style.left = parseInt(Math.random() * window.innerWidth) + 'px';
        div.style.top = top + 'px';
        div.style.fontSize = parseInt(Math.random() * 50) + 'px';
        document.body.appendChild(div);
    };

    autoWipe(snowSpeed, snowShape) {
        var flake = document.getElementsByClassName('flake');
        var that =this;
        var timer = setInterval(function () {
            for (var i = 0; i < flake.length; i++) {
                var opacity = flake[i].style.opacity;
                var offsetTop = Number((flake[i].style.top).replace('px', ''));
                if (offsetTop < window.innerHeight) {
                    offsetTop = offsetTop + snowSpeed;
                    opacity = opacity - 0.003;
                    flake[i].style.top = offsetTop + 'px';
                    flake[i].style.opacity = opacity;
                } else {
                    document.body.removeChild(flake[i]);
                    that.addChild(0, snowShape);
                }
            }
        }, 100);
    };

    final(snowParam) {
        for (var i = 0; i < snowParam.snowNum; i++) {
            this.addChild(parseInt(Math.random() * window.innerHeight), snowParam.snowShape);
        }
        this.autoWipe(snowParam.snowSpeed, snowParam.snowShape);
    };
    render() {
        return <div id="rain"></div>
    }
}