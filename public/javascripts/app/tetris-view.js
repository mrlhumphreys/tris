const RED = '#ff0303';
const BLUE = '#0042ff';
const TEAL = '#1ce6b9';
const PURPLE = '#540081';
const YELLOW = '#fffc01';
const ORANGE = '#fe8a0e';
const GREEN = '#20c000';
const PINK = '#e55bb0';
const GREY = '#959697';
const LIGHT_BLUE = '#7ebff1';
const DARK_GREEN = '#106246';
const BROWN = '#4e2a04';

class Piece {
  constructor(colour, rotations) {
    this.colour = colour;
    this.rotations = rotations;
    this.rotation = 0;
  }

  rotate() {
    var nextRotations = [1, 2, 3, 0];
    var nextRotation = nextRotations[this.rotation];
    this.rotation = nextRotation;
  }

  size() {
    return this.currentRotation().length;
  }

  currentRotation() {
    return this.rotations[this.rotation];
  }
}

class Block {
  constructor(colour, moving, pivot, x, y) {
    this.colour = colour;
    this.moving = moving;
    this.pivot = pivot;
    this.x = x;
    this.y = y;
  }
}

class PieceType {
  constructor(colour, grid) {
    this.colour = colour;
    this.grid = grid;
  }

  rotations() {
    return [this.buildBlocks(this.grid), this.buildBlocks(this.rotate90()), this.buildBlocks(this.rotate180()), this.buildBlocks(this.rotate270())];
  }

  buildBlocks(grid) {
    return grid.map(row => {
      return row.map(column => {
        if (column > 0) {
          var colour = this.colour;
          var moving = true;
          var pivot = column == 2;
          return new Block(colour, moving, pivot);
        } else {
          return null;
        }
      });
    });
  }

  rotate90() {
    return _.zip.apply(_, this.grid.slice().reverse());
  }

  rotate180() {
    return this.grid.map(function (row) {
      return row.slice().reverse();
    }).slice().reverse();
  }

  rotate270() {
    return _.zip.apply(_, this.grid).slice().reverse();
  }

  buildPiece() {
    return new Piece(this.colour, this.rotations());
  }
}

const TromrisPieceTypes = [new PieceType(RED, [[0, 1, 0], [0, 2, 0], [0, 1, 0]]), new PieceType(BLUE, [[0, 0, 0], [0, 2, 1], [0, 1, 0]])];

const TetrisPieceTypes = [new PieceType(RED, [[0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 2, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]]), new PieceType(BLUE, [[0, 0, 0], [0, 2, 1], [0, 1, 1]]), new PieceType(TEAL, [[0, 0, 0], [1, 2, 1], [0, 1, 0]]), new PieceType(PURPLE, [[0, 0, 0], [1, 2, 1], [0, 0, 1]]), new PieceType(YELLOW, [[0, 0, 0], [1, 2, 1], [1, 0, 0]]), new PieceType(ORANGE, [[0, 0, 0], [0, 2, 1], [1, 1, 0]]), new PieceType(GREEN, [[0, 0, 0], [1, 2, 0], [0, 1, 1]])];

const PentrisPieceTypes = [new PieceType(RED, [[0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 2, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]]), new PieceType(BLUE, [[0, 1, 1], [1, 2, 0], [0, 1, 0]]), new PieceType(BLUE, [[1, 1, 0], [0, 2, 1], [0, 1, 0]]), new PieceType(TEAL, [[0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 2, 0, 0], [0, 0, 1, 1, 0], [0, 0, 0, 0, 0]]), new PieceType(TEAL, [[0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 2, 0, 0], [0, 1, 1, 0, 0], [0, 0, 0, 0, 0]]), new PieceType(PURPLE, [[0, 1, 1], [0, 2, 1], [0, 1, 0]]), new PieceType(PURPLE, [[1, 1, 0], [1, 2, 0], [0, 1, 0]]), new PieceType(YELLOW, [[0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 2, 1, 0], [0, 0, 0, 1, 0], [0, 0, 0, 0, 0]]), new PieceType(YELLOW, [[0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 1, 2, 0, 0], [0, 1, 0, 0, 0], [0, 0, 0, 0, 0]]), new PieceType(ORANGE, [[1, 1, 1], [0, 2, 0], [0, 1, 0]]), new PieceType(GREEN, [[1, 0, 1], [1, 2, 1], [0, 0, 0]]), new PieceType(PINK, [[0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [1, 1, 2, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]), new PieceType(GREY, [[0, 0, 1], [0, 2, 1], [1, 1, 0]]), new PieceType(LIGHT_BLUE, [[0, 1, 0], [1, 2, 1], [0, 1, 0]]), new PieceType(DARK_GREEN, [[0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 1, 2, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]]), new PieceType(DARK_GREEN, [[0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 2, 1, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]]), new PieceType(BROWN, [[0, 1, 1], [0, 2, 0], [1, 1, 0]]), new PieceType(BROWN, [[1, 1, 0], [0, 2, 0], [0, 1, 1]])];

const PieceTypes = PentrisPieceTypes;

var randomPiece = function () {
  var pieceType = _.sample(PieceTypes);
  return pieceType.buildPiece();
};

const UP = 38;
const DOWN = 40;
const RIGHT = 39;
const LEFT = 37;

class TetrisView {
  constructor(element) {
    this.element = element;
    this.currentPiece = null;
    this.nextPiece = randomPiece();
    this.rowCount = 20;
    this.columnCount = 10;
    this.blocks = [];
    this.gameOver = false;
    this.score = 0;

    $('body').keydown(event => {
      switch (event.which) {
        case UP:
          this.rotate();
          this.render();
          event.preventDefault();
          break;
        case DOWN:
          this.drop();
          this.render();
          event.preventDefault();
          break;
        case RIGHT:
          this.moveRight();
          this.render();
          event.preventDefault();
          break;
        case LEFT:
          this.moveLeft();
          this.render();
          event.preventDefault();
          break;
      }
    });
  }

  message() {
    if (this.gameOver) {
      return "game over";
    } else {
      return "";
    }
  }

  movingBlocks() {
    return this.blocks.filter(function (b) {
      return b.moving;
    });
  }

  staticBlocks() {
    return this.blocks.filter(function (b) {
      return !b.moving;
    });
  }

  currentPivot() {
    return this.movingBlocks().filter(function (b) {
      return b.pivot;
    })[0];
  }

  currentTopLeft() {
    var size = this.currentPiece.size();
    var pivot = this.currentPivot();

    var x = pivot.x - Math.floor(size / 2);
    var y = pivot.y - Math.floor(size / 2);

    return { x: x, y: y };
  }

  collidesBottom() {
    return this.movingBlocks().some(m => {
      var collidesWithBottom = m.y == this.rowCount - 1;
      var collidesWithBlocks = this.staticBlocks().some(function (s) {
        return m.x == s.x && m.y + 1 == s.y;
      });
      return collidesWithBottom || collidesWithBlocks;
    });
  }

  collidesLeft() {
    return !this.movingBlocks().some(m => {
      var collidesWithLeft = m.x == 0;
      var collidesWithBlocks = this.staticBlocks().some(function (s) {
        return m.y == s.y && m.x - 1 == s.x;
      });
      return collidesWithLeft || collidesWithBlocks;
    });
  }

  collidesRight() {
    return !this.movingBlocks().some(m => {
      var collidesWithRight = m.x == this.columnCount - 1;
      var collidesWithBlocks = this.staticBlocks().some(function (s) {
        return m.y == s.y && m.x + 1 == s.x;
      });
      return collidesWithRight || collidesWithBlocks;
    });
  }

  completedRowNumbers() {
    var rows = Array.apply(null, Array(this.rowCount)).map(function (_, i) {
      return i;
    });
    var numbers = rows.filter((_, rowIndex) => {
      var rowBlocks = this.staticBlocks().filter(function (b) {
        return b.y == rowIndex;
      });

      return rowBlocks.length == this.columnCount;
    });
    return numbers;
  }

  addRotationToGrid(startX, startY, rotation) {
    var pieceBlocks = [].concat.apply([], rotation.map((row, rowIndex) => {
      return row.map((block, columnIndex) => {
        var x = startX + columnIndex;
        var y = startY + rowIndex;
        if (block != null) {
          block.x = x;
          block.y = y;
        }

        return block;
      });
    }));

    var collision = this.staticBlocks().some(function (b) {
      return pieceBlocks.some(function (c) {
        return c != null && c.x == b.x && c.y == b.y;
      });
    });

    if (collision) {
      return false;
    } else {
      pieceBlocks.forEach(block => {
        if (block != null) {
          this.blocks.push(block);
        }
      });
      return true;
    }
  }

  addPieceToGrid() {
    var piece = this.nextPiece;
    var width = this.columnCount;
    var pieceWidth = piece.rotations[0][0].length;

    var startX = width / 2 - Math.ceil(pieceWidth / 2);
    var startY = 0;
    var rotation = piece.currentRotation();

    var result = this.addRotationToGrid(startX, startY, rotation);

    if (result) {
      this.currentPiece = this.nextPiece;
      this.nextPiece = randomPiece();
    } else {
      this.gameOver = true;
    }
  }

  moveDown() {
    this.movingBlocks().forEach(function (b) {
      b.y = b.y + 1;
    });
  }

  stopPiece() {
    this.movingBlocks().forEach(function (b) {
      b.moving = false;
    });
  }

  rotate() {
    this.currentPiece.rotate();
    var topLeft = this.currentTopLeft();

    this.movingBlocks().forEach(m => {
      var index = this.blocks.indexOf(m);
      this.blocks.splice(index, 1);
    });

    this.addRotationToGrid(topLeft.x, topLeft.y, this.currentPiece.currentRotation());
  }

  moveLeft() {
    if (this.collidesLeft()) {
      this.movingBlocks().forEach(function (b) {
        b.x = b.x - 1;
      });
    }
  }

  moveRight() {
    if (this.collidesRight()) {
      this.movingBlocks().forEach(function (b) {
        b.x = b.x + 1;
      });
    }
  }

  drop() {
    var columns = Array.from(new Set(this.movingBlocks().map(function (b) {
      return b.x;
    })));

    var differences = columns.map(c => {
      var movingBlocksInColumn = this.movingBlocks().filter(function (b) {
        return b.x == c;
      }).map(function (b) {
        return b.y;
      });

      var lowestMoving = Math.max.apply(null, movingBlocksInColumn);

      var staticBlocksInColumn = this.staticBlocks().filter(function (b) {
        return b.x == c;
      }).map(function (b) {
        return b.y;
      });

      var highestStatic = Math.min.apply(null, staticBlocksInColumn);

      if (highestStatic == Infinity) {
        highestStatic = this.rowCount;
      }

      return highestStatic - lowestMoving;
    });

    var smallestDifference = Math.min.apply(null, differences);

    this.movingBlocks().forEach(function (b) {
      b.y = b.y + smallestDifference - 1;
      b.moving = false;
    });

    this.removeCompletedRows();
    this.addPieceToGrid();
  }

  removeCompletedRows() {
    var rowNumbers = this.completedRowNumbers();

    rowNumbers.forEach(rowNum => {
      var rowBlocks = this.staticBlocks().filter(function (b) {
        return b.y == rowNum;
      });

      rowBlocks.forEach(b => {
        var index = this.blocks.indexOf(b);
        this.blocks.splice(index, 1);
      });

      var aboveBlocks = this.staticBlocks().filter(function (b) {
        return b.y < rowNum;
      });

      aboveBlocks.forEach(function (b) {
        b.y = b.y + 1;
      });
    });

    var numberOfRowsRemoved = rowNumbers.length;

    var scores = [0, 1, 2, 4, 8];

    this.score = this.score + scores[numberOfRowsRemoved];
  }

  tick() {
    if (!this.gameOver) {
      if (this.collidesBottom()) {
        this.stopPiece();
        this.removeCompletedRows();
        this.addPieceToGrid();
      } else {
        this.moveDown();
      }

      this.render();
    }
  }

  render() {
    var html = `
      <div class="left">
        <div class="grid">
          ${_.times(this.rowCount, null).map((row, rowIndex) => {
      var squares = _.times(this.columnCount, null).map((column, columnIndex) => {
        var block = this.blocks.filter(function (b) {
          return b.x == columnIndex && b.y == rowIndex;
        })[0];
        if (block == undefined) {
          return '<div class="square"></div>';
        } else {
          return "<div class=\"square\" style=\"background-color:" + block.colour + "\"></div>";
        }
      }).join('');

      return '<div class="row">' + squares + '</div>';
    }).join('')}
        </div>
      </div>
      <div class="right">
        <div class="score">
          <span>
            ${this.message()}
          </span>
          <span>
            ${this.score}
          </span>
        </div>
        <div class="next">
          <div class="grid">
            ${this.nextPiece.rotations[0].map(function (row) {
      var squares = row.map(function (square) {
        if (square == null) {
          return '<div class="square"></div>';
        } else {
          return "<div class=\"square\" style=\"background-color:" + square.colour + "\"></div>";
        }
      }).join('');

      return '<div class="row">' + squares + '</div>';
    }).join('')}
          </div>
        </div>
      </div>
    `;
    $(this.element).html(html);
  }
}

$(document).ready(function () {
  var tetrisView = new TetrisView('#tetris-view');
  tetrisView.render();
  tetrisView.addPieceToGrid();
  tetrisView.render();
  setInterval(function () {
    tetrisView.tick();
  }, 500);
});
