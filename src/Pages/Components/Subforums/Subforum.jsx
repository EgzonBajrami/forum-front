import "./subforum.css";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { api, endpoints } from "../../../Lib/Api";
import { useSelector } from "react-redux";
import { getHeaderStructore } from "../../../Lib/helpers/helpers";
import {
  ArrowRight,
  ChatSquareText,
  Search,
  ShieldCheck,
} from "react-bootstrap-icons";

const forumRules = [
  "Keep posts useful, readable, and on topic.",
  "Respect other members, especially when you disagree.",
  "No harassment, hate, spam, or unsafe-for-work content.",
  "Use clear titles so people can find the right thread fast.",
];

const Subforum = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.data);

  const config = useMemo(() => {
    return {
      headers: getHeaderStructore(auth?.token),
    };
  }, [auth]);

  const [subscribed, setSubscribed] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const getForums = async () => {
      try {
        setIsLoading(true);
        setError("");

        const result = await api.call(endpoints.getSub, config);
        const forums = Array.isArray(result?.message) ? result.message : [];

        if (isMounted) {
          setSubscribed(forums);
        }
      } catch (err) {
        if (isMounted) {
          setSubscribed([]);
          setError("Could not load the forum directory.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    getForums();

    return () => {
      isMounted = false;
    };
  }, [config]);

  const filteredForums = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return subscribed;

    return subscribed.filter((forum) => {
      const name = forum?.subforumName?.toLowerCase() || "";
      const description = forum?.description?.toLowerCase() || "";

      return (
        name.includes(normalizedQuery) || description.includes(normalizedQuery)
      );
    });
  }, [query, subscribed]);

  const openForum = (forumId) => {
    navigate(`/subforums/${forumId}`);
  };

  return (
    <main className="forum-directory">
      <section className="forum-directory__content">
        <div className="forum-directory__intro">
          <div>
            <p className="forum-directory__eyebrow">Community hub</p>
            <h1>Subforums</h1>
            <p className="forum-directory__lead">
              Pick a room, catch up on the latest threads, and jump into the
              conversations that fit your mood.
            </p>
          </div>

          <div className="forum-directory__metric">
            <span>{subscribed.length}</span>
            <p>active spaces</p>
          </div>
        </div>

        <label className="forum-search" htmlFor="subforum-search">
          <Search aria-hidden="true" />
          <input
            id="subforum-search"
            type="search"
            placeholder="Search subforums"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className="forum-list" aria-live="polite">
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <div className="forum-card forum-card--loading" key={index}>
                <span />
                <div>
                  <strong />
                  <p />
                </div>
              </div>
            ))}

          {!isLoading && error && (
            <div className="forum-state forum-state--error">{error}</div>
          )}

          {!isLoading && !error && filteredForums.length === 0 && (
            <div className="forum-state">
              No subforums match your search yet.
            </div>
          )}

          {!isLoading &&
            !error &&
            filteredForums.map((forum) => (
              <button
                className="forum-card"
                key={forum._id}
                type="button"
                onClick={() => openForum(forum._id)}
              >
                <span className="forum-card__icon">
                  <ChatSquareText aria-hidden="true" />
                </span>

                <span className="forum-card__body">
                  <strong>{forum.subforumName}</strong>
                  <span>{forum.description}</span>
                </span>

                <span className="forum-card__action">
                  <ArrowRight aria-hidden="true" />
                </span>
              </button>
            ))}
        </div>
      </section>

      <aside className="forum-sidebar" aria-label="Forum rules">
        <div className="forum-sidebar__header">
          <span>
            <ShieldCheck aria-hidden="true" />
          </span>
          <div>
            <p>House rules</p>
            <h2>Keep it clean</h2>
          </div>
        </div>

        <ul className="forum-rules">
          {forumRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>

        <div className="forum-sidebar__note">
          <strong>Quick tip</strong>
          <p>
            Start broad, then search when you know what you want. The best
            threads are usually hiding in plain sight.
          </p>
        </div>
      </aside>
    </main>
  );
};

export default Subforum;
