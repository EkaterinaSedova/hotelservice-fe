import React from 'react';

const Feedback = ({feedback}) => {
    return (
        <div>
            ________________________
            <br/>
            {feedback.message}, оценка: {feedback.rate}
        </div>
    );
};

export default Feedback;