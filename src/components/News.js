import React, {useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar'

const News=(props)=>{


 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [page, setPage] = useState(1)
  const [progress, setProgress] = useState(0)





  const updateNews = async()=>{
    setProgress(30)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    setProgress(70)
    let parseData = await data.json();
    setProgress(90)
    console.log(parseData);
    setArticles(parseData.articles)
    setTotalResults(parseData.totalResults)
    setLoading(false)
    setProgress(100)
  }

useEffect(() => {
  document.title = `${capitalizeFirstLetter(
    props.category
  )} - NewsMonkey`;
  updateNews()
  // eslint-disable-next-line
}, [ ]) 


  // const handleNextClick = async () => {
  //    setPage(page+1)
  //    updateNews();
  // };

  // const handlePrevClick = async () => {
  //    setPage(page-1)
  //    this.updateNews();
  // }

 const fetchMoreData = async () => {
    setPage(page + 1)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pagesize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
    setLoading(false)
  }
  
    return (
        <>
        <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
        <h1 className="text-center" style={{marginTop: 65}}>
          News Monkey - Top {capitalizeFirstLetter(props.category)}{" "}
          Headlines
        </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults} //articles.length !== totalResults
          loader={<Spinner/>}
        >
          <div className="container">
          {
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://static3.depositphotos.com/1005460/260/i/950/depositphotos_2605601-stock-photo-latest-news.jpg"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          }
          </div>
        </InfiniteScroll>
      
      </>
    );

}

News.defaultProps = {
  pageSize: 5,
  country: "in",
  category: "general",
};
News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
