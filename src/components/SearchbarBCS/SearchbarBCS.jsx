// Start of Selection
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, } from "react-redux";
import { InputBase, IconButton, Paper, Collapse } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { searchBCS, clearSearch } from "../../redux/serach/searchActions";
import styles from "./SearchbarBCS.module.css";

const SearchbarBCS = ({ isExpanded, onToggle }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchBCS(searchQuery));
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    dispatch(clearSearch());
  };

  return (
    <div className={styles.searchContainer}>
      <Collapse in={isExpanded} orientation="horizontal" className={styles.collapseContainer}>
        <Paper
          component="form"
          onSubmit={handleSearch}
          className={styles.searchBar}
        >
          <InputBase
            className={styles.input}
            placeholder="Поиск по BCS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {searchQuery && (
            <IconButton
              onClick={handleClear}
              className={styles.clearButton}
            >
              <ClearIcon />
            </IconButton>
          )}
          <IconButton
            onClick={onToggle}
            className={styles.closeButton}
          >
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

SearchbarBCS.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default SearchbarBCS;
