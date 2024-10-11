import React, { useEffect, useState, useCallback } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country, category, pageSize, setProgress }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResult, setTotalResult] = useState(0);

    const toCapitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const updateNews = useCallback(async () => {
        setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=3c8bf52f8d0d4ecabfef257e6bd03790&page=${page}&pageSize=${pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);

        setArticles(parsedData.articles);
        setTotalResult(parsedData.totalResults);
        setLoading(false);

        setProgress(100);
    }, [page, country, category, pageSize, setProgress]);

    useEffect(() => {
        updateNews();
    }, [updateNews]);

    const fetchMoreData = async () => {
        const newPage = page + 1;
        setPage(newPage);
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=3c8bf52f8d0d4ecabfef257e6bd03790&page=${newPage}&pageSize=${pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalResult(parsedData.totalResults);
    };

    return (
        <>
            <h2 className="text-center"> The Daily Mukut - {toCapitalize(category)} Top Headlines</h2>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResult}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => (
                            <div className="col-md-3" key={element.url}>
                                <NewsItem 
                                    title={element.title ? element.title.slice(0, 45) : ""}
                                    description={element.description ? element.description.slice(0, 88) : ""}
                                    imageURL={element.urlToImage}
                                    newsURL={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                    source={element.source.name} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
};

News.defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'General'
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func.isRequired,
};

export default News;
