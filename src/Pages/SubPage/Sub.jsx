import { Component, useEffect, useState, useMemo } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { api, endpoints } from "../../Lib/Api";
import { getHeaderStructore } from "../../Lib/helpers/helpers";
import { useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import "./Sub.css";

class SubErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Header />
          <div className="subcontent">
            <p>Something went wrong while loading this subforum page.</p>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}

const SubContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sub = location.pathname.split("/")[2];
  const auth = useSelector((state) => state.auth.data);
  const config = useMemo(() => {
    return {
      headers: getHeaderStructore(auth.token),
      params: [sub],
    };
  }, [auth, sub]);

  const [currentSub, setCurrentSub] = useState();
  const [postArray, setPostArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const getSub = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const subResult = await api.call(endpoints.getForumPosts, config);

        if (!isMounted) {
          return;
        }

        const subData = subResult?.data;

        setCurrentSub(subData ? [subData] : []);
        setPostArray(Array.isArray(subData?.posts) ? subData.posts : []);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setCurrentSub([]);
        setPostArray([]);
        setErrorMessage(
          error?.response?.data?.message ||
            error?.message ||
            "Unable to load subforum data. Please try again.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    getSub();

    return () => {
      isMounted = false;
    };
  }, [config, reloadKey]);

  const createPostHandler = (e) => {
    e.preventDefault();
    if (currentSub) {
      navigate(`/subforums/${sub}/createPost/`, { state: { subforum: sub } });
    }
  };

  return (
    <>
      <Header />
      {isLoading && (
        <div className="subcontent">
          <p>Loading subforum...</p>
        </div>
      )}
      {errorMessage && (
        <div className="subcontent">
          <p>{errorMessage}</p>
          <button
            type="button"
            className="button-noremove"
            onClick={() => setReloadKey((prev) => prev + 1)}
          >
            Try again
          </button>
        </div>
      )}

      <div className="subheader">
        {!isLoading && !errorMessage && currentSub?.length > 0 && (
          <ul className="subUl">
            <h3>
              {currentSub[0].subforumName}
              <br></br>
              <br></br>
              {currentSub[0].description}
            </h3>
          </ul>
        )}
      </div>
      {!isLoading && !errorMessage && currentSub?.length > 0 && (
        <div className="add-post" onClick={createPostHandler}>
          <FontAwesomeIcon size="lg" icon={faPlus} />
          <h4>Create a new post</h4>
        </div>
      )}
      {!isLoading && !errorMessage && currentSub?.length > 0 && (
        <div className="subcontent">
          {postArray &&
            postArray.map((elem) => {
              return (
                <Link
                  key={elem._id}
                  to={{ pathname: `/subforums/${sub}/post/${elem._id}` }}
                >
                  {elem.author && (
                    <div className="posts">
                      <div className="contains-image">
                        {elem.author && <img src={elem.author.avatar} alt="" />}
                      </div>
                      <div className="info-container">
                        <div>
                          <h4 className="remove-space"> {elem.title}</h4>
                        </div>
                        <div
                          className="postContainer"
                          dangerouslySetInnerHTML={{
                            __html: elem.textSubmission,
                          }}
                        />
                        <div className="info-post">
                          <div className="author-info">
                            <p>Posted by:{elem.author.username}</p>
                          </div>
                          <div className="post-info">
                            <p>
                              Upvotes:
                              {elem.upvotedBy.length - elem.downvotedBy.length}
                            </p>
                            <p className="created-date">
                              Posted at:{elem.createdAt.split("T")[0]}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
        </div>
      )}
    </>
  );
};

const Sub = () => (
  <SubErrorBoundary>
    <SubContent />
  </SubErrorBoundary>
);

export default Sub;

