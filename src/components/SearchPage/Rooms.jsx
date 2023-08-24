import React from 'react';

const Hotels = ({rooms}) => {
    return (
        <div>
            {rooms.map(room => (
                <div key={room.id}>
                    <div>
                        <img src={'http://localhost:80/' + room.images[0]} alt={'roomImage'}/>
                    </div>
                    <div>
                        ну тут короче инфа какая-то
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Hotels;