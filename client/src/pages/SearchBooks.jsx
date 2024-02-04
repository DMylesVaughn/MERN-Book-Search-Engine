// ... (other imports)

const SearchBooks = () => {
  // ... (existing code)

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  useEffect(() => {
    const cleanup = () => {
      saveBookIds(savedBookIds);
    };

    return cleanup;
  }, [savedBookIds]); // Add savedBookIds as a dependency

  // ... (existing code)

  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Execute the saveBook mutation using the saveBookMutation hook
      await saveBookMutation({
        variables: { book: bookToSave },
      });

      // Update the savedBookIds state with the newly saved bookId
      setSavedBookIds((prevSavedBookIds) => [...prevSavedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  // ... (rest of the existing code)
};

export default SearchBooks;
