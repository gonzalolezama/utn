import React from "react";

const ComprarItem = (props) => {
    const{ ti, zo, ub, tip, imagen, pr, des } = props;
// aca donde armo el diseño
    return (
        <div className="comprar">
            <h1>{ti}</h1>
            <h3> {zo} </h3>
            <h3> {ub} </h3>
            <h3> {tip} </h3>
            <img src={imagen} />
            <h2> u$s {pr} </h2>
            
            <div dangerouslySetInnerHTML={{__html:des}} />
            <hr />
        </div>
    
    );
}

export default ComprarItem;