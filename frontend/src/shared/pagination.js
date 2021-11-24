import React from 'react'

const Pagination = () => {
    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div>
            <Pagination>
                <Pagination.First />
                <Pagination.Item key={2} active={true}>
                2
            </Pagination.Item>,
                <Pagination.Prev />
            </Pagination>
            <br />


        </div>
    )
}

export default Pagination
