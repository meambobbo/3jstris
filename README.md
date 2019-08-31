# 3jstris
3js implementation of tetris

## installation

```
git clone github.com/meambobbo/3jstris.git
npm install
```

## usage

```
npm start
```

## why

My son is obsessed with Tetris. He makes stop motion videos, power-point animations, and detailed drawings. He wanted to make our own Tetris game, so I thought the simplest implementation could likely be 3js using simple geometry and textures. The added benefit is a 3d game board and pieces. If there are 

## features

### Start Screen

The initial view of the app is the start screen. This should feature some random rotating pieces moving left, right, up, and down in various different z positions in the background. The full background should be an image.

Menu items are shown in the foreground. The first item is highlighted, and the up/down arrows can select the different items. Enter or space is used to select.

- Level : 0 (left right to change, enter to start)
- Controls (eventually reassignable, but at first just shown)
    - move left     : left arrow
    - move right    : right arrow
    - fast drop     : down arrow
    - hard drop     : up arrow
    - rotate right  : z 
    - rotate left   : x
    - pause/unpause : space
    - back          : esc 
- Show Projection   : On (left/right to toggle On/Off)
- Quit

### Play Screen

- move left/right
- rotate left/right
- drops - hard/fast
- pause/back
- score
- level/speed
- camera panning
- music
- sound effects
- next and next n
- hold

### Game Over and Scores

On losing, show some animation and game over message for a short time and then show:

- Scores: date, score, initials, sorted by score desc
- Press enter/space to play again, esc to return to start

## implementation strategy

### state machines

We will maintain a global state machine responsible for determining what the app should be doing - what interactions it will accept and react to from the user, what scenes are loaded and what modules they call out to, and what triggers will cause this state to change to a different state. Beyond global state, certain modes can hold their own internal states.

- Start Screen
- Get Ready
- Play
    - Falling Tetrimino - control of the block
    - Locked Tetrimino - row detection and changes, game over detection, level change, stage new tetrimino to start falling
    - Game Over - animation for when you lose
- Game Over Screen

### level -1

Level -1 will be our test level. This will feature no falling - only hard drops. This avoids the difficulty of determining when a tetrimino is considered 'locked' into place and gets us a nice safe space to move left/right and rotate, making sure we don't clip the game border. This is also a good place to test projections for fast drops.

### models

Since the tetriminos are laid into rows that are eventually able to be removed from the board, while somce pieces of the tetrimino remain, this means we eventually have to alter our mesh to accomodate this. This gives us two options: attempt to continuously merge and modify a few mesh blobs that absorb pieces once they've locked, or model the tetriminos as independent cubes that touch each other. Since the latter is simpler, it will be our immediate strategy.

The game border can be made of large rectangular prisms. We can also use the same for next, hold, and level displays.

### text

