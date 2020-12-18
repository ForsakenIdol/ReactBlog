import React from 'react';

const Comment = (props) => {
    let datetime = props.datetime.split('T');
    return (
        <div style={{margin: "1rem 0"}}>
            <p style={{fontWeight: "bold"}}>{props.author}, {datetime[0]} {datetime[1].split('.')[0]}</p>
            <p style={{fontSize: "0.9rem"}}>{props.content}</p>
            {props.admin ? 
            <button onClick={() => {props.handleDelete(props.id)}} style={{background: "none", border: "none", fontFamily: "'Sahitya', serif", fontWeight: "bold", color: "#333", fontStyle: "italic"}}>Remove</button>
            : null}
            
        </div>
    );
};

export default Comment;