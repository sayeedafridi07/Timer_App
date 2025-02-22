## Timer App ⏳

Overview

A simple and intuitive React Native app that lets users create multiple timers effortlessly. Whether it's for workouts, study sessions, or short breaks, this app helps users stay on track with a clean and user-friendly interface.

## Features 🚀

Flexible Timer Management: Users can create custom timers with a name, duration, and category (Workout, Study, Break). Each timer can be started, paused, reset, or marked as completed when it reaches zero.

Organized Timer List: Timers are grouped by category for easy navigation. Categories can be expanded or collapsed, and each timer displays its name, remaining time, and current status.

Bulk Actions: Users can start, pause, or reset all timers within a category in one action, streamlining timer management.

Progress Tracking & Alerts: A simple progress bar or percentage visually represents time remaining. Users can also set halfway alerts for additional reminders.

History, Persistence & Dark Mode: A dedicated history screen logs completed timers with their completion times. Timer data is stored locally using AsyncStorage for persistence. The app also supports dark mode for a better user experience in low-light environments.

## Assumptions
Local Storage Only: Timers and history are stored locally using AsyncStorage, with no backend/database integration.

Single Device Usage: Data persistence is only for the current device; there’s no cloud sync or multi-device support.

Fixed Categories: Categories (Workout, Study, Break) are predefined and cannot be customized.

Minimal UI Dependencies: Styling is handled with StyleSheet, avoiding heavy UI libraries.

History: Exports JSON data.


## Installation

Download and install the libraries:
```bash
git clone https://github.com/sayeedafridi07/Timer_App.git
cd Timer_App
npm install
```

And run the app into the Android simulators:
```bash
npm run start  # run the app in the Android emulator
```
