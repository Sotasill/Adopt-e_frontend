import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { InputBase, IconButton, Paper, Collapse } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { searchUser, clearSearch } from "../../redux/serach/searchActions";
import styles from "./SearchbarUser.module.css";

const SearchbarUser = ({ isExpanded, onToggle }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchUser(searchQuery));
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    dispatch(clearSearch());
  };

  return (
    <div className={styles.searchContainer}>
      <Collapse
        in={isExpanded}
        orientation="horizontal"
        className={styles.collapseContainer}
      >
        <Paper
          component="form"
          onSubmit={handleSearch}
          className={styles.searchBar}
        >
          <InputBase
            className={styles.input}
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {searchQuery && (
            <IconButton onClick={handleClear} className={styles.clearButton}>
              <ClearIcon />
            </IconButton>
          )}
          <IconButton onClick={onToggle} className={styles.closeButton}>
            <ClearIcon />
          </IconButton>
        </Paper>
      </Collapse>
      {!isExpanded && (
        <IconButton
          onClick={onToggle}
          className={styles.searchIcon}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      )}
    </div>
  );
};

SearchbarUser.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default SearchbarUser;
