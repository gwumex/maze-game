const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } = Matter;
const cells = 3;
const width = 600;
const height = 600;
const engine = Engine.create();
const { world } = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: true,
        width,
        height
    }
});
Render.run(render);
Runner.run(Runner.create(), engine)

const walls = [

    Bodies.rectangle(width / 2, 0, width, 40, {
        isStatic: true
    }),
    Bodies.rectangle(width / 2, height, width, 40, {
        isStatic: true
    }),
    Bodies.rectangle(0, height / 2, 40, height, {
        isStatic: true
    }),
    Bodies.rectangle(width, height / 2, 40, height, {
        isStatic: true
    })
]
World.add(world, walls);

//function to shuffle

const shuffle = (arr) => {
    let counter = arr.length;

    while (counter > 0) {
        const index = Math.floor(Math.random() * counter);
        counter--;
        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp
    }
    return arr;
}

const grid = Array(cells).fill(null).map(() => Array(cells).fill(false));
const vertical = Array(cells).fill(null).map(() => Array(cells - 1).fill(false));
const horizontal = Array(cells - 1).fill(null).map(() => Array(cells).fill(false));



const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const stepThroughCell = (row, column) => {

    //if i have visite the cell at [row, column], then return true
    if (grid[row][column]) {
        return;

    }
    //mark this cell as being visited  
    grid[row][column] = true;
    //Assemble randomly-ordered list of neighbor

    const neighbors = shuffle([
        [row - 1, column, 'up'],
        [row, column + 1, 'right'],
        [row + 1, column, 'down'],
        [row, column - 1, 'left']
    ]);
    //for each neighbors

    for (let neighbor of neighbors) {
        const [nextRow, nextColumn, direction] = neighbor;

        //see if that neighbor is out of bounds

        if (nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= cells) {
            continue;
        }
        //if the cell as been visited
        if(grid[nextRow][nextColumn]){
            continue;
        }

        //remove a wall from either horizontals or vertical

        if (direction === 'left'){
            vertical[row][column - 1] = true;
        } else if(direction === 'right'){
            vertical[row][column] = true;
        } else if(direction === 'up'){
            horizontal[row - 1][column] = true;
        } else if (direction === 'down'){
            horizontal[row][column]
        }
    }
}

stepThroughCell(startRow, startColumn);

console.log(vertical);
