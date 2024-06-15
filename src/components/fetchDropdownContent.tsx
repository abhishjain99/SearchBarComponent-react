import axios from "axios";
import debounce from "lodash/debounce";

const fetchDropdownContent = debounce(async (searchedText: string) => {
    if (searchedText) {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchedText}&startIndex=0&maxResults=20`
        );
        const books = response.data.items?.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title,
        })) ?? [];
        return books;
      } catch (error) {
        console.error("Error fetching dropdown content:", error);
        return [];
      }
    } else {
      return [];
    }
  }, 300);

export default fetchDropdownContent;