import React from "react";

const NewsItem= (props)=>{
      let {title, description, imageUrl, newsUrl, author, date} = props;
    return (
      <div className="my-3">
        <a href={newsUrl} rel="noreferrer" target="_blank" style={{textDecoration:"none",color:"inherit"}}>
        <div className="card" href={newsUrl}>
          <img src={imageUrl} className="card-img-top" alt="..." style={{objectFit:"cover",height:200,width:"auto"}}/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>

            <button className="btn btn-sm btn-dark">
              Read More
            </button>
          </div>
        </div>
        </a>
      </div>
    );
}

export default NewsItem;
