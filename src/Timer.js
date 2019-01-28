import React, { Component } from 'react';

const playButton = <i title="Start" class="fas fa-play"></i>;
const pauseButton = <i title="Stop" class="fas fa-pause"></i>;

// Timer Types
const SESSION = 0;
const BREAK = 1;

// Accurate_Interval.js 
// Thanks Squeege! For the elegant answer provided to this question: 
// http://stackoverflow.com/questions/8173580/setinterval-timing-slowly-drifts-away-from-staying-accurate
// Github: https://gist.github.com/Squeegy/1d99b3cd81d610ac7351
// Slightly modified to accept 'normal' interval/timeout format (func, time). 
// From: https://codepen.io/no_stack_dub_sack/pen/VKJGKd

const accurateInterval = function(fn, time) {
    var cancel, nextAt, timeout, wrapper;
    nextAt = new Date().getTime() + time;
    timeout = null;
    wrapper = function() {
      nextAt += time;
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());
      return fn();
    };
    cancel = function() {
      return clearTimeout(timeout);
    };
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return {
      cancel: cancel
    };
};

class TimerLengthControl extends Component {
    render() {
        return <div class="length-control">
                    <div id={ this.props.class + "-label" }>{ this.props.label } Length</div>
                    <button id={ this.props.class + "-decrement"} onClick={ this.props.clickDecrement }><i class="fas fa-arrow-down"></i></button>
                    <div id={ this.props.class + "-length"}>{ this.props.length }</div>
                    <button id={ this.props.class + "-increment"} onClick={ this.props.clickIncrement }><i class="fas fa-arrow-up"></i></button>
                </div>;
    }
}

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 1500,
            intervalID: '',
            sessionLength: 25,
            breakLength: 5,
            running: false,
            timerType: SESSION
        };

        this.startStop = this.startStop.bind(this);
        this.beginCountdown = this.beginCountdown.bind(this);
        this.reduceTimer = this.reduceTimer.bind(this);
        this.phaseControl = this.phaseControl.bind(this);
        this.reset = this.reset.bind(this);
        this.clockify = this.clockify.bind(this);
        this.startStopButton = this.startStopButton.bind(this);
        this.changeBreakLength = this.changeBreakLength.bind(this);
        this.changeSessionLength = this.changeSessionLength.bind(this);
    }

    startStop() {
        if (this.state.running) {
            this.state.intervalID.cancel();
            this.setState({ running: false });
        } else {
            this.beginCountdown();
        }
    }

    beginCountdown() {
        this.setState({
            intervalID: accurateInterval(() => {
                this.reduceTimer();
                this.phaseControl();
            }, 1000),
            running: true
        });
    }

    reduceTimer() {
        this.setState({ timer: this.state.timer - 1 });
    }

    phaseControl() {
        
    }

    reset() {
        if (this.state.intervalID)
            this.state.intervalID.cancel();
        this.setState({
            timer: 1500,
            sessionLength: 25,
            breakLength: 5,
            running: false
        });
    }
    
    clockify() {
        let minutes = Math.floor(this.state.timer / 60);
        let seconds = this.state.timer - minutes * 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return minutes + ':' + seconds;
    }

    startStopButton() {
        return (this.state.running) ? pauseButton : playButton ;
    }

    changeBreakLength(amount) {
        if (this.state.timerType === BREAK) {
            if (this.state.running) {
                return;
            } else {
                let newLength = this.state.breakLength + amount;
                newLength = (newLength > 60 || newLength < 1) ? this.state.breakLength : newLength;
                this.setState({
                    breakLength: newLength,
                    timer: newLength * 60
                });
            }
        } else {
            let newLength = this.state.breakLength + amount;
            newLength = (newLength > 60 || newLength < 1) ? this.state.breakLength : newLength;
            this.setState({
                breakLength: newLength
            });
        }
    }

    changeSessionLength(amount) {
        if (this.state.timerType === SESSION) {
            if (this.state.running) {
                return;
            } else {
                let newLength = this.state.sessionLength + amount;
                newLength = (newLength > 60 || newLength < 1) ? this.state.sessionLength : newLength;
                this.setState({
                    sessionLength: newLength,
                    timer: newLength * 60
                });
            }
        } else {
            let newLength = this.state.sessionLength + amount;
            newLength = (newLength > 60 || newLength < 1) ? this.state.sessionLength : newLength;
            this.setState({
                sessionLength: newLength
            });
        }
        
    }

    render() {
        return <div id="timer-wrapper">
            <h1>Pomodoro Clock</h1>
            <div id="timer-length">
                <TimerLengthControl 
                    class="break"
                    label="Break"
                    length={ this.state.breakLength }
                    clickDecrement={ () => this.changeBreakLength(-1) }
                    clickIncrement={ () => this.changeBreakLength(1) }
                />
                <TimerLengthControl 
                    class="session"
                    label="Session"
                    length={ this.state.sessionLength }
                    clickDecrement={ () => this.changeSessionLength(-1) }
                    clickIncrement={ () => this.changeSessionLength(1) }
                />
            </div>
            <div id="timer">
                <h2 id="timer-label">Session</h2>
                <div id="time-left">
                    { this.clockify() }
                </div>
            </div>
            <button id="start_stop" onClick={ this.startStop }>{ this.startStopButton() }</button>
            <button id="reset" onClick={ this.reset }><i title="Reset" class="fas fa-sync-alt"></i></button>
            <div id="footer">Coded by <a rel="noopener noreferrer" target="_blank" href="https://github.com/tomas302">tomas302</a></div>
        </div>;
    }
}