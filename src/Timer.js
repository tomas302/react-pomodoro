import React, { Component } from 'react';

class TimerLengthControl extends Component {
    render() {
        return <div id="timer-length">
            <div class="length-control">
                <div id="break-label">Break Length</div>
                <button id="break-decrement">-</button>
                <div id="break-length">5</div>
                <button id="break-increment">+</button>
            </div>
            <div class="length-control">
                <div id="session-label">Session Length</div>
                <button id="session-decrement">-</button>
                <div id="session-length">25</div>
                <button id="session-increment">+</button>
            </div>
        </div>;
    }
}

export default class Timer extends Component {
    render() {
        return <div>
            <h1>Pomodoro Clock</h1>
            <TimerLengthControl />
            <div id="timer">
                <h2 id="timer-label">Session</h2>
                <div id="time-left">
                    25:00
                </div>
                <button id="start_stop">Start</button>
                <button id="reset">Reset</button>
            </div>
        </div>;
    }
}