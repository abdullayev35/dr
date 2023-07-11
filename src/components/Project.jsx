import React from 'react';
import {Link} from "react-router-dom";
const Project = ({item}) => {
    return (
        <Link to={`/selected-projects/project/${item?.id}`} className="project-container">
            <img src={`https://cdn.3steps.az/his-content/` + item?.mainImageUrl} alt={item?.name}/>
            <h4>{item?.name}</h4>
        </Link>
    );
};

export default Project;