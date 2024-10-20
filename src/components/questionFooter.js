import React, { useState } from 'react';

const QuestionFooter = () => {

    

    return (
        <div>
            <footer class="flex justify-end p-4 border-t-2">
                <button class="mr-2 px-4 py-2 border-2 rounded-lg hover:bg-blue-300">Previous Question</button>
                <button class="px-4 py-2 border-2 rounded-lg hover:bg-blue-300">Next Question</button>
            </footer>
        </div>
    )
}

export default QuestionFooter