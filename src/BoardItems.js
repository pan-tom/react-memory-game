import React from 'react';

const BoardItems = ({ boardMap, onClickItem }) => (
    <div id="board">
        {boardMap.map((el, index) => (
            <div
                key={el.id}
                data-index={index}
                className={`item ${el.status}`}
                onClick={onClickItem}>
                    <b>
                        {el.value}
                    </b>
            </div>
        ))}
    </div>
);

export default BoardItems;
