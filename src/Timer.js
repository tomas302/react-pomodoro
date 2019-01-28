import React, { Component } from 'react';

const playButton = <i title="Start" class="fas fa-play"></i>;
const pauseButton = <i title="Stop" class="fas fa-pause"></i>;

class TimerLengthControl extends Component {
    render() {
        return <div id="timer-length">
            <div class="length-control">
                <div id="break-label">Break Length</div>
                <button id="break-decrement"><i class="fas fa-arrow-down"></i></button>
                <div id="break-length">5</div>
                <button id="break-increment"><i class="fas fa-arrow-up"></i></button>
            </div>
            <div class="length-control">
                <div id="session-label">Session Length</div>
                <button id="session-decrement"><i class="fas fa-arrow-down"></i></button>
                <div id="session-length">25</div>
                <button id="session-increment"><i class="fas fa-arrow-up"></i></button>
            </div>
        </div>;
    }
}

export default class Timer extends Component {
    
    render() {
        return <div id="timer-wrapper">
            <h1>Pomodoro Clock</h1>
            <TimerLengthControl />
            <div id="timer">
                <h2 id="timer-label">Session</h2>
                <div id="time-left">
                    25:00
                </div>
            </div>
            <button id="start_stop"><i title="Start" class="fas fa-play"></i></button>
            <button id="reset"><i title="Reset" class="fas fa-sync-alt"></i></button>
            <div id="footer">Coded by <a href="https://github.com/tomas302">tomas302</a></div>
        </div>;
    }
}