const boardWidth = 10;
const boardHeight = 10;
const attackStatus = {
  HIT: 'HIT',
  MISS: 'MISS',
};

function createGameBoard() {
  const gameboard = {
    board: [],
    attackLog: [],
    resetBoard: function () {
      for (let i = 0; i < boardHeight; i++) {
        this.board[i] = [];
        for (let j = 0; j < boardWidth; j++) {
          this.board[i][j] = {
            ship: 'empty',
            hasTarget: function () {
              return this.ship !== 'empty';
            },
          };
        }
      }
    },

    // gets a list of spaces that the ship is occupying. Sets all of their ship references to target ship.
    placeShip: function (spaces, ship) {
      for (let space of spaces) {
        this.board[space.y][space.x].ship = ship;
      }
    },
    handleAttack: function (space) {
      // if the space has a ship reference, it's a hit!
      const ship = this.board[space.y][space.x].ship;

      if (ship !== 'empty') {
        this.logAttack(space, attackStatus.HIT);
        ship.hit();
      } else {
        this.logAttack(space, attackStatus.MISS);
      }
    },
    logAttack: function (space, status) {
      this.attackLog.push({ space, status });
    },
  };
  gameboard.resetBoard();
  return gameboard;
}

module.exports = {
  createGameBoard,
  attackStatus,
};
