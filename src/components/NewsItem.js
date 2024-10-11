import React from 'react'

const NewsItem=(props)=> {

    let {title, description, imageURL, newsURL, author, date, source} = props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem", height:"28rem"}}>
            {/* <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'}}>
              {source} dd
            </span> */}
            <img src={!imageURL?"https://www.reuters.com/resizer/v2/GLA6PSU2Z5KIXCKNO4XZ3KGGTY.jpg?auth=19ac45dc41bb500307b4f8b2d537e71d3168528eb229d972bc2e120584df0c77&height=1005&width=1920&quality=80&smart=true" :imageURL} className="card-image-top" alt="..." style={{width:"287px", height:"150px"}}/>
            <div className="card-body">
                <h5 className="card-title" style={{height:"4rem"}}>{title}...</h5>
                <div className='my-2'>
                <span className="badge text-bg-danger">{source}</span>
                </div>
                <p className="card-text" style={{height:"4rem"}}>{description}...</p>
                <p className="card-text"><small className="text-body-secondary">by {!author?"Unknown": author} on{new Date(date).toGMTString() } 3 mins ago</small></p>
                <a href={newsURL} className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }


export default NewsItem
