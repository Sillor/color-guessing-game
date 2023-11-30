import React from 'react';

export default function App() {
    const [winState, setWinState] = React.useState('none');
    const [rightColor, setRightColor] = React.useState(0);
    const [colorArray, setColorArray] = React.useState([
        {
            color: `#${((Math.random() * 0xffffff) << 0)
                .toString(16)
                .padStart(6, '0')}`,
            right: false,
        },
    ]);

    function initColors() {
        setColorArray(() => {
            const newColorArray = [];
            for (let i = 0; i < 3; i++)
                newColorArray.push({
                    color: `#${((Math.random() * 0xffffff) << 0)
                        .toString(16)
                        .padStart(6, '0')}`,
                    right: false,
                });

            setRightColor(Math.floor(Math.random() * 3));
            newColorArray[rightColor].right = true;

            return newColorArray;
        });
    }

    function initGame() {
        setWinState('none');
        initColors();
    }

    function validatePick(e) {
        if (e.target.textContent === colorArray[rightColor].color)
            setWinState('win');
        else setWinState('lose');
    }

    React.useEffect(() => {
        initGame();
    }, []);

    return (
        <main>
            <h1>Color Guessing Game</h1>
            <div
                className="colorBoard"
                style={{ backgroundColor: `${colorArray[rightColor].color}` }}
            ></div>
            {winState === 'none' && (
                <div className="pickingButtons">
                    {colorArray.map((color, i) => (
                        <button key={i} onClick={validatePick}>
                            {color.color}
                        </button>
                    ))}
                </div>
            )}
            <p>
                {winState != 'none'
                    ? winState == 'win'
                        ? 'Correct!'
                        : 'Not correct!'
                    : ''}
            </p>
            {winState !== 'none' && (
                <button onClick={initGame}>Restart?</button>
            )}
        </main>
    );
}
