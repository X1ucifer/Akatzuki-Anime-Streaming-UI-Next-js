import React from 'react';
import NProgress from 'nprogress';
import Router from "next/router";
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
// #8acf00
class NextNProgress extends React.Component {
    static defaultProps = {
        color: '#FF0000',
        startPosition: 0.3,
        stopDelayMs: 200,
        height: 4,
    };

    timer = null;

    routeChangeStart = () => {
        NProgress.set(this.props.startPosition);
        NProgress.start();
    };

    routeChangeEnd = () => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            NProgress.done(true);
        }, this.props.stopDelayMs);
    };

    render() {
        const { color, height } = this.props;

        return (
            <>
                <div className='container'></div>
                <style jsx global>{`

                .container{
                    width:100%;
                    height:100vh;
                    opacity:0;
                    z-index: 1;
                    // background-color: rgba(0, 0, 0, 0.5);
                }
        #nprogress {
          pointer-events: none;
          z-index: 1067;
        }
        #nprogress .bar {
          background:  ${color};
          position: fixed;
          z-index: 999999999999;
          top: 0;
          left: 0;
          width: 100%;
          height: ${height}px;
        }
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
      
          opacity: 1;
          -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
        }
        #nprogress .spinner {
          display: "block";
          position: fixed;
          z-index: 1031;
          top: 49%;
          right: 49%;
        }
        // #nprogress .spinner-icon {
        //   width: 58px;
        //   height: 58px;
        //   box-sizing: border-box;
        //   border: solid 5px transparent;
        //   border-top-color: ${color};
        //   border-left-color: ${color};
        //   border-radius: 50%;
        //   -webkit-animation: nprogresss-spinner 400ms linear infinite;
        //   animation: nprogress-spinner 400ms linear infinite;
        // }
        .nprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }
        .nprogress-custom-parent #nprogress .spinner,
        .nprogress-custom-parent #nprogress .bar {
          position: absolute;
        }
        @-webkit-keyframes nprogress-spinner {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
        @keyframes nprogress-spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
            </>
        );

    }

    componentDidMount() {
        const { options } = this.props;

        if (options) {
            NProgress.configure(options);
        }

        Router.events.on('routeChangeStart', this.routeChangeStart);
        Router.events.on('routeChangeComplete', this.routeChangeEnd);
        Router.events.on('routeChangeError', this.routeChangeEnd);
    }
}

NextNProgress.propTypes = {
    color: PropTypes.string,
    startPosition: PropTypes.number,
    stopDelayMs: PropTypes.number,
    options: PropTypes.object,
};

export default NextNProgress;