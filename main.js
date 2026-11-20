const gridContainer = document.getElementById('grid-container');
const button = document.getElementById('btn-popup');
const resetBtn =  document.getElementById('reset-button');


resetBtn.addEventListener("click", () => {
    const squares = gridContainer.querySelectorAll('.grid')
    squares.forEach(square => {
        square.style.backgroundColor = "";
        delete square.dataset.hue;
        delete square.dataset.lightness;
    });
});

function gridRender(size) {
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid';

        cell.addEventListener('mouseenter', () => {
            if (!cell.dataset.hue) {
                cell.dataset.hue = Math.floor(Math.random() * 360);
                cell.dataset.lightness = 100;
            }

            const currentLightness = Number(cell.dataset.lightness);

            cell.dataset.lightness = Math.max(0, currentLightness - 10);
            cell.style.backgroundColor = `hsl(${cell.dataset.hue}, 100%, ${cell.dataset.lightness}%)`
            
        });

        gridContainer.appendChild(cell);
    }
}

button.addEventListener('click', () => {
    const input = prompt('Enter number of squares per side (max 100)');
    if(input === null) return;

    const cellSize = Number(input);
    if (!Number.isInteger(cellSize) || cellSize < 1 || cellSize > 100) {
        alert('Number you input is not valid');
        return;
    }

    gridRender(cellSize);
});

gridRender(64);