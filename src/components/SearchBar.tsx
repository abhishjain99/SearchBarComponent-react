import React, { useState, useEffect, useCallback } from "react";
import { FunctionComponent, ChangeEvent, KeyboardEvent } from "react";
// import fetchDropdownContent, { Book } from "./fetchDropdownContent";
import "./searchBar.css";
import axios from "axios";
// import { debounce, throttle } from "lodash";
import debounce from "./debounce";
import throttle from "./throttle";

export interface Book {
  id: string;
  title: string;
}

const SearchBar: FunctionComponent = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [dropdown, setDropdown] = useState<Book[]>([]);
  const [searchIndex, setSearchIndex] = useState<number>(-1);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  // Debounced function to fetch dropdown
  const debouncedFetchSearches = useCallback(debounce(async (searchedText: string) => {
    if (searchedText) {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchedText}&startIndex=0&maxResults=20`
        );
        const books = response.data.items?.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title,
        })) ?? [];
        setDropdown(books);
      } catch (error) {
        console.error("Error fetching dropdown content:", error);
      }
    } else {
      setDropdown([]);
    }
  }, 300), []);

  // Throttled function to fetch dropdown
  const throttledFetchSearches = useCallback(throttle(async (searchedText: string) => {
    if (searchedText) {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchedText}&startIndex=0&maxResults=20`
        );
        const books = response.data.items?.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title,
        })) ?? [];
        setDropdown(books);
      } catch (error) {
        console.error("Error fetching dropdown content:", error);
      }
    } else {
      setDropdown([]);
    }
  }, 1000), []);

  useEffect(() => {
    debouncedFetchSearches(searchText); // starts searching after 300ms of typing stopped
    // throttledFetchSearches(searchText); // searches every 1000ms
  }, [searchText, debouncedFetchSearches]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setIsDropdownVisible(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        setSearchIndex((prevIndex) => (prevIndex + 1) % dropdown.length);
        break;
      case "ArrowUp":
        setSearchIndex((prevIndex) => (prevIndex - 1 + dropdown.length) % dropdown.length);
        break;
      case "Enter":
        if (searchIndex >= 0) {
          setSearchText(dropdown[searchIndex].title);
          setIsDropdownVisible(false);
        }
        break;
      case "Escape":
        setIsDropdownVisible(false);
        break;
      default:
        break;
    }
  };

  const handleClick = (title: string) => {
    setSearchText(title);
    setIsDropdownVisible(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsDropdownVisible(false);
    }, 100);
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        value={searchText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        role="bookinput"
        placeholder=" "
      />
      <span className="input-title">Book</span>
      <span className="arrow-icon">▼</span>
      {isDropdownVisible && dropdown.length > 0 && (
        <ul className="dropdown">
          {dropdown.map((book, index) => (
            <li
              key={book.id}
              className={index === searchIndex ? "hovered" : ""}
              onClick={() => handleClick(book.title)}
              onMouseEnter={() => setSearchIndex(index)}
            >
              {book.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
